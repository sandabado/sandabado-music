"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LightningCanvas } from "@/components/sandabado/lightning-canvas"
import { StarFieldCanvas } from "@/components/sandabado/star-field-canvas"

const poster = "/images/hero/sandabado-joshua-tree-hero-v2.jpg"

export function CinematicHeroBackground({ videoSrc }: { videoSrc?: string }) {
  const video = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const node = video.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion.matches) node.play().catch(() => undefined)
      else node.pause()
    }, { rootMargin:"120px" })
    observer.observe(node)
    return () => observer.disconnect()
  }, [videoSrc])

  return <div className="hero-cinema absolute inset-0 -z-20 overflow-hidden bg-[#16101f]" aria-hidden="true">
    <Image
      src={poster}
      alt=""
      fill
      priority
      quality={82}
      sizes="100vw"
      className="hero-poster object-cover object-center"
    />
    {videoSrc ? <video
      ref={video}
      className={`hero-video absolute inset-0 h-full w-full object-cover object-center ${videoReady ? "is-ready" : ""}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      src={videoSrc}
      onCanPlay={() => setVideoReady(true)}
      onError={() => setVideoReady(false)}
    /> : null}
    <div className="hero-sky-grade absolute inset-0" />
    <StarFieldCanvas />
    <div className="hero-celestial absolute inset-0">
      <span className="hero-venus" />
      <span className="hero-moon" />
    </div>
    <div className="hero-clouds hero-clouds-far absolute inset-0" />
    <div className="hero-clouds hero-clouds-near absolute inset-0" />
    <div className="hero-sky-temperature absolute inset-0" />
    <LightningCanvas />
    <div className="hero-dust hero-dust-far absolute inset-0" />
    <div className="hero-dust hero-dust-near absolute inset-0" />
    <div className="hero-film-grain absolute inset-0" />
    <div className="hero-vignette absolute inset-0" />
  </div>
}
