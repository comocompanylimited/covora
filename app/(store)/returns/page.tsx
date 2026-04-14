import type { Metadata } from "next"
import Link from "next/link"
import LuxuryFooter from "@/components/shared/LuxuryFooter"

export const metadata: Metadata = {
  title: "Returns — Covora Lumière",
  description: "Returns and refund policy for Covora Lumière.",
}

export default function ReturnsPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PageHeader />

      {/* Hero */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.65)", display: "block", marginBottom: "1.2rem" }}>Customer Care</span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.05 }}>
            Returns &{" "}
            <span style={{ fontStyle: "italic", color: "rgba(201,169,110,0.85)" }}>Refunds</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: "860px", margin: "0 auto", width: "100%", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

          <PolicySection title="Our Returns Promise">
            <p>We want you to love every piece from Covora Lumière. If you are not completely satisfied, we offer a 30-day returns window from the date of delivery.</p>
          </PolicySection>

          <PolicySection title="Eligibility">
            <ul>
              <li>Items must be returned within 30 days of the delivery date</li>
              <li>Garments must be unworn, unwashed, and in their original condition</li>
              <li>All original tags must be attached and packaging must be intact</li>
              <li>Items showing signs of wear, alteration, or damage will not be accepted</li>
              <li>Sale and final sale items are not eligible for return or exchange</li>
              <li>Intimates, swimwear, and pierced jewellery are final sale for hygiene reasons</li>
            </ul>
          </PolicySection>

          <PolicySection title="How to Return">
            <ol>
              <li>Email <a href="mailto:concierge@covoralumiere.com" style={{ color: "rgba(201,169,110,0.7)", textDecoration: "none" }}>concierge@covoralumiere.com</a> with your order number and reason for return</li>
              <li>Our team will respond within 1 business day with a prepaid returns label</li>
              <li>Pack your items securely in the original packaging if possible</li>
              <li>Attach the prepaid label and drop off at your nearest courier</li>
              <li>You will receive a confirmation email once we have received your return</li>
            </ol>
          </PolicySection>

          <PolicySection title="Refunds">
            <p>Once your return is received and inspected, we will process your refund within 5–7 business days. The amount will be credited to your original payment method. Please note that original shipping charges are non-refundable.</p>
          </PolicySection>

          <PolicySection title="Exchanges">
            <p>We do not offer direct exchanges. If you wish to exchange an item, please return it for a refund and place a new order. This ensures the fastest turnaround and guarantees availability of your preferred item.</p>
          </PolicySection>

          <div style={{ padding: "2rem", border: "1px solid rgba(201,169,110,0.15)", background: "rgba(201,169,110,0.03)", marginTop: "1rem" }}>
            <p className="label-caps" style={{ fontSize: "0.4rem", letterSpacing: "0.3em", color: "rgba(201,169,110,0.6)", marginBottom: "0.8rem" }}>Concierge Support</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1.2rem" }}>
              For any questions regarding your return, our team is here to help.
            </p>
            <a href="mailto:concierge@covoralumiere.com" style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid rgba(201,169,110,0.3)", paddingBottom: "2px" }}>
              concierge@covoralumiere.com
            </a>
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  )
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <p className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.7)", marginBottom: "1.2rem" }}>{title}</p>
      <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.9rem, 1.1vw, 1rem)", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, letterSpacing: "0.02em" }}>
        {children}
      </div>
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
