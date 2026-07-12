import { ProductGrid } from "@/components/store/product-grid"
import { InternalHero, InternalPage } from "@/components/internal-page"
import { supabaseRequest } from "@/lib/supabase"
import type { StoreProduct } from "@/lib/store"

export default async function StorePage() {
  let products: StoreProduct[] = []
  try { products = await supabaseRequest<StoreProduct[]>("/rest/v1/products?select=*&active=eq.true&order=created_at.desc", { method:"GET" }) } catch { /* The empty state keeps the storefront usable before its first catalog sync. */ }
  return <InternalPage solid="icosahedron"><InternalHero eyebrow="Whole Body Store" title="Tools for the whole system.">Objects, editions, and practices made to accompany the work.</InternalHero><section className="px-6 py-16"><div className="mx-auto max-w-6xl"><ProductGrid products={products}/></div></section></InternalPage>
}
