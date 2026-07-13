import { ProductCard } from "@/components/sandabado/product-card"
import { products } from "@/lib/sandabado"

export const metadata = { title:"Store — Sandābādo" }
export default function StorePage() { return <div className="star-field min-h-screen px-6 py-16"><div className="mx-auto max-w-6xl"><p className="text-[10px] uppercase tracking-[.25em] text-[var(--gold)]">Whole Body Records</p><h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl sm:text-6xl">The ∞ LOVE Store</h1><p className="mt-4 max-w-xl leading-7 text-[var(--cream)]/65">Limited objects for the first chapter. Vinyl quantities are held to 100.</p><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((product,index) => <ProductCard key={product.id} product={product} priority={index < 2}/>)}</div></div></div> }
