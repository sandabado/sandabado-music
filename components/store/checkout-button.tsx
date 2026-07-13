"use client"

import { useState } from "react"
import type { CartItem } from "@/lib/store"

export function CheckoutButton({ items, className, children = "Checkout →" }: { items:CartItem[]; className?:string; children?:React.ReactNode }) {
  const [processing, setProcessing] = useState(false)
  async function checkout() { setProcessing(true); try { const response = await fetch("/api/checkout", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ items }) }); const payload = await response.json() as { checkoutUrl?:string; error?:string }; if (!response.ok || !payload.checkoutUrl) throw new Error(payload.error || "Checkout could not be started."); location.assign(payload.checkoutUrl) } catch (error) { alert(error instanceof Error ? error.message : "Checkout could not be started."); setProcessing(false) } }
  return <button onClick={checkout} disabled={!items.length || processing} className={className}>{processing ? "Opening checkout…" : children}</button>
}
