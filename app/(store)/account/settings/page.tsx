"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading, updateProfile } = useAuth()
  const router = useRouter()

  // Profile form
  const [firstName, setFirstName] = useState("")
  const [lastName,  setLastName]  = useState("")
  const [phone,     setPhone]     = useState("")
  const [profileSaved, setProfileSaved] = useState(false)

  // Password form
  const [currentPw,  setCurrentPw]  = useState("")
  const [newPw,      setNewPw]      = useState("")
  const [confirmPw,  setConfirmPw]  = useState("")
  const [pwError,    setPwError]    = useState("")
  const [pwSaved,    setPwSaved]    = useState(false)
  const [pwLoading,  setPwLoading]  = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "")
      setLastName(user.lastName   ?? "")
      setPhone(user.phone         ?? "")
    }
  }, [user])

  if (isLoading || !user) return null

  function handleProfileSave(e: FormEvent) {
    e.preventDefault()
    updateProfile({ firstName, lastName, phone })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  async function handlePasswordSave(e: FormEvent) {
    e.preventDefault()
    setPwError("")
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return }
    setPwLoading(true)
    // SCAFFOLD: POST /api/auth/change-password
    await new Promise((r) => setTimeout(r, 800))
    setPwLoading(false)
    setCurrentPw(""); setNewPw(""); setConfirmPw("")
    setPwSaved(true)
    setTimeout(() => setPwSaved(false), 2500)
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(201,169,110,0.18)",
    outline: "none",
    padding: "0.65rem 0",
    fontFamily: "var(--font-cormorant)",
    fontSize: "1.05rem",
    fontWeight: 300,
    letterSpacing: "0.04em",
    color: "var(--ivory)",
    caretColor: "var(--gold)",
    transition: "border-color 0.25s ease",
  }
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inter)",
    fontSize: "0.52rem",
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--warm-grey)",
    marginBottom: "0.5rem",
  }

  return (
    <AccountShell>
      {/* Heading */}
      <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-dark)" }}>
        <p
          className="label-caps"
          style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}
        >
          Account Settings
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
          Profile & security
        </h1>
      </div>

      {/* ── Personal information ──────────────────────────────────── */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.3rem",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "var(--ivory)",
            marginBottom: "2rem",
          }}
        >
          Personal information
        </h2>

        <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 1.5rem" }}>
            <div>
              <label style={labelStyle}>First name</label>
              <input
                style={fieldStyle}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
                onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Last name</label>
              <input
                style={fieldStyle}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
                onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email address</label>
            <input
              style={{ ...fieldStyle, color: "var(--warm-grey)", cursor: "not-allowed" }}
              value={user.email}
              disabled
              title="Contact support to change your email"
            />
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.04em", color: "var(--warm-grey-dark)", marginTop: "0.4rem" }}>
              To change your email address, please contact customer support.
            </p>
          </div>

          <div>
            <label style={labelStyle}>Phone (optional)</label>
            <input
              type="tel"
              style={fieldStyle}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+44 7700 900000"
              onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              type="submit"
              style={{
                padding: "0.85rem 2rem",
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
              Save changes
            </button>
            {profileSaved && (
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.08em", color: "rgba(110,180,110,0.8)" }}>
                ✓ Saved
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border-dark)", marginBottom: "3rem" }} />

      {/* ── Security ─────────────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.3rem",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "var(--ivory)",
            marginBottom: "2rem",
          }}
        >
          Change password
        </h2>

        <form onSubmit={handlePasswordSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "420px" }}>
          <div>
            <label style={labelStyle}>Current password</label>
            <input
              type="password"
              style={fieldStyle}
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              autoComplete="current-password"
              onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
            />
          </div>
          <div>
            <label style={labelStyle}>New password</label>
            <input
              type="password"
              style={fieldStyle}
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
            />
          </div>
          <div>
            <label style={labelStyle}>Confirm new password</label>
            <input
              type="password"
              style={fieldStyle}
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              autoComplete="new-password"
              onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
              onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
            />
          </div>

          {pwError && (
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.04em", color: "#c97a6e" }}>{pwError}</p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              type="submit"
              disabled={pwLoading}
              style={{
                padding: "0.85rem 2rem",
                background: pwLoading ? "rgba(201,169,110,0.4)" : "var(--gold)",
                border: "none",
                cursor: pwLoading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-inter)",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--black)",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={e => { if (!pwLoading) e.currentTarget.style.background = "var(--gold-light)" }}
              onMouseLeave={e => { if (!pwLoading) e.currentTarget.style.background = "var(--gold)" }}
            >
              {pwLoading ? "Updating…" : "Update password"}
            </button>
            {pwSaved && (
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.08em", color: "rgba(110,180,110,0.8)" }}>
                ✓ Password updated
              </span>
            )}
          </div>
        </form>
      </section>
    </AccountShell>
  )
}
