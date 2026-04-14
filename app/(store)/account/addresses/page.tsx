"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"

interface Address {
  id: string
  label: string
  name: string
  line1: string
  line2?: string
  city: string
  postcode: string
  country: string
  isDefault: boolean
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: "1",
    label: "Home",
    name: "Sarah Mitchell",
    line1: "14 Belgrave Square",
    line2: "Belgravia",
    city: "London",
    postcode: "SW1X 8PS",
    country: "United Kingdom",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    name: "Sarah Mitchell",
    line1: "30 St Mary Axe",
    city: "London",
    postcode: "EC3A 8BF",
    country: "United Kingdom",
    isDefault: false,
  },
]

const INPUT: React.CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.14)",
  borderRadius: 0,
  padding: "0.72rem 0.85rem",
  fontFamily: "var(--font-inter)",
  fontSize: "0.78rem",
  color: "#111111",
  outline: "none",
  boxSizing: "border-box" as const,
}

const LABEL: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-inter)",
  fontSize: "0.5rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#888888",
  marginBottom: "0.4rem",
}

export default function AddressesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES)
  const [showForm, setShowForm]   = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return null

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  return (
    <AccountShell>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "2.25rem",
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
            marginBottom: "0.85rem",
          }}>My Account</p>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 300,
            color: "#111111",
            lineHeight: 1.1,
          }}>Saved Addresses</h1>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.54rem",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: showForm ? "#FFFFFF" : "#333333",
            background: showForm ? "#111111" : "transparent",
            border: "1px solid rgba(0,0,0,0.2)",
            padding: "0.7rem 1.5rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {showForm ? "Cancel" : "+ Add Address"}
        </button>
      </div>

      {/* Add address form */}
      {showForm && (
        <div style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.07)",
          padding: "1.75rem",
          marginBottom: "2rem",
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.15rem",
            fontWeight: 300,
            color: "#333333",
            marginBottom: "1.25rem",
          }}>New Address</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}
            style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div>
                <label style={LABEL}>Label (e.g. Home)</label>
                <input type="text" style={INPUT} className="addr-input" placeholder="Home" />
              </div>
              <div>
                <label style={LABEL}>Full Name</label>
                <input type="text" style={INPUT} className="addr-input" placeholder="Jane Smith" />
              </div>
            </div>
            <div>
              <label style={LABEL}>Address Line 1</label>
              <input type="text" style={INPUT} className="addr-input" placeholder="123 Mayfair Street" />
            </div>
            <div>
              <label style={LABEL}>Address Line 2 (optional)</label>
              <input type="text" style={INPUT} className="addr-input" placeholder="Apartment, floor, etc." />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.85rem" }}>
              <div>
                <label style={LABEL}>City</label>
                <input type="text" style={INPUT} className="addr-input" placeholder="London" />
              </div>
              <div>
                <label style={LABEL}>Postcode</label>
                <input type="text" style={INPUT} className="addr-input" placeholder="W1K 1AA" />
              </div>
              <div>
                <label style={LABEL}>Country</label>
                <input type="text" style={INPUT} className="addr-input" placeholder="United Kingdom" />
              </div>
            </div>
            <div style={{ paddingTop: "0.5rem" }}>
              <button type="submit" style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.56rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: "#111111",
                border: "none",
                padding: "0.85rem 2rem",
                cursor: "pointer",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address list */}
      {addresses.length === 0 ? (
        <div style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.07)",
          padding: "4rem 2rem",
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "#555555", marginBottom: "0.5rem" }}>
            No saved addresses
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", color: "#AAAAAA" }}>
            Add an address to speed up checkout.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="addr-grid">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${addr.isDefault ? "rgba(201,169,110,0.4)" : "rgba(0,0,0,0.07)"}`,
                padding: "1.5rem",
                position: "relative",
              }}
            >
              {/* Label + default badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.54rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#333333",
                }}>{addr.label}</span>
                {addr.isDefault && (
                  <span style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.46rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--gold-dark)",
                    padding: "0.2rem 0.55rem",
                    border: "1px solid rgba(201,169,110,0.4)",
                  }}>Default</span>
                )}
              </div>

              {/* Address lines */}
              <div style={{ marginBottom: "1.25rem" }}>
                {[addr.name, addr.line1, addr.line2, `${addr.city}, ${addr.postcode}`, addr.country].filter(Boolean).map((line, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.68rem",
                    color: "#555555",
                    lineHeight: 1.75,
                  }}>{line}</p>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.52rem",
                      color: "#777777",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      letterSpacing: "0.06em",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(addr.id)}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.52rem",
                    color: "#BBBBBB",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    letterSpacing: "0.06em",
                    marginLeft: "auto",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B84040")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#BBBBBB")}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) { .addr-grid { grid-template-columns: 1fr !important; } }
        .addr-input:focus { border-color: var(--gold) !important; outline: none; }
        .addr-input:hover { border-color: rgba(0,0,0,0.28) !important; }
        .addr-input::placeholder { color: #CCCCCC; }
      `}</style>
    </AccountShell>
  )
}
