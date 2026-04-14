import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Covora",
  description: "The House of Covora. Our story, our craft, our values.",
};

const PILLARS = [
  {
    number: "01",
    title: "Material Excellence",
    body: "We source only the finest natural fibres — cashmere from Mongolia, silk from Como, wool from the finest Merino stations. Every fabric is chosen for its exceptional hand and longevity.",
  },
  {
    number: "02",
    title: "Precision Craft",
    body: "Our collections are produced in limited quantities by skilled artisans who bring decades of experience to every piece. Nothing is rushed. Nothing is compromised.",
  },
  {
    number: "03",
    title: "Timeless Design",
    body: "We design for longevity — not for seasons. Every Covora piece is conceived to be worn for years, not discarded after a trend cycle. True style is always in season.",
  },
];

const VALUES = [
  { label: "Founded", value: "London, 2022" },
  { label: "Approach", value: "Slow fashion" },
  { label: "Production", value: "Limited runs" },
  { label: "Materials", value: "Natural fibres only" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 4rem)",
        maxWidth: "var(--container-wide)",
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.52rem",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          marginBottom: "2rem",
        }}>Our Story</p>
        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(3.5rem, 8vw, 8rem)",
          fontWeight: 300,
          color: "#111111",
          lineHeight: 0.92,
          letterSpacing: "-0.02em",
          maxWidth: "800px",
        }}>
          The House<br />
          <span style={{ fontStyle: "italic", color: "var(--gold-dark)" }}>of Covora.</span>
        </h1>
      </section>

      {/* ── Manifesto ─────────────────────────────────────────── */}
      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ width: "40px", height: "1px", background: "rgba(201,169,110,0.6)", marginBottom: "2.5rem" }} />
        <blockquote style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "#222222",
          lineHeight: 1.5,
          letterSpacing: "0.01em",
        }}>
          "Covora was born from a singular obsession with refinement. Not luxury as a status symbol — but luxury as a feeling. The weight of perfect fabric. The silence of flawless construction. The quiet power of wearing something extraordinary."
        </blockquote>
      </section>

      {/* ── Story ─────────────────────────────────────────────── */}
      <section style={{
        maxWidth: "var(--container-wide)",
        margin: "0 auto",
        padding: "clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(3rem, 6vw, 7rem)",
        alignItems: "start",
      }} className="about-story-grid">

        <div>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
            marginBottom: "1.5rem",
          }}>Our Beginning</p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 300,
            color: "#111111",
            lineHeight: 1.1,
            marginBottom: "2rem",
          }}>
            Crafted with intention.<br />
            <span style={{ fontStyle: "italic" }}>Built to endure.</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {[
              "Covora was founded on a simple premise: that the modern wardrobe deserves better. Better materials. Better construction. Better design that doesn't shout, but commands attention.",
              "Every piece in the Covora collection is conceived with the same meticulous attention to detail — from the sourcing of raw materials to the final stitch. We work with heritage craftspeople and modern artisans who share our uncompromising vision.",
              "This is not fast fashion. This is fashion that lasts. Covora is built for the individual who understands that true luxury is found not in the label, but in the craft.",
            ].map((p, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                color: "#666666",
                lineHeight: 1.9,
              }}>{p}</p>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {PILLARS.map((item) => (
            <div
              key={item.number}
              style={{
                borderLeft: "2px solid rgba(201,169,110,0.35)",
                paddingLeft: "1.5rem",
              }}
            >
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.48rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--gold-dark)",
                marginBottom: "0.6rem",
              }}>{item.number}</p>
              <h3 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.3rem",
                fontWeight: 300,
                color: "#111111",
                marginBottom: "0.6rem",
              }}>{item.title}</h3>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                color: "#777777",
                lineHeight: 1.8,
              }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values strip ──────────────────────────────────────── */}
      <section style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}>
        <div style={{
          maxWidth: "var(--container-wide)",
          margin: "0 auto",
          padding: "clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 4vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }} className="about-values-grid">
          {VALUES.map((v) => (
            <div key={v.label}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.48rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#BBBBBB",
                marginBottom: "0.5rem",
              }}>{v.label}</p>
              <p style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.1rem",
                fontWeight: 300,
                color: "#333333",
              }}>{v.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{
        maxWidth: "var(--container-wide)",
        margin: "0 auto",
        padding: "clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "#333333",
          marginBottom: "2.5rem",
          lineHeight: 1.4,
        }}>
          Discover the collection.
        </p>
        <Link href="/shop" className="about-cta">
          Shop Now
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-story-grid { grid-template-columns: 1fr !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .about-values-grid { grid-template-columns: 1fr !important; }
        }
        .about-cta {
          display: inline-block;
          font-family: var(--font-inter);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: #111111;
          padding: 1rem 2.75rem;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .about-cta:hover { background: #333333; }
      `}</style>
    </div>
  );
}
