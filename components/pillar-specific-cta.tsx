import Link from "next/link"
import type { PillarId } from "@/lib/constants"

type Cta = {
  title: string
  copy: string
  primary: { href: string; label: string; external?: boolean }
  secondary: { href: string; label: string }
  note: string
  color: string
}

const ctas: Record<PillarId, Cta> = {
  presence: {
    title: "Embodiment & Bodywork",
    copy: "Your physical vessel is the instrument. Presence work restores the body as the foundation for all other practice. Somatic sessions, voice activation, and grounding protocols.",
    primary: { href: "https://wholebody.earth/bodywork", label: "Book Presence Session →", external: true },
    secondary: { href: "/pillars/presence/membership", label: "Join Presence Circle" },
    note: "Limited availability. Sessions fill 14 days in advance.",
    color: "#C2542D",
  },
  press: {
    title: "Submit Your Manuscript",
    copy: "Whole Body Press publishes aligned authors. If your work serves the Living Earth, we want to read it. 50/50 royalty split. You retain 100% IP.",
    primary: { href: "mailto:press@wholebody.earth", label: "Submit Manuscript →", external: true },
    secondary: { href: "/store", label: "View Codex" },
    note: "We review every submission within 14 days.",
    color: "#D4AF37",
  },
  studios: {
    title: "Submit Your Work",
    copy: "Music, film, visual art, or hybrid forms. We review every submission personally. Artists retain 100% masters, publishing, and IP. The artist eats first. Always.",
    primary: { href: "mailto:studios@wholebody.earth", label: "Submit Your Work →", external: true },
    secondary: { href: "/pillars/studios#roster", label: "Meet the Roster" },
    note: "Submissions open now. We respond within 14 days.",
    color: "#2BA8A0",
  },
  foundation: {
    title: "Systems & Legacy Planning",
    copy: "Build structures that last. Foundation work includes entity formation, ritual architecture, and long-term systems design. If you’re creating something that must outlast you, start here.",
    primary: { href: "https://wholebody.earth/foundation", label: "Book Foundation Consult →", external: true },
    secondary: { href: "/pillars/foundation/resources", label: "Access Templates" },
    note: "Consultations available for sovereign projects and living earth initiatives.",
    color: "#4A6741",
  },
  guardian: {
    title: "Join The Guild",
    copy: "The Guardian is the center axis. Invite-only network for those who hold the whole pattern. Facilitator training, synthesis practice, and placement in the Living Spiral.",
    primary: { href: "/apply", label: "Apply to Guild →" },
    secondary: { href: "/membership", label: "Become a Member" },
    note: "Applications reviewed monthly. Capacity limited.",
    color: "#C9A227",
  },
}

export function PillarSpecificCTA({ pillar }: { pillar: PillarId }) {
  const cta = ctas[pillar]
  const primaryClass = "inline-flex px-8 py-4 font-[family-name:var(--font-display)] text-lg text-[var(--void)] transition hover:brightness-110"
  const secondaryClass = "inline-flex border px-8 py-4 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider transition hover:bg-white/5"

  return <section className="border-t border-[var(--mercury)] px-6 py-16 text-center sm:py-20">
    <div className="mx-auto max-w-2xl">
      <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--bone)]">{cta.title}</h2>
      <p className="mt-4 leading-7 text-[var(--ghost)]">{cta.copy}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {cta.primary.external ? <a href={cta.primary.href} target="_blank" rel="noopener noreferrer" className={primaryClass} style={{ backgroundColor: cta.color }}>{cta.primary.label}</a> : <Link href={cta.primary.href} className={primaryClass} style={{ backgroundColor: cta.color }}>{cta.primary.label}</Link>}
        <Link href={cta.secondary.href} className={secondaryClass} style={{ color: cta.color, borderColor: cta.color }}>{cta.secondary.label}</Link>
      </div>
      <p className="mt-8 font-[family-name:var(--font-mono)] text-xs" style={{ color: cta.color }}>{cta.note}</p>
    </div>
  </section>
}
