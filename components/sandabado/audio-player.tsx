"use client"

import Image from "next/image"
import Link from "next/link"
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { createContext, useContext, useRef, useState, type ReactNode } from "react"
import { tracks, type Track } from "@/lib/sandabado"

type Player = { current:Track | null; playing:boolean; progress:number; duration:number; play:(track:Track)=>void; toggle:()=>void; previous:()=>void; next:()=>void; seek:(value:number)=>void }
const AudioContext = createContext<Player | null>(null)

export function AudioPlayerProvider({ children }: { children:ReactNode }) {
  const [current, setCurrent] = useState<Track | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audio = useRef<HTMLAudioElement>(null)

  function play(track:Track) {
    setCurrent(track)
    setProgress(0)
    setPlaying(true)
    requestAnimationFrame(() => audio.current?.play().catch(() => setPlaying(false)))
  }
  function toggle() {
    if (!current) return play(tracks[0])
    if (!audio.current) return
    if (playing) audio.current.pause()
    else audio.current.play().catch(() => undefined)
    setPlaying(!playing)
  }
  function changeTrack(offset:number) {
    const index = Math.max(0, tracks.findIndex((track) => track.number === current?.number))
    play(tracks[(index + offset + tracks.length) % tracks.length])
  }
  function seek(value:number) {
    if (!audio.current) return
    audio.current.currentTime = value
    setProgress(value)
  }

  const value = { current, playing, progress, duration, play, toggle, previous:() => changeTrack(-1), next:() => changeTrack(1), seek }
  return <AudioContext.Provider value={value}>{children}<audio ref={audio} src={current ? `/assets/${current.number.toString().padStart(2,"0")}-preview.mp3` : undefined} onEnded={() => { setPlaying(false); setProgress(0) }} onError={() => setPlaying(false)} onLoadedMetadata={() => setDuration(audio.current?.duration || 0)} onTimeUpdate={() => setProgress(audio.current?.currentTime || 0)}/><HorizontalAudioPlayer /></AudioContext.Provider>
}

function HorizontalAudioPlayer() {
  const { current, playing, progress, duration, toggle, previous, next, seek } = useAudioPlayer()
  const track = current ?? tracks[0]
  const value = duration ? Math.min(progress, duration) : 0
  return <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--gold)]/35 bg-[#09090e]/95 px-3 py-2 shadow-[0_-12px_34px_rgba(0,0,0,.28)] backdrop-blur-xl sm:px-5" aria-label="Audio player"><div className="mx-auto flex max-w-7xl items-center gap-3 sm:gap-4"><Link href="/music" aria-label="Open the ∞ LOVE music page" className="relative hidden h-12 w-12 shrink-0 overflow-hidden border border-[var(--gold)]/35 transition hover:border-[var(--gold)] sm:block"><Image src="/images/releases/sandabado-infinity-love.png" alt="∞ LOVE album artwork" fill sizes="48px" className="object-cover"/></Link><button type="button" onClick={toggle} aria-label={playing ? "Pause preview" : `Play ${track.title} preview`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--obsidian)] transition hover:scale-105">{playing ? <Pause size={17} fill="currentColor"/> : <Play className="ml-0.5" size={17} fill="currentColor"/>}</button><button type="button" onClick={previous} className="hidden h-9 w-8 shrink-0 items-center justify-center text-white/70 transition hover:text-[var(--gold)] sm:flex" aria-label="Previous track"><SkipBack size={17}/></button><div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-3"><Link href="/music" className="truncate font-[family-name:var(--font-display)] text-sm text-[var(--cream)] transition hover:text-[var(--gold)] sm:text-base">{track.title}</Link><p className="hidden shrink-0 text-[10px] uppercase tracking-[.16em] text-[var(--cream)]/45 sm:block">∞ LOVE · Preview</p></div><input aria-label="Preview playback progress" type="range" min="0" max={duration || 30} step="0.1" value={value} onChange={(event) => seek(Number(event.target.value))} className="mt-1.5 block h-1 w-full cursor-pointer accent-[var(--gold)]"/></div><button type="button" onClick={next} className="hidden h-9 w-8 shrink-0 items-center justify-center text-white/70 transition hover:text-[var(--gold)] sm:flex" aria-label="Next track"><SkipForward size={17}/></button><Volume2 size={17} className="shrink-0 text-[var(--gold)]/75"/></div></aside>
}

export function useAudioPlayer() { const player = useContext(AudioContext); if (!player) throw new Error("useAudioPlayer must be used inside AudioPlayerProvider"); return player }
