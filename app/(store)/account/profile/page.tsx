"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"

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

export default function ProfilePage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName,  setLastName]  = useState("")
  const [email,     setEmail]     = useState("")
  const [phone,     setPhone]     = useState("")
  const [saved,     setSaved]     = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "")
      setLastName(user.lastName ?? "")
      setEmail(user.email ?? "")
    }
  }, [user])

  if (isLoading) return null

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

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
        }}>My Account</p>
        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 300,
          color: "#111111",
          lineHeight: 1.1,
        }}>Profile</h1>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: "560px" }}>

        {/* Personal info */}
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.2rem",
          fontWeight: 300,
          color: "#333333",
          marginBottom: "1.25rem",
        }}>Personal Information</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={LABEL}>First Name</label>
            <input type="text" className="profile-input" style={INPUT} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" required />
          </div>
          <div>
            <label style={LABEL}>Last Name</label>
            <input type="text" className="profile-input" style={INPUT} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" />
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={LABEL}>Email Address</label>
          <input type="email" className="profile-input" style={INPUT} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" required />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label style={LABEL}>Phone (optional)</label>
          <input type="tel" className="profile-input" style={INPUT} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7700 000000" />
        </div>

        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "2rem" }} />

        {/* Change password */}
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.2rem",
          fontWeight: 300,
          color: "#333333",
          marginBottom: "1.25rem",
        }}>Change Password</p>

        <div style={{ marginBottom: "1rem" }}>
          <label style={LABEL}>Current Password</label>
          <input type="password" className="profile-input" style={INPUT} placeholder="••••••••" autoComplete="current-password" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <label style={LABEL}>New Password</label>
            <input type="password" className="profile-input" style={INPUT} placeholder="Min. 6 characters" autoComplete="new-password" />
          </div>
          <div>
            <label style={LABEL}>Confirm Password</label>
            <input type="password" className="profile-input" style={INPUT} placeholder="••••••••" autoComplete="new-password" />
          </div>
        </div>

        {/* Save */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button
            type="submit"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#111111",
              border: "none",
              padding: "0.9rem 2.25rem",
              cursor: "pointer",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
          >
            Save Changes
          </button>
          {saved && (
            <span style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              color: "#4A7C59",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Saved successfully
            </span>
          )}
        </div>
      </form>

      <style>{`
        .profile-input:focus { border-color: var(--gold) !important; outline: none; }
        .profile-input:hover { border-color: rgba(0,0,0,0.28) !important; }
        .profile-input::placeholder { color: #CCCCCC; }
      `}</style>
    </AccountShell>
  )
}
