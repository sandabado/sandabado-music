import Image from "next/image"

export function SandabadoMark() {
  return <div className="hero-brand-mark mx-auto">
    <Image src="/images/sandabado-album.jpg" alt="∞ LOVE album cover" fill priority sizes="(max-width: 640px) 72vw, 19rem" className="object-cover" draggable={false}/>
  </div>
}
