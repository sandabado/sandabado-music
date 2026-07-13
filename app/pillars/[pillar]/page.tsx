import { notFound } from "next/navigation"
import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"
import { PillarExplore } from "@/components/pillar-explore"
import { PillarSpecificCTA } from "@/components/pillar-specific-cta"
import { PILLAR_BY_ID, PILLARS, type PillarId } from "@/lib/constants"

const solids = { presence:"tetrahedron", press:"octahedron", studios:"icosahedron", foundation:"cube", guardian:"dodecahedron" } as const
const rgb = { presence:"194,84,45", press:"212,175,55", studios:"43,168,160", foundation:"74,103,65", guardian:"109,74,255" } as const
const statuses = { presence:"Active", press:"Active", studios:"Active", foundation:"Coming 2027", guardian:"Coming 2027" } as const
export function generateStaticParams() { return PILLARS.map((pillar) => ({ pillar:pillar.id })) }

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: id } = await params
  if (!(id in PILLAR_BY_ID)) notFound()
  const pillar = PILLAR_BY_ID[id as PillarId]

  return <InternalPage solid={solids[pillar.id]} color={rgb[pillar.id]} lighterBackdrop>
    <header className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-b border-[var(--mercury)] px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[var(--void)]" />
      <div className="relative z-10 [text-shadow:0_2px_24px_rgba(0,0,0,.94)]">
        <span className="text-6xl" style={{ color: pillar.color }}>{pillar.symbol}</span>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-6xl font-semibold sm:text-7xl" style={{ color: pillar.color }}>Whole Body {pillar.name}</h1>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.2em] text-[var(--ghost)]">{pillar.body} · {pillar.element} · {pillar.solid} · {pillar.solidFaces} faces</p>
        <span className="mt-5 inline-flex items-center border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.18em]" style={{ borderColor: `${pillar.color}80`, color: pillar.color, backgroundColor: `${pillar.color}1A` }}>Status · {statuses[pillar.id]}</span>
      </div>
    </header>

    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mx-auto max-w-3xl text-center text-xl leading-9 text-[var(--bone)]/78">{pillar.description}</p>
        <InternalPanel className="mt-12">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.2em] text-[var(--halo-dim)]">Practice track</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl" style={{ color: pillar.color }}>{pillar.workshopFocus}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{pillar.exercises.map((exercise, index) => <div key={exercise} className="border border-[var(--mercury)] bg-[var(--carbon)]/80 p-4 text-sm"><span className="font-[family-name:var(--font-mono)]" style={{ color: pillar.color }}>{String(index + 1).padStart(2, "0")}</span><span className="ml-2 text-[var(--ghost)]">{exercise}</span></div>)}</div>
        </InternalPanel>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Link href="/reading"><InternalPanel className="h-full transition hover:-translate-y-1"><p className="font-[family-name:var(--font-display)] text-2xl text-[var(--halo)]">Is this your pillar?</p><p className="mt-3 text-sm text-[var(--bone)]/62">Take the weighted Quincunx reading to find out.</p></InternalPanel></Link>
          <Link href="/manuals"><InternalPanel className="h-full transition hover:-translate-y-1"><p className="font-[family-name:var(--font-display)] text-2xl text-[var(--halo)]">Enter the manuals</p><p className="mt-3 text-sm text-[var(--bone)]/62">Move from insight into a repeatable practice.</p></InternalPanel></Link>
        </div>
      </div>
    </section>
    <PillarExplore pillar={pillar.id} />
    <PillarSpecificCTA pillar={pillar.id} />
  </InternalPage>
}
