"use client"

import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/store/cart-context"
import { formatCurrency } from "@/lib/store"
import type { SandabadoProduct } from "@/lib/sandabado"

export function ProductCard({ product, priority = false }: { product:SandabadoProduct; priority?:boolean }) {
  const { addToCart } = useCart()
  return <article className="group overflow-hidden border border-[var(--cream)]/15 bg-[#0c0c12]/80 transition duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/60 hover:shadow-[0_22px_52px_rgba(0,0,0,.35)]"><div className="relative aspect-[4/5] overflow-hidden bg-black"><Image priority={priority} src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-100"/><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"/>{product.badge ? <span className="absolute left-3 top-3 bg-[var(--gold)] px-2 py-1 text-[9px] font-semibold uppercase tracking-[.14em] text-[var(--obsidian)]">{product.badge}</span> : null}<span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[.18em] text-white/80">{product.category}</span></div><div className="p-5"><h2 className="font-[family-name:var(--font-display)] text-2xl">{product.name}</h2><p className="mt-2 min-h-10 text-sm leading-5 text-[var(--cream)]/60">{product.detail}</p><div className="mt-5 flex items-center justify-between gap-3"><span className="font-[family-name:var(--font-display)] text-xl text-[var(--gold)]">{formatCurrency(product.priceCents)}</span><button onClick={() => addToCart({ productId:product.id, name:product.name, priceCents:product.priceCents, quantity:1, imageUrl:product.image })} className="inline-flex items-center gap-2 border border-[var(--gold)]/70 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"><ShoppingBag size={13}/> Add</button></div></div></article>
}
