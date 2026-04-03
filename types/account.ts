// ─── Account & Auth Types ─────────────────────────────────────────────────────
// Scaffold: matches the shape a real backend (WooCommerce customers API,
// NextAuth session, etc.) would return. Swap implementations without changing
// consumer code.

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatarUrl?: string
  createdAt: string // ISO 8601
}

export interface Address {
  id: string
  label: string          // "Home", "Work", "Other"
  firstName: string
  lastName: string
  company?: string
  line1: string
  line2?: string
  city: string
  state: string
  postcode: string
  country: string        // ISO 3166-1 alpha-2, e.g. "GB"
  isDefault: boolean
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "on-hold"
  | "completed"
  | "cancelled"
  | "refunded"
  | "failed"

export interface OrderItem {
  productId: number
  variationId?: number
  name: string
  slug: string
  image: string
  imageAlt?: string
  quantity: number
  price: number             // per-unit price in GBP
  attributes: Record<string, string>
}

export interface Order {
  id: string
  number: string            // human-readable, e.g. "#COV-00142"
  date: string              // ISO 8601
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: Omit<Address, "id" | "label" | "isDefault">
  trackingNumber?: string
  trackingUrl?: string
}

export interface SavedItem {
  productId: number
  name: string
  slug: string
  image: string
  imageAlt?: string
  price: number
  savedAt: string           // ISO 8601
}

// ─── Auth context shape ───────────────────────────────────────────────────────

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface SignUpPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginPayload {
  email: string
  password: string
}
