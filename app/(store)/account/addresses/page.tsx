"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"
import type { Address } from "@/types/account"

export default function AddressesPage() {
  const { isAuthenticated, isLoading, addresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAuth()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState<Address | null>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return null

  function handleAdd(data: Omit<Address, "id">) {
    addAddress(data)
    setShowForm(false)
  }

  function handleUpdate(data: Omit<Address, "id">) {
    if (!editing) return
    updateAddress(editing.id, data)
    setEditing(null)
  }

  return (
    <AccountShell>
      {/* Heading */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "2.5rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border-dark)",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            className="label-caps"
            style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}
          >
            Address Book
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
            Delivery addresses
          </h1>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.55rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--black)",
            background: "var(--gold)",
            border: "none",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            transition: "background 0.3s ease",
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-light)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
        >
          + Add address
        </button>
      </div>

      {/* Address form (shown inline when adding/editing) */}
      {(showForm || editing) && (
        <div style={{ border: "1px solid var(--border-dark)", padding: "2rem", marginBottom: "2rem" }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.1rem",
              fontWeight: 300,
              color: "var(--ivory)",
              letterSpacing: "0.04em",
              marginBottom: "2rem",
            }}
          >
            {editing ? "Edit address" : "New address"}
          </p>
          <AddressForm
            initial={editing ?? undefined}
            onSave={editing ? handleUpdate : handleAdd}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {/* Addresses grid */}
      {addresses.length === 0 && !showForm ? (
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
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.04em" }}>
            No addresses saved
          </p>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey)", maxWidth: "280px", lineHeight: 1.8 }}>
            Add a delivery address to make checkout faster and easier.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--border-dark)",
          }}
        >
          {addresses.map((addr) => (
            <div
              key={addr.id}
              style={{
                background: "var(--black)",
                border: addr.isDefault ? "1px solid rgba(201,169,110,0.25)" : "none",
                padding: "1.8rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Label + default badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.55rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--off-white)",
                  }}
                >
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span
                    className="label-caps"
                    style={{
                      fontSize: "0.38rem",
                      letterSpacing: "0.2em",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,169,110,0.35)",
                      padding: "0.15rem 0.5rem",
                    }}
                  >
                    Default
                  </span>
                )}
              </div>

              {/* Address block */}
              <address
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  fontStyle: "normal",
                  color: "var(--warm-grey-light)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.8,
                  flex: 1,
                }}
              >
                {addr.firstName} {addr.lastName}<br />
                {addr.company && <>{addr.company}<br /></>}
                {addr.line1}<br />
                {addr.line2 && <>{addr.line2}<br /></>}
                {addr.city}, {addr.state} {addr.postcode}<br />
                {addr.country}
              </address>

              {/* Actions */}
              <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-dark)" }}>
                <button
                  onClick={() => { setEditing(addr); setShowForm(false) }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "var(--font-inter)", fontSize: "0.55rem",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "var(--warm-grey)", transition: "color 0.2s ease", padding: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey)")}
                >
                  Edit
                </button>
                {!addr.isDefault && (
                  <>
                    <span style={{ width: "1px", height: "12px", background: "var(--border-dark)", alignSelf: "center" }} />
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-inter)", fontSize: "0.55rem",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "var(--warm-grey)", transition: "color 0.2s ease", padding: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey)")}
                    >
                      Set default
                    </button>
                    <span style={{ width: "1px", height: "12px", background: "var(--border-dark)", alignSelf: "center" }} />
                    <button
                      onClick={() => removeAddress(addr.id)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-inter)", fontSize: "0.55rem",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "var(--warm-grey-dark)", transition: "color 0.2s ease", padding: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c97a6e")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey-dark)")}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  )
}

