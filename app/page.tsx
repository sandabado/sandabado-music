import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, Play } from "lucide-react"
import { EmailCapture } from "@/components/sandabado/email-capture"
import { CinematicHeroBackground } from "@/components/sandabado/cinematic-hero-background"

export default function HomePage() {
  const heroVideo = process.env.NEXT_PUBLIC_HERO_VIDEO_URL

  return <div className="home-shell -mt-16 overflow-hidden">
    <section className="hero-stage relative isolate flex min-h-[100svh] w-full items-center overflow-hidden">
      <CinematicHeroBackground videoSrc={heroVideo}/>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-28 pt-32 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:pb-24 lg:pt-28">
        <div className="hero-copy max-w-3xl text-left">
          <p className="hero-kicker flex items-center gap-3 text-[10px] uppercase tracking-[.34em] text-[var(--gold)] sm:text-xs"><span className="h-px w-10 bg-[var(--gold)]/60"/>Whole Body Records presents</p>
          <h1 className="hero-title mt-7 font-[family-name:var(--font-display)]">SANDĀBĀDO</h1>
          <div className="hero-release-lockup mt-8 border-l border-[var(--gold)]/55 pl-5">
            <p className="font-[family-name:var(--font-display)] text-4xl italic leading-none text-[var(--gold)] sm:text-5xl">∞ LOVE</p>
            <p className="mt-3 text-[10px] uppercase tracking-[.24em] text-[var(--cream)]/65 sm:text-xs">Debut album · September 26, 2026</p>
          </div>
          <p className="mt-7 max-w-xl text-base leading-7 text-[var(--cream)]/72 sm:text-lg sm:leading-8">Thirteen songs of soul blues and desert rock—made in the high desert for anyone still willing to stay open.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/music" className="hero-primary-action inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--gold)] px-6 text-xs font-semibold uppercase tracking-[.14em] text-[var(--obsidian)]"><Play size={14} fill="currentColor"/>Listen to the record</Link>
            <Link href="/tour" className="hero-secondary-action inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--cream)]/35 bg-black/20 px-6 text-xs uppercase tracking-[.14em] text-[var(--cream)] backdrop-blur-sm transition hover:border-[var(--gold)] hover:text-[var(--gold)]">See it live<ArrowRight size={14}/></Link>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/15 py-4">
            <div><dt className="text-[9px] uppercase tracking-[.2em] text-[var(--cream)]/40">Tracks</dt><dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--cream)]">13</dd></div>
            <div className="border-x border-white/15 px-5"><dt className="text-[9px] uppercase tracking-[.2em] text-[var(--cream)]/40">Frequency</dt><dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--cream)]">528Hz</dd></div>
            <div className="pl-5"><dt className="text-[9px] uppercase tracking-[.2em] text-[var(--cream)]/40">Origin</dt><dd className="mt-1 font-[family-name:var(--font-display)] text-lg text-[var(--cream)] sm:text-2xl">High Desert</dd></div>
          </dl>
        </div>
        <Link href="/music" className="hero-album group relative mx-auto block w-full max-w-[31rem]" aria-label="Explore the ∞ LOVE album">
          <div className="hero-album-art relative aspect-square overflow-hidden border border-[var(--gold)]/45 bg-black/50">
            <Image src="/images/releases/sandabado-infinity-love.png" alt="∞ LOVE album artwork" fill priority sizes="(max-width: 1024px) 82vw, 38vw" className="object-cover"/>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[.2em] text-[var(--cream)]/55"><span>Sandābādo · ∞ LOVE</span><span className="flex items-center gap-2 text-[var(--gold)]">Explore album<ArrowRight size={13}/></span></div>
        </Link>
      </div>
      <a href="#featured" aria-label="Scroll to the featured track" className="hero-scroll absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-[var(--gold)] lg:bottom-8"><ArrowDown size={22}/></a>
    </section>

    <section id="featured" className="signal-section border-y border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="signal-image relative min-h-[29rem] overflow-hidden border border-[var(--gold)]/25">
          <Image src="/images/backgrounds/sandabado-moonlit-desert-v1.jpg" alt="Moonlit Joshua Tree desert" fill sizes="(max-width: 1024px) 92vw, 50vw" className="object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"/>
          <p className="signal-number absolute left-5 top-2 font-[family-name:var(--font-display)] text-[11rem] leading-none text-[var(--gold)]/18 sm:text-[14rem]">01</p>
          <blockquote className="absolute inset-x-7 bottom-8 max-w-sm font-[family-name:var(--font-display)] text-2xl italic leading-9 text-[var(--cream)] sm:text-3xl">“You&apos;re out on your own…”</blockquote>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[.3em] text-[var(--gold)]">First transmission · Track 01</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none sm:text-7xl">ROLLIN&apos; STONE</h2>
          <div className="gold-rule mt-7 w-32"/>
          <p className="mt-7 max-w-xl text-base leading-8 text-[var(--cream)]/68">A dust-streaked opening built on grit, motion, and the nerve to keep moving. The first doorway into ∞ LOVE.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/music" className="inline-flex min-h-12 items-center gap-2 bg-[var(--cream)] px-6 text-xs font-semibold uppercase tracking-[.14em] text-[var(--obsidian)] transition hover:bg-[var(--gold)]"><Play size={14} fill="currentColor"/>Hear the preview</Link>
            <Link href="/video" className="inline-flex min-h-12 items-center gap-2 border border-white/25 px-6 text-xs uppercase tracking-[.14em] text-[var(--cream)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]">Watch the visualizer<ArrowRight size={14}/></Link>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[.22em] text-[var(--cream)]/38">Soul blues · Desert rock · 4:12</p>
        </div>
      </div>
    </section>

    <section id="inner-circle" className="inner-circle-section border-b border-[var(--gold)]/20 px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div><p className="text-[10px] uppercase tracking-[.3em] text-[var(--gold)]">Enter the circle</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl">Stay close to the signal.</h2></div>
        <div><p className="max-w-xl text-base leading-7 text-[var(--cream)]/65">Release notes, first listening access, and a direct path to the Whole Body Gathering in Pioneertown.</p><EmailCapture /></div>
      </div>
    </section>
  </div>
}
