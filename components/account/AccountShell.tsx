"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"

const NAV_ITEMS = [
  { href: "/account/dashboard", label: "Overview",  icon: OverviewIcon  },
  { href: "/account/orders",    label: "Orders",    icon: OrdersIcon    },
  { href: "/account/profile",   label: "Profile",   icon: ProfileIcon   },
  { href: "/account/addresses", label: "Addresses", icon: AddressIcon   },
  { href: "/account/wishlist",  label: "Wishlist",  icon: HeartIcon     },
]

interface Props { children: React.ReactNode }

export default function AccountShell({ children }: Props) {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push("/account/login")
  }

  const initials     = user ? `${user.firstName.charAt(0)}${(user.lastName ?? "").charAt(0)}`.toUpperCase() : "?"
  const displayName  = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : ""

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 3vw, 3rem)",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "start",
        }}
        className="acct-shell-grid"
      >

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside style={{ position: "sticky", top: "calc(var(--header-height) + 2rem)" }}>

          {/* Avatar + name */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            paddingBottom: "1.75rem",
            marginBottom: "1.75rem",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.4)",
              background: "rgba(201,169,110,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontWeight: 300,
              color: "var(--gold-dark)",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1rem",
                fontWeight: 300,
                color: "#111111",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {displayName}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                color: "#AAAAAA",
                marginTop: "0.15rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {user?.email}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/account/dashboard" && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className="acct-nav-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.65rem 0.75rem",
                    color: active ? "var(--gold-dark)" : "#666666",
                    background: active ? "rgba(201,169,110,0.07)" : "transparent",
                    borderLeft: `2px solid ${active ? "var(--gold)" : "transparent"}`,
                    textDecoration: "none",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    transition: "all 0.18s ease",
                  }}
                >
                  <Icon />
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Sign out */}
          <div style={{ marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
            <button
              onClick={handleLogout}
              className="acct-signout"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#AAAAAA",
                fontFamily: "var(--font-inter)",
                fontSize: "0.56rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.65rem 0.75rem",
                width: "100%",
                textAlign: "left",
                transition: "color 0.18s ease",
              }}
            >
              <SignOutIcon />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Page content ───────────────────────────────────────── */}
        <main style={{ minWidth: 0 }}>
          {children}
        </main>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .acct-shell-grid { grid-template-columns: 1fr !important; }
          aside { position: static !important; }
        }
        .acct-nav-link:hover { color: #333333 !important; background: rgba(0,0,0,0.03) !important; border-left-color: rgba(0,0,0,0.15) !important; }
        .acct-signout:hover { color: #555555 !important; }
      `}</style>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function OverviewIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function OrdersIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}
function ProfileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
function AddressIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function SignOutIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
