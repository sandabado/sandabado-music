import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Mail } from "lucide-react"
import { BookingForm } from "@/components/sandabado/booking-form"

export const metadata: Metadata = { title:"Booking — Sandābādo", description:"Professional booking inquiries for Sandābādo. Managed by ODIN Management and represented by Whole Body Records." }

export default function BookingPage() {
  return <div className="star-field min-h-screen">
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <header className="max-w-2xl">
        <p className="text-[10px] uppercase tracking-[.28em] text-[var(--gold)]">ODIN Management · Whole Body Records</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl tracking-[.04em] sm:text-6xl">Book Sandābādo</h1>
        <p className="mt-5 text-base leading-7 text-[var(--cream)]/70">For shows, festivals, and private events, send the details below. We&apos;ll reply with availability and a proposal.</p>
      </header>

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-[var(--gold)]/20 py-5 text-sm text-[var(--cream)]/65">
        <a href="mailto:booking@sandabado.com" className="inline-flex items-center gap-2 text-[var(--gold)] hover:underline"><Mail size={15}/>booking@sandabado.com</a>
        <Link href="/press" className="inline-flex items-center gap-2 hover:text-[var(--gold)] hover:underline"><FileText size={15}/>View press kit</Link>
        <a href="mailto:booking@sandabado.com?subject=Technical%20rider%20request" className="hover:text-[var(--gold)] hover:underline">Request technical rider</a>
      </div>

      <section id="booking-form" className="mt-14">
        <h2 className="font-[family-name:var(--font-display)] text-3xl">Your event</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--cream)]/60">The more context you can share, the faster we can get back to you.</p>
        <div className="mt-8"><BookingForm /></div>
      </section>

      <div className="mt-14 border-t border-[var(--gold)]/20 pt-8 text-center">
        <p className="text-sm text-[var(--cream)]/60">Need photos, bios, stage details, or licensing information?</p>
        <Link href="/press" className="mt-4 inline-flex items-center gap-2 border border-[var(--gold)]/55 px-5 py-3 text-xs font-semibold uppercase tracking-[.14em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"><FileText size={15}/>View full press kit</Link>
      </div>
    </section>
  </div>
}
