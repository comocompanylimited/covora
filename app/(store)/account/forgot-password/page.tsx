"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email,     setEmail]     = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div style={{
      background: "#FAFAF8",
      minHeight: "100vh",
      paddingTop: "var(--header-height)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `var(--header-height) 1.5rem 4rem`,
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
        padding: "clamp(2rem, 5vw, 3rem)",
      }}>
        <div style={{ width: "100%", height: "2px", background: "var(--gold)", marginBottom: "2.5rem" }} />

        {submitted ? (
          /* ── Confirmation state ── */
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.75rem",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 300,
              color: "#111111",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}>Check your inbox</h1>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.72rem",
              color: "#777777",
              lineHeight: 1.85,
              marginBottom: "2rem",
            }}>
              If an account exists for <strong style={{ color: "#333333" }}>{email}</strong>, you will receive a password reset link shortly.
            </p>
            <Link
              href="/account/login"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-inter)",
                fontSize: "0.56rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: "#111111",
                padding: "0.85rem 2rem",
                textDecoration: "none",
              }}
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <div style={{ marginBottom: "2.25rem" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.5rem",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--gold-dark)",
                marginBottom: "1.25rem",
              }}>My Account</p>
              <h1 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 300,
                color: "#111111",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}>Reset password</h1>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                color: "#888888",
                lineHeight: 1.75,
              }}>
                Enter the email address associated with your account and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.5rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#888888",
                }}>Email Address</label>
                <input
                  type="email"
                  className="acct-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  background: loading ? "#888888" : "#111111",
                  color: "#FFFFFF",
                  border: "none",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.25s ease",
                }}
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>

            <p style={{
              textAlign: "center",
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              color: "#AAAAAA",
              marginTop: "2rem",
            }}>
              <Link href="/account/login" style={{ color: "#333333", textDecoration: "none", fontWeight: 500 }}>
                ← Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>

      <style>{`
        .acct-input {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.14);
          border-radius: 0;
          padding: 0.72rem 0.85rem;
          font-family: var(--font-inter);
          font-size: 0.78rem;
          color: #111111;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .acct-input:focus { border-color: var(--gold); }
        .acct-input:hover { border-color: rgba(0,0,0,0.28); }
        .acct-input::placeholder { color: #CCCCCC; }
      `}</style>
    </div>
  )
}
