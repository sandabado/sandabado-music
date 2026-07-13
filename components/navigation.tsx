"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { CartModal } from "@/components/store/cart-modal"

const links = [{ href:"/music", label:"Music" }, { href:"/video", label:"Video" }, { href:"/tour", label:"Tour" }, { href:"/store", label:"Store" }, { href:"/contact", label:"Contact" }]

export function Navigation() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--gold)]/25 bg-[var(--obsidian)]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
      <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-[.08em] text-[var(--gold)]">SANDĀBĀDO</Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} className="sand-link text-xs uppercase tracking-[.19em] text-[var(--cream)]/70">{link.label}</Link>)}</nav>
      <div className="hidden items-center gap-5 md:flex"><CartModal /><Link href="/tour" className="border border-[var(--violet)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--cream)] transition hover:bg-[var(--violet)]">Tickets</Link></div>
      <button className="text-[var(--cream)] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open ? <nav className="border-t border-white/10 bg-[var(--obsidian)] px-5 py-4 md:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className="block py-3 text-xs uppercase tracking-[.17em] text-[var(--cream)]/80">{link.label}</Link>)}<div className="pt-4"><CartModal /></div></nav> : null}
  </header>
}
