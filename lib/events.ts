import type { PillarId } from "@/lib/constants"

export type WholeBodyEvent = {
  id: string
  title: string
  description: string | null
  pillar: PillarId | "all"
  format: "virtual" | "in-person"
  start_time: string
  end_time: string
  price_cents: number
  capacity: number | null
  location: string | null
}

export function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
}
