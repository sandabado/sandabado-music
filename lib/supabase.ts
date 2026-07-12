const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function configuration() {
  if (!url || !anonKey) throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  return { url, anonKey }
}

export async function supabaseRequest<T>(path: string, init: RequestInit = {}, accessToken?: string) {
  const config = configuration()
  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken || config.anonKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  })
  if (!response.ok) throw new Error(await response.text())
  if (response.status === 204) return null as T
  return response.json() as Promise<T>
}

export async function getUserFromToken(accessToken: string | null) {
  if (!accessToken) return null
  try {
    return await supabaseRequest<{ id: string; email?: string; user_metadata?: { full_name?: string } }>("/auth/v1/user", { method: "GET" }, accessToken)
  } catch {
    return null
  }
}

export function getBearerToken(value: string | null) {
  return value?.startsWith("Bearer ") ? value.slice(7) : null
}

export async function serviceRoleRequest<T>(path: string, init: RequestInit = {}) {
  const config = configuration()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.")
  const response = await fetch(`${config.url}${path}`, { ...init, headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", ...(init.headers || {}) }, cache: "no-store" })
  if (!response.ok) throw new Error(await response.text())
  if (response.status === 204) return null as T
  return response.json() as Promise<T>
}
