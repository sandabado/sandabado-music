"use client"

import { PILLARS } from "@/lib/constants"
import type { CSSProperties } from "react"
import { formatCurrency, type StoreProduct } from "@/lib/store"
import { useCart } from "./cart-context"

export function ProductCard({ product }: { product: StoreProduct }) {
  const { addToCart } = useCart()
  const pillar = product.pillar ? PILLARS.find((item) => item.id === product.pillar) : undefined

  return <article className="group border border-[var(--mercury)] bg-[var(--carbon)]/84 p-4 transition hover:-translate-y-1 hover:border-[var(--halo)]/60">
    <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-[var(--mercury)] bg-[radial-gradient(circle_at_center,var(--pillar-color,#6D4AFF)_0%,transparent_68%)]" style={{ "--pillar-color":pillar?.color || "#C9A227" } as CSSProperties}>
      {product.image_url ? <img src={product.image_url} alt={product.name} className="absolute inset-0 h-full w-full object-cover opacity-90" /> : <span className="font-[family-name:var(--font-display)] text-6xl text-[var(--bone)]/75">{pillar?.symbol || "☉"}</span>}
      {pillar ? <span className="absolute bottom-3 right-3 border border-current/40 bg-[var(--void)]/75 px-2 py-1 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[.14em]" style={{ color:pillar.color }}>{pillar.name}</span> : null}
    </div>
    <div className="pt-4">
      <div className="flex items-start justify-between gap-3"><h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--bone)]">{product.name}</h2><span className="shrink-0 font-[family-name:var(--font-mono)] text-sm text-[var(--halo)]">{formatCurrency(product.price_cents, product.currency)}</span></div>
      {product.description ? <p className="mt-3 min-h-10 text-sm leading-6 text-[var(--bone)]/62">{product.description}</p> : null}
      <button onClick={() => addToCart({ productId:product.id, name:product.name, priceCents:product.price_cents, quantity:1, imageUrl:product.image_url, pillar:product.pillar })} className="mt-5 w-full border border-[var(--halo)] bg-[var(--halo)]/10 px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[.15em] text-[var(--halo)] transition hover:bg-[var(--halo)] hover:text-[var(--void)]">Add to cart</button>
    </div>
  </article>
}
