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
    items: [{ name: "Silk Midi Dress", quantity: 1 }, { name: "Leather Tote", quantity: 1 }],
  },
  {
    id: "2",
    number: "#COV-00138",
    date: "2026-02-28T14:05:00Z",
    status: "processing" as const,
    total: 285,
    items: [{ name: "Cashmere Knit Top", quantity: 1 }],
  },
]

const STATUS_COLOR: Record<string, string> = {
  completed:  "#4A7C59",
  processing: "#C9A96E",
  cancelled:  "#B84040",
}

const QUICK_LINKS = [
  { href: "/account/orders",    label: "Orders",    sub: "Track and manage your orders", icon: OrdersIcon    },
  { href: "/account/profile",   label: "Profile",   sub: "Update your personal details",  icon: ProfileIcon   },
  { href: "/account/addresses", label: "Addresses", sub: "Manage your saved addresses",   icon: AddressIcon   },
  { href: "/account/wishlist",  label: "Wishlist",  sub: "Your saved pieces",             icon: HeartIcon     },
]

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !user) return null

  const firstName = user.firstName || "there"

  return (
    <AccountShell>
      {/* Greeting */}
      <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          marginBottom: "0.85rem",
        }}>Welcome back</p>
        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 300,
          color: "#111111",
          lineHeight: 1.1,
        }}>
          {firstName}
        </h1>
      </div>

      {/* Quick links */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
        marginBottom: "3rem",
      }} className="dash-cards">
        {QUICK_LINKS.map(({ href, label, sub, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="dash-card"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              padding: "1.5rem",
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.07)",
              textDecoration: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{
              width: "38px",
              height: "38px",
              border: "1px solid rgba(201,169,110,0.25)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--gold-dark)",
              flexShrink: 0,
            }}>
              <Icon />
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#111111",
                marginBottom: "0.3rem",
              }}>{label}</p>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.65rem",
                color: "#999999",
                lineHeight: 1.5,
              }}>{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.52rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888888",
          }}>Recent Orders</p>
          <Link href="/account/orders" style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.56rem",
            color: "var(--gold-dark)",
            textDecoration: "none",
          }}>View all</Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {MOCK_ORDERS.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.1rem 1.25rem",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                textDecoration: "none",
                gap: "1rem",
                flexWrap: "wrap",
                transition: "border-color 0.2s ease",
              }}
              className="dash-order-row"
            >
              <div>
                <p style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.05rem",
                  fontWeight: 300,
                  color: "#111111",
                  marginBottom: "0.2rem",
                }}>{order.number}</p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  color: "#AAAAAA",
                }}>{formatDate(order.date)}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <span style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.5rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: STATUS_COLOR[order.status] ?? "#888888",
                  padding: "0.25rem 0.65rem",
                  border: `1px solid ${STATUS_COLOR[order.status] ?? "rgba(0,0,0,0.12)"}`,
                  opacity: 0.9,
                }}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1rem",
                  color: "#333333",
                }}>{formatPrice(order.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dash-card:hover { border-color: rgba(201,169,110,0.35) !important; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
        .dash-order-row:hover { border-color: rgba(0,0,0,0.18) !important; }
        @media (max-width: 600px) { .dash-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </AccountShell>
  )
}

function OrdersIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg>
}
function ProfileIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
}
function AddressIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
}
function HeartIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
}
