import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CartProvider } from "@/components/store/cart-context"

export const metadata: Metadata = { title: "wholebody.earth — Quincunx", description: "A network for sovereign creators. Five bodies, one living system." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="flex min-h-screen flex-col"><CartProvider><Navigation /><main className="flex-1 pt-[7.2rem]">{children}</main><Footer /></CartProvider></body></html>
}
