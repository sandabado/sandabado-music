import { NextResponse } from "next/server"
import { supabaseRequest } from "@/lib/supabase"
import type { StoreProduct } from "@/lib/store"

export async function GET() {
  try {
    const products = await supabaseRequest<StoreProduct[]>("/rest/v1/products?select=*&active=eq.true&order=created_at.desc", { method:"GET" })
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error:"The catalog is unavailable." }, { status:503 })
  }
}
