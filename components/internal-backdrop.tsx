"use client"

import { PlatonicScene } from "@/components/platonic-scene"

export type BackdropSolid = "tetrahedron" | "octahedron" | "icosahedron" | "cube" | "dodecahedron"

export function InternalBackdrop({ solid = "dodecahedron", color = "109,74,255", lighter = false }: { solid?: BackdropSolid; color?: string; lighter?: boolean }) {
  const veil = lighter ? "linear-gradient(180deg,rgba(5,5,5,.32),rgba(5,5,5,.72) 72%,#050505)" : "linear-gradient(180deg,rgba(5,5,5,.54),rgba(5,5,5,.9) 72%,#050505)"
  return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--void)]"><div className={`absolute inset-0 ${lighter ? "opacity-55" : "opacity-35"}`}><PlatonicScene active={solid} height={typeof window === "undefined" ? 900 : window.innerHeight}/></div><div className="absolute inset-0" style={{ background:veil }}/></div>
}
