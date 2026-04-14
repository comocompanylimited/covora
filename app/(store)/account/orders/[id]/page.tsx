"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"

type OrderDetail = {
  number: string; date: string; status: string; statusColor: string;
  items: { name: string; size: string; quantity: number; price: string; bg: string }[];
  subtotal: string; shipping: string; total: string;
  address: { name: string; line1: string; line2?: string; city: string; postcode: string; country: string };
  payment: string;
}

const MOCK_ORDERS: Record<string, OrderDetail> = {
  "1": {
    number: "#COV-00142",
    date: "18 March 2026",
    status: "Completed",
    statusColor: "#4A7C59",
    items: [
      { name: "Silk Midi Dress",  size: "S",  quantity: 1, price: "£195.00", bg: "linear-gradient(155deg, #12101a, #1e1624)" },
      { name: "Leather Tote",     size: "—",  quantity: 1, price: "£145.00", bg: "linear-gradient(155deg, #141210, #1e1a14)" },
    ],
    subtotal: "£340.00",
    shipping: "Complimentary",
    total: "£340.00",
    address: { name: "Sarah Mitchell", line1: "14 Belgrave Square", line2: "Belgravia", city: "London", postcode: "SW1X 8PS", country: "United Kingdom" },
    payment: "Visa ending 4242",
  },
  "2": {
    number: "#COV-00138",
    date: "28 February 2026",
    status: "Processing",
    statusColor: "#C9A96E",
    items: [
      { name: "Cashmere Knit Top", size: "M", quantity: 1, price: "£285.00", bg: "linear-gradient(155deg, #1a1210, #241816)" },
    ],
    subtotal: "£285.00",
    shipping: "Complimentary",
    total: "£285.00",
    address: { name: "Sarah Mitchell", line1: "14 Belgrave Square", line2: "Belgravia", city: "London", postcode: "SW1X 8PS", country: "United Kingdom" },
    payment: "Visa ending 4242",
  },
  "3": {
    number: "#COV-00124",
    date: "14 January 2026",
    status: "Completed",
    statusColor: "#4A7C59",
    items: [
      { name: "Tailored Blazer",    size: "S",  quantity: 1, price: "£395.00", bg: "linear-gradient(155deg, #10120a, #1e1c14)" },
      { name: "Wide Leg Trousers",  size: "S",  quantity: 1, price: "£125.00", bg: "linear-gradient(155deg, #0a1012, #141e1c)" },
    ],
    subtotal: "£520.00",
    shipping: "Complimentary",
    total: "£520.00",
    address: { name: "Sarah Mitchell", line1: "14 Belgrave Square", line2: "Belgravia", city: "London", postcode: "SW1X 8PS", country: "United Kingdom" },
    payment: "Visa ending 4242",
  },
}

export default function OrderDetailPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return null

  const order = MOCK_ORDERS[orderId] ?? MOCK_ORDERS["1"]

  return (
    <AccountShell>
      <Link href="/account/orders" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontFamily: "var(--font-inter)",
        fontSize: "0.58rem",
        color: "#999999",
        textDecoration: "none",
        marginBottom: "2rem",
        letterSpacing: "0.08em",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#999999")}
      >
        ← Back to Orders
      </Link>

      {/* Heading */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "2rem",
        paddingBottom: "1.75rem",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
            marginBottom: "0.7rem",
          }}>Order Detail</p>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 300,
            color: "#111111",
            marginBottom: "0.35rem",
          }}>{order.number}</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#AAAAAA" }}>
            Placed on {order.date}
          </p>
        </div>
        <span style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.48rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: order.statusColor,
          padding: "0.3rem 0.8rem",
          border: `1px solid ${order.statusColor}`,
          alignSelf: "flex-start",
          opacity: 0.9,
        }}>
          {order.status}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }} className="order-detail-grid">

        {/* Items */}
        <div>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888888",
            marginBottom: "1rem",
          }}>Items</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {order.items.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1rem",
                padding: "1.25rem",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
              }}>
                <div style={{
                  width: "68px",
                  height: "85px",
                  background: item.bg,
                  flexShrink: 0,
                  border: "1px solid rgba(0,0,0,0.06)",
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "#111111",
                    marginBottom: "0.3rem",
                    fontWeight: 500,
                  }}>{item.name}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#AAAAAA", marginBottom: "0.6rem" }}>
                    {item.size !== "—" ? `Size: ${item.size} · ` : ""}Qty: {item.quantity}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#333333", fontWeight: 300 }}>
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>

          {/* Summary */}
          <div style={{ padding: "1.25rem 1.5rem", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ width: "100%", height: "2px", background: "var(--gold)", marginBottom: "1.25rem" }} />
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: "1rem",
            }}>Summary</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Subtotal", value: order.subtotal },
                { label: "Shipping", value: order.shipping },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#888888" }}>{row.label}</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#555555" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "0.35rem 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#111111", fontWeight: 500 }}>Total</span>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", color: "#111111", fontWeight: 300 }}>{order.total}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div style={{ padding: "1.25rem 1.5rem", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: "0.85rem",
            }}>Delivery Address</p>
            {[order.address.name, order.address.line1, order.address.line2, `${order.address.city}, ${order.address.postcode}`, order.address.country].filter(Boolean).map((line, i) => (
              <p key={i} style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#555555", lineHeight: 1.75 }}>{line}</p>
            ))}
          </div>

          {/* Payment */}
          <div style={{ padding: "1.25rem 1.5rem", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: "0.85rem",
            }}>Payment</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#555555" }}>{order.payment}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .order-detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </AccountShell>
  )
}
