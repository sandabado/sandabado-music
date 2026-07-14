import { NextResponse } from "next/server"

const windowMs = 60_000
const requests = new Map<string, number>()
const clean = (value:unknown, limit:number) => typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, limit) : ""
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request:Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (Date.now() - (requests.get(ip) || 0) < windowMs) return NextResponse.json({ error:"Please wait a moment before submitting another request." }, { status:429 })
  try {
    const body = await request.json()
    const data = { venue:clean(body.venue_name,150), name:clean(body.contact_name,150), email:clean(body.contact_email,254), phone:clean(body.contact_phone,50), url:clean(body.venue_url,500), capacity:clean(body.capacity,20), date:clean(body.preferred_date,20), type:clean(body.event_type,60), location:clean(body.location,150), budget:clean(body.budget,120), notes:clean(body.notes,5000), terms:body.terms === "on" }
    if (!data.venue || !data.name || !emailPattern.test(data.email) || !data.date || !data.type || !data.location || !data.terms) return NextResponse.json({ error:"Please complete all required booking details." }, { status:400 })
    requests.set(ip, Date.now())
    const key = process.env.RESEND_API_KEY
    if (!key) return NextResponse.json({ error:"Booking email is not configured yet. Please email booking@sandabado.com directly." }, { status:503 })
    const details = `New booking inquiry\n\nVenue: ${data.venue}\nContact: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nWebsite: ${data.url || "Not provided"}\nCapacity: ${data.capacity || "Not provided"}\nDate: ${data.date}\nEvent type: ${data.type}\nLocation: ${data.location}\nBudget: ${data.budget || "Not provided"}\n\nNotes:\n${data.notes || "None"}`
    const from = process.env.RESEND_FROM_EMAIL || "Sandabado Booking <onboarding@resend.dev>"
    const send = (payload:Record<string,unknown>) => fetch("https://api.resend.com/emails", { method:"POST", headers:{ Authorization:`Bearer ${key}`, "Content-Type":"application/json" }, body:JSON.stringify(payload) })
    const inquiry = await send({ from, to:["management@odin.agency", "booking@sandabado.com"], reply_to:data.email, subject:`Booking request: ${data.type} — ${data.location}`, text:details })
    if (!inquiry.ok) throw new Error("Email provider rejected the booking request.")
    await send({ from, to:[data.email], subject:"Booking request received — Sandābādo", text:"Thank you for your inquiry. ODIN Management will respond within 48 business hours. Please allow up to one week for a complete proposal with availability and fee structure.\n\nQuestions? booking@sandabado.com" })
    return NextResponse.json({ ok:true })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : "Booking request could not be sent." }, { status:500 }) }
}