// ─── Address form ─────────────────────────────────────────────────────────────

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Address
  onSave: (data: Omit<Address, "id">) => void
  onCancel: () => void
}) {
  const [label,     setLabel]     = useState(initial?.label     ?? "Home")
  const [firstName, setFirstName] = useState(initial?.firstName ?? "")
  const [lastName,  setLastName]  = useState(initial?.lastName  ?? "")
  const [company,   setCompany]   = useState(initial?.company   ?? "")
  const [line1,     setLine1]     = useState(initial?.line1     ?? "")
  const [line2,     setLine2]     = useState(initial?.line2     ?? "")
  const [city,      setCity]      = useState(initial?.city      ?? "")
  const [state,     setState]     = useState(initial?.state     ?? "")
  const [postcode,  setPostcode]  = useState(initial?.postcode  ?? "")
  const [country,   setCountry]   = useState(initial?.country   ?? "GB")
  const [isDefault, setIsDefault] = useState(initial?.isDefault ?? false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ label, firstName, lastName, company, line1, line2, city, state, postcode, country, isDefault })
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(201,169,110,0.18)",
    outline: "none",
    padding: "0.55rem 0",
    fontFamily: "var(--font-cormorant)",
    fontSize: "1rem",
    fontWeight: 300,
    color: "var(--ivory)",
    caretColor: "var(--gold)",
    letterSpacing: "0.03em",
  }
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inter)",
    fontSize: "0.52rem",
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--warm-grey)",
    marginBottom: "0.4rem",
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Label selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={labelStyle}>Address label</p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {["Home", "Work", "Other"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLabel(l)}
              style={{
                padding: "0.4rem 1rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.52rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: label === l ? "1px solid rgba(201,169,110,0.5)" : "1px solid var(--border-dark)",
                background: label === l ? "rgba(201,169,110,0.07)" : "transparent",
                color: label === l ? "var(--gold)" : "var(--warm-grey)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 1.5rem", marginBottom: "1.5rem" }}>
        <div><label style={labelStyle}>First name *</label><input required style={fieldStyle} value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
        <div><label style={labelStyle}>Last name *</label><input required style={fieldStyle} value={lastName} onChange={e => setLastName(e.target.value)} /></div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Company (optional)</label>
        <input style={fieldStyle} value={company} onChange={e => setCompany(e.target.value)} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Address line 1 *</label>
        <input required style={fieldStyle} value={line1} onChange={e => setLine1(e.target.value)} />
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Address line 2</label>
        <input style={fieldStyle} value={line2} onChange={e => setLine2(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem 1.5rem", marginBottom: "1.5rem" }}>
        <div><label style={labelStyle}>City *</label><input required style={fieldStyle} value={city} onChange={e => setCity(e.target.value)} /></div>
        <div><label style={labelStyle}>County / State</label><input style={fieldStyle} value={state} onChange={e => setState(e.target.value)} /></div>
        <div><label style={labelStyle}>Postcode *</label><input required style={fieldStyle} value={postcode} onChange={e => setPostcode(e.target.value)} /></div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Country *</label>
        <select
          required
          value={country}
          onChange={e => setCountry(e.target.value)}
          style={{ ...fieldStyle, cursor: "pointer" }}
        >
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="AU">Australia</option>
          <option value="NZ">New Zealand</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="IT">Italy</option>
        </select>
      </div>

      {/* Default checkbox */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
      >
        <input
          type="checkbox"
          checked={isDefault}
          onChange={e => setIsDefault(e.target.checked)}
          style={{ accentColor: "var(--gold)", width: "14px", height: "14px" }}
        />
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.08em", color: "var(--warm-grey)" }}>
          Set as default delivery address
        </span>
      </label>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: "0.85rem",
            background: "var(--gold)",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-inter)",
            fontSize: "0.55rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--black)",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-light)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
        >
          Save address
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "0.85rem 1.5rem",
            background: "transparent",
            border: "1px solid var(--border-dark)",
            cursor: "pointer",
            fontFamily: "var(--font-inter)",
            fontSize: "0.55rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--warm-grey)",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)"; e.currentTarget.style.color = "var(--off-white)" }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.color = "var(--warm-grey)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
