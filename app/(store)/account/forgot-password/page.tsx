"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { AuthPageShell, LuxuryInput, GoldButton } from "../login/page"

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("")
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // SCAFFOLD: POST /api/auth/forgot-password
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

  return (
    <AuthPageShell>
      {sent ? (
        /* ── Confirmation state ── */
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              border: "1px solid rgba(201,169,110,0.35)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              color: "var(--gold)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "var(--ivory)",
              marginBottom: "1rem",
            }}
          >
            Check your inbox
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.05rem",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--warm-grey)",
              letterSpacing: "0.04em",
              marginBottom: "2.5rem",
              lineHeight: 1.6,
            }}
          >
            If an account exists for <span style={{ color: "var(--ivory)" }}>{email}</span>,
            you'll receive a reset link shortly.
          </p>
          <Link
            href="/account/login"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}
          >
            ← Back to sign in
          </Link>
        </div>
      ) : (
        /* ── Request form ── */
        <>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              className="label-caps"
              style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.55)", marginBottom: "1.4rem" }}
            >
              Account Recovery
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
                color: "var(--ivory)",
                lineHeight: 1.1,
                marginBottom: "0.8rem",
              }}
            >
              Reset password
            </h1>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.05rem",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--warm-grey)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
              }}
            >
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <div style={{ width: "32px", height: "1px", background: "rgba(201,169,110,0.35)", margin: "0 auto 3rem" }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            <LuxuryInput
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <GoldButton type="submit" disabled={loading}>
              {loading ? "Sending…" : "Send Reset Link"}
            </GoldButton>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link
              href="/account/login"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                color: "var(--warm-grey)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey)")}
            >
              ← Back to sign in
            </Link>
          </div>
        </>
      )}
    </AuthPageShell>
  )
}
