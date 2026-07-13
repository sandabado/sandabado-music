import { NextResponse } from "next/server"
import Stripe from "stripe"
import { serviceRoleRequest } from "@/lib/supabase"
import { getStripe } from "@/lib/stripe"

type StoreItem = { productId: string; name: string; priceCents: number; quantity: number }
type CreatedOrder = { id: string }

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !webhookSecret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 })

  try {
    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret)

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutSession(event.data.object as Stripe.Checkout.Session)
        break
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncMembership(event.data.object as Stripe.Subscription)
        break
      case "invoice.paid":
      case "invoice.payment_failed":
      case "invoice.voided":
        await syncConsultingInvoice(event.data.object as Stripe.Invoice)
        break
      default:
        break
    }
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 })
  }
}

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.mode === "payment" && session.payment_status !== "paid") return

  if (session.metadata?.eventId) {
    await serviceRoleRequest(`/rest/v1/rsvps?stripe_session_id=eq.${encodeURIComponent(session.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "confirmed", paid: true }),
    })
    return
  }

  if (session.metadata?.storeOrder !== "true" || !session.metadata.userId || !session.metadata.items) return
  const existing = await serviceRoleRequest<CreatedOrder[]>(`/rest/v1/orders?select=id&stripe_order_id=eq.${encodeURIComponent(session.id)}`, { method: "GET" })
  if (existing.length) return

  const items = JSON.parse(session.metadata.items) as StoreItem[]
  if (!items.length || items.some((item) => !item.productId || !item.name || !Number.isInteger(item.quantity) || !Number.isInteger(item.priceCents))) throw new Error("Invalid store metadata")
  const created = await serviceRoleRequest<CreatedOrder[]>("/rest/v1/orders", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ user_id: session.metadata.userId, stripe_order_id: session.id, status: "paid", total_cents: session.amount_total || 0, currency: session.currency || "usd", items }),
  })
  const order = created[0]
  if (!order) throw new Error("Order could not be created")
  await serviceRoleRequest("/rest/v1/order_items", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(items.map((item) => ({ order_id: order.id, product_id: item.productId, quantity: item.quantity, price_cents: item.priceCents, name: item.name }))),
  })
}

async function syncMembership(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId
  if (!userId) return
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id
  const periodEnd = (subscription as Stripe.Subscription & { current_period_end?: number }).current_period_end
  await serviceRoleRequest("/rest/v1/memberships?on_conflict=stripe_subscription_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0]?.price.id || null,
      status: subscription.status,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    }),
  })
}

async function syncConsultingInvoice(invoice: Stripe.Invoice) {
  await serviceRoleRequest(`/rest/v1/consulting_invoices?stripe_invoice_id=eq.${encodeURIComponent(invoice.id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      status: invoice.status || "open",
      amount_due_cents: invoice.amount_due,
      currency: invoice.currency,
      due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
      hosted_invoice_url: invoice.hosted_invoice_url,
    }),
  })
}
