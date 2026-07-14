"use client"

import type { CSSProperties } from "react"

export type BackdropSolid = "tetrahedron" | "octahedron" | "icosahedron" | "cube" | "dodecahedron"

export function InternalBackdrop({ solid = "dodecahedron", color = "109,74,255", lighter = false }: { solid?: BackdropSolid; color?: string; lighter?: boolean }) {
  const veil = lighter ? "linear-gradient(180deg,rgba(5,5,8,.32),rgba(5,5,8,.72) 72%,#050505)" : "linear-gradient(180deg,rgba(5,5,8,.58),rgba(5,5,8,.9) 72%,#050505)"
  return <div className="sandabado-nightscape pointer-events-none fixed inset-0 z-0 overflow-hidden" data-solid={solid} style={{ "--backdrop-accent": color } as CSSProperties}><div className="absolute inset-0" style={{ background:veil }}/></div>
}
