import type { ReactNode } from "react"
import { InternalBackdrop, type BackdropSolid } from "@/components/internal-backdrop"

export function InternalPage({ children, solid, color, lighterBackdrop = false }: { children:ReactNode; solid?:BackdropSolid; color?:string; lighterBackdrop?:boolean }) { return <div className="relative isolate min-h-screen"><InternalBackdrop solid={solid} color={color} lighter={lighterBackdrop}/><div className="relative z-10">{children}</div></div> }

export function InternalHero({ eyebrow, title, children, actions }: { eyebrow:string; title:string; children:ReactNode; actions?:ReactNode }) { return <header className="relative overflow-hidden border-b border-[var(--halo)]/15 px-6 py-20 text-center sm:py-24"><div className="relative mx-auto max-w-4xl [text-shadow:0_2px_24px_rgba(0,0,0,.94)]"><p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[.3em] uppercase text-[var(--halo)] sm:text-xs">{eyebrow}</p><h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-semibold text-[var(--bone)] sm:text-6xl">{title}</h1><div className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--bone)]/74">{children}</div>{actions ? <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div> : null}</div></header> }

export function InternalPanel({ children, className = "" }: { children:ReactNode; className?:string }) { return <div className={`hud-frame border border-[var(--halo)]/18 bg-[var(--void)]/78 p-6 backdrop-blur-sm ${className}`}>{children}</div> }

export function GoldButton({ href, children, outline = false }: { href:string; children:ReactNode; outline?:boolean }) { return <a href={href} className={`inline-flex px-5 py-3 font-[family-name:var(--font-mono)] text-xs tracking-[.1em] uppercase transition ${outline ? "border border-[var(--halo)] text-[var(--halo)] hover:bg-[var(--halo)]/10" : "bg-[var(--halo)] text-[var(--void)] hover:bg-[#e3c257]"}`}>{children}</a> }
