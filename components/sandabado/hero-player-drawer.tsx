"use client"

import Image from "next/image"
import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { useAudioPlayer } from "@/components/sandabado/audio-player"
import { tracks } from "@/lib/sandabado"

export function HeroPlayerDrawer() {
  const [open, setOpen] = useState(false)
  const drawerId = useId()
  const { current, playing, play, toggle } = useAudioPlayer()
  const currentIndex = Math.max(0, tracks.findIndex((track) => track.number === current?.number))

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  const changeTrack = (offset: number) => {
    play(tracks[(currentIndex + offset + tracks.length) % tracks.length])
  }

  return <>
    <div className="fixed left-0 top-1/2 z-40 -translate-y-1/2">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={drawerId}
        className="group flex min-h-16 items-center gap-3 rounded-r-2xl border border-l-0 border-[var(--violet)]/35 bg-gradient-to-r from-[var(--violet)]/90 to-[var(--violet)]/20 px-3 py-2 text-white shadow-lg backdrop-blur-sm transition hover:from-[var(--violet)] hover:pr-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
      >
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-white/35 bg-black/30 shadow-md">
          <Image src="/images/sandabado-album.jpg" alt="" fill sizes="64px" className="object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25"><Play size={20} fill="currentColor" /></span>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[.16em] opacity-0 transition-all duration-300 group-hover:max-w-28 group-hover:opacity-100 group-focus-visible:max-w-28 group-focus-visible:opacity-100">Listen now</span>
      </button>
    </div>

    <div className={`fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} aria-hidden={!open} />
    <aside id={drawerId} aria-label="Music player" aria-hidden={!open} className={`fixed inset-y-0 left-0 z-[70] flex w-[min(90vw,37.5rem)] flex-col overflow-y-auto border-r border-[var(--violet)]/35 bg-[#0a0a0f] shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white transition hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)]" aria-label="Close music player"><X /></button>
      <div className="relative aspect-square shrink-0"><Image src="/images/sandabado-album.jpg" alt="∞ LOVE album cover" fill sizes="(max-width: 640px) 90vw, 600px" className="object-cover" /></div>
      <div className="p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[.24em] text-[var(--gold)]">Sandābādo</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-white">∞ LOVE</h2>
        <p className="mt-2 text-sm text-white/60">Select a track to play its preview.</p>
        <div className="mt-6 border-y border-white/10">
          {tracks.map((track) => {
            const selected = current?.number === track.number
            return <button key={track.number} type="button" onClick={() => selected ? toggle() : play(track)} className={`flex min-h-12 w-full items-center gap-3 border-b border-white/10 px-1 py-3 text-left transition last:border-0 hover:bg-white/5 ${selected ? "bg-[var(--violet)]/15" : ""}`}>
              <span className="w-6 font-[family-name:var(--font-mono)] text-xs text-[var(--gold)]">{String(track.number).padStart(2, "0")}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/50 text-[var(--gold)]">{selected && playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}</span>
              <span className="min-w-0 flex-1"><span className="block truncate font-[family-name:var(--font-display)] text-lg text-white">{track.title}</span><span className="block truncate text-xs text-white/45">{track.style}</span></span>
              <span className="text-xs text-white/50">{track.duration}</span>
            </button>
          })}
        </div>
        <section className="mt-7 rounded-xl bg-white/5 p-4" aria-label="Now playing controls">
          <p className="text-[10px] uppercase tracking-[.18em] text-[var(--gold)]">Now playing</p>
          <div className="mt-2 flex items-center justify-between gap-3"><div className="min-w-0"><h3 className="truncate font-[family-name:var(--font-display)] text-xl text-white">{current?.title ?? "Choose a track"}</h3><p className="text-sm text-white/55">Sandābādo</p></div><div className="flex shrink-0 gap-1"><button type="button" onClick={() => changeTrack(-1)} className="flex h-11 w-11 items-center justify-center text-white transition hover:text-[var(--gold)]" aria-label="Previous track"><SkipBack size={19} /></button><button type="button" onClick={toggle} disabled={!current} className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--obsidian)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-45" aria-label={playing ? "Pause preview" : "Play preview"}>{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button><button type="button" onClick={() => changeTrack(1)} className="flex h-11 w-11 items-center justify-center text-white transition hover:text-[var(--gold)]" aria-label="Next track"><SkipForward size={19} /></button></div></div>
        </section>
      </div>
    </aside>
  </>
}
