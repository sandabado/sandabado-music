"use client"

import { useEffect, useRef } from "react"

type Point = { x:number; y:number }
type Channel = {
  points:Point[]
  revealStart:number
  revealEnd:number
  width:number
  opacity:number
}
type Bolt = {
  channels:Channel[]
  startedAt:number
  leaderDuration:number
  totalDuration:number
  origin:Point
  repeats:number
}
type Coordinate = [number, number]
type Curve = [Coordinate, Coordinate, Coordinate, Coordinate]

const random = (min:number, max:number) => min + Math.random() * (max - min)
const clamp = (value:number, min:number, max:number) => Math.max(min, Math.min(max, value))

function makeFork(
  anchor:Point,
  angle:number,
  length:number,
  segments:number,
  revealStart:number,
  revealEnd:number,
  width:number,
  bounds:{ width:number; height:number },
  depth = 0,
):Channel[] {
  const points = [anchor]
  let current = anchor
  let direction = angle
  let step = length
  const children:Channel[] = []

  for (let index = 1; index <= segments; index++) {
    direction = clamp(direction + random(-.28, .28), .16, Math.PI - .16)
    const next = {
      x:clamp(current.x + Math.cos(direction) * step, 2, bounds.width - 2),
      y:clamp(current.y + Math.sin(direction) * step, 2, bounds.height - 2),
    }
    points.push(next)
    current = next
    step *= random(.82, .94)

    if (depth < 1 && index > 2 && index < segments - 1 && Math.random() < .14) {
      const progress = index / segments
      const childStart = revealStart + (revealEnd - revealStart) * progress
      const side = Math.random() < .5 ? -1 : 1
      children.push(...makeFork(
        next,
        clamp(direction + side * random(.38, .78), .2, Math.PI - .2),
        length * .64,
        Math.max(3, Math.round(segments * .55)),
        childStart,
        Math.min(1, childStart + (revealEnd - revealStart) * .48),
        width * .54,
        bounds,
        depth + 1,
      ))
    }
  }

  return [{ points, revealStart, revealEnd, width, opacity:depth ? .48 : .7 }, ...children]
}

function makeBolt(width:number, height:number):Bolt {
  const origin = { x:random(width * .14, width * .86), y:random(height * .04, height * .18) }
  const ground = random(height * .76, height * .9)
  const segments = Math.round(random(22, 30))
  const verticalStep = (ground - origin.y) / segments
  const mainPoints = [origin]
  const channels:Channel[] = []
  let x = origin.x
  const drift = random(-.18, .18) * verticalStep

  for (let index = 1; index <= segments; index++) {
    const previous = mainPoints[index - 1]
    const sharpStep = Math.random() < .16 ? random(-1.85, 1.85) : random(-.9, .9)
    x = clamp(x + verticalStep * sharpStep + drift, width * .035, width * .965)
    const point = {
      x,
      y:clamp(origin.y + verticalStep * index + random(-verticalStep * .22, verticalStep * .22), previous.y + 1, ground),
    }
    mainPoints.push(point)

    if (index > 3 && index < segments - 3 && Math.random() < .23) {
      const side = Math.random() < .5 ? -1 : 1
      const forkStart = (index / segments) * .76
      const forkLength = verticalStep * random(1.5, 2.4)
      channels.push(...makeFork(
        point,
        Math.PI / 2 + side * random(.52, 1.05),
        forkLength,
        Math.round(random(6, 11)),
        forkStart,
        Math.min(.98, forkStart + random(.17, .3)),
        clamp(Math.min(width, height) / 720, 1.15, 2.2) * random(.36, .62),
        { width, height },
      ))
    }
  }

  channels.unshift({
    points:mainPoints,
    revealStart:0,
    revealEnd:.76,
    width:clamp(Math.min(width, height) / 460, 1.5, 3.1),
    opacity:1,
  })

  return {
    channels,
    startedAt:performance.now(),
    leaderDuration:random(210, 340),
    totalDuration:random(740, 980),
    origin,
    repeats:Math.random() < .3 ? Math.round(random(1, 2)) : 0,
  }
}

