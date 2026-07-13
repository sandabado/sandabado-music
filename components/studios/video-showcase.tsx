"use client"

import { useState } from "react"

type StudioVideo = { title: string; detail: string; label: string; accent?: string; embedUrl?: string }

export function StudioVideoShowcase({ eyebrow, liveVideo, videos }: { eyebrow: string; liveVideo: StudioVideo; videos: StudioVideo[] }) {
  const [selected, setSelected] = useState(liveVideo)
  const isLive = selected === liveVideo

  return <section className="px-6 pb-12 sm:pb-16">
    <div className="mx-auto max-w-5xl">
      <p className="mb-5 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.22em] text-[var(--halo-dim)]">{eyebrow}</p>
      <div className="overflow-hidden border border-[var(--mercury)] bg-[var(--carbon)] shadow-[0_20px_55px_rgba(0,0,0,.35)]">
        <div className="relative aspect-video bg-[radial-gradient(circle_at_50%_35%,rgba(43,168,160,.28),transparent_35%),linear-gradient(135deg,#101c1d,#060708_64%,#132526)]">{selected.embedUrl ? <iframe className="absolute inset-0 size-full" src={selected.embedUrl} title={selected.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <div className="absolute inset-0 flex flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full border border-[#2BA8A0]/70 bg-[#2BA8A0]/15 text-2xl text-[#2BA8A0]">▶</span><p className="mt-5 font-[family-name:var(--font-display)] text-3xl text-[var(--bone)]">{selected.title}</p><p className="mt-2 text-sm text-[var(--ghost)]">{selected.detail}</p><span className="mt-5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.18em] text-[#2BA8A0]">{isLive ? "Live stream source ready to connect" : "Video source ready to connect"}</span></div>}<div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-[#00FFC2]/35 bg-[var(--void)]/80 px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.14em] text-[#00FFC2]"><span className="size-1.5 animate-pulse rounded-full bg-[#00FFC2]" />{isLive ? "Live" : selected.label}</div></div>
        <div className="border-t border-[var(--mercury)] bg-[var(--steel)] p-4"><div className="flex snap-x gap-3 overflow-x-auto pb-1">{[liveVideo, ...videos].map((video) => <button key={video.title} onClick={() => setSelected(video)} className={`min-w-52 snap-start border px-4 py-3 text-left transition ${selected.title === video.title ? "border-[#2BA8A0] bg-[#2BA8A0]/10" : "border-[var(--mercury)] hover:border-[#2BA8A0]/55"}`}><p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[.12em]" style={{ color: video.accent || "#2BA8A0" }}>{video === liveVideo ? "Live now" : video.label}</p><p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[var(--bone)]">{video.title}</p><p className="mt-1 text-xs text-[var(--ghost)]">{video.detail}</p></button>)}</div></div>
      </div>
    </div>
  </section>
}
