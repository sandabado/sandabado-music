import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getBearerToken, getUserFromToken, supabaseRequest } from "@/lib/supabase"
import type { CartItem, StoreProduct } from "@/lib/store"

type CheckoutRequest = { items?: CartItem[] }

export async function POST(request: Request) {
  try {
    const accessToken = getBearerToken(request.headers.get("authorization"))
    const user = await getUserFromToken(accessToken)
    if (!user) return NextResponse.json({ error:"Sign in to checkout." }, { status:401 })
    const { items } = await request.json() as CheckoutRequest
    if (!items?.length || items.length > 20) return NextResponse.json({ error:"Your cart is empty or too large." }, { status:400 })
    const quantities = new Map<string, number>()
    for (const item of items) {
      if (!item.productId || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) return NextResponse.json({ error:"Your cart contains an invalid quantity." }, { status:400 })
      quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity)
    }
    const productIds = [...quantities.keys()]
    const products = await supabaseRequest<StoreProduct[]>(`/rest/v1/products?select=*&active=eq.true&id=${encodeURIComponent(`in.(${productIds.join(",")})`)}`, { method:"GET" })
    if (products.length !== productIds.length) return NextResponse.json({ error:"One or more products are no longer available." }, { status:409 })
    const lineItems = products.map((product) => {
      const quantity = quantities.get(product.id) || 0
      if (product.inventory_count !== null && quantity > product.inventory_count) throw new Error(`${product.name} does not have enough inventory.`)
      return { product, quantity }
    })
    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) return NextResponse.json({ error:"Stripe is not configured yet." }, { status:503 })
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
    const snapshot = lineItems.map(({ product, quantity }) => ({ productId:product.id, name:product.name, priceCents:product.price_cents, quantity }))
    const stripe = new Stripe(secret)
    const session = await stripe.checkout.sessions.create({
      mode:"payment",
      customer_email:user.email,
      line_items:lineItems.map(({ product, quantity }) => ({ quantity, price_data:{ currency:product.currency || "usd", unit_amount:product.price_cents, product_data:{ name:product.name, description:product.description || undefined } } })),
      success_url:`${baseUrl}/account?checkout=success`,
      cancel_url:`${baseUrl}/cart`,
      metadata:{ storeOrder:"true", userId:user.id, items:JSON.stringify(snapshot) },
    })
    return NextResponse.json({ checkoutUrl:session.url })
  } catch (error) {
    return NextResponse.json({ error:error instanceof Error ? error.message : "Checkout could not be started." }, { status:500 })
  }
}
