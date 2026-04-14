"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"
import { formatPrice, formatDate } from "@/lib/utils"

const MOCK_ORDERS = [
  {
    id: "1",
    number: "#COV-00142",
    date: "2026-03-18T10:22:00Z",
    status: "completed" as const,
    total: 340,
    items: [
      { name: "Silk Midi Dress",  quantity: 1, price: 195 },
      { name: "Leather Tote",     quantity: 1, price: 145 },
    ],
  },
  {
    id: "2",
    number: "#COV-00138",
    date: "2026-02-28T14:05:00Z",
    status: "processing" as const,
    total: 285,
    items: [{ name: "Cashmere Knit Top", quantity: 1, price: 285 }],
  },
  {
    id: "3",
    number: "#COV-00124",
    date: "2026-01-14T09:48:00Z",
    status: "completed" as const,
    total: 520,
    items: [
      { name: "Tailored Blazer",    quantity: 1, price: 395 },
      { name: "Wide Leg Trousers",  quantity: 1, price: 125 },
    ],
  },
]

const STATUS_COLOR: Record<string, string> = {
  completed:  "#4A7C59",
  processing: "#C9A96E",
  cancelled:  "#B84040",
  refunded:   "#888888",
  pending:    "#888888",
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
      <div style={{ marginBottom: "2.25rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          marginBottom: "0.85rem",
        }}>Order History</p>
        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 300,
          color: "#111111",
          lineHeight: 1.1,
        }}>Your Orders</h1>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        <div style={{
          border: "1px solid rgba(0,0,0,0.07)",
          background: "#FFFFFF",
          padding: "5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.1rem",
          textAlign: "center",
        }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 300, color: "#333333" }}>
            No orders yet
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", color: "#AAAAAA", lineHeight: 1.7, maxWidth: "260px" }}>
            Your order history will appear here once you've made a purchase.
          </p>
          <Link href="/shop" style={{
            marginTop: "0.5rem",
            fontFamily: "var(--font-inter)", fontSize: "0.56rem",
            fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#FFFFFF", background: "#111111", padding: "0.85rem 2rem",
            textDecoration: "none",
          }}>
            Shop Now
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {MOCK_ORDERS.map((order, idx) => (
            <div
              key={order.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                borderBottom: idx < MOCK_ORDERS.length - 1 ? "none" : "1px solid rgba(0,0,0,0.07)",
                padding: "1.5rem 1.75rem",
              }}
            >
              {/* Order header */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}>
                <div>
                  <Link href={`/account/orders/${order.id}`} style={{ textDecoration: "none" }}>
                    <p style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.15rem",
                      fontWeight: 300,
                      color: "#111111",
                      marginBottom: "0.25rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111111")}
                    >{order.number}</p>
                  </Link>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#AAAAAA" }}>
                    {formatDate(order.date)}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }}>
                  <span style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.48rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: STATUS_COLOR[order.status] ?? "#888888",
                    padding: "0.25rem 0.7rem",
                    border: `1px solid ${STATUS_COLOR[order.status] ?? "rgba(0,0,0,0.12)"}`,
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#333333" }}>
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1.1rem" }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: "0.85rem",
                    borderLeft: "1px solid rgba(201,169,110,0.2)",
                  }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#777777" }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#555555" }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Link href={`/account/orders/${order.id}`} style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.52rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#555555",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555555")}
              >
                View Order Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  )
}
