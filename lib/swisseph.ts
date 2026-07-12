import type { NatalChart } from "@/lib/reading-engine"

type BirthInput = { birthDate: string; birthTime?: string; birthPlace: string }

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

function toSign(longitude: number) {
  const normalized = ((longitude % 360) + 360) % 360
  return { sign: signs[Math.floor(normalized / 30)], degrees: normalized % 30 }
}

function opposite(point: { sign: string; degrees?: number }) {
  const index = signs.findIndex((sign) => sign.toLowerCase() === point.sign.toLowerCase())
  return toSign((Math.max(index, 0) * 30) + (point.degrees || 0) + 180)
}

function position(data: Record<string, unknown>, key: string) {
  const value = data[key] as Record<string, unknown> | undefined
  const longitude = Number(value?.longitude ?? value?.lon ?? 0)
  return { sign: String(value?.sign ?? toSign(longitude).sign), degrees: Number(value?.degrees ?? toSign(longitude).degrees) }
}

async function geocode(place: string) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`, { headers: { "User-Agent": "wholebodyearth-site/2.0" }, cache: "no-store" })
  const locations = (await response.json()) as Array<{ lat: string; lon: string }>
  if (!locations[0]) throw new Error("We could not locate that birthplace. Try including city and country.")
  return { lat: Number(locations[0].lat), lon: Number(locations[0].lon) }
}

export async function getNatalChart(input: BirthInput): Promise<NatalChart> {
  const apiUrl = process.env.SWISSEPH_API_URL
  if (!apiUrl) throw new Error("The chart service is not configured. Add SWISSEPH_API_URL to connect Swiss Ephemeris.")
  const { lat, lon } = await geocode(input.birthPlace)
  const [year, month, day] = input.birthDate.split("-").map(Number)
  const [hour = 12, minute = 0] = input.birthTime ? input.birthTime.split(":").map(Number) : []
  // The service must receive UTC. This longitude estimate is an intentional V1 fallback;
  // supply a timezone-aware service before presenting readings as professional advice.
  const utcHour = hour - Math.round(lon / 15) + minute / 60
  const params = new URLSearchParams({ year: String(year), month: String(month), day: String(day), hour: String(utcHour), lat: String(lat), lon: String(lon), houseSystem: "placidus" })
  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/natal?${params}`, { cache: "no-store" })
  if (!response.ok) throw new Error("The chart service is unavailable. Please try again shortly.")
  const data = (await response.json()) as Record<string, unknown>
  const planets = (data.planets || data.bodies || {}) as Record<string, unknown>
  const angles = data as Record<string, unknown>
  const ascendant = position(angles, "ascendant")
  const northNode = position(planets, "northNode")
  return {
    sun: position(planets, "sun"), moon: position(planets, "moon"), mercury: position(planets, "mercury"), venus: position(planets, "venus"), mars: position(planets, "mars"),
    ascendant, midheaven: position(angles, "midheaven"), descendant: angles.descendant ? position(angles, "descendant") : opposite(ascendant),
    northNode, southNode: planets.southNode ? position(planets, "southNode") : opposite(northNode),
  }
}
