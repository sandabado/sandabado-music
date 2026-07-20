import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CartProvider } from "@/components/store/cart-context"
import { AudioPlayerProvider } from "@/components/sandabado/audio-player"

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sandabado.com"

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Sandābādo — ∞ LOVE",
  description: "∞ LOVE by Sandābādo. Soul blues, desert rock, and songs for the sacred wild.",
  openGraph: { title: "Sandābādo — ∞ LOVE", description: "The debut album. Coming September 26, 2026.", images: [{ url:"/og.png", width:1200, height:630, alt:"Sandābādo — ∞ LOVE, September 26, 2026" }] },
  twitter: { card:"summary_large_image", title:"Sandābādo — ∞ LOVE", description:"The debut album. Coming September 26, 2026.", images:["/og.png"] },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body className="flex min-h-screen flex-col"><CartProvider><AudioPlayerProvider><Navigation /><main className="flex-1 pt-16">{children}</main><Footer /></AudioPlayerProvider></CartProvider></body></html>
}
