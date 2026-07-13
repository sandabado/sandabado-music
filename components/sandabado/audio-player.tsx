"use client"

import { Pause, Play, Volume2 } from "lucide-react"
import { createContext, useContext, useRef, useState, type ReactNode } from "react"
import type { Track } from "@/lib/sandabado"

type Player = { current:Track | null; playing:boolean; play:(track:Track)=>void; toggle:()=>void }
const AudioContext = createContext<Player | null>(null)

export function AudioPlayerProvider({ children }: { children:ReactNode }) {
  const [current, setCurrent] = useState<Track | null>(null)
  const [playing, setPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement>(null)
  function play(track:Track) { setCurrent(track); setPlaying(true); requestAnimationFrame(() => audio.current?.play().catch(() => setPlaying(false))) }
  function toggle() { if (!audio.current || !current) return; if (playing) audio.current.pause(); else audio.current.play().catch(() => undefined); setPlaying(!playing) }
  return <AudioContext.Provider value={{ current, playing, play, toggle }}>{children}<audio ref={audio} src={current ? `/assets/${current.number.toString().padStart(2,"0")}-preview.mp3` : undefined} onEnded={() => setPlaying(false)} onError={() => setPlaying(false)} />{current ? <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--gold)]/30 bg-[#0a0a0f]/95 px-5 py-3 backdrop-blur-xl"><div className="mx-auto flex max-w-5xl items-center gap-4"><button aria-label={playing ? "Pause preview" : "Play preview"} onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--obsidian)]">{playing ? <Pause size={16}/> : <Play className="ml-0.5" size={16}/>}</button><div className="min-w-0 flex-1"><p className="truncate text-[10px] uppercase tracking-[.18em] text-[var(--cream)]/55">30 second preview</p><p className="truncate font-[family-name:var(--font-display)] text-base text-[var(--cream)]">{current.title}</p></div><Volume2 size={17} className="text-[var(--gold)]"/></div></aside> : null}</AudioContext.Provider>
}

export function useAudioPlayer() { const player = useContext(AudioContext); if (!player) throw new Error("useAudioPlayer must be used inside AudioPlayerProvider"); return player }
