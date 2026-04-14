import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns — Covora",
  description: "Delivery options, timeframes, and our returns policy at Covora.",
};

const SHIPPING_OPTIONS = [
  { name: "Standard Delivery", time: "3 – 5 business days", price: "£4.95", threshold: "Free over £150" },
  { name: "Express Delivery", time: "1 – 2 business days", price: "£9.95", threshold: "Free over £300" },
  { name: "Next Day Delivery", time: "Order before 1pm", price: "£14.95", threshold: null },
  { name: "International (EU)", time: "5 – 8 business days", price: "£12.95", threshold: "Free over £250" },
  { name: "International (ROW)", time: "7 – 14 business days", price: "£19.95", threshold: "Free over £350" },
];

const RETURN_STEPS = [
  { step: "01", title: "Initiate Your Return", body: "Log in to your account and navigate to Orders. Select the item(s) you wish to return and choose your reason. You will receive a return authorisation email within 24 hours." },
  { step: "02", title: "Package Your Item", body: "Return the item in its original packaging with all tags attached. Include the return slip from your order confirmation. Items must be unworn, unwashed, and in their original condition." },
  { step: "03", title: "Ship Your Return", body: "Use the prepaid return label included in your order or download one from your account. Drop your parcel at any Royal Mail or DPD collection point. Keep your proof of postage." },
  { step: "04", title: "Receive Your Refund", body: "Once received and inspected, your refund will be processed within 5 business days. Refunds are issued to your original payment method. You will receive an email confirmation when the refund is processed." },
];

export default function ShippingReturnsPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link href="/home" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#777777", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#777777", fontSize: "0.7rem" }}>›</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "var(--gold)" }}>Shipping & Returns</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 0.95 }}>
            Shipping & Returns
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>

        {/* Shipping */}
        <section style={{ marginBottom: "4rem" }}>
          <p className="label-caps" style={{ fontSize: "0.54rem", color: "var(--gold)", marginBottom: "1rem" }}>Delivery</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 300, color: "#111111", marginBottom: "0.75rem", letterSpacing: "0.01em" }}>
            Shipping Options
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#777777", lineHeight: 1.9, marginBottom: "2rem" }}>
            We ship to over 40 countries worldwide. All UK orders are dispatched from our London warehouse within 1 business day of being placed.
          </p>

          <div style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", padding: "0.85rem 1.25rem", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#F5F3F0" }}>
              {["Service", "Timeframe", "Cost", "Free Threshold"].map((h) => (
                <p key={h} className="label-caps" style={{ fontSize: "0.48rem", color: "var(--gold)" }}>{h}</p>
              ))}
            </div>
            {SHIPPING_OPTIONS.map((opt, i) => (
              <div
                key={opt.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
                  padding: "1rem 1.25rem",
                  borderBottom: i < SHIPPING_OPTIONS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  alignItems: "center",
                }}
              >
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#111111" }}>{opt.name}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#777777" }}>{opt.time}</p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", color: "#333333" }}>{opt.price}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: opt.threshold ? "var(--gold)" : "#777777" }}>
                  {opt.threshold ?? "—"}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#777777", lineHeight: 1.8, marginTop: "1.25rem" }}>
            Delivery times are estimates and may be affected by customs processing for international orders. Covora is not responsible for import duties or taxes applicable in your country.
          </p>
        </section>

        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "4rem" }} />

        {/* Returns */}
        <section style={{ marginBottom: "4rem" }}>
          <p className="label-caps" style={{ fontSize: "0.54rem", color: "var(--gold)", marginBottom: "1rem" }}>Returns</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 300, color: "#111111", marginBottom: "0.75rem", letterSpacing: "0.01em" }}>
            Our Returns Policy
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#777777", lineHeight: 1.9, marginBottom: "2.5rem" }}>
            We want you to love every piece you purchase from Covora. If something isn't right, you have <strong style={{ color: "#333333" }}>28 days</strong> from the date of delivery to return eligible items for a full refund or exchange. Items must be returned in their original, unworn condition with all tags attached.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="return-steps-grid">
            {RETURN_STEPS.map((item) => (
              <div key={item.step} style={{ padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 300, color: "var(--gold)", opacity: 0.5, marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
                  {item.step}
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 500, color: "#111111", marginBottom: "0.6rem", letterSpacing: "0.04em" }}>
                  {item.title}
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#777777", lineHeight: 1.85 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "4rem" }} />

        {/* Non-returnable */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 300, color: "#111111", marginBottom: "1rem", letterSpacing: "0.01em" }}>
            Non-Returnable Items
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#777777", lineHeight: 1.9, marginBottom: "1rem" }}>
            For hygiene reasons, the following items cannot be returned or exchanged unless faulty:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["Lingerie and swimwear", "Pierced jewellery", "Beauty and skincare products", "Sale items marked as final sale", "Items that have been worn, washed, or altered"].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#777777" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Contact CTA */}
        <div style={{ padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", background: "#F5F3F0" }}>
          <p className="label-caps" style={{ fontSize: "0.52rem", color: "var(--gold)", marginBottom: "0.75rem" }}>
            Need Help?
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#777777", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Our client services team is available Monday – Friday, 9am – 6pm GMT. Contact us at{" "}
            <a href="mailto:returns@covora.co.uk" style={{ color: "var(--gold)", textDecoration: "none" }}>
              returns@covora.co.uk
            </a>{" "}
            or visit our{" "}
            <Link href="/faq" style={{ color: "var(--gold)", textDecoration: "none" }}>
              FAQ page
            </Link>.
          </p>
          <Link href="/account/orders" className="btn btn-outline btn-md">
            Start a Return
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .return-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
