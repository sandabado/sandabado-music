import { NextResponse } from "next/server"
import Stripe from "stripe"
import { products, ticketTiers } from "@/lib/sandabado"

type Item = { productId?:string; quantity?:number }
const catalog = [...products, ...ticketTiers]

export async function POST(request:Request) {
  try {
    const body = await request.json() as { items?:Item[] }
    if (!body.items?.length || body.items.length > 20) return NextResponse.json({ error:"Your cart is empty or too large." }, { status:400 })
    const quantities = new Map<string,number>()
    for (const item of body.items) { if (!item.productId || !Number.isInteger(item.quantity) || !item.quantity || item.quantity < 1 || item.quantity > 10) return NextResponse.json({ error:"Your cart contains an invalid quantity." }, { status:400 }); quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity) }
    const lineItems = [...quantities].map(([id,quantity]) => { const product = catalog.find((candidate) => candidate.id === id); if (!product || quantity > 10) throw new Error("One or more selections are unavailable."); return { quantity, price_data:{ currency:"usd", unit_amount:product.priceCents, product_data:{ name:product.name, description:product.detail } } } })
    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) return NextResponse.json({ error:"Checkout is not configured yet. Please contact records@wholebody.earth." }, { status:503 })
    const stripe = new Stripe(secret)
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
    const session = await stripe.checkout.sessions.create({ mode:"payment", line_items:lineItems, success_url:`${origin}/store?checkout=success`, cancel_url:`${origin}/store?checkout=cancelled`, allow_promotion_codes:true })
    if (!session.url) throw new Error("Checkout could not be created.")
    return NextResponse.json({ checkoutUrl:session.url })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : "Checkout could not be started." }, { status:400 }) }
}
