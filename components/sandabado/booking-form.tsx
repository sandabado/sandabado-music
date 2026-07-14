"use client"

import { useState, type FormEvent } from "react"
import { Mail } from "lucide-react"

type Status = "idle" | "sending" | "success" | "error"

const fieldClass = "mt-2 w-full rounded-lg border border-white/15 bg-[var(--obsidian)] px-4 py-3 text-[var(--cream)] outline-none transition focus:border-[var(--violet)]"

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setMessage("")
    const form = event.currentTarget
    try {
      const response = await fetch("/api/booking-submission", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(Object.fromEntries(new FormData(form))) })
      const body = await response.json() as { error?:string }
      if (!response.ok) throw new Error(body.error || "Booking request could not be sent.")
      form.reset()
      setStatus("success")
      setMessage("Thank you. ODIN Management will be in touch within 48 business hours.")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Booking request could not be sent.")
    }
  }

  return <form onSubmit={submit} className="space-y-6">
    <fieldset className="rounded-xl border border-[var(--violet)]/25 bg-black/20 p-5 sm:p-6"><legend className="px-2 text-xs font-semibold uppercase tracking-[.18em] text-[var(--gold)]">Venue / promoter information</legend><div className="grid gap-4 md:grid-cols-2"><Field label="Promoter / venue name" name="venue_name" required/><Field label="Contact person" name="contact_name" required/><Field label="Email" name="contact_email" type="email" required/><Field label="Phone" name="contact_phone" type="tel"/><Field label="Venue website or social" name="venue_url" type="url"/><label className="block text-sm text-[var(--cream)]/75">Capacity<select name="capacity" defaultValue="" className={fieldClass}><option value="">Select…</option><option value="50-100">50–100</option><option value="100-250">100–250</option><option value="250-500">250–500</option><option value="500-1000">500–1,000</option><option value="1000+">1,000+</option></select></label></div></fieldset>
    <fieldset className="rounded-xl border border-[var(--violet)]/25 bg-black/20 p-5 sm:p-6"><legend className="px-2 text-xs font-semibold uppercase tracking-[.18em] text-[var(--gold)]">Event details</legend><div className="grid gap-4 md:grid-cols-2"><Field label="Preferred date" name="preferred_date" type="date" required/><label className="block text-sm text-[var(--cream)]/75">Event type<select name="event_type" required defaultValue="" className={fieldClass}><option value="" disabled>Select…</option><option value="Headline show">Headline show</option><option value="Festival">Festival slot</option><option value="Private event">Private event</option><option value="Benefit concert">Benefit concert</option><option value="Other">Other</option></select></label><Field label="City / state" name="location" required/><Field label="Guarantee / budget" name="budget" placeholder="$10,000–$15,000"/></div><label className="mt-4 block text-sm text-[var(--cream)]/75">Additional notes<textarea name="notes" rows={5} maxLength={5000} placeholder="Expected draw, marketing support, lodging, production requirements…" className={fieldClass}/></label></fieldset>
    <fieldset className="rounded-xl border border-[var(--violet)]/25 bg-black/20 p-5 sm:p-6"><legend className="px-2 text-xs font-semibold uppercase tracking-[.18em] text-[var(--gold)]">Confirmation</legend><label className="flex items-start gap-3 text-sm leading-6 text-[var(--cream)]/65"><input type="checkbox" name="terms" required className="mt-1 h-4 w-4 accent-[var(--violet)]"/><span>I confirm that I am authorized to book on behalf of this venue or promoter and understand that fees are subject to availability and contract negotiation.</span></label></fieldset>
    <div className="text-center"><button disabled={status === "sending"} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--gold)] px-7 py-3 text-xs font-semibold uppercase tracking-[.14em] text-[var(--obsidian)] transition hover:bg-[#e4c450] disabled:cursor-wait disabled:opacity-60"><Mail size={16}/>{status === "sending" ? "Sending request…" : "Submit booking request"}</button><p role="status" className={`mx-auto mt-4 max-w-lg text-sm ${status === "error" ? "text-red-300" : "text-[var(--cream)]/65"}`}>{message}</p><p className="mt-3 text-xs text-[var(--cream)]/45">Questions? <a href="mailto:booking@sandabado.com" className="text-[var(--gold)] hover:underline">booking@sandabado.com</a></p></div>
  </form>
}

function Field({ label, name, type = "text", required = false, placeholder }: { label:string; name:string; type?:string; required?:boolean; placeholder?:string }) { return <label className="block text-sm text-[var(--cream)]/75">{label}{required ? " *" : ""}<input name={name} type={type} required={required} maxLength={type === "url" ? 500 : 150} placeholder={placeholder} className={fieldClass}/></label> }
