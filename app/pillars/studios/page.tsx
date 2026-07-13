import Link from "next/link"
import type { CSSProperties } from "react"
import { InternalPage, InternalPanel } from "@/components/internal-page"
import { PillarSpecificCTA } from "@/components/pillar-specific-cta"

const water = "#2BA8A0"

const studioPaths = [
  { href: "/pillars/studios/records", icon: "📀", title: "Records", copy: "Albums, singles, and compilations. Every release is owned by the artist. We engineer the river. We do not dam it.", action: "Enter Records" },
  { href: "/pillars/studios/films", icon: "🎬", title: "Films", copy: "Documentary, narrative, and experimental stories that carry the frequency of truth.", action: "Enter Films" },
]

const artists = [
  { name: "Sandabado", initials: "SA", role: "Producer / Composer", pillar: "Studios", icon: "🜄", color: "#2BA8A0", bio: "The first signing. Debut album streaming now. Vinyl pressing available.", latest: "∞ Love" },
  { name: "Sarah Veya", initials: "SV", role: "Vocalist / Songwriter", pillar: "Studios", icon: "🜄", color: "#2BA8A0", bio: "Currently tracking her debut EP. Voice like water on glass.", latest: "Memory (Single)" },
  { name: "Marcus Reed", initials: "MR", role: "Guitarist / Composer", pillar: "Presence", icon: "🜂", color: "#C2542D", bio: "Scoring The Instrument. Solo work in development.", latest: "Spark (Demo)" },
  { name: "Lila Chen", initials: "LC", role: "Filmmaker / Visual Director", pillar: "Studios", icon: "🜄", color: "#2BA8A0", bio: "Directing the Glory Peak documentary series. Experimental film roots.", latest: "Ground (Short Film)" },
  { name: "The Hearth", initials: "TH", role: "Collective / Sound Healing", pillar: "Guardian", icon: "☉", color: "#C9A227", bio: "Live ceremonial music recorded at Hearthfire Sessions. No playback — only presence.", latest: "Circle (Live Recording)" },
]

