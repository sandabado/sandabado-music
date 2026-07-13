import { NextResponse } from "next/server"
import { getBearerToken, getUserFromToken, serviceRoleRequest } from "@/lib/supabase"
import { getAppUrl, getStripe } from "@/lib/stripe"

type Profile = { stripe_customer_id: string | null }

export async function POST(request: Request) {
  try {
    const accessToken = getBearerToken(request.headers.get("authorization"))
    const user = await getUserFromToken(accessToken)
    if (!user) return NextResponse.json({ error: "Sign in to manage your membership." }, { status: 401 })

    const profiles = await serviceRoleRequest<Profile[]>(`/rest/v1/profiles?select=stripe_customer_id&id=eq.${encodeURIComponent(user.id)}`, { method: "GET" })
    const customer = profiles[0]?.stripe_customer_id
    if (!customer) return NextResponse.json({ error: "No billing profile was found." }, { status: 404 })

    const session = await getStripe().billingPortal.sessions.create({ customer, return_url: `${getAppUrl(request)}/account` })
    return NextResponse.json({ portalUrl: session.url })
  } catch {
    return NextResponse.json({ error: "The billing portal could not be opened." }, { status: 500 })
  }
}
