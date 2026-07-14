"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href:"/", label:"Home" },
  { href:"/music", label:"Music" },
  { href:"/video", label:"Video" },
  { href:"/tour", label:"Tour" },
  { href:"/store", label:"Store" },
  { href:"/contact", label:"Contact" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12)
    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive:true })
    return () => window.removeEventListener("scroll", updateScrollState)
  }, [])

  return <header className={`desert-signal-nav fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "desert-signal-nav--active border-[var(--gold)]/20 bg-[#0a0a0f]/70 shadow-lg shadow-black/10 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
      <Link href="/" className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[.08em] text-white transition hover:text-[var(--gold)]">SANDĀBĀDO</Link>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} className={`desert-signal-link text-xs uppercase tracking-[.18em] transition ${pathname === link.href ? "is-active text-[var(--gold)]" : "text-white/75 hover:text-[var(--gold)]"}`}>{link.label}</Link>)}</nav>
      <Link href="/tour" className="hidden border border-[var(--gold)]/65 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.15em] text-white transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)] md:block">Tickets</Link>
      <button type="button" className="flex h-11 w-11 items-center justify-center text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open ? <nav className="border-t border-white/10 bg-[#0a0a0f]/95 px-5 py-3 backdrop-blur-md md:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className={`desert-signal-link block min-h-11 py-3 text-xs uppercase tracking-[.17em] transition ${pathname === link.href ? "is-active text-[var(--gold)]" : "text-white/80 hover:text-[var(--gold)]"}`}>{link.label}</Link>)}</nav> : null}
  </header>
}
