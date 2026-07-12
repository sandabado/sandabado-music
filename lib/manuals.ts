export type Manual = { slug:string; number:string; title:string; tagline:string; description:string; focus:string[] }

export const MANUALS: Manual[] = [
  { slug:"presence", number:"I", title:"Whole Body Presence", tagline:"Build the instrument.", description:"A field manual for returning to the physical body through breath, voice, movement, boundary, and embodied truth.", focus:["Somatic awareness", "The embodied voice", "Boundary practice", "Rituals of arrival"] },
  { slug:"signal", number:"II", title:"Signal & Breath", tagline:"Carry what is true.", description:"A practical system for clarifying the mind, shaping a message, and publishing without separating the signal from its source.", focus:["Signal architecture", "Editorial discipline", "Message compression", "Sovereign publishing"] },
  { slug:"cartography", number:"III", title:"Emotional Cartography", tagline:"Map the living water.", description:"Creative practices for understanding feeling, relationship, memory, and the emotional currents beneath your work.", focus:["Emotional mapping", "Creative flow", "Relational mirrors", "Art as integration"] },
  { slug:"foundation", number:"IV", title:"Foundation & Form", tagline:"Build what can hold.", description:"Systems, rituals, and structural practices for making a body of work durable enough to become a legacy.", focus:["Systems audit", "Container design", "Ritual architecture", "Legacy mapping"] },
  { slug:"guardian", number:"V", title:"The Guardian Axis", tagline:"Hold the whole.", description:"An integration manual for balanced charts and people called to facilitation, pattern recognition, and coherent leadership.", focus:["Four-body integration", "Pattern literacy", "Facilitation", "Release and renewal"] },
]
