"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { CartItem } from "@/lib/store"

type CartContextValue = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotalCents: number
}

const CartContext = createContext<CartContextValue | null>(null)
const CART_KEY = "wholebody-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      if (saved) setItems(JSON.parse(saved) as CartItem[])
    } catch {
      localStorage.removeItem(CART_KEY)
    } finally {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items, ready])

  const value = useMemo<CartContextValue>(() => ({
    items,
    addToCart: (item) => setItems((current) => {
      const existing = current.find((candidate) => candidate.productId === item.productId)
      return existing
        ? current.map((candidate) => candidate.productId === item.productId ? { ...candidate, quantity: Math.min(candidate.quantity + item.quantity, 99) } : candidate)
        : [...current, { ...item, quantity: Math.min(Math.max(item.quantity, 1), 99) }]
    }),
    removeFromCart: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
    updateQuantity: (productId, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.productId !== productId) : current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(quantity, 99) } : item)),
    clearCart: () => setItems([]),
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotalCents: items.reduce((total, item) => total + item.priceCents * item.quantity, 0),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
