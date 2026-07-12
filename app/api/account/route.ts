import { NextResponse } from "next/server"
import { getBearerToken, getUserFromToken } from "@/lib/supabase"
export async function GET(request: Request) { const user = await getUserFromToken(getBearerToken(request.headers.get("authorization"))); return user ? NextResponse.json({ id:user.id, email:user.email }) : NextResponse.json({ error:"Unauthorized" }, { status:401 }) }
