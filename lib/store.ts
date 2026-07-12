export type StoreProduct = {
  id: string
  name: string
  description: string | null
  price_cents: number
  currency: string
  category: string | null
  pillar: string | null
  image_url: string | null
  inventory_count: number | null
  active: boolean
  created_at: string
}

export type CartItem = {
  productId: string
  name: string
  priceCents: number
  quantity: number
  imageUrl?: string | null
  pillar?: string | null
}

export type StoreOrderItem = {
  id: string
  name: string
  quantity: number
  price_cents: number
}

export type StoreOrder = {
  id: string
  status: "pending" | "paid" | "cancelled"
  total_cents: number
  currency: string
  created_at: string
  order_items?: StoreOrderItem[]
}

export function formatCurrency(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100)
}
