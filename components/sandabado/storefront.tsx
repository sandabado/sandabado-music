"use client"

import { useMemo, useState } from "react"
import { ProductCard } from "@/components/sandabado/product-card"
import type { SandabadoProduct } from "@/lib/sandabado"

const filters = ["all", "records", "wear", "objects"] as const

export function Storefront({ products }: { products:SandabadoProduct[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all")
  const visible = useMemo(() => filter === "all" ? products : products.filter((product) => product.category === filter), [filter, products])
  return <><div className="flex flex-wrap justify-center gap-2">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[.16em] transition ${filter === item ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--obsidian)]" : "border-white/20 text-[var(--cream)]/70 hover:border-[var(--gold)]/70 hover:text-[var(--gold)]"}`}>{item === "all" ? "Everything" : item}</button>)}</div><p className="mt-6 text-center text-xs uppercase tracking-[.14em] text-[var(--cream)]/45">{visible.length} pieces in this collection</p><div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visible.map((product,index) => <ProductCard key={product.id} product={product} priority={index < 2}/>)}</div></>
}
