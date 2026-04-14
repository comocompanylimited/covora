"use client"

import { useState } from "react"
import Link from "next/link"
import LuxuryFooter from "@/components/shared/LuxuryFooter"
import type { Metadata } from "next"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail]             = useState("")
  const [submitted, setSubmitted]     = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!orderNumber.trim() || !email.trim()) return
    setSubmitted(true)
  }

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Simple page header ─────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/home" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.44em", textTransform: "uppercase", color: "var(--gold)", paddingRight: "0.44em" }}>
              Covora
            </span>
          </Link>
          <Link href="/mens" style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            className="hover:text-[rgba(255,255,255,0.8)]">
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div style={{ flex: 1, maxWidth: "560px", margin: "0 auto", width: "100%", padding: "clamp(3rem, 8vw, 7rem) clamp(1.5rem, 4vw, 4rem)" }}>

        <div style={{ marginBottom: "3rem" }}>
          <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.65)", display: "block", marginBottom: "1.2rem" }}>
            Order Tracking
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Track Your Order
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em", lineHeight: 1.7 }}>
            Enter your order number and email address to view the status of your order.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <LuxuryInput
              label="Order Number"
              placeholder="e.g. CV-00123456"
              value={orderNumber}
              onChange={setOrderNumber}
              required
            />
            <LuxuryInput
              label="Email Address"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
            <button
              type="submit"
              style={{ marginTop: "0.5rem", padding: "0.9rem 2rem", background: "transparent", border: "1px solid rgba(201,169,110,0.4)", color: "var(--gold)", fontFamily: "var(--font-inter)", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s ease", alignSelf: "flex-start" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,169,110,0.08)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.7)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)" }}
            >
              Track Order
            </button>
          </form>
        ) : (
          <div style={{ padding: "2rem", border: "1px solid rgba(201,169,110,0.2)", background: "rgba(201,169,110,0.04)" }}>
            <p className="label-caps" style={{ fontSize: "0.4rem", letterSpacing: "0.3em", color: "rgba(201,169,110,0.7)", marginBottom: "0.75rem" }}>Order Found</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontStyle: "italic", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
              Your order <strong style={{ color: "var(--ivory)", fontStyle: "normal" }}>{orderNumber}</strong> has been located. A detailed tracking update has been sent to <strong style={{ color: "var(--ivory)", fontStyle: "normal" }}>{email}</strong>.
            </p>
            <button
              onClick={() => { setSubmitted(false); setOrderNumber(""); setEmail("") }}
              style={{ marginTop: "1.5rem", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "underline", textUnderlineOffset: "3px", padding: 0 }}
            >
              Track Another Order
            </button>
          </div>
        )}

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", fontStyle: "italic", color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
            Need help? Contact our concierge at{" "}
            <a href="mailto:concierge@covoralumiere.com" style={{ color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>
              concierge@covoralumiere.com
            </a>
          </p>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  )
}

function LuxuryInput({ label, placeholder, value, onChange, type = "text", required }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean
}) {
  return (
    <div>
      <label style={{ fontFamily: "var(--font-inter)", fontSize: "0.42rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.6rem" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "0.7rem 0", fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 300, color: "var(--ivory)", outline: "none", letterSpacing: "0.03em", transition: "border-color 0.25s ease" }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.5)")}
        onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.15)")}
      />
    </div>
  )
}
