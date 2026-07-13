import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"
import { PillarExplore } from "@/components/pillar-explore"
import { PillarSpecificCTA } from "@/components/pillar-specific-cta"

const fire = "#C2542D"

const programs = [
  { title: "🜂 Whole Body Retreats", copy: "In-person containers for reset, initiation, and return. Presence work with the whole body in the room.", details: "Seasonal · In-person" },
  { title: "🜂 Weekly Whole Body Circle", copy: "Weekly virtual gathering. Free. No commitment. The open door into the Presence pillar.", details: "Weekly · 60 min · Virtual" },
  { title: "🔺 Whole Body Men", copy: "Closed container for men. Committed members. Weekly deep work.", details: "Weekly · 90 min · Virtual", investment: "Investment: $97/mo (Framer tier) or TBD" },
  { title: "🌹 Whole Body Women", copy: "Closed container for women. Committed members. Weekly deep work.", details: "Weekly · 90 min · Virtual", investment: "Investment: $97/mo (Framer tier) or TBD" },
]

const steps = [
  { number: "01", title: "Take the Reading", copy: "Discover your House. Learn whether Fire is your primary element. If it is, Presence is your pillar." },
  { number: "02", title: "Join the Hearthfire", copy: "Start with the weekly Whole Body Circle. Free. No commitment. Experience the container before you commit." },
  { number: "03", title: "Commit to a Circle", copy: "When you’re ready, register for a closed circle. Weekly. Same people. Real work. Real growth." },
  { number: "04", title: "Show Up", copy: "That’s it. Presence is the practice. Not a curriculum. Not a framework. Just showing up." },
]

export default function PresencePage() {
  return <InternalPage solid="tetrahedron" color="194,84,45" lighterBackdrop>
    <header className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-b border-[var(--mercury)] px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[var(--void)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl [text-shadow:0_2px_24px_rgba(0,0,0,.94)]">
        <span className="text-6xl" style={{ color: fire }}>🜂</span>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-semibold sm:text-7xl" style={{ color: fire }}>Whole Body Presence</h1>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ghost)]">The shape of ignition.</p>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.2em] text-[var(--ghost)]">Physical · Fire · Tetrahedron · 4 faces</p>
        <span className="mt-5 inline-flex items-center border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.18em]" style={{ borderColor: `${fire}80`, color: fire, backgroundColor: `${fire}1A` }}>Status · Active</span>
      </div>
    </header>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mx-auto max-w-3xl text-xl leading-9 text-[var(--bone)]/85">Fire is the circle that holds you. The tetrahedron is the simplest solid — four faces, four vertices, six edges. It is the spark. Everything begins here. The physical body needs the circle.</p>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--ghost)]">You were told to go alone. To bootstrap. To grind. That was the extraction. Fire is what happens when people stop performing and start telling the truth. Presence is the pillar of belonging.</p>
      </div>
    </section>

    <PillarExplore pillar="presence" />

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>The Pillar</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2">{programs.map((program) => <InternalPanel key={program.title} className="border-[var(--mercury)] bg-[var(--steel)]"><p className="font-[family-name:var(--font-mono)] text-xs" style={{ color: fire }}>{program.title}</p><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{program.copy}</p><p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">{program.details}</p>{program.investment ? <p className="mt-2 font-[family-name:var(--font-mono)] text-xs" style={{ color: fire }}>{program.investment}</p> : null}</InternalPanel>)}</div>
      </div>
    </section>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>Upcoming Gatherings</SectionLabel>
        <div className="space-y-6">
          <Gathering eyebrow="The Hearthfire Session" title="Weekly Whole Body Circle · Free" details="Weekly · 60 minutes · Virtual" copy="The open door. Show up. Breathe. Listen. No agenda. No hierarchy. Just presence. This is where everyone starts." href="/events" action="View Schedule →" />
          <Gathering eyebrow="Circle in the Stone" title="Monthly In-Person · Location Rotates" copy="In-person deep work. Closed container after week one. Physical presence changes everything. The body remembers what the screen forgets." href="/apply" action="Apply →" outline />
          <Gathering eyebrow="Rite of Passage" title="Seasonal · In-Person · Invitation Only" details="Coming Autumn 2027" copy="Marked transitions. Birth, death, initiation, completion. The old ceremonies, remembered. Not performed — inhabited." comingSoon />
        </div>
      </div>
    </section>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>How It Works</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{steps.map((step) => <InternalPanel key={step.number} className="border-[var(--mercury)] bg-[var(--steel)] text-center"><p className="font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">Step {step.number}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-lg" style={{ color: fire }}>{step.title}</h2><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{step.copy}</p></InternalPanel>)}</div>
      </div>
    </section>

    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>The Shape of Ignition</SectionLabel>
        <div className="mx-auto max-w-3xl space-y-6 leading-8 text-[var(--ghost)]">
          <p className="text-[var(--bone)]/85">The tetrahedron has four faces. In the Whole Body system, fire represents the moment of ignition — when intention becomes action, when isolation becomes circle, when performance becomes presence.</p>
          <p>Fire is not ambition. Fire is warmth. The kind that happens when human beings sit together and stop pretending. The tetrahedron is structurally complete — it needs nothing added. Four points define the minimum stable form in three dimensions. So does a circle. Four people, honest, present, accountable. That is the tetrahedron.</p>
          <p>You cannot endure alone. The Old World sold you independence as freedom. It was isolation dressed as strength. Presence is the return to the circle. Not a group. Not an audience. A circle — where everyone can be seen and no one sits at the head.</p>
        </div>
      </div>
    </section>
    <PillarSpecificCTA pillar="presence" />
  </InternalPage>
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">{children}</p>
}

function Gathering({ eyebrow, title, details, copy, href, action, outline = false, comingSoon = false }: { eyebrow: string; title: string; details?: string; copy: string; href?: string; action?: string; outline?: boolean; comingSoon?: boolean }) {
  return <InternalPanel className={`border-[var(--mercury)] ${comingSoon ? "bg-[var(--carbon)] opacity-80" : "bg-[var(--steel)]"}`}><div className="flex flex-col items-start justify-between gap-4 md:flex-row"><div className="flex-1"><p className="font-[family-name:var(--font-mono)] text-xs" style={{ color: fire }}>{eyebrow}</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">{title}</h2>{details ? <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">{details}</p> : null}<p className="mt-3 text-sm italic leading-6 text-[var(--ghost)]">“{copy}”</p></div>{comingSoon ? <span className="shrink-0 border border-[var(--mercury)] px-4 py-2 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">Coming Soon</span> : href && action ? <Link href={href} className={`shrink-0 px-6 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider transition ${outline ? "border hover:bg-white/5" : "text-[var(--void)] hover:brightness-110"}`} style={outline ? { borderColor: fire, color: fire } : { backgroundColor: fire }}>{action}</Link> : null}</div></InternalPanel>
}
