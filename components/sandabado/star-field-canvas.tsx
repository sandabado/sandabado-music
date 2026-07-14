"use client"

import { useEffect, useRef } from "react"

type Star = {
  x:number
  y:number
  radius:number
  brightness:number
  phase:number
  speed:number
  color:"warm" | "cool" | "white"
}

const random = (min:number, max:number) => min + Math.random() * (max - min)

function nightLevel(progress:number) {
  if (progress < .2) return .04
  if (progress < .48) return .04 + ((progress - .2) / .28) * .2
  if (progress < .68) return .24 + ((progress - .48) / .2) * .76
  if (progress < .83) return 1
  return Math.max(.04, 1 - ((progress - .83) / .17) * .96)
}

export function StarFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let width = 0
    let height = 0
    let stars:Star[] = []
    let reducedMotion = motionPreference.matches
    let visible = true
    let lastDraw = 0
    const frameInterval = 1000 / 12

    const buildStars = () => {
      const count = Math.round((width * height) / 12500)
      stars = Array.from({ length:count }, () => {
        const rareBrightStar = Math.random() > .91
        const colorRoll = Math.random()
        return {
          x:Math.random() * width,
          y:Math.pow(Math.random(), .82) * height * .62,
          radius:rareBrightStar ? random(1.1, 1.75) : random(.35, .9),
          brightness:rareBrightStar ? random(.78, 1) : random(.32, .82),
          phase:random(0, Math.PI * 2),
          speed:random(.00045, .0014),
          color:colorRoll > .84 ? "warm" : colorRoll < .18 ? "cool" : "white",
        }
      })
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      buildStars()
    }

    const draw = (now:number) => {
      if (!visible || document.hidden) return
      if (!reducedMotion && now - lastDraw < frameInterval) {
        frame = window.requestAnimationFrame(draw)
        return
      }
      lastDraw = now
      context.clearRect(0, 0, width, height)
      const cycle = reducedMotion ? .72 : (now % 42000) / 42000
      const visibility = nightLevel(cycle)
      context.save()
      context.globalCompositeOperation = "screen"

      for (const star of stars) {
        const twinkle = reducedMotion ? .82 : .72 + Math.sin(now * star.speed + star.phase) * .28
        const alpha = star.brightness * twinkle * visibility
        const color = star.color === "warm" ? "255 230 193" : star.color === "cool" ? "204 209 255" : "255 252 238"
        context.beginPath()
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fillStyle = `rgb(${color} / ${alpha})`
        context.shadowColor = `rgb(${color} / ${alpha * .7})`
        context.shadowBlur = star.radius > 1 ? 7 : 3
        context.fill()
      }

      context.restore()
      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const handleMotionChange = (event:MediaQueryListEvent) => {
      reducedMotion = event.matches
      window.cancelAnimationFrame(frame)
      if (visible && !document.hidden) frame = window.requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      window.cancelAnimationFrame(frame)
      if (!document.hidden && visible) frame = window.requestAnimationFrame(draw)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      window.cancelAnimationFrame(frame)
      if (visible && !document.hidden) frame = window.requestAnimationFrame(draw)
    }, { rootMargin:"120px" })
    intersectionObserver.observe(canvas)
    motionPreference.addEventListener("change", handleMotionChange)
    document.addEventListener("visibilitychange", handleVisibility)
    frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      motionPreference.removeEventListener("change", handleMotionChange)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-star-canvas absolute inset-0 h-full w-full" aria-hidden="true" />
}
