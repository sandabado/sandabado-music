import { NextResponse } from "next/server"
import { getBearerToken, getUserFromToken, serviceRoleRequest, supabaseRequest } from "@/lib/supabase"
import { getStripe } from "@/lib/stripe"

type Profile = { role: "member" | "admin" }
type InvoiceRequest = { email?: string; description?: string; amountCents?: number }

export async function POST(request: Request) {
  try {
    const accessToken = getBearerToken(request.headers.get("authorization"))
    const user = await getUserFromToken(accessToken)
    if (!user || !accessToken) return NextResponse.json({ error: "Sign in to create an invoice." }, { status: 401 })

    const profiles = await supabaseRequest<Profile[]>(`/rest/v1/profiles?select=role&id=eq.${encodeURIComponent(user.id)}`, { method: "GET" }, accessToken)
    if (profiles[0]?.role !== "admin") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 })

    const { email, description, amountCents } = await request.json() as InvoiceRequest
    if (!email || !description || !Number.isInteger(amountCents) || (amountCents || 0) < 50) return NextResponse.json({ error: "Email, description, and an amount of at least $0.50 are required." }, { status: 400 })
    const amount = amountCents as number

    const stripe = getStripe()
    const customers = await stripe.customers.list({ email, limit: 1 })
    const customer = customers.data[0] || await stripe.customers.create({ email })
    await stripe.invoiceItems.create({ customer: customer.id, amount, currency: "usd", description })
    const draft = await stripe.invoices.create({ customer: customer.id, collection_method: "send_invoice", days_until_due: 14, auto_advance: false, metadata: { wholebody: "consulting" } })
    const finalized = await stripe.invoices.finalizeInvoice(draft.id)
    const invoice = await stripe.invoices.sendInvoice(finalized.id)

    await serviceRoleRequest("/rest/v1/consulting_invoices", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        stripe_invoice_id: invoice.id,
        stripe_customer_id: customer.id,
        recipient_email: email,
        status: invoice.status || "open",
        amount_due_cents: invoice.amount_due,
        currency: invoice.currency,
        due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
        hosted_invoice_url: invoice.hosted_invoice_url,
      }),
    })
    return NextResponse.json({ invoiceId: invoice.id, hostedInvoiceUrl: invoice.hosted_invoice_url })
  } catch {
    return NextResponse.json({ error: "The consulting invoice could not be created." }, { status: 500 })
  }
}
