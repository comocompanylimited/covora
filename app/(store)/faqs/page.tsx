import type { Metadata } from "next"
import Link from "next/link"
import LuxuryFooter from "@/components/shared/LuxuryFooter"

export const metadata: Metadata = {
  title: "FAQs — Covora Lumière",
  description: "Frequently asked questions about Covora Lumière.",
}

const FAQS = [
  {
    category: "Orders & Payment",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, Afterpay, Link, and UnionPay — all securely processed through Stripe." },
      { q: "Can I amend or cancel my order?", a: "Orders can be amended or cancelled within 1 hour of placement. Please contact our concierge team immediately at concierge@covoralumiere.com. Once an order has been dispatched, it cannot be cancelled." },
      { q: "Will I receive a confirmation?", a: "Yes. A confirmation email is sent immediately upon placing your order, followed by a dispatch notification with tracking details once your order has shipped." },
    ],
  },
  {
    category: "Delivery",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery within New Zealand takes 3–5 business days. Express delivery is available at checkout and arrives within 1–2 business days. International orders typically take 7–14 business days." },
      { q: "Do you ship internationally?", a: "Yes. We ship to most countries worldwide. International shipping rates and estimated delivery times are calculated at checkout based on your location." },
      { q: "How do I track my order?", a: "A tracking link is emailed to you as soon as your order is dispatched. You can also visit our Track Order page and enter your order number and email address." },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your returns policy?", a: "We offer a 30-day returns window from the date of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached. Sale items are final sale and cannot be returned." },
      { q: "How do I start a return?", a: "Email concierge@covoralumiere.com with your order number and reason for return. Our team will provide a prepaid returns label within 1 business day." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 5–7 business days of receiving your returned item. The amount will be credited to your original payment method." },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      { q: "How do I find my size?", a: "Our Size Guide provides detailed measurements for all garments. We recommend measuring yourself and comparing against the size chart, as sizing can vary between styles and fabrications." },
      { q: "Are your products true to size?", a: "Our garments are crafted to standard sizing, however some pieces are designed for a specific fit. Each product page notes whether the item runs true to size, slim, or relaxed." },
      { q: "How do I care for my Covora garments?", a: "Care instructions are printed on the garment label and noted on each product page. We recommend following these closely to preserve the quality and longevity of your pieces." },
    ],
  },
]

export default function FaqsPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Page header ────────────────────────────────────────── */}
      <PageHeader />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.65)", display: "block", marginBottom: "1.2rem" }}>
            Help & Information
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.05 }}>
            Frequently Asked{" "}
            <span style={{ fontStyle: "italic", color: "rgba(201,169,110,0.85)" }}>Questions</span>
          </h1>
        </div>
      </div>

      {/* ── FAQ Content ────────────────────────────────────────── */}
      <div style={{ flex: 1, maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {FAQS.map((section) => (
            <div key={section.category}>
              <p className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.7)", marginBottom: "1.8rem" }}>
                {section.category}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {section.items.map((item, i) => (
                  <div key={i} style={{ borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.6rem 0" }}>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1rem, 1.3vw, 1.15rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ivory)", marginBottom: "0.7rem" }}>
                      {item.q}
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.88rem, 1.1vw, 1rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "0.02em", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", padding: "2.5rem", border: "1px solid rgba(201,169,110,0.15)", background: "rgba(201,169,110,0.03)" }}>
          <p className="label-caps" style={{ fontSize: "0.4rem", letterSpacing: "0.3em", color: "rgba(201,169,110,0.6)", marginBottom: "0.8rem" }}>Still need help?</p>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1.2rem" }}>
            Our concierge team is available to assist you Monday through Friday, 9am–5pm NZST.
          </p>
          <Link href="/contact" style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid rgba(201,169,110,0.3)", paddingBottom: "2px" }}>
            Contact Us →
          </Link>
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
        <Link href="/" style={{ textDecoration: "none" }}>
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
  )
}
