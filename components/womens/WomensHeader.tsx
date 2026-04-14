"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// ─── WomensHeader ─────────────────────────────────────────────────────────────
// Womens-page-only header. Suppresses shared Header via Header.tsx null-check.
// Renders:
//   • Fixed top bar — Mens/Womens left, Covora logo centre
//   • Fixed vertical utility rail — right edge: Search only
//   • Luxury search overlay — triggered from rail Search icon

export default function WomensHeader() {
  const [scrolled, setScrolled]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const solid = scrolled

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: "72px",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1.25rem, 3vw, 3rem)",
          transition: "background 0.6s ease, border-color 0.6s ease",
          background: solid ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: solid ? "blur(20px) saturate(150%)" : "none",
          WebkitBackdropFilter: solid ? "blur(20px) saturate(150%)" : "none",
          borderBottom: `1px solid ${solid ? "rgba(201,169,110,0.08)" : "transparent"}`,
        }}
      >
        {/* Left nav — Mens + Womens only */}
        <nav className="flex items-center" style={{ gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
          <WomensNavLink href="/mens" active={false}>Mens</WomensNavLink>
          <WomensNavLink href="/womens" active>Womens</WomensNavLink>
        </nav>

        {/* Centre logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Link
            href="/home"
            aria-label="Covora — Home"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
              fontWeight: 300,
              letterSpacing: "0.48em",
              textTransform: "uppercase",
              color: "var(--gold)",
              display: "block",
              paddingRight: "0.48em",
              textDecoration: "none",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
            className="hover:text-[var(--gold-light)]"
          >
            Covora
          </Link>
        </div>
      </header>

      {/* ── Vertical utility rail — right edge ──────────────────── */}
      <div
        style={{
          position: "fixed",
          right: "clamp(1rem, 2.5vw, 2rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.4rem",
          padding: "1.2rem 0.75rem",
          background: "rgba(255,255,255,0.045)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Top hairline */}
        <div style={{ width: "1px", height: "20px", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4))" }} />

        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          className="flex items-center justify-center"
          style={{ color: "rgba(255,255,255,0.75)", transition: "color 0.25s ease, transform 0.25s ease" }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "rgba(255,255,255,1)"
            e.currentTarget.style.transform = "scale(1.08)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "rgba(255,255,255,0.75)"
            e.currentTarget.style.transform = "scale(1)"
          }}
        >
          <SearchIcon />
        </button>

        {/* Bottom hairline */}
        <div style={{ width: "1px", height: "20px", background: "linear-gradient(to bottom, rgba(201,169,110,0.4), transparent)" }} />
      </div>

      {/* ── Luxury search overlay ────────────────────────────────── */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

// ─── Nav link ─────────────────────────────────────────────────────────────────

function WomensNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.6rem",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: active ? "var(--gold)" : "var(--warm-grey)",
        textDecoration: "none",
        position: "relative",
        paddingBottom: "2px",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--off-white)" }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--warm-grey)" }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          bottom: "-1px", left: 0,
          width: "100%", height: "1px",
          background: "var(--gold)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.45s var(--ease-luxury)",
        }}
      />
    </Link>
  )
}

// ─── Search overlay ───────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(t)
    } else {
      setQuery("")
    }
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 58,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 59,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s var(--ease-out-expo)",
        }}
      >
        <div
          style={{
            background: "rgba(6,6,5,0.97)",
            borderBottom: "1px solid rgba(201,169,110,0.12)",
            paddingTop: "100px",
            paddingBottom: "3.5rem",
            paddingLeft: "clamp(1.5rem, 6vw, 8rem)",
            paddingRight: "clamp(1.5rem, 6vw, 8rem)",
          }}
        >
          <div style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.8rem" }}>
              <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.45)" }}>
                Search the Edit
              </span>
              <button
                onClick={onClose}
                aria-label="Close search"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey-dark)", fontFamily: "var(--font-inter)", fontSize: "0.42rem", letterSpacing: "0.22em", textTransform: "uppercase", transition: "color 0.2s ease", padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-grey)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey-dark)")}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1">
                  <path d="M1 1l8 8M9 1L1 9" strokeLinecap="round" />
                </svg>
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative", borderBottom: `1px solid ${query ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.15)"}`, paddingBottom: "1.1rem", transition: "border-color 0.3s ease" }}>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em", color: "var(--ivory)", caretColor: "rgba(201,169,110,0.8)", lineHeight: 1 }}
                />
                {query && (
                  <div style={{ position: "absolute", right: 0, bottom: "1.1rem", display: "flex", alignItems: "center", gap: "1rem", transform: "translateY(50%)" }}>
                    <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus() }} aria-label="Clear" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey-dark)", padding: "0.2rem", transition: "color 0.2s ease" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-grey)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey-dark)")}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M1 1l9 9M10 1L1 10" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.4rem", opacity: 0.6 }}>
                <span className="label-caps" style={{ fontSize: "0.4rem", letterSpacing: "0.2em", color: "var(--warm-grey-dark)" }}>{query ? "↵ to search" : "Begin typing"}</span>
                <span className="label-caps" style={{ fontSize: "0.4rem", letterSpacing: "0.2em", color: "var(--warm-grey-dark)" }}>Esc to close</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="11" cy="11" r="7.5" />
      <path d="m20.5 20.5-4-4" strokeLinecap="round" />
    </svg>
  )
}
