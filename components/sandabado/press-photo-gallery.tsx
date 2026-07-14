"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useState } from "react"

const photos = [
  { src:"/images/sandabado-album.jpg", alt:"∞ LOVE album artwork" },
  { src:"/images/hero/sandabado-joshua-tree-hero-v2.jpg", alt:"Joshua tree at dusk" },
  { src:"/images/hero/sandabado-three-trees-hero.jpg", alt:"High-desert horizon" },
  { src:"/images/hero/sandabado-open-desert-hero.png", alt:"Open desert sky" },
]

export function PressPhotoGallery() {
  const [active, setActive] = useState<number | null>(null)
  const close = () => setActive(null)
  const previous = () => setActive((index) => index === null ? null : (index - 1 + photos.length) % photos.length)
  const next = () => setActive((index) => index === null ? null : (index + 1) % photos.length)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active === null) return
      if (event.key === "Escape") close()
      if (event.key === "ArrowLeft") previous()
      if (event.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  return <><div className="grid gap-4 sm:grid-cols-2"><button type="button" onClick={() => setActive(0)} className="group relative aspect-square overflow-hidden border border-white/15 text-left"><Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105"/><Caption>{photos[0].alt}</Caption></button>{photos.slice(1).map((photo,index) => <button type="button" key={photo.src} onClick={() => setActive(index + 1)} className="group relative aspect-[16/10] overflow-hidden border border-white/15 text-left"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105"/><Caption>{photo.alt}</Caption></button>)}</div>{active !== null ? <div role="dialog" aria-modal="true" aria-label={photos[active].alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5" onClick={close}><button type="button" aria-label="Close photo" className="absolute right-5 top-5 text-white" onClick={close}><X size={30}/></button><button type="button" aria-label="Previous photo" className="absolute left-3 text-white sm:left-7" onClick={(event) => { event.stopPropagation(); previous() }}><ChevronLeft size={42}/></button><figure className="max-h-[86vh] max-w-5xl" onClick={(event) => event.stopPropagation()}><Image src={photos[active].src} alt={photos[active].alt} width={1680} height={1050} className="max-h-[78vh] w-auto object-contain"/><figcaption className="mt-3 text-center text-sm text-white/75">{photos[active].alt}</figcaption></figure><button type="button" aria-label="Next photo" className="absolute right-3 text-white sm:right-7" onClick={(event) => { event.stopPropagation(); next() }}><ChevronRight size={42}/></button></div> : null}</>
}

function Caption({ children }: { children:string }) { return <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-xs uppercase tracking-[.12em] text-white/85">{children}</span> }
