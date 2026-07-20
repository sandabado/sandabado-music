import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

export function HeroPlayerDrawer() {
  return <div className="fixed left-0 top-1/2 z-40 -translate-y-1/2">
    <Link href="/video" className="group flex min-h-16 items-center gap-3 rounded-r-2xl border border-l-0 border-[var(--gold)]/45 bg-[#09090e]/90 px-3 py-2 text-white shadow-lg backdrop-blur-sm transition hover:border-[var(--gold)] hover:pr-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]">
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-[var(--gold)]/45 bg-black/30 shadow-md"><Image src="/images/hero/sandabado-three-trees-hero.jpg" alt="" fill sizes="64px" className="object-cover"/><span className="absolute inset-0 flex items-center justify-center bg-black/45 text-[var(--gold)]"><Play size={21} fill="currentColor"/></span></span>
      <span className="whitespace-nowrap pr-1 text-xs font-semibold uppercase tracking-[.16em]"><span className="block text-[9px] text-[var(--gold)]/80">Now showing</span>Music video</span>
    </Link>
  </div>
}
