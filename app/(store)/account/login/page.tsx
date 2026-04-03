"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)

  // Already signed in
  if (isAuthenticated) {
    router.replace("/account/dashboard")
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!email || !password) { setError("Please fill in all fields."); return }
    setLoading(true)
    try {
      await login({ email, password })
      router.push("/account/dashboard")
    } catch {
      setError("We couldn't sign you in. Please check your details.")
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
          Welcome back
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
          Sign in to your Covora account
        </p>
      </div>

      {/* Gold hairline */}
      <div style={{ width: "32px", height: "1px", background: "rgba(201,169,110,0.35)", margin: "0 auto 3rem" }} />

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        <LuxuryInput
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <div>
          <LuxuryInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.6rem" }}>
            <Link
              href="/account/forgot-password"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                color: "var(--warm-grey)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey)")}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && (
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.04em", color: "#c97a6e", textAlign: "center" }}>
            {error}
          </p>
        )}

        <GoldButton type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </GoldButton>
      </form>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "2.5rem 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "var(--border-dark)" }} />
        <span
          className="label-caps"
          style={{ fontSize: "0.38rem", letterSpacing: "0.25em", color: "var(--warm-grey-dark)" }}
        >
          or
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border-dark)" }} />
      </div>

      {/* Signup CTA */}
      <p style={{ textAlign: "center", fontSize: "0.62rem", letterSpacing: "0.04em", color: "var(--warm-grey)" }}>
        New to Covora?{" "}
        <Link
          href="/account/signup"
          style={{ color: "var(--gold)", textDecoration: "none", transition: "color 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}
        >
          Create an account
        </Link>
      </p>
    </AuthPageShell>
  )
}

// ─── Shared auth primitives ───────────────────────────────────────────────────

export function AuthPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-[var(--black)] min-h-screen flex items-center justify-center"
      style={{ paddingTop: "72px", padding: "calc(72px + 4rem) 1.5rem 4rem" }}
    >
      {/* Logo */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          borderBottom: "1px solid var(--border-dark)",
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            fontWeight: 300,
            letterSpacing: "0.48em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
            paddingRight: "0.48em",
          }}
        >
          Covora
        </Link>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "3rem clamp(1.5rem, 4vw, 2.5rem)",
          background: "rgba(255,255,255,0.018)",
          border: "1px solid var(--border-dark)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function LuxuryInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-inter)",
          fontSize: "0.55rem",
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--warm-grey)",
          marginBottom: "0.6rem",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
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
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
        onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.18)")}
      />
    </div>
  )
}

export function GoldButton({
  children,
  type = "button",
  disabled,
  onClick,
}: {
  children: React.ReactNode
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "100%",
        padding: "1rem",
        background: disabled ? "rgba(201,169,110,0.4)" : "var(--gold)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-inter)",
        fontSize: "0.6rem",
        fontWeight: 500,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "var(--black)",
        transition: "background 0.3s ease",
        marginTop: "0.5rem",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "var(--gold-light)" }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "var(--gold)" }}
    >
      {children}
    </button>
  )
}
