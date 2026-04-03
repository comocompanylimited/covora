"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"
import { formatPrice, formatDate } from "@/lib/utils"

// Scaffold mock orders — replace with real API fetch per customer
const MOCK_ORDERS = [
  {
    id: "1",
    number: "#COV-00142",
    date: "2026-03-18T10:22:00Z",
    status: "completed" as const,
    total: 340,
    items: [
      { name: "Slim Tailored Trousers", quantity: 1, price: 195 },
      { name: "Ribbed Polo Shirt",      quantity: 1, price: 145 },
    ],
  },
  {
    id: "2",
    number: "#COV-00138",
    date: "2026-02-28T14:05:00Z",
    status: "processing" as const,
    total: 195,
    items: [{ name: "Merino Polo Shirt", quantity: 2, price: 97.5 }],
  },
  {
    id: "3",
    number: "#COV-00124",
    date: "2026-01-14T09:48:00Z",
    status: "completed" as const,
    total: 520,
    items: [
      { name: "Cashmere Crewneck",   quantity: 1, price: 320 },
      { name: "Leather Card Holder", quantity: 1, price: 200 },
    ],
  },
]

const STATUS_LABEL: Record<string, string> = {
  completed:  "Completed",
  processing: "Processing",
  "on-hold":  "On Hold",
  cancelled:  "Cancelled",
  refunded:   "Refunded",
  pending:    "Pending",
  failed:     "Failed",
}
const STATUS_COLOR: Record<string, string> = {
  completed:  "rgba(110,180,110,0.8)",
  processing: "var(--gold)",
  "on-hold":  "var(--warm-grey)",
  cancelled:  "#c97a6e",
  refunded:   "var(--warm-grey)",
  pending:    "var(--warm-grey)",
  failed:     "#c97a6e",
}

export default function OrdersPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return null

  return (
    <AccountShell>
      {/* Heading */}
      <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-dark)" }}>
        <p
          className="label-caps"
          style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}
        >
          Order History
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "var(--ivory)",
          }}
        >
          Your orders
        </h1>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        /* ── Empty state ── */
        <div
          style={{
            border: "1px solid var(--border-dark)",
            padding: "5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            textAlign: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.35)" strokeWidth="1">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
          </svg>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.04em" }}>
            No orders yet
          </p>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey)", maxWidth: "280px", lineHeight: 1.8 }}>
            Your order history will appear here once you've made a purchase.
          </p>
          <Link
            href="/collections"
            style={{
              marginTop: "0.5rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.55rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--black)",
              background: "var(--gold)",
              padding: "0.75rem 1.8rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Explore the Collection
          </Link>
        </div>
      ) : (
        /* ── Orders list ── */
        <div style={{ borderTop: "1px solid var(--border-dark)" }}>
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              style={{
                borderBottom: "1px solid var(--border-dark)",
                padding: "1.8rem 0",
              }}
            >
              {/* Order header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "1.2rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      color: "var(--ivory)",
                      letterSpacing: "0.04em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {order.number}
                  </p>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.04em", color: "var(--warm-grey)" }}>
                    {formatDate(order.date)}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
                  <span
                    className="label-caps"
                    style={{
                      fontSize: "0.4rem",
                      letterSpacing: "0.2em",
                      color: STATUS_COLOR[order.status] ?? "var(--warm-grey)",
                      padding: "0.3rem 0.7rem",
                      border: `1px solid ${STATUS_COLOR[order.status] ?? "var(--warm-grey)"}`,
                      opacity: 0.9,
                    }}
                  >
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.15rem",
                      fontWeight: 300,
                      color: "var(--ivory)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: "0.8rem",
                      borderLeft: "1px solid rgba(201,169,110,0.15)",
                    }}
                  >
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey)", lineHeight: 1.6 }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey-light)" }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  )
}
