import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"
import { PillarExplore } from "@/components/pillar-explore"
import { PillarSpecificCTA } from "@/components/pillar-specific-cta"

const press = "#D4AF37"

const services = [
  { title: "📚 Publishing", copy: "The Whole Body Series. Five volumes of the Codex. We publish, format, and distribute. You retain 100% IP." },
  { title: "🔒 Digital Library", copy: "Secure in-app reader. Watermarked. No download leaks. Members access all volumes through their account dashboard." },
  { title: "🎙️ Author Platform", copy: "Publish aligned authors through Whole Body Press. 50/50 royalty split. Feed First model. If your work serves the Living Earth, we want to read it." },
  { title: "📖 Physical Print", copy: "Hand-bound limited editions. Physical media that lasts. When a book is a sacred object, not a commodity, it deserves to be crafted accordingly." },
]

const volumes = [
  { number: "I", title: "Whole Body Presence", quote: "Build the instrument." },
  { number: "II", title: "Twelvefold Harmonics", quote: "Play the song." },
  { number: "III", title: "Infinite Presence", quote: "Be the silence." },
  { number: "IV", title: "The Living Spiral", quote: "Dance the turn." },
  { number: "V", title: "Triangle of Trust", quote: "Build the home." },
]

const accessSteps = [
  { step: "01", title: "Buy", copy: "Purchase any volume or bundle. Instantly unlocked." },
  { step: "02", title: "Read", copy: "Access through your account dashboard. Secure reader. Watermarked. No download leaks. Works on any device." },
  { step: "03", title: "Keep", copy: "Your library is permanent. New volumes added as published. No expiration on purchased content." },
]

export default function PressPage() {
  return <InternalPage solid="octahedron" color="212,175,55" lighterBackdrop>
    <header className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-b border-[var(--mercury)] px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[var(--void)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl [text-shadow:0_2px_24px_rgba(0,0,0,.94)]">
        <span className="text-6xl" style={{ color: press }}>🜁</span>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-semibold sm:text-7xl" style={{ color: press }}>Whole Body Press</h1>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ghost)]">The shape that carries.</p>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.2em] text-[var(--ghost)]">Mental · Air · Octahedron · 8 faces</p>
        <span className="mt-5 inline-flex items-center border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.18em]" style={{ borderColor: `${press}80`, color: press, backgroundColor: `${press}1A` }}>Status · Active</span>
      </div>
    </header>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mx-auto max-w-3xl text-xl leading-9 text-[var(--bone)]/85">Books are not commodities. They are technology. Tools for transformation. The word becomes structure. Structure becomes life. The mental body needs infrastructure that carries the signal to the one who needs it.</p>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--ghost)]">The octahedron. Two pyramids joined at the base. Eight faces. The shape of equilibrium — what rises meets what descends. Air is the medium. It carries signal.</p>
      </div>
    </section>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>The Pillar</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{services.map((service) => <InternalPanel key={service.title} className="border-[var(--mercury)] bg-[var(--steel)]"><p className="font-[family-name:var(--font-mono)] text-xs" style={{ color: press }}>{service.title}</p><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{service.copy}</p></InternalPanel>)}</div>
      </div>
    </section>

    <PillarExplore pillar="press" />

    <section className="border-b border-[var(--mercury)] px-6 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>The Whole Body Series</SectionLabel>
        <p className="mx-auto mb-8 max-w-2xl leading-7 text-[var(--bone)]/82">Five volumes. One operating system. From the instrument to the spiral. From silence to manifestation. Available now.</p>
        <div className="mx-auto mb-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">{volumes.map((volume) => <BookCover key={volume.number} volume={volume} />)}</div>
        <div className="mb-8 flex flex-col items-center justify-center gap-6 md:flex-row">
          <PriceCard label="Digital" price="$22 each" bundle="$111 bundle" />
          <PriceCard label="Physical" price="$77 each" bundle="$333 bundle" />
        </div>
        <Link href="/store" className="inline-flex bg-[#D4AF37] px-8 py-4 font-[family-name:var(--font-display)] text-lg text-[var(--void)] transition hover:bg-[#e1c44f]">Purchase Codex →</Link>
      </div>
    </section>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>How Digital Access Works</SectionLabel>
        <div className="grid gap-6 md:grid-cols-3">{accessSteps.map((item) => <InternalPanel key={item.step} className="border-[var(--mercury)] bg-[var(--steel)] text-center"><p className="font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">Step {item.step}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl" style={{ color: press }}>{item.title}</h2><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{item.copy}</p></InternalPanel>)}</div>
      </div>
    </section>

    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>The Shape That Carries</SectionLabel>
        <div className="mx-auto max-w-3xl space-y-6 leading-8 text-[var(--ghost)]">
          <p className="text-[var(--bone)]/85">The octahedron is two tetrahedra mirrored and joined. Fire inverted. What ignites must also be received. Air is the space between — the breath that carries the word from the writer to the reader, from the maker to the one who needs it.</p>
          <p>The Old World turned publishing into extraction. The publisher owns the words. The author gets 8%. The platform controls distribution. The writer rents their own voice.</p>
          <p>Whole Body Press inverts this. The author retains 100% IP. The Feed First Algorithm ensures the writer eats before the printer. We hold the infrastructure — editing, formatting, distribution, secure reader technology — so the author holds the work.</p>
          <p className="pt-3 text-center font-[family-name:var(--font-display)] text-2xl" style={{ color: press }}>Air does not own the signal. Air carries it.</p>
        </div>
      </div>
    </section>
    <PillarSpecificCTA pillar="press" />
  </InternalPage>
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">{children}</p>
}

function PriceCard({ label, price, bundle }: { label: string; price: string; bundle: string }) {
  return <div className="border border-[var(--mercury)] bg-[var(--carbon)] px-6 py-4 text-center">
    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.12em] text-[var(--halo-dim)]">{label}</p>
    <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--halo)]">{price}</p>
    <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)]">{bundle}</p>
  </div>
}

function BookCover({ volume }: { volume: (typeof volumes)[number] }) {
  return <Link href="/manuals" className="group text-left">
    <article className="relative flex aspect-[2/3] flex-col justify-between overflow-hidden border bg-[linear-gradient(145deg,#19171c_0%,#080808_55%,#17130a_100%)] p-5 shadow-[0_20px_40px_rgba(0,0,0,.35)] transition duration-300 group-hover:-translate-y-2" style={{ borderColor: `${press}80` }}>
      <div className="pointer-events-none absolute inset-3 border" style={{ borderColor: `${press}55` }} />
      <div className="pointer-events-none absolute -right-6 -top-12 font-[family-name:var(--font-display)] text-[10rem] leading-none" style={{ color: `${press}14` }}>{volume.number}</div>
      <div className="relative"><p className="font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[.16em]" style={{ color: press }}>Whole Body Series</p><div className="mt-4 h-px w-10" style={{ backgroundColor: press }} /></div>
      <div className="relative"><p className="font-[family-name:var(--font-display)] text-2xl leading-[.95] text-[var(--bone)]">{volume.title}</p><p className="mt-4 font-[family-name:var(--font-mono)] text-[10px] leading-4" style={{ color: press }}>“{volume.quote}”</p></div>
      <p className="relative font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[.14em] text-[var(--ghost)]">Volume {volume.number}</p>
    </article>
  </Link>
}
