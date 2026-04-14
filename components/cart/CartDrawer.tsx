"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { isOpen, items, itemCount, subtotal, closeCart, removeItem, updateQuantity } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position:     "fixed", inset: 0, zIndex: 200,
          background:   "rgba(0,0,0,0.38)",
          backdropFilter: "blur(2px)",
          opacity:      isOpen ? 1 : 0,
          pointerEvents:isOpen ? "auto" : "none",
          transition:   "opacity 0.38s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position:   "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
          width:      "min(440px, 100vw)",
          background: "#FFFFFF",
          borderLeft: "1px solid rgba(0,0,0,0.07)",
          display:    "flex", flexDirection: "column",
          transform:  isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.44s cubic-bezier(0.16,1,0.30,1)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.75rem", height: "64px",
          borderBottom: "1px solid rgba(0,0,0,0.07)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
            <span style={{
              fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase", color: "#111111",
            }}>Your Bag</span>
            {itemCount > 0 && (
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#AAAAAA",
              }}>
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#888888", padding: "0.35rem", display: "flex",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.75rem" }}>
          {items.length === 0 ? (
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              textAlign: "center", gap: "1.25rem",
            }}>
              <div style={{
                width: "60px", height: "60px", borderRadius: "50%",
                border: "1px solid rgba(201,169,110,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(201,169,110,0.45)",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <p style={{
                  fontFamily: "var(--font-cormorant)", fontSize: "1.4rem",
                  fontWeight: 300, color: "#333333", marginBottom: "0.5rem",
                }}>Your bag is empty</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#AAAAAA" }}>
                  Discover the new collection.
                </p>
              </div>
              <Link
                href="/new-in"
                onClick={closeCart}
                style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#111111", border: "1px solid rgba(0,0,0,0.15)",
                  padding: "0.7rem 1.5rem", textDecoration: "none",
                  transition: "all 0.2s ease", marginTop: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#111111";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#111111";
                }}
              >
                Shop New In
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {items.map((item, idx) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex", gap: "1rem",
                    paddingTop: "1.25rem", paddingBottom: "1.25rem",
                    borderBottom: idx < items.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  {/* Image placeholder */}
                  <Link href={`/product/${item.slug}`} onClick={closeCart} style={{ flexShrink: 0 }}>
                    <div style={{
                      width: "80px", aspectRatio: "3/4",
                      background: "#F0EDE8",
                      border: "1px solid rgba(0,0,0,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      overflow: "hidden",
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                  </Link>

                  {/* Details */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        style={{
                          fontFamily: "var(--font-cormorant)", fontSize: "1.05rem",
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
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", color: "#AAAAAA", letterSpacing: "0.06em" }}>
                          {Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                        </p>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
                      {/* Qty */}
                      <div style={{
                        display: "flex", alignItems: "center",
                        border: "1px solid rgba(0,0,0,0.12)", height: "32px",
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease"
                          style={{
                            width: "30px", height: "100%", display: "flex", alignItems: "center",
                            justifyContent: "center", background: "none", border: "none",
                            cursor: "pointer", color: "#666666", fontSize: "1rem",
                          }}
                        >−</button>
                        <span style={{
                          width: "28px", textAlign: "center",
                          fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#111111",
                          borderLeft: "1px solid rgba(0,0,0,0.1)", borderRight: "1px solid rgba(0,0,0,0.1)",
                          lineHeight: "30px",
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase"
                          style={{
                            width: "30px", height: "100%", display: "flex", alignItems: "center",
                            justifyContent: "center", background: "none", border: "none",
                            cursor: "pointer", color: "#666666", fontSize: "1rem",
                          }}
                        >+</button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#111111" }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#CCCCCC", padding: "0.2rem", display: "flex",
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#B84040")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#CCCCCC")}
                        >
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                            <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.25rem 1.75rem", borderTop: "1px solid rgba(0,0,0,0.07)", flexShrink: 0, background: "#FAFAF8" }}>
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#888888", letterSpacing: "0.06em" }}>
                Subtotal
              </span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", fontWeight: 400, color: "#111111" }}>
                {formatPrice(subtotal)}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", color: "#CCCCCC", marginBottom: "1.1rem", letterSpacing: "0.04em" }}>
              Shipping calculated at checkout.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              <Link
                href="/checkout"
                onClick={closeCart}
                style={{
                  display: "block", width: "100%", padding: "0.9rem",
                  background: "#111111", color: "#FFFFFF",
                  fontFamily: "var(--font-inter)", fontSize: "0.58rem",
                  fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                  textDecoration: "none", textAlign: "center",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#333333")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#111111")}
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                style={{
                  display: "block", width: "100%", padding: "0.9rem",
                  background: "transparent", color: "#555555",
                  fontFamily: "var(--font-inter)", fontSize: "0.56rem",
                  fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase",
                  textDecoration: "none", textAlign: "center",
                  border: "1px solid rgba(0,0,0,0.13)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.28)"; (e.currentTarget as HTMLElement).style.color = "#111111"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.13)"; (e.currentTarget as HTMLElement).style.color = "#555555"; }}
              >
                View Bag
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
