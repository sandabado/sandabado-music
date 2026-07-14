import Link from "next/link"

export function Footer() {
  return <footer className="border-t border-[var(--gold)]/20 bg-[#07070b] px-6 py-12 text-[var(--cream)]">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
      <div><Link href="/" className="font-[family-name:var(--font-display)] text-2xl tracking-[.1em] text-[var(--gold)]">SANDĀBĀDO</Link><p className="mt-3 max-w-sm text-sm leading-6 text-[var(--cream)]/60">∞ LOVE — soul blues and desert rock from the sacred wild.</p></div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[.14em] text-[var(--cream)]/65"><a href="https://instagram.com" target="_blank" rel="noreferrer" className="sand-link">Instagram</a><a href="https://youtube.com" target="_blank" rel="noreferrer" className="sand-link">YouTube</a><a href="https://bandcamp.com" target="_blank" rel="noreferrer" className="sand-link">Bandcamp</a><Link href="/booking" className="sand-link">Booking</Link></div>
    </div><p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.13em] text-[var(--cream)]/35">© 2026 Whole Body Records (ASCAP) · No AI used in the music.</p>
  </footer>
}
