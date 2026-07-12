import { NextResponse } from "next/server"
import { getBearerToken, getUserFromToken, supabaseRequest } from "@/lib/supabase"
import type { StoreOrder } from "@/lib/store"

export async function GET(request: Request) {
  const accessToken = getBearerToken(request.headers.get("authorization"))
  const user = await getUserFromToken(accessToken)
  if (!user || !accessToken) return NextResponse.json({ error:"Unauthorized" }, { status:401 })
  try {
    const orders = await supabaseRequest<StoreOrder[]>(`/rest/v1/orders?select=*,order_items(*)&user_id=eq.${encodeURIComponent(user.id)}&order=created_at.desc`, { method:"GET" }, accessToken)
    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ error:"Order history is unavailable." }, { status:503 })
  }
}