function traceChannel(context:CanvasRenderingContext2D, channel:Channel, reveal:number) {
  const progress = clamp((reveal - channel.revealStart) / (channel.revealEnd - channel.revealStart), 0, 1)
  if (progress <= 0) return false

  const finalIndex = progress * (channel.points.length - 1)
  const wholeIndex = Math.floor(finalIndex)
  const remainder = finalIndex - wholeIndex
  context.beginPath()
  context.moveTo(channel.points[0].x, channel.points[0].y)

  for (let index = 1; index <= wholeIndex; index++) {
    context.lineTo(channel.points[index].x, channel.points[index].y)
  }

  if (wholeIndex < channel.points.length - 1 && remainder > 0) {
    const from = channel.points[wholeIndex]
    const to = channel.points[wholeIndex + 1]
    context.lineTo(from.x + (to.x - from.x) * remainder, from.y + (to.y - from.y) * remainder)
  }

  return true
}

export function maskTree(context:CanvasRenderingContext2D, width:number, height:number) {
  const imageAspect = 16 / 9
  const canvasAspect = width / height
  const imageWidth = canvasAspect > imageAspect ? width : height * imageAspect
  const imageHeight = canvasAspect > imageAspect ? width / imageAspect : height
  const offsetX = (width - imageWidth) / 2
  const offsetY = (height - imageHeight) / 2
  const point = (x:number, y:number):Point => ({ x:offsetX + x * imageWidth, y:offsetY + y * imageHeight })

  const limbs:Curve[] = [
    [[.5,.7],[.48,.55],[.45,.4],[.43,.23]],
    [[.5,.65],[.51,.48],[.52,.32],[.49,.17]],
    [[.51,.64],[.55,.5],[.57,.34],[.55,.17]],
    [[.5,.61],[.57,.49],[.62,.39],[.65,.34]],
    [[.48,.62],[.42,.52],[.37,.43],[.35,.36]],
    [[.48,.58],[.43,.47],[.39,.35],[.4,.29]],
    [[.52,.58],[.58,.45],[.61,.34],[.62,.28]],
    [[.47,.57],[.42,.53],[.38,.5],[.35,.49]],
  ]
  const crowns:Array<[number, number, number]> = [
    [.49,.17,1], [.55,.17,.96], [.43,.23,.95], [.52,.26,.9],
    [.57,.24,.92], [.62,.28,.96], [.65,.35,.92], [.59,.4,.88],
    [.55,.34,.88], [.46,.3,.9], [.4,.29,.96], [.35,.36,1],
    [.39,.4,.82], [.35,.49,.8], [.44,.39,.8],
  ]

  context.save()
  context.globalCompositeOperation = "destination-out"
  context.strokeStyle = "#000"
  context.fillStyle = "#000"
  context.lineCap = "round"
  context.lineJoin = "round"

  const trunkBottom = point(.5, .89)
  const trunkTop = point(.5, .58)
  context.beginPath()
  context.moveTo(trunkBottom.x, trunkBottom.y)
  context.bezierCurveTo(point(.49,.79).x, point(.49,.79).y, point(.51,.68).x, point(.51,.68).y, trunkTop.x, trunkTop.y)
  context.lineWidth = imageWidth * .032
  context.stroke()

  for (const limb of limbs) {
    const [start, controlOne, controlTwo, end] = limb.map(([x,y]) => point(x, y))
    context.beginPath()
    context.moveTo(start.x, start.y)
    context.bezierCurveTo(controlOne.x, controlOne.y, controlTwo.x, controlTwo.y, end.x, end.y)
    context.lineWidth = imageWidth * .018
    context.stroke()
  }

  for (const [x, y, scale] of crowns) {
    const center = point(x, y)
    context.beginPath()
    context.ellipse(center.x, center.y, imageWidth * .025 * scale, imageHeight * .048 * scale, 0, 0, Math.PI * 2)
    context.fill()
  }

  context.restore()
}

