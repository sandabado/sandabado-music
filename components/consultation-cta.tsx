import Link from "next/link"

const bookingUrl = "https://wholebody.earth/book"

const levelTwo = ["Sun sign deep dive", "Business architecture", "Legacy planning", "Legal & systems"]

export function ConsultationCTA() {
  return <section className="relative isolate overflow-hidden border-t border-[var(--mercury)] bg-[var(--carbon)] px-6 py-16 sm:py-20">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--halo)]/55 to-transparent"/>
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.3em] text-[var(--halo-dim)] sm:text-xs">The Whole Body Architect</p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--bone)] sm:text-4xl">Discover your Whole Body</h2>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--ghost)]">Jesse synthesizes your birth chart, business architecture, and legacy design into one actionable plan.</p>

      <div className="mx-auto mt-10 max-w-md">
        <article className="hud-frame relative flex flex-col overflow-hidden border-2 border-[var(--halo)] bg-[var(--steel)] p-6 text-left shadow-[0_0_38px_rgba(201,162,39,.2),inset_0_0_32px_rgba(201,162,39,.06)]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--halo)]/10 via-transparent to-[var(--plasma)]/5"/>
          <div className="relative flex items-start justify-between gap-4"><div><p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[.18em] text-[var(--halo)]">Sovereign Architect</p><h3 className="glow-halo mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--halo)]">Consultation with Jesse</h3></div><span className="font-[family-name:var(--font-mono)] text-lg text-[var(--halo)]">$333</span></div>
          <p className="relative mt-3 border-b border-[var(--halo)]/30 pb-4 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">90 minutes</p>
          <ul className="relative my-6 flex-1 space-y-3">{levelTwo.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-[var(--bone)]"><span className="mt-0.5 text-[var(--halo)]">★</span><span>{item}</span></li>)}</ul>
          <Link href={bookingUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full bg-[var(--halo)] px-4 py-3 text-center font-[family-name:var(--font-display)] text-lg text-[var(--void)] transition hover:bg-[#e4c45c]">Book with Jesse</Link>
        </article>
      </div>

      <div className="my-8 flex items-center gap-4"><div className="h-px flex-1 bg-[var(--mercury)]"/><span className="text-2xl text-[var(--halo)]">⊙</span><div className="h-px flex-1 bg-[var(--mercury)]"/></div>
      <p className="text-sm text-[var(--ghost)]">Not ready for a consultation?</p><Link href="/reading" className="mt-3 inline-block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.12em] text-[var(--halo)] transition hover:text-[var(--bone)]">Get Your Free Whole Body Design Reading →</Link>
    </div>
  </section>
}

export default ConsultationCTA
