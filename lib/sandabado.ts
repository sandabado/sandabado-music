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
export const products = [
  { id:"digital-album", name:"Digital Album", detail:"MP3 + FLAC · ∞ LOVE", priceCents:1500 },
  { id:"infinity-vinyl", name:"∞ LOVE Vinyl", detail:"180g black vinyl · Ships Oct 2026", priceCents:5000 },
  { id:"infinity-bundle", name:"Digital + Vinyl Bundle", detail:"Both formats · Limited edition", priceCents:6000 },
  { id:"logo-tee", name:"Sandābādo T-Shirt", detail:"Logo tee · Black / Gold · Coming soon", priceCents:3500 },
] as const
export const ticketTiers = [
  { id:"ga-ticket", name:"General Admission", detail:"Entry + Digital Album", priceCents:1100 },
  { id:"supporter-ticket", name:"Supporter", detail:"Entry + Vinyl + Feast", priceCents:11100 },
  { id:"vip-ticket", name:"VIP Sanctuary", detail:"Entry + Vinyl + Feast + Private Sound Session + Meet Jesse", priceCents:33300 },
] as const