export function LightningCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = motionPreference.matches
    let frame = 0
    let timer = 0
    let bolt:Bolt | null = null
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const clear = () => context.clearRect(0, 0, width, height)

    const schedule = (delay = random(2600, 7200)) => {
      window.clearTimeout(timer)
      if (reducedMotion || document.hidden) return
      timer = window.setTimeout(() => {
        bolt = makeBolt(width, height)
        frame = window.requestAnimationFrame(draw)
      }, delay)
    }

    const draw = (now:number) => {
      if (!bolt || reducedMotion || document.hidden) return
      clear()
      const elapsed = now - bolt.startedAt
      const leading = elapsed < bolt.leaderDuration
      const reveal = leading ? clamp(elapsed / bolt.leaderDuration, 0, 1) : 1
      const returnElapsed = Math.max(0, elapsed - bolt.leaderDuration)
      const fade = leading ? .44 + reveal * .22 : clamp(1 - returnElapsed / (bolt.totalDuration - bolt.leaderDuration), 0, 1)
      const returnPulse = leading ? .42 : returnElapsed < 105 ? 1 : fade * (.72 + Math.sin(returnElapsed * .06) * .1)

      context.save()
      context.globalCompositeOperation = "screen"

      if (!leading) {
        const cloudGlow = context.createRadialGradient(bolt.origin.x, bolt.origin.y, 0, bolt.origin.x, bolt.origin.y, Math.max(width, height) * .58)
        cloudGlow.addColorStop(0, `rgb(230 214 255 / ${.2 * returnPulse})`)
        cloudGlow.addColorStop(.28, `rgb(145 91 255 / ${.1 * returnPulse})`)
        cloudGlow.addColorStop(1, "rgb(92 42 170 / 0)")
        context.fillStyle = cloudGlow
        context.fillRect(0, 0, width, height)
      }

      for (const channel of bolt.channels) {
        if (!traceChannel(context, channel, reveal)) continue
        const intensity = channel.opacity * returnPulse
        context.lineCap = "round"
        context.lineJoin = "round"
        context.shadowColor = `rgb(149 91 255 / ${.9 * intensity})`
        context.shadowBlur = leading ? 8 : 21 * intensity
        context.lineWidth = channel.width * (leading ? 2.4 : 5.5)
        context.strokeStyle = `rgb(132 79 255 / ${.2 * intensity})`
        context.stroke()

        traceChannel(context, channel, reveal)
        context.shadowColor = `rgb(238 225 255 / ${intensity})`
        context.shadowBlur = leading ? 3 : 9 * intensity
        context.lineWidth = channel.width * (leading ? .5 : .9)
        context.strokeStyle = leading
          ? `rgb(192 163 255 / ${.62 * intensity})`
          : `rgb(255 250 255 / ${.96 * intensity})`
        context.stroke()
      }

      context.restore()
      maskTree(context, width, height)

      if (elapsed < bolt.totalDuration) {
        frame = window.requestAnimationFrame(draw)
        return
      }

      clear()
      if (bolt.repeats > 0) {
        const previous = bolt
        timer = window.setTimeout(() => {
          bolt = {
            ...previous,
            startedAt:performance.now(),
            leaderDuration:random(36, 68),
            totalDuration:random(260, 390),
            repeats:previous.repeats - 1,
          }
          frame = window.requestAnimationFrame(draw)
        }, random(80, 210))
      } else {
        bolt = null
        schedule()
      }
    }

    const handleMotionChange = (event:MediaQueryListEvent) => {
      reducedMotion = event.matches
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      clear()
      if (!reducedMotion) schedule(500)
    }

    const handleVisibility = () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      clear()
      if (!document.hidden && !reducedMotion) schedule(500)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    motionPreference.addEventListener("change", handleMotionChange)
    document.addEventListener("visibilitychange", handleVisibility)
    schedule(900)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      resizeObserver.disconnect()
      motionPreference.removeEventListener("change", handleMotionChange)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-lightning-canvas absolute inset-0 h-full w-full" aria-hidden="true" />
}
