import type { Metadata } from "next"
import Link from "next/link"
import LuxuryFooter from "@/components/shared/LuxuryFooter"

export const metadata: Metadata = {
  title: "Delivery — Covora Lumière",
  description: "Delivery information for Covora Lumière orders.",
}

const DELIVERY_OPTIONS = [
  { name: "Standard Delivery", time: "3–5 Business Days", price: "Free on orders over $150", note: "New Zealand only" },
  { name: "Express Delivery", time: "1–2 Business Days", price: "$12.00", note: "New Zealand only, order before 12pm" },
  { name: "International Standard", time: "7–14 Business Days", price: "From $25.00", note: "Rates calculated at checkout" },
  { name: "International Express", time: "3–7 Business Days", price: "From $45.00", note: "Subject to customs clearance" },
]

export default function DeliveryPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PageHeader />

      {/* Hero */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.65)", display: "block", marginBottom: "1.2rem" }}>Customer Care</span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.05 }}>
            Delivery{" "}
            <span style={{ fontStyle: "italic", color: "rgba(201,169,110,0.85)" }}>Information</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>

        {/* Delivery options table */}
        <p className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.7)", marginBottom: "1.8rem" }}>Shipping Options</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "4rem" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#0A0A0A", padding: "0.9rem 1.2rem" }}>
            {["Service", "Timeframe", "Cost", "Notes"].map((h) => (
              <span key={h} className="label-caps" style={{ fontSize: "0.38rem", letterSpacing: "0.25em", color: "rgba(201,169,110,0.5)" }}>{h}</span>
            ))}
          </div>
          {DELIVERY_OPTIONS.map((opt) => (
            <div key={opt.name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#0D0D0D", padding: "1.2rem", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400, color: "var(--ivory)", letterSpacing: "0.02em" }}>{opt.name}</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.92rem", fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>{opt.time}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "rgba(201,169,110,0.7)", letterSpacing: "0.04em" }}>{opt.price}</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.85rem", fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>{opt.note}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <PolicyBlock title="Order Processing">
            <p>All orders placed before 12pm NZST on business days are processed and dispatched same day. Orders placed after 12pm or on weekends and public holidays are processed on the next business day.</p>
          </PolicyBlock>
          <PolicyBlock title="Tracking Your Order">
            <p>Once your order has been dispatched, you will receive a confirmation email with a tracking link. You can also use our <Link href="/track-order" style={{ color: "rgba(201,169,110,0.7)", textDecoration: "none" }}>Track Order</Link> page at any time.</p>
          </PolicyBlock>
          <PolicyBlock title="International Orders">
            <p>International orders may be subject to customs duties and import taxes levied by the destination country. These charges are the responsibility of the recipient and are not covered by Covora Lumière.</p>
          </PolicyBlock>
          <PolicyBlock title="Delivery Address">
            <p>Please ensure your delivery address is complete and correct at the time of ordering. We are unable to redirect parcels once dispatched. PO Box addresses are accepted for standard delivery within New Zealand.</p>
          </PolicyBlock>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  )
}

function PolicyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.7)", marginBottom: "1rem" }}>{title}</p>
      <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.9rem, 1.1vw, 1rem)", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, letterSpacing: "0.02em" }}>
        {children}
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
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
