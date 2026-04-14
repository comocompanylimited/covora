"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"

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
    if (!firstName || !email || !password) { setError("Please fill in all required fields."); return }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return }
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
    <AuthShell>
      <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          fontWeight: 600,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          marginBottom: "1.25rem",
        }}>Join Covora</p>
        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 300,
          color: "#111111",
          lineHeight: 1.1,
          marginBottom: "0.6rem",
        }}>Create your account</h1>
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1rem",
          fontStyle: "italic",
          fontWeight: 300,
          color: "#888888",
        }}>Access exclusive pieces and manage your orders</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
          <Field label="First Name">
            <input type="text" className="acct-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" autoComplete="given-name" required />
          </Field>
          <Field label="Last Name">
            <input type="text" className="acct-input" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" autoComplete="family-name" />
          </Field>
        </div>
        <Field label="Email Address">
          <input type="email" className="acct-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" autoComplete="email" required />
        </Field>
        <Field label="Password">
          <input type="password" className="acct-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" autoComplete="new-password" required />
        </Field>

        {error && (
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.65rem",
            color: "#B84040",
            padding: "0.7rem 0.85rem",
            border: "1px solid rgba(184,64,64,0.2)",
            background: "rgba(184,64,64,0.04)",
          }}>{error}</p>
        )}

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
            marginTop: "0.5rem",
            transition: "background 0.25s ease",
          }}
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p style={{
        textAlign: "center",
        fontFamily: "var(--font-inter)",
        fontSize: "0.65rem",
        color: "#AAAAAA",
        marginTop: "2rem",
      }}>
        Already have an account?{" "}
        <Link href="/account/login" style={{ color: "#333333", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.5rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#888888",
      }}>{label}</label>
      {children}
    </div>
  )
}

function AuthShell({ children }: { children: React.ReactNode }) {
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
        maxWidth: "460px",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
        padding: "clamp(2rem, 5vw, 3rem)",
      }}>
        <div style={{ width: "100%", height: "2px", background: "var(--gold)", marginBottom: "2.5rem" }} />
        {children}
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
