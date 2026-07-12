import { NextResponse } from "next/server"
import { supabaseRequest } from "@/lib/supabase"
import type { WholeBodyEvent } from "@/lib/events"
export async function GET() { try { const now = new Date().toISOString(); const events = await supabaseRequest<WholeBodyEvent[]>(`/rest/v1/events?select=id,title,description,pillar,format,start_time,end_time,price_cents,capacity,location&start_time=gte.${encodeURIComponent(now)}&order=start_time.asc`, { method:"GET" }); return NextResponse.json({ events }) } catch { return NextResponse.json({ error:"Calendar unavailable" }, { status:503 }) } }
