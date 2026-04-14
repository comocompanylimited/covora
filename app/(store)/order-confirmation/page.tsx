import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed — Covora",
  description: "Your Covora order has been confirmed.",
};

export default function OrderConfirmationPage() {
  return (
    <div style={{
      background: "#FAFAF8",
      minHeight: "100vh",
      paddingTop: "var(--header-height)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        maxWidth: "620px",
        width: "100%",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 2.5rem)",
        textAlign: "center",
      }}>
        {/* Icon */}
        <div style={{
          width: "56px",
          height: "56px",
          border: "1px solid rgba(201,169,110,0.4)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 2rem",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.52rem",
          fontWeight: 600,
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          marginBottom: "1rem",
        }}>
          Order Confirmed
        </p>
        <h1 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 300,
          color: "#111111",
          letterSpacing: "0.01em",
          lineHeight: 1.1,
          marginBottom: "1.25rem",
        }}>
          Thank you for your order.
        </h1>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.78rem",
          color: "#777777",
          lineHeight: 1.95,
          marginBottom: "2.5rem",
        }}>
          Your order has been confirmed.
          {" "}A confirmation email has been sent to your address.
          {" "}We&apos;ll send you a dispatch notification when your order ships.
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "2.5rem" }} />

        {/* Order details grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "3rem",
          textAlign: "left",
        }}>
          {[
            { label: "Estimated Delivery", value: "3 – 5 business days" },
            { label: "Shipping to",        value: "United Kingdom" },
            { label: "Payment",            value: "Authorised" },
            { label: "Order Status",       value: "Processing" },
          ].map((item) => (
            <div key={item.label} style={{ padding: "1rem 1.1rem", border: "1px solid rgba(0,0,0,0.08)", background: "#FFFFFF" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.5rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#AAAAAA",
                marginBottom: "0.45rem",
              }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#333333" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/account/orders" className="oc-btn-outline">
            View Orders
          </Link>
          <Link href="/shop" className="oc-btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>

      <style>{`
        .oc-btn-outline {
          display: inline-block;
          font-family: var(--font-inter);
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #555555;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.18);
          padding: 0.85rem 2rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .oc-btn-outline:hover {
          border-color: rgba(0,0,0,0.35);
          color: #111111;
        }
        .oc-btn-primary {
          display: inline-block;
          font-family: var(--font-inter);
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: #111111;
          padding: 0.85rem 2rem;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .oc-btn-primary:hover { background: #333333; }
      `}</style>
    </div>
  );
}
