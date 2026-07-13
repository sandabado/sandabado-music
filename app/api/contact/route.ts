import { NextResponse } from "next/server"

const windowMs = 60_000
const requests = new Map<string,number>()
const clean = (value:unknown, limit:number) => typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0,limit) : ""

export async function POST(request:Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const last = requests.get(ip) || 0
  if (Date.now() - last < windowMs) return NextResponse.json({ error:"Please wait a moment before sending another message." }, { status:429 })
  try {
    const body = await request.json()
    const name = clean(body.name,150), email = clean(body.email,254), subject = clean(body.subject,40), message = clean(body.message,5000)
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !["Booking","Press","General"].includes(subject) || !message) return NextResponse.json({ error:"Please complete every field." }, { status:400 })
    requests.set(ip,Date.now())
    const key = process.env.RESEND_API_KEY
    if (!key) return NextResponse.json({ error:"Email service is not configured." }, { status:503 })
    const recipient = subject === "Booking" ? "booking@sandabado.com" : subject === "Press" ? "press@sandabado.com" : "records@wholebody.earth"
    const response = await fetch("https://api.resend.com/emails", { method:"POST", headers:{ Authorization:`Bearer ${key}`, "Content-Type":"application/json" }, body:JSON.stringify({ from:process.env.RESEND_FROM_EMAIL || "Sandabado <onboarding@resend.dev>", to:[recipient], reply_to:email, subject:`[${subject}] ${name}`, text:`From: ${name} <${email}>\n\n${message}` }) })
    if (!response.ok) throw new Error("Email provider rejected the message.")
    return NextResponse.json({ ok:true })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : "Message could not be sent." }, { status:500 }) }
}
