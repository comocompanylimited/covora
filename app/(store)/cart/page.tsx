"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import {
  wcGetCart,
  wcRemoveFromCart,
  wcUpdateCartItem,
  type WcCart,
} from "@/lib/graphql/cart";

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  // ── WooCommerce real cart ──────────────────────────────────────────────────
  const [wcCart,    setWcCart]    = useState<WcCart | null>(null)
  const [wcLoading, setWcLoading] = useState(true)

  useEffect(() => {
    wcGetCart().then((cart) => {
      setWcCart(cart)
      setWcLoading(false)
    })
  }, [])

  async function handleWcRemove(key: string, localId: string) {
    const updated = await wcRemoveFromCart(key)
    if (updated) setWcCart(updated)
    removeItem(localId)         // keep local badge in sync
  }

  async function handleWcUpdate(key: string, localId: string, qty: number) {
    if (qty <= 0) { handleWcRemove(key, localId); return }
    const updated = await wcUpdateCartItem(key, qty)
    if (updated) setWcCart(updated)
    updateQuantity(localId, qty) // keep local badge in sync
  }

  // Use WooCommerce cart when it has items; fall back to local store
  const wcItems = wcCart?.contents?.nodes ?? []
  const useWoo  = !wcLoading && wcItems.length > 0
  const [promoOpen,   setPromoOpen]   = useState(false);
  const [promoCode,   setPromoCode]   = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // ── Empty bag ────────────────────────────────────────────────────────────────
  const effectiveEmpty = useWoo ? wcItems.length === 0 : items.length === 0
  if (!wcLoading && effectiveEmpty) {
    return (
      <div
        className="bg-[var(--black)] min-h-screen flex flex-col items-center justify-center"
        style={{ paddingTop: "72px", padding: "calc(72px + 6rem) 1.5rem 6rem" }}
      >
        {/* Gold circle icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2.5rem",
            color: "rgba(201,169,110,0.4)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>

        <p
          className="label-caps"
          style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.5)", marginBottom: "1.4rem" }}
        >
          Your Bag
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            letterSpacing: "0.05em",
            color: "var(--ivory)",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Your bag is empty
        </h1>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.05rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--warm-grey)",
            letterSpacing: "0.04em",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          Discover the new collection and begin your Covora story
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
          <Link
            href="/collections"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--black)",
              background: "var(--gold)",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              transition: "background 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
          >
            Explore the Collection
          </Link>
          <Link
            href="/mens"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--warm-grey)",
              textDecoration: "none",
              transition: "color 0.2s ease",
              marginTop: "0.25rem",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey)")}
          >
            Shop Menswear
          </Link>
        </div>
      </div>
    );
  }

  // ── Filled bag ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-[var(--black)] min-h-screen" style={{ paddingTop: "72px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 3vw, 3rem)",
        }}
      >

        {/* ── Page heading ──────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border-dark)",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              className="label-caps"
              style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}
            >
              Your Bag
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
                color: "var(--ivory)",
                lineHeight: 1.1,
              }}
            >
              {useWoo
                ? `${wcItems.length} ${wcItems.length === 1 ? "item" : "items"}`
                : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            </h1>
          </div>
          <button
            onClick={clearCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-inter)",
              fontSize: "0.52rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--warm-grey-dark)",
              padding: 0,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-grey)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey-dark)")}
          >
            Clear bag
          </button>
        </div>

        {/* ── Two-column layout: items + summary ───────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
          className="max-lg:grid-cols-1"
        >

          {/* ── Cart items ────────────────────────────────────────── */}
          <div>
            {/* Loading skeleton while WooCommerce cart fetches */}
            {wcLoading && (
              <div style={{ borderTop: "1px solid var(--border-dark)", paddingTop: "2rem" }}>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      paddingBottom: "2rem",
                      marginBottom: "2rem",
                      borderBottom: "1px solid var(--border-dark)",
                      opacity: 0.4,
                    }}
                  >
                    <div style={{ width: "110px", aspectRatio: "3/4", background: "var(--charcoal-mid)" }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ height: "1.2rem", width: "60%", background: "var(--charcoal-mid)", borderRadius: "2px" }} />
                      <div style={{ height: "0.8rem", width: "30%", background: "var(--charcoal-mid)", borderRadius: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── WooCommerce cart items (real backend) ── */}
            {useWoo && wcItems.map((item, idx) => {
              const p = item.product.node
              const img = p.image?.sourceUrl ?? ""
              return (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    gap: "clamp(1rem, 2vw, 2rem)",
                    padding: "2rem 0",
                    borderBottom: "1px solid var(--border-dark)",
                    borderTop: idx === 0 ? "1px solid var(--border-dark)" : "none",
                  }}
                >
                  <Link href={`/product/${p.slug}`} style={{ flexShrink: 0 }}>
                    <div style={{ position: "relative", width: "clamp(100px, 14vw, 144px)", aspectRatio: "3/4", background: "var(--charcoal-mid)", overflow: "hidden" }}>
                      {img && (
                        <Image src={img} alt={p.name} fill sizes="144px" className="object-cover transition-transform duration-700 hover:scale-105" />
                      )}
                    </div>
                  </Link>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                      <Link
                        href={`/product/${p.slug}`}
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.03em", textDecoration: "none", display: "block", lineHeight: 1.2, transition: "color 0.2s ease" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                      >
                        {p.name}
                      </Link>
                      <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.03em", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {item.total}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-dark)" }}>
                        <button
                          onClick={() => handleWcUpdate(item.key, String(p.databaseId), item.quantity - 1)}
                          style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey)", fontSize: "1.1rem", transition: "color 0.2s ease, background 0.2s ease" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(201,169,110,0.05)" }}
                          onMouseLeave={e => { e.currentTarget.style.color = "var(--warm-grey)"; e.currentTarget.style.background = "none" }}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "var(--off-white)", borderLeft: "1px solid var(--border-dark)", borderRight: "1px solid var(--border-dark)" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleWcUpdate(item.key, String(p.databaseId), item.quantity + 1)}
                          style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey)", fontSize: "1.1rem", transition: "color 0.2s ease, background 0.2s ease" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(201,169,110,0.05)" }}
                          onMouseLeave={e => { e.currentTarget.style.color = "var(--warm-grey)"; e.currentTarget.style.background = "none" }}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <button
                        onClick={() => handleWcRemove(item.key, String(p.databaseId))}
                        style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--warm-grey-dark)", padding: 0, transition: "color 0.2s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-grey)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey-dark)")}
                      >Remove</button>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* ── Local cart fallback (when WooCommerce session unavailable) ── */}
            {!wcLoading && !useWoo && items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "clamp(1rem, 2vw, 2rem)",
                  padding: "2rem 0",
                  borderBottom: "1px solid var(--border-dark)",
                  borderTop: idx === 0 ? "1px solid var(--border-dark)" : "none",
                }}
              >
                <Link href={`/product/${item.slug}`} style={{ flexShrink: 0 }}>
                  <div style={{ position: "relative", width: "clamp(100px, 14vw, 144px)", aspectRatio: "3/4", background: "var(--charcoal-mid)", overflow: "hidden" }}>
                    <Image src={item.image || "/images/placeholder.jpg"} alt={item.imageAlt || item.name} fill sizes="144px" className="object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                </Link>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                    <Link
                      href={`/product/${item.slug}`}
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.03em", textDecoration: "none", display: "block", lineHeight: 1.2, transition: "color 0.2s ease" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                    >
                      {item.name}
                    </Link>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.03em", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-dark)" }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey)", fontSize: "1.1rem" }} aria-label="Decrease quantity">−</button>
                      <span style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "var(--off-white)", borderLeft: "1px solid var(--border-dark)", borderRight: "1px solid var(--border-dark)" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey)", fontSize: "1.1rem" }} aria-label="Increase quantity">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--warm-grey-dark)", padding: 0, transition: "color 0.2s ease" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-grey)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey-dark)")}>Remove</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <div style={{ marginTop: "2rem" }}>
              <Link
                href="/collections"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--warm-grey)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--warm-grey)")}
              >
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path d="M13 4H1M5 1L1 4l4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Continue shopping
              </Link>
            </div>
          </div>

          {/* ── Order summary panel ───────────────────────────────── */}
          <div style={{ position: "sticky", top: "calc(72px + 2rem)" }}>

            {/* Gold top accent bar */}
            <div
              style={{
                height: "2px",
                background: "linear-gradient(to right, var(--gold), rgba(201,169,110,0.2))",
                marginBottom: "0",
              }}
            />

            <div
              style={{
                border: "1px solid var(--border-dark)",
                borderTop: "none",
                padding: "2rem",
                background: "rgba(255,255,255,0.012)",
              }}
            >
              <p
                className="label-caps"
                style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.6)", marginBottom: "2rem" }}
              >
                Order Summary
              </p>

              {/* Line items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey)" }}>
                    Subtotal ({useWoo ? wcItems.length : itemCount} {(useWoo ? wcItems.length : itemCount) === 1 ? "item" : "items"})
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.05rem",
                      fontWeight: 300,
                      color: "var(--off-white)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {useWoo ? (wcCart?.subtotal ?? "—") : formatPrice(subtotal)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.04em", color: "var(--warm-grey)" }}>
                    Shipping
                  </span>
                  <span
                    className="label-caps"
                    style={{ fontSize: "0.4rem", letterSpacing: "0.12em", color: "var(--warm-grey-dark)" }}
                  >
                    Calculated at checkout
                  </span>
                </div>
              </div>

              {/* Promo code */}
              <div style={{ marginBottom: "1.5rem" }}>
                <button
                  onClick={() => setPromoOpen(!promoOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--warm-grey)",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--warm-grey)")}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    style={{
                      transform: promoOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <line x1="5" y1="1" x2="5" y2="9" strokeLinecap="round" />
                    <line x1="1" y1="5" x2="9" y2="5" strokeLinecap="round" />
                  </svg>
                  Promo code
                </button>

                {promoOpen && (
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                    <input
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="COVORA10"
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(201,169,110,0.25)",
                        outline: "none",
                        padding: "0.5rem 0",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        color: "var(--ivory)",
                        caretColor: "var(--gold)",
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.55)")}
                      onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.25)")}
                    />
                    <button
                      onClick={() => {
                        if (promoCode.trim()) { setPromoApplied(true) }
                      }}
                      style={{
                        background: "none",
                        border: "1px solid var(--border-dark)",
                        cursor: "pointer",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.5rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: promoApplied ? "rgba(110,180,110,0.8)" : "var(--warm-grey)",
                        padding: "0.4rem 0.9rem",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {promoApplied ? "✓ Applied" : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              {/* Gold divider */}
              <div
                style={{
                  height: "1px",
                  background: "linear-gradient(to right, rgba(201,169,110,0.4), transparent)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "2rem",
                }}
              >
                <span
                  className="label-caps"
                  style={{ fontSize: "0.45rem", letterSpacing: "0.2em", color: "var(--off-white)" }}
                >
                  Estimated total
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                    fontWeight: 300,
                    letterSpacing: "0.03em",
                    color: "var(--ivory)",
                  }}
                >
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "1.1rem",
                  background: "var(--gold)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "background 0.3s ease",
                  marginBottom: "0.75rem",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--gold-light)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "var(--gold)")}
              >
                Proceed to Checkout
              </Link>

              {/* Trust row */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                  marginTop: "1.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--border-dark)",
                }}
              >
                {[
                  "Secure, encrypted checkout",
                  "Free returns within 28 days",
                  "Luxury packaging on every order",
                ].map((line) => (
                  <div
                    key={line}
                    style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "rgba(201,169,110,0.4)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.04em",
                        color: "var(--warm-grey-dark)",
                        lineHeight: 1.4,
                      }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
