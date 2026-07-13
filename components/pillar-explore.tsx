import { InternalPanel } from "@/components/internal-page"
import type { PillarId } from "@/lib/constants"

type ExploreItem = { icon: string; title: string; copy: string; action: string }

const explore: Record<PillarId, { color: string; items: ExploreItem[] }> = {
  presence: {
    color: "#C2542D",
    items: [
      { icon: "🜂", title: "Circles", copy: "Weekly containers for honesty, grounding, and real presence.", action: "Explore Circles" },
      { icon: "△", title: "Retreats", copy: "In-person resets, initiations, and returns to the body.", action: "Explore Retreats" },
      { icon: "◉", title: "Bodywork", copy: "Somatic practice, voice activation, and grounding protocols.", action: "Explore Bodywork" },
    ],
  },
  press: {
    color: "#D4AF37",
    items: [
      { icon: "📚", title: "The Series", copy: "Five field manuals for inhabiting a whole system.", action: "Explore the Series" },
      { icon: "🔒", title: "Digital Library", copy: "A secure reader for the work you choose to keep.", action: "Explore the Library" },
      { icon: "🎙️", title: "Author Platform", copy: "A publishing home for work that serves the Living Earth.", action: "Explore Publishing" },
    ],
  },
  studios: {
    color: "#2BA8A0",
    items: [
      { icon: "📀", title: "Records", copy: "Albums, singles, and compilations owned by the artist.", action: "Enter Records" },
      { icon: "🎬", title: "Films", copy: "Documentary, narrative, and experimental visual signal.", action: "Enter Films" },
      { icon: "◈", title: "Production", copy: "A distributed studio network built around the artist.", action: "Explore Production" },
    ],
  },
  foundation: {
    color: "#4A6741",
    items: [
      { icon: "▣", title: "Systems", copy: "Practical structures that turn intention into durable work.", action: "Explore Systems" },
      { icon: "⌘", title: "Resources", copy: "Templates and tools for building a sovereign foundation.", action: "Explore Resources" },
      { icon: "⟐", title: "Legacy", copy: "Architecture for work that can outlast its first season.", action: "Explore Legacy" },
    ],
  },
  guardian: {
    color: "#C9A227",
    items: [
      { icon: "☉", title: "The Guild", copy: "A network for people called to hold the whole pattern.", action: "Explore the Guild" },
      { icon: "◌", title: "Facilitation", copy: "Practice for leading rooms with clarity, care, and coherence.", action: "Explore Facilitation" },
      { icon: "∞", title: "Living Spiral", copy: "Synthesis work for the next turn of the whole system.", action: "Explore the Spiral" },
    ],
  },
}

export function PillarExplore({ pillar }: { pillar: PillarId }) {
  const { color, items } = explore[pillar]
  return <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
    <div className="mx-auto max-w-5xl">
      <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">Explore {pillar}</p>
      <div className="grid gap-6 md:grid-cols-3">{items.map((item) => <InternalPanel key={item.title} className="h-full border-[var(--mercury)] bg-[var(--steel)]"><span className="block text-4xl" style={{ color }}>{item.icon}</span><h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[var(--bone)]">{item.title}</h2><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{item.copy}</p><span className="mt-6 block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.12em]" style={{ color }}>{item.action} →</span></InternalPanel>)}</div>
    </div>
  </section>
}