export default function StudiosPage() {
  return <InternalPage solid="icosahedron" color="43,168,160" lighterBackdrop>
    <header className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-b border-[var(--mercury)] px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[var(--void)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl [text-shadow:0_2px_24px_rgba(0,0,0,.94)]">
        <span className="text-6xl" style={{ color: water }}>🜄</span>
        <h1 className="mt-5 whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(1.65rem,8.5vw,4.5rem)] font-semibold" style={{ color: water }}>Whole Body Studios</h1>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ghost)]">The shape that remembers.</p>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs tracking-[.2em] uppercase text-[var(--ghost)]">Emotional · Water · Icosahedron · 20 faces</p>
        <span className="mt-5 inline-flex items-center border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.18em]" style={{ borderColor: `${water}80`, color: water, backgroundColor: `${water}1A` }}>Status · Active</span>
      </div>
    </header>

    <section className="px-6 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-5xl space-y-4 text-lg leading-8">
        <p className="mx-auto max-w-3xl text-xl text-[var(--bone)]/85">Music is infrastructure. Film is infrastructure. The song is current, not content. The image is truth, not entertainment.</p>
        <p className="mx-auto max-w-3xl text-[var(--ghost)]">Artists retain 100% of their masters, publishing, and IP. The artist eats first. Always. The emotional body remembers what the song makes possible.</p>
      </div>
    </section>

    <section className="px-6 pb-12 sm:pb-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">Explore Studios</p>
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {studioPaths.map((path) => <Link key={path.href} href={path.href} className="group">
            <InternalPanel className="h-full border-[var(--mercury)] bg-[var(--steel)] transition duration-300 group-hover:-translate-y-1" >
              <span className="block text-4xl">{path.icon}</span>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[var(--bone)] transition-colors group-hover:text-[#2BA8A0]">{path.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{path.copy}</p>
              <span className="mt-6 block font-[family-name:var(--font-mono)] text-xs tracking-[.12em] uppercase" style={{ color: water }}>{path.action} →</span>
            </InternalPanel>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="border-y border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">Now in Production</p>
        <div className="grid gap-6 md:grid-cols-3">
          <ProductionCard label="🎵 In the Booth" title="Sarah Veya" copy='“Memory” — debut EP tracking' />
          <ProductionCard label="🎬 In the Edit Bay" title="The Instrument" copy="Short film · Jesse Gawlik" />
          <ProductionCard label="📀 At the Lathe" title="Sandabado" copy="Debut album — vinyl pressing" />
        </div>
      </div>
    </section>

    <section id="roster" className="scroll-mt-32 border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">The Roster</p>
        <p className="mx-auto mb-12 max-w-2xl text-center leading-7 text-[var(--ghost)]">Not a label. A waterway. Artists who retain everything: production, engineering, distribution, and sync — without surrendering ownership.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{artists.map((artist) => <ArtistCard key={artist.name} artist={artist} />)}<div className="flex min-h-[400px] flex-col items-center justify-center border border-dashed border-[var(--mercury)] bg-[var(--carbon)] p-8 text-center"><span className="text-4xl text-[var(--ghost)]">🜄</span><h2 className="mt-4 font-[family-name:var(--font-display)] text-xl text-[var(--ghost)]">Your Name Here</h2><p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">The next signal</p><p className="mt-4 text-sm leading-6 text-[var(--ghost)]">Submissions are open. If your work carries the frequency, we want to hear it.</p><a href="mailto:studios@wholebody.earth" className="mt-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.1em] text-[#2BA8A0] transition hover:text-[var(--bone)]">Submit Your Work →</a></div></div>
      </div>
    </section>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">The Studio</p>
        <p className="mx-auto mb-8 max-w-2xl text-center leading-7 text-[var(--ghost)]">Whole Body Studios operates as a distributed production network. Tracking in Morongo Valley. Mixing in the cloud. Mastering at the lathe. We do not own a building. We own a frequency. The studio goes where the artist is.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <Facility title="🏜️ Desert Studio" copy="Morongo Valley, CA. Live room, isolated tracking, and natural reverb from rammed earth walls." />
          <Facility title="🎛️ Mix Suite" copy="Cloud-based mixing with Pro Tools HD, Universal Audio, and analog summing on demand." />
          <Facility title="📀 Mastering Lathe" copy="Vinyl cutting and direct-to-disc capability — where the signal becomes physical." />
          <Facility title="🎥 Film Unit" copy="RED Komodo, Ronin, field audio, drone, and portable lighting. The crew goes where the story is." />
        </div>
      </div>
    </section>

    <PillarSpecificCTA pillar="studios" />
  </InternalPage>
}

function ProductionCard({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <InternalPanel className="border-[var(--mercury)] bg-[var(--steel)]"><p className="font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)]">{label}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--bone)]">{title}</h2><p className="mt-1 text-sm text-[var(--ghost)]">{copy}</p></InternalPanel>
}

function Facility({ title, copy }: { title: string; copy: string }) {
  return <InternalPanel className="border-[var(--mercury)] bg-[var(--steel)]"><p className="font-[family-name:var(--font-mono)] text-xs" style={{ color: water }}>{title}</p><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{copy}</p></InternalPanel>
}

function ArtistCard({ artist }: { artist: (typeof artists)[number] }) {
  return <article className="group overflow-hidden border border-[var(--mercury)] bg-[var(--steel)] transition hover:border-current" style={{ color: artist.color }}>
    <div className="relative flex aspect-square items-center justify-center overflow-hidden border-b border-[var(--mercury)] bg-[radial-gradient(circle_at_center,var(--artist-color)_0%,var(--carbon)_68%)]" style={{ "--artist-color": `${artist.color}35` } as CSSProperties}><span className="font-[family-name:var(--font-display)] text-7xl text-[var(--bone)]/25 transition duration-500 group-hover:scale-110 group-hover:text-[var(--bone)]/50">{artist.initials}</span><div className="absolute inset-0 bg-gradient-to-t from-[var(--steel)] via-transparent to-transparent" /><span className="absolute bottom-3 left-3 bg-[var(--void)]/80 px-2 py-1 font-[family-name:var(--font-mono)] text-xs" style={{ color: artist.color }}>{artist.icon} {artist.pillar}</span></div>
    <div className="p-5"><h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">{artist.name}</h2><p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)]">{artist.role}</p><p className="mt-4 text-sm leading-6 text-[var(--ghost)]">{artist.bio}</p><div className="mt-4 border-t border-[var(--mercury)] pt-3 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">Latest: <span className="text-[var(--bone)]">{artist.latest}</span></div></div>
  </article>
}
