import { NextResponse } from "next/server"
import { getBearerToken, getUserFromToken } from "@/lib/supabase"
import { getOrCreateStripeCustomer } from "@/lib/stripe-customer"
import { getAppUrl, getLibraryPrice, getStripe } from "@/lib/stripe"

type BillingCheckoutRequest = { interval?: "monthly" | "annual" }

export async function POST(request: Request) {
  try {
    const accessToken = getBearerToken(request.headers.get("authorization"))
    const user = await getUserFromToken(accessToken)
    if (!user) return NextResponse.json({ error: "Sign in to start a membership." }, { status: 401 })

    const { interval = "monthly" } = await request.json() as BillingCheckoutRequest
    if (interval !== "monthly" && interval !== "annual") return NextResponse.json({ error: "Choose a monthly or annual membership." }, { status: 400 })

    const customer = await getOrCreateStripeCustomer(user)
    const baseUrl = getAppUrl(request)
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer,
      customer_update: { address: "auto" },
      line_items: [{ price: getLibraryPrice(interval), quantity: 1 }],
      metadata: { billing: "library_membership", userId: user.id },
      subscription_data: { metadata: { billing: "library_membership", userId: user.id } },
      success_url: `${baseUrl}/account?membership=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/manuals`,
    })
    if (!session.url) throw new Error("Checkout URL was not created.")
    return NextResponse.json({ checkoutUrl: session.url })
  } catch {
    return NextResponse.json({ error: "Membership checkout could not be started." }, { status: 500 })
  }
}
