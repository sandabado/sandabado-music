import { NextResponse } from "next/server"
const requests = new Map<string,number>()

export async function POST(request:Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (Date.now() - (requests.get(ip) || 0) < 60_000) return NextResponse.json({ error:"Please wait a moment." }, { status:429 })
  try {
    const { email } = await request.json() as { email?:unknown }
    const value = typeof email === "string" ? email.trim().toLowerCase().slice(0,254) : ""
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return NextResponse.json({ error:"Please enter a valid email." }, { status:400 })
    requests.set(ip,Date.now())
    const endpoint = process.env.CONVERTKIT_FORM_URL || process.env.FORMSPREE_FORM_URL
    if (!endpoint) return NextResponse.json({ error:"The mailing list is not configured." }, { status:503 })
    const response = await fetch(endpoint, { method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" }, body:JSON.stringify({ email:value }) })
    if (!response.ok) throw new Error("Mailing-list provider rejected the subscription.")
    return NextResponse.json({ ok:true })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : "Subscription could not be completed." }, { status:500 }) }
}
