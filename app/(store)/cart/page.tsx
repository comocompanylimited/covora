"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [promoOpen,    setPromoOpen]    = useState(false);
  const [promoCode,    setPromoCode]    = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // ── Empty bag ────────────────────────────────────────────────────────────────

  if (items.length === 0) {
    return (
      <div style={{
        background: "#FFFFFF", minHeight: "100vh", paddingTop: "var(--header-height)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: "440px" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2.5rem", color: "rgba(201,169,110,0.45)",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "1rem" }}>
            Your Bag
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#111111", marginBottom: "0.85rem", letterSpacing: "-0.01em" }}>
            Your bag is empty
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.76rem", color: "#AAAAAA", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Discover the new collection and begin your Covora story.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.65rem" }}>
            <Link href="/new-in" style={{
              fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#FFFFFF", background: "#111111",
              padding: "1rem 2.5rem", textDecoration: "none",
              transition: "background 0.25s ease",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#333333")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#111111")}
            >
              Shop New In
            </Link>
            <Link href="/collections" style={{
              fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#AAAAAA", textDecoration: "none",
              transition: "color 0.2s ease",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111111")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#AAAAAA")}
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Filled bag ───────────────────────────────────────────────────────────────

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Page header */}
      <div style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        paddingTop: "clamp(2.5rem, 4vw, 3.5rem)",
        paddingBottom: "clamp(1.75rem, 3vw, 2.5rem)",
        paddingLeft: "var(--container-padding)", paddingRight: "var(--container-padding)",
      }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "0.6rem" }}>
              Your Bag
            </p>
            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 0.95 }}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </h1>
          </div>
          <button
            onClick={clearCart}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#CCCCCC", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#B84040")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#CCCCCC")}
          >
            Clear bag
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{
        maxWidth: "var(--container-wide)", margin: "0 auto",
        padding: "clamp(2rem, 4vw, 3.5rem) var(--container-padding)",
        display: "grid", gridTemplateColumns: "1fr 340px",
        gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start",
      }} className="cart-layout">

        {/* ── Left: Items ─────────────────────────────────────────── */}
        <div>
          {items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: "flex", gap: "clamp(1rem, 2vw, 1.75rem)",
                padding: "1.75rem 0",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                borderTop: idx === 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
                background: "#FFFFFF",
                paddingLeft: "1.25rem", paddingRight: "1.25rem",
                marginLeft: "-1.25rem", marginRight: "-1.25rem",
              }}
            >
              {/* Image placeholder */}
              <Link href={`/product/${item.slug}`} style={{ flexShrink: 0, textDecoration: "none" }}>
                <div style={{
                  width: "clamp(90px, 12vw, 130px)", aspectRatio: "3/4",
                  background: "#F0EDE8", border: "1px solid rgba(0,0,0,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", transition: "opacity 0.2s ease",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              </Link>

              {/* Details */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, paddingTop: "0.2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      style={{
                        fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                        fontWeight: 300, color: "#111111", textDecoration: "none",
                        display: "block", lineHeight: 1.2, marginBottom: "0.3rem",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111111")}
                    >
                      {item.name}
                    </Link>
                    {Object.keys(item.selectedAttributes).length > 0 && (
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#AAAAAA", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>
                        {Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                      </p>
                    )}
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.54rem", color: "#CCCCCC", letterSpacing: "0.05em" }}>
                      {item.sku}
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 300, color: "#111111", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                  {/* Qty */}
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(0,0,0,0.12)", height: "36px" }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease"
                      style={{ width: "36px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#666666", fontSize: "1rem", transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >−</button>
                    <span style={{ width: "36px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#111111", borderLeft: "1px solid rgba(0,0,0,0.08)", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase"
                      style={{ width: "36px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#666666", fontSize: "1rem", transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#CCCCCC", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#B84040")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#CCCCCC")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <div style={{ marginTop: "1.75rem" }}>
            <Link
              href="/shop"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "var(--font-inter)", fontSize: "0.54rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#AAAAAA", textDecoration: "none", transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111111")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#AAAAAA")}
            >
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 4H1M5 1L1 4l4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Continue shopping
            </Link>
          </div>
        </div>

        {/* ── Right: Summary ───────────────────────────────────────── */}
        <div style={{ position: "sticky", top: "calc(var(--header-height) + 1.5rem)", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
          {/* Gold top accent */}
          <div style={{ height: "2px", background: "linear-gradient(to right, var(--gold-dark), rgba(201,169,110,0.15))" }} />

          <div style={{ padding: "1.75rem" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", marginBottom: "1.5rem" }}>
              Order Summary
            </p>

            {/* Line items summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.66rem", color: "#555555", lineHeight: 1.4 }}>
                    {item.name}
                    {item.quantity > 1 && <span style={{ color: "#AAAAAA" }}> × {item.quantity}</span>}
                  </span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", color: "#111111", flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "1rem" }} />

            {/* Subtotal + shipping */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#888888" }}>Subtotal</span>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#111111" }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#888888" }}>Shipping</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "var(--gold-dark)" }}>Calculated at checkout</span>
              </div>
            </div>

            {/* Promo code */}
            <div style={{ marginBottom: "1.25rem" }}>
              <button
                onClick={() => setPromoOpen(!promoOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  fontFamily: "var(--font-inter)", fontSize: "0.56rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#AAAAAA", transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#555555")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#AAAAAA")}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.2"
                  style={{ transform: promoOpen ? "rotate(45deg)" : "none", transition: "transform 0.22s ease" }}>
                  <path d="M4.5 1v7M1 4.5h7" strokeLinecap="round" />
                </svg>
                Promo code
              </button>
              {promoOpen && (
                <div style={{ marginTop: "0.65rem", display: "flex", gap: "0.5rem" }}>
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    style={{
                      flex: 1, background: "transparent", outline: "none",
                      border: "none", borderBottom: "1px solid rgba(0,0,0,0.15)",
                      padding: "0.45rem 0", fontFamily: "var(--font-inter)",
                      fontSize: "0.62rem", letterSpacing: "0.08em", color: "#111111",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.35)")}
                    onBlur={(e)  => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.15)")}
                  />
                  <button
                    onClick={() => { if (promoCode.trim()) setPromoApplied(true); }}
                    style={{
                      background: "none", border: "1px solid rgba(0,0,0,0.13)",
                      cursor: "pointer", fontFamily: "var(--font-inter)",
                      fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase",
                      color: promoApplied ? "#3D7A4E" : "#555555",
                      padding: "0.4rem 0.75rem", flexShrink: 0,
                    }}
                  >
                    {promoApplied ? "✓ Applied" : "Apply"}
                  </button>
                </div>
              )}
            </div>

            <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "1.1rem" }} />

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#111111" }}>
                Estimated Total
              </span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem, 2vw, 1.6rem)", fontWeight: 400, color: "#111111" }}>
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              style={{
                display: "block", width: "100%", padding: "1rem",
                background: "#111111", color: "#FFFFFF", textDecoration: "none",
                fontFamily: "var(--font-inter)", fontSize: "0.58rem",
                fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                textAlign: "center", transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#333333")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#111111")}
            >
              Proceed to Checkout
            </Link>

            {/* Trust signals */}
            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {["Secure, encrypted checkout", "Free returns within 28 days", "Luxury packaging on every order"].map((line) => (
                <div key={line} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(201,169,110,0.5)", flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", color: "#AAAAAA", letterSpacing: "0.03em" }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
