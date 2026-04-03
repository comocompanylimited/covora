"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"

// ─── Account layout shell ─────────────────────────────────────────────────────
// Renders the left sidebar + right content area for all authenticated account
// pages. Auth pages (login/signup/forgot-password) do NOT use this shell.

const NAV_ITEMS = [
  { href: "/account/dashboard", label: "Overview",   icon: OverviewIcon },
  { href: "/account/orders",    label: "Orders",      icon: OrdersIcon   },
  { href: "/account/addresses", label: "Addresses",   icon: AddressIcon  },
  { href: "/account/settings",  label: "Settings",    icon: SettingsIcon },
]

interface Props {
  children: React.ReactNode
}

export default function AccountShell({ children }: Props) {
  const pathname  = usePathname()
  const router    = useRouter()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push("/account/login")
  }

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0) || ""}`.toUpperCase()
    : "?"

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ")
    : ""

  return (
    <div
      className="bg-[var(--black)] min-h-screen"
      style={{ paddingTop: "72px" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 3vw, 3rem)",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "clamp(2rem, 4vw, 5rem)",
          alignItems: "start",
        }}
        className="max-lg:grid-cols-1"
      >

        {/* ── Sidebar ───────────────────────────────────────────────── */}
        <aside
          style={{
            position: "sticky",
            top: "calc(72px + 2rem)",
          }}
        >
          {/* Avatar + name block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1rem",
              paddingBottom: "2rem",
              marginBottom: "2rem",
              borderBottom: "1px solid var(--border-dark)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid rgba(201,169,110,0.35)",
                background: "rgba(201,169,110,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.15rem",
                fontWeight: 300,
                color: "var(--gold)",
                letterSpacing: "0.06em",
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.1rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  color: "var(--ivory)",
                  lineHeight: 1.2,
                }}
              >
                {displayName}
              </p>
              <p
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.04em",
                  color: "var(--warm-grey)",
                  marginTop: "0.2rem",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/")
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 0.8rem",
                    borderRadius: "0",
                    color: active ? "var(--gold)" : "var(--warm-grey)",
                    background: active ? "rgba(201,169,110,0.05)" : "transparent",
                    borderLeft: active
                      ? "1px solid rgba(201,169,110,0.5)"
                      : "1px solid transparent",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "var(--off-white)"
                      ;(e.currentTarget as HTMLElement).style.borderLeftColor = "rgba(201,169,110,0.2)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      ;(e.currentTarget as HTMLElement).style.color = "var(--warm-grey)"
                      ;(e.currentTarget as HTMLElement).style.borderLeftColor = "transparent"
                    }
                  }}
                >
                  <Icon />
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Sign out */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-dark)",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--warm-grey-dark)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.7rem 0.8rem",
                width: "100%",
                textAlign: "left",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey-dark)")}
            >
              <SignOutIcon />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Page content ──────────────────────────────────────────── */}
        <main style={{ minWidth: 0 }}>
          {children}
        </main>

      </div>
    </div>
  )
}

// ─── Sidebar icons (16×16) ────────────────────────────────────────────────────

function OverviewIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function OrdersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}

function AddressIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function SignOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
