"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import { AuthPageShell, LuxuryInput, GoldButton } from "../login/page"

export default function SignupPage() {
  const { signUp, isAuthenticated } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName,  setLastName]  = useState("")
  const [email,     setEmail]     = useState("")
  const [password,  setPassword]  = useState("")
  const [error,     setError]     = useState("")
  const [loading,   setLoading]   = useState(false)

  if (isAuthenticated) {
    router.replace("/account/dashboard")
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!firstName || !email || !password) {
      setError("Please fill in all required fields.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setLoading(true)
    try {
      await signUp({ firstName, lastName, email, password })
      router.push("/account/dashboard")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPageShell>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p
          className="label-caps"
          style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.55)", marginBottom: "1.4rem" }}
        >
          My Account
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.2rem, 4vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.05em",
            color: "var(--ivory)",
            lineHeight: 1.1,
            marginBottom: "0.8rem",
          }}
        >
          Join Covora
        </h1>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.05rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--warm-grey)",
            letterSpacing: "0.04em",
          }}
        >
          Create your account to begin
        </p>
      </div>

      <div style={{ width: "32px", height: "1px", background: "rgba(201,169,110,0.35)", margin: "0 auto 3rem" }} />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <LuxuryInput label="First name *" value={firstName} onChange={setFirstName} placeholder="First" autoComplete="given-name" />
          <LuxuryInput label="Last name"    value={lastName}  onChange={setLastName}  placeholder="Last"  autoComplete="family-name" />
        </div>
        <LuxuryInput label="Email address *" type="email"    value={email}    onChange={setEmail}    placeholder="you@example.com"    autoComplete="email" />
        <LuxuryInput label="Password *"      type="password" value={password} onChange={setPassword} placeholder="Min. 8 characters" autoComplete="new-password" />

        {error && (
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.04em", color: "#c97a6e", textAlign: "center" }}>
            {error}
          </p>
        )}

        <GoldButton type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create Account"}
        </GoldButton>
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "2.5rem 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "var(--border-dark)" }} />
        <span className="label-caps" style={{ fontSize: "0.38rem", letterSpacing: "0.25em", color: "var(--warm-grey-dark)" }}>or</span>
        <div style={{ flex: 1, height: "1px", background: "var(--border-dark)" }} />
      </div>

      <p style={{ textAlign: "center", fontSize: "0.62rem", letterSpacing: "0.04em", color: "var(--warm-grey)" }}>
        Already have an account?{" "}
        <Link
          href="/account/login"
          style={{ color: "var(--gold)", textDecoration: "none", transition: "color 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}
        >
          Sign in
        </Link>
      </p>
    </AuthPageShell>
  )
}
