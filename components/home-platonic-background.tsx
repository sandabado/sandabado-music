"use client"

import { useEffect, useState } from "react"
import { PlatonicScene } from "@/components/platonic-scene"

const solids = ["dodecahedron", "logo", "tetrahedron", "octahedron", "icosahedron", "cube", "dodecahedron"] as const
const sectionIds = ["hero", "quincunx", "presence", "press", "studios", "foundation", "guardian"]

export function HomePlatonicBackground() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const center = window.scrollY + window.innerHeight / 2
      const next = sectionIds.findIndex((id) => {
        const element = document.getElementById(id)
        if (!element) return false
        const top = element.offsetTop
        return center >= top && center < top + element.offsetHeight
      })
      if (next >= 0) setIndex(next)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return <><div className="pointer-events-none fixed inset-0 z-0 bg-[var(--void)]" /><div className="pointer-events-none fixed inset-0 z-0 opacity-75"><PlatonicScene active={solids[index]} heroEarth={index === 0} height="100%" /></div></>
}
