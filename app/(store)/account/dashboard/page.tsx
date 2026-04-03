"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"
import { formatPrice, formatDate } from "@/lib/utils"

// ─── Mock orders (scaffold) ───────────────────────────────────────────────────
// Replace with real fetch from /api/orders?customerId=… when backend is live.
const MOCK_ORDERS = [
  {
    id: "1",
    number: "#COV-00142",
    date: "2026-03-18T10:22:00Z",
    status: "completed" as const,
    total: 340,
    items: [{ name: "Slim Tailored Trousers", image: "", quantity: 1 }],
  },
  {
    id: "2",
    number: "#COV-00138",
    date: "2026-02-28T14:05:00Z",
    status: "processing" as const,
    total: 195,
    items: [{ name: "Merino Polo Shirt", image: "", quantity: 2 }],
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

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, addresses, savedItems } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !user) return <LoadingState />

  const firstName = user.firstName || "there"

  return (
    <AccountShell>
      {/* Page heading */}
      <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-dark)" }}>
        <p
          className="label-caps"
          style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}
        >
          Account Overview
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "var(--ivory)",
            lineHeight: 1.15,
          }}
        >
          Welcome back,{" "}
          <span style={{ fontStyle: "italic" }}>{firstName}</span>
        </h1>
      </div>

      {/* ── Quick-stat cards ─────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border-dark)",
          border: "1px solid var(--border-dark)",
          marginBottom: "3rem",
        }}
        className="max-sm:grid-cols-1"
      >
        {[
          { label: "Orders",    value: MOCK_ORDERS.length, href: "/account/orders"    },
          { label: "Addresses", value: addresses.length,   href: "/account/addresses" },
          { label: "Saved",     value: savedItems.length,  href: "/account/settings"  },
        ].map(({ label, value, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2.2rem 1.5rem",
              background: "var(--black)",
              textDecoration: "none",
              gap: "0.5rem",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,169,110,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--black)")}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 300,
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {value}
            </span>
            <span
              className="label-caps"
              style={{ fontSize: "0.42rem", letterSpacing: "0.3em", color: "var(--warm-grey)" }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Recent orders ────────────────────────────────────────── */}
      <section style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.3rem",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "var(--ivory)",
            }}
          >
            Recent orders
          </h2>
          <Link
            href="/account/orders"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}
          >
            View all →
          </Link>
        </div>

        {MOCK_ORDERS.length === 0 ? (
          <EmptyState
            icon={<OrdersEmptyIcon />}
            title="No orders yet"
            body="Your order history will appear here once you've made your first purchase."
            cta="Explore the Collection"
            href="/collections"
          />
        ) : (
          <div style={{ borderTop: "1px solid var(--border-dark)" }}>
            {MOCK_ORDERS.slice(0, 3).map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid var(--border-dark)",
                  gap: "1rem",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.05rem",
                      fontWeight: 300,
                      color: "var(--ivory)",
                      letterSpacing: "0.04em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {order.number}
                  </p>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.04em", color: "var(--warm-grey)" }}>
                    {formatDate(order.date)} · {order.items[0]?.name}
                    {order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
                  <span
                    className="label-caps"
                    style={{ fontSize: "0.4rem", letterSpacing: "0.2em", color: STATUS_COLOR[order.status] ?? "var(--warm-grey)" }}
                  >
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1rem",
                      fontWeight: 300,
                      color: "var(--off-white)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Address quick-view ───────────────────────────────────── */}
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.3rem",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "var(--ivory)",
            }}
          >
            Default address
          </h2>
          <Link
            href="/account/addresses"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}
          >
            Manage →
          </Link>
        </div>

        {addresses.filter((a) => a.isDefault).length === 0 ? (
          <EmptyState
            icon={<AddressEmptyIcon />}
            title="No address saved"
            body="Add a delivery address to speed up checkout."
            cta="Add Address"
            href="/account/addresses"
          />
        ) : (
          addresses
            .filter((a) => a.isDefault)
            .slice(0, 1)
            .map((addr) => (
              <div
                key={addr.id}
                style={{
                  border: "1px solid var(--border-dark)",
                  padding: "1.5rem",
                  position: "relative",
                }}
              >
                <span
                  className="label-caps"
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    fontSize: "0.38rem",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                  }}
                >
                  Default
                </span>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.03em", lineHeight: 1.7 }}>
                  {addr.firstName} {addr.lastName}<br />
                  {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                  {addr.city}, {addr.state} {addr.postcode}<br />
                  {addr.country}
                </p>
              </div>
            ))
        )}
      </section>
    </AccountShell>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function EmptyState({
  icon,
  title,
  body,
  cta,
  href,
}: {
  icon: React.ReactNode
  title: string
  body: string
  cta: string
  href: string
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border-dark)",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <div style={{ color: "rgba(201,169,110,0.35)", marginBottom: "0.5rem" }}>{icon}</div>
      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.1rem",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "var(--ivory)",
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey)", maxWidth: "280px", lineHeight: 1.8 }}>
        {body}
      </p>
      <Link
        href={href}
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
          transition: "background 0.3s ease",
          display: "inline-block",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-light)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
      >
        {cta}
      </Link>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="bg-[var(--black)] min-h-screen flex items-center justify-center" style={{ paddingTop: "72px" }}>
      <div
        style={{
          width: "28px", height: "28px",
          border: "1px solid rgba(201,169,110,0.2)",
          borderTopColor: "var(--gold)",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function OrdersEmptyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}

function AddressEmptyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
