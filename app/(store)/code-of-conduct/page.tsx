import type { Metadata } from "next"
import Link from "next/link"
import LuxuryFooter from "@/components/shared/LuxuryFooter"

export const metadata: Metadata = {
  title: "Code of Conduct — Covora Lumière",
  description: "The values and ethics that guide Covora Lumière.",
}

const PRINCIPLES = [
  {
    number: "01",
    title: "Craft Over Volume",
    body: "We believe in making fewer, better things. Every garment in the Covora Lumière collection is selected with intention — quality of construction, integrity of material, and longevity of wear take precedence over trend and volume. We do not chase cycles. We pursue craft.",
  },
  {
    number: "02",
    title: "Honest Representation",
    body: "We represent our products, pricing, and provenance honestly. Images, descriptions, and materials are accurate to the best of our knowledge. Where information changes — due to supply, production, or other factors — we communicate this clearly and promptly.",
  },
  {
    number: "03",
    title: "Respect for the Customer",
    body: "Every person who places trust in Covora Lumière deserves a premium experience — from first browse to final delivery. We handle personal data with discretion, communicate with respect, and resolve issues with urgency and fairness.",
  },
  {
    number: "04",
    title: "Ethical Sourcing",
    body: "We work with manufacturers and suppliers who share our commitment to fair labour practices and responsible production. We do not knowingly engage with suppliers who exploit workers or cause unnecessary environmental harm.",
  },
  {
    number: "05",
    title: "Inclusive Excellence",
    body: "Luxury is not defined by exclusion. The Covora Lumière aesthetic is available to those who value it, regardless of background, body, or budget tier. We are committed to expanding our size range and ensuring our brand is a welcoming space.",
  },
  {
    number: "06",
    title: "Continuous Improvement",
    body: "We acknowledge that we do not always get things right. Where we fall short of these principles, we commit to listening, learning, and improving. Our conduct is not a statement of perfection — it is a commitment to direction.",
  },
]

export default function CodeOfConductPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PageHeader />

      {/* Hero */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.65)", display: "block", marginBottom: "1.2rem" }}>Our Values</span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.05 }}>
            Code of{" "}
            <span style={{ fontStyle: "italic", color: "rgba(201,169,110,0.85)" }}>Conduct</span>
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)", fontStyle: "italic", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "600px", marginTop: "1.2rem" }}>
            The principles that govern how we operate, create, and engage — with our customers, our partners, and the world.
          </p>
        </div>
      </div>

      {/* Principles */}
      <div style={{ flex: 1, maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {PRINCIPLES.map((p) => (
            <div
              key={p.number}
              style={{ background: "#0A0A0A", padding: "clamp(2rem, 3vw, 3rem)", display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <span className="label-caps" style={{ fontSize: "0.38rem", letterSpacing: "0.25em", color: "rgba(201,169,110,0.45)" }}>{p.number}</span>
              <div style={{ width: "24px", height: "1px", background: "rgba(201,169,110,0.3)" }} />
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.15 }}>
                {p.title}
              </h2>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.88rem, 1.05vw, 0.98rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "0.02em", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.9rem, 1.1vw, 1rem)", fontStyle: "italic", color: "rgba(255,255,255,0.3)", lineHeight: 1.8, maxWidth: "680px" }}>
            This Code of Conduct was last reviewed in {new Date().getFullYear()}. For questions or concerns, please contact us at{" "}
            <a href="mailto:concierge@covoralumiere.com" style={{ color: "rgba(201,169,110,0.55)", textDecoration: "none" }}>
              concierge@covoralumiere.com
            </a>.
          </p>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  )
}

function PageHeader() {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/home" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.44em", textTransform: "uppercase", color: "var(--gold)", paddingRight: "0.44em" }}>Covora</span>
        </Link>
        <Link href="/womens" style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
          className="hover:text-[rgba(255,255,255,0.8)]">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}
