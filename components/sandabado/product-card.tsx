"use client"

import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/store/cart-context"
import { formatCurrency } from "@/lib/store"

export function ProductCard({ product, priority = false }: { product:{ id:string; name:string; detail:string; priceCents:number }; priority?:boolean }) {
  const { addToCart } = useCart()
  return <article className="group overflow-hidden border border-[var(--cream)]/15 bg-white/[.025] transition hover:border-[var(--gold)]/55"><div className="relative aspect-square overflow-hidden bg-black"><Image priority={priority} src="/images/sandabado-album.jpg" alt="∞ LOVE album artwork" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"/></div><div className="p-5"><p className="text-[10px] uppercase tracking-[.16em] text-[var(--gold)]">∞ LOVE edition</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">{product.name}</h2><p className="mt-2 min-h-10 text-sm leading-5 text-[var(--cream)]/60">{product.detail}</p><div className="mt-5 flex items-center justify-between gap-3"><span className="font-[family-name:var(--font-display)] text-xl text-[var(--gold)]">{formatCurrency(product.priceCents)}</span><button onClick={() => addToCart({ productId:product.id, name:product.name, priceCents:product.priceCents, quantity:1 })} className="inline-flex items-center gap-2 border border-[var(--gold)]/70 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"><ShoppingBag size={13}/> Add</button></div></div></article>
}
