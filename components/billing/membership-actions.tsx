"use client"

import { useState } from "react"

export function MembershipCheckoutButton({ interval, children, className }: { interval: "monthly" | "annual"; children: string; className?: string }) {
  const [loading, setLoading] = useState(false)

  async function checkout() {
    const token = localStorage.getItem("wb-access-token")
    if (!token) { location.assign("/login"); return }
    setLoading(true)
    try {
      const response = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ interval }) })
      const payload = await response.json() as { checkoutUrl?: string; error?: string }
      if (!response.ok || !payload.checkoutUrl) throw new Error(payload.error || "Membership checkout could not be started.")
      location.assign(payload.checkoutUrl)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Membership checkout could not be started.")
      setLoading(false)
    }
  }

  return <button onClick={checkout} disabled={loading} className={className}>{loading ? "Opening checkout…" : children}</button>
}

export function ManageMembershipButton() {
  const [loading, setLoading] = useState(false)

  async function openPortal() {
    const token = localStorage.getItem("wb-access-token")
    if (!token) { location.assign("/login"); return }
    setLoading(true)
    try {
      const response = await fetch("/api/billing/portal", { method: "POST", headers: { Authorization: `Bearer ${token}` } })
      const payload = await response.json() as { portalUrl?: string; error?: string }
      if (!response.ok || !payload.portalUrl) throw new Error(payload.error || "The billing portal could not be opened.")
      location.assign(payload.portalUrl)
    } catch (error) {
      alert(error instanceof Error ? error.message : "The billing portal could not be opened.")
      setLoading(false)
    }
  }

  return <button onClick={openPortal} disabled={loading} className="mt-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[.12em] text-[var(--halo)] transition hover:text-[var(--bone)]">{loading ? "Opening portal…" : "Manage membership"}</button>
}
