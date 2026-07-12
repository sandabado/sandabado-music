export type PillarId = "presence" | "press" | "studios" | "foundation" | "guardian"

export type Pillar = {
  id: PillarId
  name: string
  body: "Physical" | "Mental" | "Emotional" | "Spiritual" | "Etheral"
  element: "Fire" | "Air" | "Water" | "Earth" | "Ether"
  solid: "Tetrahedron" | "Octahedron" | "Icosahedron" | "Cube" | "Dodecahedron"
  solidFaces: number
  symbol: string
  color: string
  description: string
  shortDescription: string
  workshopFocus: string
  exercises: string[]
}

export const PILLARS: Pillar[] = [
  { id: "presence", name: "Presence", body: "Physical", element: "Fire", solid: "Tetrahedron", solidFaces: 4, symbol: "🜂", color: "#C2542D", shortDescription: "Embodiment, voice, and the physical vessel.", description: "Presence is the pillar of the body. It governs how you arrive in a room: your voice, posture, breath, and the grounded clarity of your physical yes and no.", workshopFocus: "Embodiment, voice, and somatic practice", exercises: ["Three-phase breath", "Vocal toning", "Walking meditation", "Boundary practice"] },
  { id: "press", name: "Press", body: "Mental", element: "Air", solid: "Octahedron", solidFaces: 8, symbol: "🜁", color: "#D4AF37", shortDescription: "Communication, publishing, and signal transmission.", description: "Press is the pillar of mind and message. It is how you think, write, speak, and shape a signal that can travel without becoming noise.", workshopFocus: "Communication, publishing, and signal clarity", exercises: ["One-sentence manifesto", "Concept compression", "Pitch practice", "Seven-day signal plan"] },
  { id: "studios", name: "Studios", body: "Emotional", element: "Water", solid: "Icosahedron", solidFaces: 20, symbol: "🜄", color: "#2BA8A0", shortDescription: "Creative flow, emotional processing, and relational art.", description: "Studios is the pillar of feeling and creation. It holds the alchemy of emotion, relationship, and the work that becomes possible when the heart has room to move.", workshopFocus: "Emotional processing and creative flow", exercises: ["Emotion colour map", "Stream creation", "Relational reflection", "Creative-block excavation"] },
  { id: "foundation", name: "Foundation", body: "Spiritual", element: "Earth", solid: "Cube", solidFaces: 6, symbol: "🜃", color: "#4A6741", shortDescription: "Structure, systems, and legacy architecture.", description: "Foundation is the pillar of rooted structure. It creates the rituals, systems, and containers that let the work endure beyond a single burst of energy.", workshopFocus: "Structure, systems thinking, and legacy planning", exercises: ["Life-system audit", "Daily ritual design", "Legacy document", "Container mapping"] },
  { id: "guardian", name: "Guardian", body: "Etheral", element: "Ether", solid: "Dodecahedron", solidFaces: 12, symbol: "☉", color: "#6D4AFF", shortDescription: "Synthesis, facilitation, and holding space for the whole.", description: "Guardian is the center axis of the quincunx. It activates when the four bodies are held in genuine balance, revealing the capacity to notice the whole pattern and hold a container for others.", workshopFocus: "Synthesis, facilitation, and integration", exercises: ["Four-direction check-in", "Whole-pattern audit", "Tension mapping", "Integration ritual"] },
]

export const PILLAR_BY_ID = Object.fromEntries(PILLARS.map((pillar) => [pillar.id, pillar])) as Record<PillarId, Pillar>

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/manuals", label: "Manuals" },
  { href: "/events", label: "Calendar" },
  { href: "/store", label: "Store" },
]
