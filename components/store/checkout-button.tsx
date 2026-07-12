"use client"

import { useState } from "react"
import type { CartItem } from "@/lib/store"

export function CheckoutButton({ items, className, children = "Checkout →" }: { items: CartItem[]; className?: string; children?: string }) {
  const [processing, setProcessing] = useState(false)

  async function checkout() {
    const token = localStorage.getItem("wb-access-token")
    if (!token) {
      location.assign("/login")
      return
    }
    setProcessing(true)
    try {
      const response = await fetch("/api/cart/checkout", { method:"POST", headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` }, body:JSON.stringify({ items }) })
      const payload = await response.json() as { checkoutUrl?: string; error?: string }
      if (!response.ok || !payload.checkoutUrl) throw new Error(payload.error || "Checkout could not be started.")
      location.assign(payload.checkoutUrl)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Checkout could not be started.")
      setProcessing(false)
    }
  }

  return <button onClick={checkout} disabled={!items.length || processing} className={className}>{processing ? "Opening checkout…" : children}</button>
}
