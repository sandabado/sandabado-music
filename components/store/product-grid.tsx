"use client"

import { useMemo, useState } from "react"
import type { StoreProduct } from "@/lib/store"
import { ProductCard } from "./product-card"

const filters = ["all", "presence", "press", "studios", "foundation", "guardian"]

export function ProductGrid({ products }: { products: StoreProduct[] }) {
  const [filter, setFilter] = useState("all")
  const visibleProducts = useMemo(() => filter === "all" ? products : products.filter((product) => product.pillar === filter), [filter, products])
  return <>
    <div className="mb-9 flex flex-wrap justify-center gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`border px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.12em] transition ${filter === item ? "border-[var(--halo)] bg-[var(--halo)] text-[var(--void)]" : "border-[var(--mercury)] text-[var(--ghost)] hover:border-[var(--halo)]/60 hover:text-[var(--bone)]"}`}>{item}</button>)}</div>
    {visibleProducts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <p className="border border-dashed border-[var(--mercury)] py-14 text-center font-[family-name:var(--font-mono)] text-sm text-[var(--ghost)]">No products in this pillar yet.</p>}
  </>
}
