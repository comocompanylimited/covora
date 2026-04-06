"use client"

// Womens-only Client Component — isolates hover handlers from the Server Component
// parent (app/(store)/womens/page.tsx).

const PILLARS = [
  {
    number: "01",
    title: "The Silhouette",
    body: "Considered cuts and fluid forms that move with the body — dressing as a quiet act of confidence.",
    href: "/womens/category/dresses",
  },
  {
    number: "02",
    title: "The Foundation",
    body: "Wardrobe essentials in the finest materials — pieces that anchor every look with understated elegance.",
    href: "/womens/category/tops",
  },
  {
    number: "03",
    title: "The Statement",
    body: "Outerwear and tailoring that commands presence — the pieces that define an entrance.",
    href: "/womens/category/outerwear",
  },
]

export default function WomensEditorialSection() {
  return (
    <div style={{ position: "relative" }}>

      {/* Dark-to-light gradient bridge */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, #0A0A0A, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <section
        style={{
          background: "#F4F2EE",
          paddingTop: "clamp(5rem, 9vw, 8rem)",
          paddingBottom: "clamp(5rem, 9vw, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* ── Section header ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "clamp(3rem, 5vw, 5rem)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.8rem" }}>
            <div style={{ width: "24px", height: "1px", background: "rgba(156,126,80,0.5)" }} />
            <span
              className="label-caps"
              style={{ fontSize: "0.42rem", letterSpacing: "0.48em", color: "rgba(156,126,80,0.75)" }}
            >
              The House Edit
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.4rem, 5vw, 5rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "0.04em",
              color: "#1A1916",
              maxWidth: "680px",
            }}
          >
            The Modern{" "}
            <span style={{ fontStyle: "italic", color: "#3A3530" }}>Woman</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.03em",
              color: "#6A6460",
              lineHeight: 1.7,
              maxWidth: "480px",
              marginTop: "1.5rem",
            }}
          >
            Refined silhouettes and considered fabrics for the woman who dresses
            with intention. Each piece selected for its craft, not its noise.
          </p>
        </div>

        {/* ── Three editorial pillars ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(156,126,80,0.12)",
          }}
        >
          {PILLARS.map((pillar) => (
            <a
              key={pillar.number}
              href={pillar.href}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "clamp(2rem, 3.5vw, 3.5rem)",
                background: "#F4F2EE",
                textDecoration: "none",
                gap: "2.5rem",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#EDEAE4")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")}
            >
              <div>
                <span
                  className="label-caps"
                  style={{
                    fontSize: "0.4rem",
                    letterSpacing: "0.3em",
                    color: "rgba(156,126,80,0.55)",
                    display: "block",
                    marginBottom: "1.8rem",
                  }}
                >
                  {pillar.number}
                </span>

                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    background: "rgba(156,126,80,0.45)",
                    marginBottom: "1.6rem",
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                    color: "#1A1916",
                    lineHeight: 1.1,
                    marginBottom: "1rem",
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    letterSpacing: "0.02em",
                    color: "#6A6460",
                    lineHeight: 1.7,
                  }}
                >
                  {pillar.body}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  className="label-caps"
                  style={{ fontSize: "0.4rem", letterSpacing: "0.25em", color: "rgba(156,126,80,0.7)" }}
                >
                  Explore
                </span>
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" style={{ color: "rgba(156,126,80,0.55)" }}>
                  <path
                    d="M1 4h18M15 1l4 3-4 3"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* ── Bottom sign-off ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "clamp(3.5rem, 5vw, 5rem) auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(156,126,80,0.15)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.06em",
              color: "#9A9490",
            }}
          >
            Covora Lumière — Maison de Luxe
          </span>
          <a
            href="/womens/category/new-arrivals"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.55rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1A1916",
              textDecoration: "none",
              borderBottom: "1px solid rgba(26,25,22,0.25)",
              paddingBottom: "2px",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = "rgba(156,126,80,0.9)"
              ;(e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(156,126,80,0.5)"
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = "#1A1916"
              ;(e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(26,25,22,0.25)"
            }}
          >
            View full collection
          </a>
        </div>

      </section>
    </div>
  )
}
