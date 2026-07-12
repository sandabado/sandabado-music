import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CartProvider } from "@/components/store/cart-context"
import { ConsultationCTA } from "@/components/consultation-cta"

export const metadata: Metadata = { title: "wholebody.earth — Quincunx", description: "A network for sovereign creators. Five bodies, one living system." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><Navigation /><main className="min-h-screen pt-[7.2rem]">{children}<ConsultationCTA/></main><Footer /></CartProvider></body></html>
}
