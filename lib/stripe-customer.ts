import { serviceRoleRequest } from "@/lib/supabase"
import { getStripe } from "@/lib/stripe"

type Profile = { stripe_customer_id: string | null }

export async function getOrCreateStripeCustomer(user: { id: string; email?: string; user_metadata?: { full_name?: string } }) {
  const profiles = await serviceRoleRequest<Profile[]>(`/rest/v1/profiles?select=stripe_customer_id&id=eq.${encodeURIComponent(user.id)}`, { method: "GET" })
  const existing = profiles[0]?.stripe_customer_id
  if (existing) return existing

  const customer = await getStripe().customers.create({
    email: user.email,
    name: user.user_metadata?.full_name || undefined,
    metadata: { supabaseUserId: user.id },
  })
  await serviceRoleRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ stripe_customer_id: customer.id }),
  })
  return customer.id
}
