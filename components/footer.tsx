import Link from "next/link"
import { FOOTER_PILLARS } from "@/lib/constants"

export function Footer() {
  return <footer className="relative z-20 border-t border-[var(--mercury)] bg-[var(--carbon)] px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--halo)] glow-halo">☉ wholebody.earth</Link>
          <p className="mt-4 text-sm leading-6 text-[var(--ghost)]">A network for sovereign creators.</p>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">We build with geometry.</p>
        </div>

        <FooterColumn title="The Pillars">
          {FOOTER_PILLARS.map((pillar) => <Link key={pillar.href} href={pillar.href} className="text-sm text-[var(--ghost)] transition hover:text-[var(--bone)]"><span className="mr-2">{pillar.icon}</span>{pillar.label}</Link>)}
        </FooterColumn>

        <FooterColumn title="The Constellation">
          <Link href="/store" className={linkClass}>Store</Link>
          <Link href="/events" className={linkClass}>Events</Link>
          <Link href="/reading" className={linkClass}>Get Your Reading</Link>
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/login" className={linkClass}>Login</Link>
        </FooterColumn>

        <FooterColumn title="Connect">
          <a href="https://instagram.com/wholebody.earth" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a>
          <a href="https://youtube.com/@wholebody.earth" target="_blank" rel="noopener noreferrer" className={linkClass}>YouTube</a>
          <a href="mailto:hello@wholebody.earth" className={linkClass}>Email</a>
        </FooterColumn>
      </div>

      <div className="border-t border-[var(--mercury)] pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)] md:text-left">© 2026 Whole Body Mastery LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-center"><Link href="/legal/privacy" className={legalLinkClass}>Privacy</Link><Link href="/legal/terms" className={legalLinkClass}>Terms</Link><span className="font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)]">This site does not track you. We do not sell your data. We protect it.</span></div>
          <p className="hidden text-center font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)] md:block md:text-right">So It Is Built. So It Holds. So It Is. 🍀</p>
        </div>
      </div>
    </div>
  </footer>
}

const linkClass = "text-sm text-[var(--ghost)] transition hover:text-[var(--bone)]"
const legalLinkClass = "font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)] transition hover:text-[var(--bone)]"

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[.2em] uppercase text-[var(--halo-dim)]">{title}</h2><div className="mt-4 flex flex-col gap-3">{children}</div></section>
}
