"use client"

import { useState, type FormEvent } from "react"

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle"|"sending"|"done"|"error">("idle")
  async function submit(event:FormEvent) { event.preventDefault(); setStatus("sending"); try { const res = await fetch("/api/inner-circle", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ email }) }); if (!res.ok) throw new Error(); setStatus("done"); setEmail("") } catch { setStatus("error") } }
  return <form onSubmit={submit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="circle-email">Email address</label><input required id="circle-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="Your email address" className="min-h-12 flex-1 border border-[var(--cream)]/25 bg-black/35 px-4 text-sm text-[var(--cream)] outline-none placeholder:text-[var(--cream)]/40 focus:border-[var(--gold)]"/><button disabled={status === "sending"} className="min-h-12 bg-[var(--gold)] px-5 text-xs font-semibold uppercase tracking-[.14em] text-[var(--obsidian)] disabled:opacity-60">{status === "sending" ? "Joining…" : "Join the Inner Circle"}</button><p className="basis-full text-center text-xs text-[var(--cream)]/60" role="status">{status === "done" ? "You’re on the list. Welcome in." : status === "error" ? "Couldn’t join just now. Please try again." : ""}</p></form>
}
