export type Track = { number:number; title:string; duration:string; style:string; lyric:string }
export const tracks: Track[] = [
  { number:1, title:"ROLLIN' STONE", duration:"4:12", style:"Soul Blues / Desert Rock", lyric:"You're out on your own..." },
  { number:2, title:"LOV3R", duration:"3:45", style:"Soul Blues", lyric:"I got a love that sets you free..." },
  { number:3, title:"M∆GIC M∆N", duration:"4:33", style:"Psychedelic Rock", lyric:"Big dreams working till my soul bleeds..." },
  { number:4, title:"SOUL OF GØLD", duration:"5:01", style:"Meditative Soul", lyric:"I'm playing for gold..." },
  { number:5, title:"PL3NTY OF TIⅯE", duration:"3:58", style:"Blues Shuffle", lyric:"Try to run but there's nowhere to hide..." },
  { number:6, title:"BE∆ST", duration:"3:29", style:"Electronic Anthem", lyric:"Get on your feet..." },
  { number:7, title:"JESUS S∆YS", duration:"4:15", style:"Gospel-Rock", lyric:"I've opened up my eyes now..." },
  { number:8, title:"∞ LOVE", duration:"6:12", style:"Epic Soul Ballad", lyric:"Feel Love, I Feel love all around..." },
  { number:9, title:"LIONS D3N", duration:"4:44", style:"Primal Percussion", lyric:"Won't open my eyes 'cause I don't need them to see..." },
  { number:10, title:"EVERGOLD", duration:"3:55", style:"Timeless Soul", lyric:"I'm feeling evergold..." },
  { number:11, title:"THINK SAY DO", duration:"3:33", style:"Rhythmic Protest", lyric:"Living in your own time..." },
  { number:12, title:"GREAT MYSTERY", duration:"5:44", style:"Atmospheric Finale", lyric:"Im a growing man..." },
  { number:13, title:"PARADISE", duration:"4:03", style:"Ambient Closure", lyric:"A cool breeze flows through my window..." },
]
export type SandabadoProduct = { id:string; name:string; detail:string; priceCents:number; category:"records" | "wear" | "objects"; image:string; badge?:string }
export const products: SandabadoProduct[] = [
  { id:"infinity-vinyl", name:"∞ LOVE Vinyl", detail:"180g black vinyl · Ships October 2026", priceCents:5000, category:"records", image:"/images/store/infinity-love-vinyl-v1.png", badge:"Limited to 100" },
  { id:"signed-infinity-vinyl", name:"Signed ∞ LOVE Vinyl", detail:"Hand-signed 180g black vinyl · Numbered edition", priceCents:7500, category:"records", image:"/images/store/infinity-love-vinyl-v1.png", badge:"Collector's edition" },
  { id:"infinity-cd", name:"∞ LOVE Compact Disc", detail:"Six-panel art wallet · Full album", priceCents:2000, category:"records", image:"/images/store/sandabado-objects-v1.png" },
  { id:"digital-album", name:"Digital Album", detail:"MP3 + FLAC · ∞ LOVE", priceCents:1500, category:"records", image:"/images/releases/sandabado-infinity-love.png" },
  { id:"sandabado-eclipse-tee", name:"Eclipse T-Shirt", detail:"Washed black heavyweight cotton · Gold front print", priceCents:3500, category:"wear", image:"/images/store/sandabado-eclipse-tee-v1.png", badge:"New" },
  { id:"sandabado-sticker-sheet", name:"Desert Signal Sticker Sheet", detail:"Six archival vinyl stickers · Weatherproof", priceCents:800, category:"objects", image:"/images/store/sandabado-objects-v1.png" },
  { id:"infinity-love-poster", name:"∞ LOVE Art Poster", detail:"18 × 24 in. art print · Heavy uncoated stock", priceCents:3000, category:"objects", image:"/images/store/sandabado-objects-v1.png" },
  { id:"infinity-bundle", name:"The First Chapter Set", detail:"Vinyl, CD, tee, poster, and sticker sheet", priceCents:12500, category:"objects", image:"/images/store/sandabado-merch-collection-v1.png", badge:"Best value" },
]
export const ticketTiers = [
  { id:"ga-ticket", name:"General Admission", detail:"Entry + Digital Album", priceCents:1100 },
  { id:"supporter-ticket", name:"Supporter", detail:"Entry + Vinyl + Feast", priceCents:11100 },
  { id:"vip-ticket", name:"VIP Sanctuary", detail:"Entry + Vinyl + Feast + Private Sound Session + Meet Jesse", priceCents:33300 },
] as const
