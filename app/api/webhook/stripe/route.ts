import { NextResponse } from "next/server"
import Stripe from "stripe"
import { serviceRoleRequest } from "@/lib/supabase"

type StoreItem = { productId: string; name: string; priceCents: number; quantity: number }
type CreatedOrder = { id: string }

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")
  const secret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !secret || !webhookSecret) return NextResponse.json({ error:"Webhook is not configured." }, { status:400 })
  try {
    const stripe = new Stripe(secret)
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret)
    if (event.type !== "checkout.session.completed") return NextResponse.json({ received:true })
    const session = event.data.object as Stripe.Checkout.Session
    if (session.metadata?.eventId) {
      await serviceRoleRequest(`/rest/v1/rsvps?stripe_session_id=eq.${encodeURIComponent(session.id)}`, { method:"PATCH", headers:{ Prefer:"return=minimal" }, body:JSON.stringify({ status:"confirmed", paid:true }) })
      return NextResponse.json({ received:true })
    }
    if (session.metadata?.storeOrder !== "true" || !session.metadata.userId || !session.metadata.items) return NextResponse.json({ received:true })
    const existing = await serviceRoleRequest<CreatedOrder[]>(`/rest/v1/orders?select=id&stripe_order_id=eq.${encodeURIComponent(session.id)}`, { method:"GET" })
    if (existing.length) return NextResponse.json({ received:true })
    const items = JSON.parse(session.metadata.items) as StoreItem[]
    if (!items.length || items.some((item) => !item.productId || !item.name || !Number.isInteger(item.quantity) || !Number.isInteger(item.priceCents))) throw new Error("Invalid store metadata")
    const created = await serviceRoleRequest<CreatedOrder[]>("/rest/v1/orders", { method:"POST", headers:{ Prefer:"return=representation" }, body:JSON.stringify({ user_id:session.metadata.userId, stripe_order_id:session.id, status:"paid", total_cents:session.amount_total || 0, currency:session.currency || "usd", items }) })
    const order = created[0]
    if (!order) throw new Error("Order could not be created")
    await serviceRoleRequest("/rest/v1/order_items", { method:"POST", headers:{ Prefer:"return=minimal" }, body:JSON.stringify(items.map((item) => ({ order_id:order.id, product_id:item.productId, quantity:item.quantity, price_cents:item.priceCents, name:item.name }))) })
    return NextResponse.json({ received:true })
  } catch {
    return NextResponse.json({ error:"Invalid webhook signature." }, { status:400 })
  }
}
