"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { InternalHero, InternalPage, InternalPanel } from "@/components/internal-page"
import { formatCurrency, type StoreOrder } from "@/lib/store"

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [orders, setOrders] = useState<StoreOrder[]>([])
  const [ordersMessage, setOrdersMessage] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("wb-access-token")
    if (!token) { location.assign("/login"); return }
    const headers = { Authorization:`Bearer ${token}` }
    Promise.all([fetch("/api/account", { headers }), fetch("/api/orders", { headers })]).then(async ([accountResponse, ordersResponse]) => {
      if (!accountResponse.ok) throw new Error("Unauthorized")
      const account = await accountResponse.json() as { email: string }
      setEmail(account.email)
      if (ordersResponse.ok) {
        const payload = await ordersResponse.json() as { orders: StoreOrder[] }
        setOrders(payload.orders)
      } else setOrdersMessage("Order history will appear here once the store is connected.")
    }).catch(() => location.assign("/login"))
  }, [])

  const cards = [["/reading","Your reading","Discover or revisit your Whole Body Design."],["/manuals","Your manuals","Enter the Whole Body field manual library."],["/events","Your gatherings","Reserve a place in workshops and circles."],["/store","The store","Objects and editions for the work."]]
  return <InternalPage solid="dodecahedron"><InternalHero eyebrow="Member Dashboard" title={email ? `Welcome, ${email}` : "Opening your space…"}>Your private library inside the Whole Body constellation.</InternalHero><section className="px-6 py-16"><div className="mx-auto max-w-4xl"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([href,title,body]) => <Link href={href} key={href}><InternalPanel className="h-full transition hover:-translate-y-1 hover:border-[var(--halo)]/50"><p className="font-[family-name:var(--font-display)] text-2xl text-[var(--halo)]">{title}</p><p className="mt-3 text-sm leading-6 text-[var(--bone)]/62">{body}</p></InternalPanel></Link>)}</div><section className="mt-14 border-t border-[var(--mercury)] pt-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.18em] text-[var(--halo)]">Store</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl">Order history</h2></div><Link href="/store" className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.14em] text-[var(--halo)]">Visit the store →</Link></div>{ordersMessage ? <p className="mt-6 text-sm text-[var(--ghost)]">{ordersMessage}</p> : orders.length ? <div className="mt-6 space-y-3">{orders.map((order) => <article key={order.id} className="border border-[var(--mercury)] bg-[var(--carbon)]/60 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-[family-name:var(--font-display)] text-lg">{new Date(order.created_at).toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" })}</p><p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.12em] text-[var(--ghost)]">{order.order_items?.map((item) => `${item.quantity} × ${item.name}`).join(" · ") || "Order"}</p></div><div className="text-right"><p className="font-[family-name:var(--font-display)] text-xl text-[var(--halo)]">{formatCurrency(order.total_cents, order.currency)}</p><p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.12em] text-[var(--flux)]">{order.status}</p></div></div></article>)}</div> : <p className="mt-6 text-sm text-[var(--ghost)]">Your completed store orders will appear here.</p>}</section></div></section></InternalPage>
}
