"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    category: "Orders",
    items: [
      {
        q: "How do I track my order?",
        a: "Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking number. You can also view your order status by logging in to your account and visiting the Orders section.",
      },
      {
        q: "Can I amend or cancel my order?",
        a: "We process orders quickly to ensure prompt dispatch. If you need to make changes, please contact us immediately at orders@covora.co.uk. We can only amend or cancel orders that have not yet been dispatched.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and Klarna. All transactions are secured with SSL encryption.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes, gift wrapping is available at checkout for £5. Your order will be presented in our signature black box with a handwritten message card if desired.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard UK delivery takes 3–5 business days. Express delivery is 1–2 business days, and Next Day Delivery is available for orders placed before 1pm Monday–Thursday. International delivery times vary by destination — please see our Shipping & Returns page for full details.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 40 countries worldwide. International shipping rates and estimated delivery times are shown at checkout. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.",
      },
      {
        q: "Is free delivery available?",
        a: "Free standard UK delivery is available on orders over £150. Free express delivery is available on orders over £300. Free international shipping thresholds vary by destination.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your returns policy?",
        a: "We offer free returns within 28 days of delivery for all eligible items. Items must be returned in their original, unworn condition with all tags attached. Please see our Shipping & Returns page for full details.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we have received and inspected your return, your refund will be processed within 5 business days. Refunds are issued to the original payment method. Please allow an additional 3–5 business days for the funds to appear in your account.",
      },
      {
        q: "Can I exchange an item?",
        a: "Yes, exchanges are available for different sizes or colours subject to availability. To request an exchange, initiate a return through your account and indicate the exchange preference. If the requested item is unavailable, a refund will be issued.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a detailed size guide. We recommend measuring yourself and comparing against the size chart before ordering. If you are between sizes, we generally recommend sizing up for a more relaxed fit.",
      },
      {
        q: "How do I care for my garments?",
        a: "Care instructions are printed on the label of every garment. We recommend following these carefully to maintain the quality of your pieces. Most of our delicate fabrics should be dry-cleaned or hand-washed in cold water.",
      },
      {
        q: "Are your products ethically sourced?",
        a: "Yes. We are committed to responsible sourcing and work exclusively with suppliers who meet our ethical standards. All of our manufacturers are audited annually against environmental and labour standards.",
      },
    ],
  },
  {
    category: "Account",
    items: [
      {
        q: "How do I create an account?",
        a: "You can create an account by clicking 'Sign In' in the top navigation and selecting 'Create Account'. An account allows you to track orders, save your wishlist, and enjoy a faster checkout experience.",
      },
      {
        q: "I've forgotten my password. What should I do?",
        a: "Click 'Sign In' and then 'Forgot Password'. Enter your email address and we will send you a password reset link. The link expires after 24 hours.",
      },
      {
        q: "How do I update my personal details?",
        a: "You can update your name, email address, password, and delivery addresses at any time by logging in and visiting Account > Profile.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Orders");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const activeFaqs = FAQS.find((g) => g.category === activeCategory)?.items ?? [];

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link href="/home" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#777777", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#777777", fontSize: "0.7rem" }}>›</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "var(--gold)" }}>FAQ</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 0.95 }}>
            Frequently Asked<br />Questions
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)", display: "grid", gridTemplateColumns: "200px 1fr", gap: "clamp(2rem, 4vw, 5rem)", alignItems: "start" }} className="faq-layout">

        {/* Category nav */}
        <nav style={{ position: "sticky", top: "calc(var(--header-height) + 2rem)" }} className="faq-nav">
          <p className="label-caps" style={{ fontSize: "0.5rem", color: "var(--gold)", marginBottom: "1rem" }}>Categories</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
            {FAQS.map((group) => (
              <button
                key={group.category}
                onClick={() => { setActiveCategory(group.category); setOpenItem(null); }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0.55rem 0",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  color: activeCategory === group.category ? "#111111" : "#777777",
                  cursor: "pointer",
                  textAlign: "left",
                  borderLeft: activeCategory === group.category ? "1px solid var(--gold)" : "1px solid transparent",
                  paddingLeft: "0.85rem",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em",
                }}
              >
                {group.category}
              </button>
            ))}
          </div>
        </nav>

        {/* Questions */}
        <div>
          <p className="label-caps" style={{ fontSize: "0.52rem", color: "var(--gold)", marginBottom: "1.5rem" }}>
            {activeCategory}
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {activeFaqs.map((item, i) => {
              const key = `${activeCategory}-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={key} style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: "1.25rem 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      gap: "1rem",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#111111", letterSpacing: "0.01em" }}>
                      {item.q}
                    </span>
                    <span style={{ color: "var(--gold)", fontSize: "1rem", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", lineHeight: 1 }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#777777", lineHeight: 1.9, paddingBottom: "1.5rem", maxWidth: "640px" }}>
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
          </div>

          {/* Still need help */}
          <div style={{ marginTop: "3rem", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", background: "#FFFFFF" }}>
            <p className="label-caps" style={{ fontSize: "0.52rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Still Need Help?</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#777777", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Our client services team is available Monday – Friday, 9am – 6pm GMT.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="mailto:hello@covora.co.uk" style={{
                fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 600,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#555555", border: "1px solid rgba(0,0,0,0.18)",
                padding: "0.75rem 1.75rem", textDecoration: "none",
                transition: "all 0.2s ease",
              }}>Email Us</a>
              <Link href="/account/orders" style={{
                fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#888888", textDecoration: "none",
                padding: "0.75rem 0",
                transition: "color 0.2s ease",
              }}>Track an Order →</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-layout { grid-template-columns: 1fr !important; }
          .faq-nav { position: static !important; display: flex !important; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
          .faq-nav > p { display: none; }
          .faq-nav > div { flex-direction: row !important; flex-wrap: wrap; gap: 0.35rem; }
          .faq-nav button { border-left: none !important; border-bottom: 1px solid transparent; padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
