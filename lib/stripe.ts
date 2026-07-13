import Stripe from "stripe"

export function getStripe() {
  const key = process.env.STRIPE_RESTRICTED_KEY || process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("Stripe is not configured.")
  return new Stripe(key)
}

export function getAppUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
}

export function getLibraryPrice(interval: "monthly" | "annual") {
  const priceId = interval === "monthly" ? process.env.STRIPE_LIBRARY_MONTHLY_PRICE_ID : process.env.STRIPE_LIBRARY_ANNUAL_PRICE_ID
  if (!priceId) throw new Error("Library membership pricing is not configured.")
  return priceId
}
