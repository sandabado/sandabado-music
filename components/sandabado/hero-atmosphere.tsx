"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const StarFieldCanvas = dynamic(
  () => import("@/components/sandabado/star-field-canvas").then((module) => module.StarFieldCanvas),
  { ssr:false },
)
const LightningCanvas = dynamic(
  () => import("@/components/sandabado/lightning-canvas").then((module) => module.LightningCanvas),
  { ssr:false },
)

export function HeroAtmosphere() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const compactViewport = window.matchMedia("(max-width: 640px)")
    if (reducedMotion.matches || compactViewport.matches) return

    const timer = window.setTimeout(() => setEnabled(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return enabled ? <><StarFieldCanvas /><LightningCanvas /></> : null
}
