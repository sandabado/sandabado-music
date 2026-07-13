"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NAV_LINKS, PILLARS } from "@/lib/constants"
import { CartModal } from "@/components/store/cart-modal"

export function Navigation() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--halo)]/20 bg-[var(--void)]/92 backdrop-blur-xl">
    <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7">
      <Link href="/" className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--halo)] glow-halo">☉ wholebody.earth</Link>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex" aria-label="Primary navigation">{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className="font-[family-name:var(--font-mono)] text-[11px] tracking-[.14em] uppercase text-[var(--ghost)] transition hover:text-[var(--halo)]">{link.label}</Link>)}</nav>
      <div className="hidden items-center gap-4 md:flex"><CartModal/><Link href="/login" className="border border-[var(--halo)]/60 px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[.12em] uppercase text-[var(--halo)] transition hover:bg-[var(--halo)] hover:text-[var(--void)]">Member access</Link><Link href="/reading" className="bg-[#FF6FAE] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[.12em] uppercase text-[var(--void)] shadow-[0_0_16px_rgba(255,111,174,.35)] transition hover:bg-[#FDA4D4]">Get Reading</Link></div>
      <button className="text-[var(--bone)] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    <nav className="border-t border-[var(--mercury)] bg-[var(--carbon)]" aria-label="Pillars"><div className="grid w-full grid-cols-5">{PILLARS.map((pillar,index) => <Link key={pillar.id} href={`/pillars/${pillar.id}`} className={`flex min-w-0 items-center justify-center gap-1 border-r border-[var(--mercury)]/70 px-1 py-2 font-[family-name:var(--font-mono)] uppercase text-[var(--ghost)] transition hover:bg-white/[.025] hover:text-[var(--bone)] sm:gap-2 sm:px-4 ${index === 0 ? "border-l" : ""}`}><span style={{ color: pillar.color }} className="text-xs sm:text-sm">{pillar.symbol}</span><span className="min-w-0 text-center"><span className="block truncate text-[9px] tracking-[.06em] sm:text-xs sm:tracking-[.12em]">{pillar.name}</span><span className="mt-0.5 block truncate text-[6px] tracking-[.02em] text-[var(--ghost)]/60 sm:text-[8px] sm:tracking-[.08em]">{pillar.body} • {pillar.element}</span></span></Link>)}</div></nav>
    {open ? <div className="border-t border-[var(--mercury)] bg-[var(--carbon)] px-5 py-4 md:hidden">{[...NAV_LINKS, { href: "/login", label: "Member access" }].map((link) => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className="block py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--ghost)]">{link.label}</Link>)}<Link onClick={() => setOpen(false)} href="/reading" className="mt-2 block bg-[#FF6FAE] px-4 py-3 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--void)] shadow-[0_0_16px_rgba(255,111,174,.35)] transition hover:bg-[#FDA4D4]">Get Reading</Link><div className="pt-3"><CartModal/></div></div> : null}
  </header>
}
