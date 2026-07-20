import Image from "next/image"
import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"
import { StudioVideoShowcase } from "@/components/studios/video-showcase"

type ReleaseStatus = "available" | "production"

const releases = [
  { title: "∞ Love", artist: "Sandabado", year: "2026", type: "Debut Album", tracks: 13, genre: "Soul Blues / Desert Rock", status: "available" as const, description: "The debut album. Thirteen tracks of soul blues and desert rock, recorded in Morongo Valley.", icon: "🜄", color: "#D4AF37", cover: "/images/releases/sandabado-infinity-love.png" },
  { title: "Whole Body Desert Vol. 1", artist: "Various Artists", year: "2026", type: "Compilation", tracks: 12, genre: "Compilation / Multi-genre", status: "production" as const, description: "Twelve tracks. Twelve artists. Each tuned to a frequency of the Living Earth.", icon: "🜄", color: "#2BA8A0" },
]

export default function RecordsPage() {
  return <InternalPage solid="icosahedron" color="43,168,160" lighterBackdrop>
    <section className="px-6 py-16 text-center sm:py-20">
      <Link href="/pillars/studios" className="inline-block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.12em] text-[var(--ghost)] transition hover:text-[#2BA8A0]">← Back to Studios</Link>
      <span className="mt-8 block text-4xl">📀</span>
      <p className="mt-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.3em] text-[var(--halo-dim)]">Whole Body Records</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--bone)]">Records</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--ghost)]">Every release is owned by the artist. We engineer the river. We do not dam it. Streaming, vinyl, and direct-to-disc. The signal becomes physical.</p>
    </section>

    <StudioVideoShowcase eyebrow="Whole Body Records Broadcast" liveVideo={{ title: "Hearthfire Sessions", detail: "Live from the Whole Body studio", label: "Live broadcast" }} videos={[{ title: "∞ Love Listening Room", detail: "Sandabado · album session", label: "Featured" }, { title: "At the Lathe", detail: "Sandabado · vinyl pressing", label: "Studio log" }, { title: "Memory: In the Booth", detail: "Sarah Veya · tracking session", label: "In production" }]} />

    <section className="px-6 pb-12">
      <div className="mx-auto max-w-4xl"><InternalPanel className="border-[var(--mercury)] bg-[var(--steel)]"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-[family-name:var(--font-mono)] text-xs text-[#2BA8A0]">NOW IN PRODUCTION</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">Sarah Veya — Memory EP</h2><p className="mt-2 text-sm text-[var(--ghost)]">Currently tracking in the booth. Five tracks. Due Spring 2026.</p></div><span className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[#00FFC2]"><span className="size-2 animate-pulse bg-[#00FFC2]" />LIVE</span></div></InternalPanel></div>
    </section>

    <section className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl"><p className="mb-8 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">Catalog</p><div className="space-y-8">{releases.map((release) => <InternalPanel key={release.title} className="border-[var(--mercury)] bg-[var(--steel)] p-8"><div className="flex flex-col gap-8 md:flex-row"><ReleaseCover release={release} /><div className="flex-1"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--bone)]">{release.artist}</h2><p className="mt-1 font-[family-name:var(--font-display)] text-2xl" style={{ color: release.color }}>{release.title}</p><p className="mt-1 font-[family-name:var(--font-mono)] text-sm text-[var(--ghost)]">{release.year}</p></div><StatusBadge status={release.status} /></div><p className="mt-5 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">{release.type} · {release.tracks} tracks · {release.genre}</p><p className="mt-3 leading-7 text-[var(--ghost)]">{release.description}</p><p className="mt-5 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">Pillar: <span style={{ color: release.color }}>{release.icon} Studios</span></p>{release.status === "available" ? <div className="mt-6 flex flex-wrap gap-3"><Link href="/store" className="bg-[var(--halo)] px-6 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.1em] text-[var(--void)] transition hover:bg-[#e3c257]">Stream →</Link><Link href="/store" className="border border-[var(--mercury)] px-6 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.1em] text-[var(--ghost)] transition hover:border-[var(--bone)] hover:text-[var(--bone)]">Vinyl</Link><Link href="/store" className="border border-[var(--mercury)] px-6 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.1em] text-[var(--ghost)] transition hover:border-[var(--bone)] hover:text-[var(--bone)]">Buy</Link></div> : <span className="mt-6 inline-block border border-[#C9A227]/50 px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.1em] text-[#C9A227]">In Production</span>}</div></div></InternalPanel>)}</div></div>
    </section>

    <section className="border-y border-[var(--mercury)] px-6 py-16 text-center sm:py-20"><div className="mx-auto max-w-3xl"><p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">Our Commitment</p><p className="mt-6 text-lg leading-8 text-[var(--bone)]">Artists retain 100% of their masters, publishing, and IP. The artist eats first. Always.</p><p className="mt-4 leading-7 text-[var(--ghost)]">We earn on production, distribution, and placement — never on ownership. The emotional body remembers what the song makes possible.</p></div></section>
    <section className="px-6 py-12 text-center"><Link href="/pillars/studios" className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.12em] text-[var(--ghost)] transition hover:text-[#2BA8A0]">← Back to Studios</Link></section>
  </InternalPage>
}

function ReleaseCover({ release }: { release: (typeof releases)[number] }) {
  return <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden border border-[var(--mercury)] bg-[radial-gradient(circle_at_center,var(--release-color)_0%,var(--carbon)_70%)] md:w-64" style={{ "--release-color": `${release.color}32` } as React.CSSProperties}>{release.cover ? <Image src={release.cover} alt={`${release.artist} — ${release.title} album cover`} fill sizes="(max-width: 768px) 100vw, 16rem" className="object-cover" /> : <div className="relative text-center"><span className="font-[family-name:var(--font-display)] text-7xl" style={{ color: release.color }}>◈</span><p className="mt-3 max-w-40 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.14em] text-[var(--bone)]/70">{release.title}</p></div>}</div>
}

function StatusBadge({ status }: { status: ReleaseStatus }) {
  const style = status === "available" ? { backgroundColor: "rgb(0 255 194 / 15%)", color: "#00FFC2", label: "Available" } : { backgroundColor: "rgb(201 162 39 / 15%)", color: "#C9A227", label: "In Production" }
  return <span className="px-3 py-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.08em]" style={{ backgroundColor: style.backgroundColor, color: style.color }}>{style.label}</span>
}
