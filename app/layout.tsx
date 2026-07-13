import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CartProvider } from "@/components/store/cart-context"
import { AudioPlayerProvider } from "@/components/sandabado/audio-player"

export const metadata: Metadata = {
  title: "Sandābādo — ∞ LOVE",
  description: "∞ LOVE by Sandābādo. Soul blues, desert rock, and songs for the sacred wild.",
  openGraph: { title: "Sandābādo — ∞ LOVE", description: "∞ LOVE — Coming September 26, 2026", images: ["/images/sandabado-album.jpg"] },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="flex min-h-screen flex-col"><CartProvider><AudioPlayerProvider><Navigation /><main className="flex-1 pt-16">{children}</main><Footer /></AudioPlayerProvider></CartProvider></body></html>
}
