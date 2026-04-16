"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ui/Card";
import type { Product as MockProduct } from "@/lib/api";
import { useCart } from "@/store/cart";

// Safe description renderer — strips HTML tags, normalises whitespace
function useCleanDescription(raw: string) {
  return useMemo(() => {
    if (!raw) return "";
    // Strip HTML tags
    const stripped = raw.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    // Collapse whitespace
    return stripped.replace(/\s+/g, " ").trim();
  }, [raw]);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MockProductDetail {
  id:             string;
  slug:           string;
  name:           string;
  price:          string;
  originalPrice?: string;
  category:       string;
  categorySlug:   string;
  badge?:         string;
  description:    string;
  sku:            string;
  images:         { bg: string; alt: string; src?: string }[];
  sizes:          string[];
  colours:        { name: string; hex: string }[];
  details:        string[];
  materials:      string;
  care:           string;
  shipping:       string;
}

interface Props {
  product: MockProductDetail;
  related: MockProduct[];
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function Accordion({ title, children, defaultOpen = false }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "1rem 0",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600,
          letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A1A1A",
        }}>
          {title}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#AAAAAA" strokeWidth="1.2"
          style={{ flexShrink: 0, transition: "transform 0.22s ease", transform: open ? "rotate(45deg)" : "none" }}
        >
          <path d="M5 1v8M1 5h8" strokeLinecap="round" />
        </svg>
      </button>
      {open && <div style={{ paddingBottom: "1.25rem" }}>{children}</div>}
    </div>
  );
}

// ─── ProductDetailClient ──────────────────────────────────────────────────────

export function ProductDetailClient({ product, related }: Props) {
  const [activeImg,    setActiveImg]    = useState(0);
  const [activeSize,   setActiveSize]   = useState("");
  const [activeColor,  setActiveColor]  = useState(product.colours[0]?.name ?? "");
  const [qty,          setQty]          = useState(1);
  const [added,        setAdded]        = useState(false);
  const [wishlisted,   setWishlisted]   = useState(false);
  const [sizeError,    setSizeError]    = useState(false);

  const { addItem } = useCart();
  const hasSale = !!product.originalPrice;
  const cleanDescription = useCleanDescription(product.description);

  function handleAddToCart() {
    if (!activeSize && product.sizes.length > 1) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }
    setSizeError(false);
    const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
    addItem({
      productId:          parseInt(product.id) || 1,
      name:               product.name,
      slug:               product.slug,
      price:              priceNum,
      quantity:           qty,
      image:              "",
      imageAlt:           product.name,
      selectedAttributes: {
        ...(activeSize  ? { Size:   activeSize  } : {}),
        ...(activeColor ? { Colour: activeColor } : {}),
      },
      sku:         product.sku,
      maxQuantity: 99,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const BADGE_STYLE: Record<string, React.CSSProperties> = {
    New:       { background: "var(--gold-dark)", color: "#fff", border: "none" },
    Sale:      { background: "rgba(190,70,70,0.08)", color: "#C05050", border: "1px solid rgba(190,70,70,0.22)" },
    Exclusive: { background: "rgba(201,169,110,0.1)", color: "var(--gold-dark)", border: "1px solid rgba(201,169,110,0.28)" },
  };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div style={{
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "0.9rem var(--container-padding)",
        background: "#FAFAF8",
      }}>
        <nav style={{
          maxWidth: "var(--container-wide)", margin: "0 auto",
          display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap",
        }}>
          {[
            { label: "Home",           href: "/home" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name,     href: undefined },
          ].map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              {i > 0 && <span style={{ color: "#DDDDDD", fontSize: "0.6rem" }}>›</span>}
              {crumb.href ? (
                <Link href={crumb.href} style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.54rem", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#AAAAAA", textDecoration: "none",
                }}>
                  {crumb.label}
                </Link>
              ) : (
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.54rem", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#555555",
                  maxWidth: "24ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div style={{
        maxWidth: "var(--container-wide)", margin: "0 auto",
        padding: "clamp(2rem, 4vw, 3.5rem) var(--container-padding) clamp(4rem, 7vw, 7rem)",
      }}>
        <div className="pdp-layout">

          {/* ══ GALLERY ══════════════════════════════════════════════ */}
          <div className="pdp-gallery">
            <div className="pdp-gallery-inner">

              {/* Vertical thumbnail strip */}
              {product.images.length > 1 && (
                <div className="pdp-thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={img.alt}
                      style={{
                        width: "100%", aspectRatio: "3/4",
                        background: img.bg, padding: 0, cursor: "pointer",
                        border: `1.5px solid ${i === activeImg ? "#111111" : "transparent"}`,
                        outline: i === activeImg ? "none" : "1px solid rgba(0,0,0,0.08)",
                        outlineOffset: "0px",
                        opacity: i === activeImg ? 1 : 0.58,
                        transition: "opacity 0.2s ease, border-color 0.2s ease",
                        position: "relative", overflow: "hidden",
                      }}
                    >
                      {img.src && (
                        <Image src={img.src} alt={img.alt} fill sizes="80px" style={{ objectFit: "cover" }} />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div style={{ position: "relative", aspectRatio: "3/4" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: product.images[activeImg]?.bg ?? "#F0EDE8",
                  transition: "background 0.35s ease",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}>
                  {!product.images[activeImg]?.src && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.9rem" }}>
                      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="0.7">
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.35)" }}>Covora</span>
                    </div>
                  )}
                  {product.images[activeImg]?.src && (
                    <Image
                      src={product.images[activeImg].src!}
                      alt={product.images[activeImg].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  )}
                </div>

                {/* Badge */}
                {product.badge && (
                  <span style={{
                    position: "absolute", top: "1rem", left: "1rem", zIndex: 2,
                    fontFamily: "var(--font-inter)", fontSize: "0.46rem", fontWeight: 600,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "0.22rem 0.6rem",
                    ...(BADGE_STYLE[product.badge] ?? BADGE_STYLE.Exclusive),
                  }}>
                    {product.badge}
                  </span>
                )}

                {/* Mobile-only arrow nav */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)}
                      aria-label="Previous"
                      className="pdp-arrow pdp-arrow-left"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M8 1L3 6l5 5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % product.images.length)}
                      aria-label="Next"
                      className="pdp-arrow pdp-arrow-right"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M4 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image counter dot — mobile */}
                {product.images.length > 1 && (
                  <div className="pdp-dots">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        style={{
                          width: i === activeImg ? "18px" : "6px",
                          height: "5px",
                          borderRadius: "3px",
                          background: i === activeImg ? "#111111" : "rgba(0,0,0,0.25)",
                          border: "none", padding: 0, cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ══ INFO ═════════════════════════════════════════════════ */}
          <div className="pdp-info">

            {/* Category label */}
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
              letterSpacing: "0.24em", textTransform: "uppercase",
              color: "var(--gold-dark)", marginBottom: "0.65rem",
            }}>
              {product.category}
            </p>

            {/* Name */}
            <h1 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.2vw, 3rem)",
              fontWeight: 300, color: "#0F0F0F",
              lineHeight: 1.0, letterSpacing: "-0.015em",
              marginBottom: "1rem",
            }}>
              {product.name}
            </h1>

            {/* Price row */}
            <div style={{
              display: "flex", alignItems: "baseline",
              gap: "0.65rem", marginBottom: "0.6rem",
            }}>
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                fontWeight: 400,
                color: hasSale ? "#B84040" : "#0F0F0F",
                letterSpacing: "0.01em",
              }}>
                {product.price}
              </span>
              {product.originalPrice && (
                <span style={{
                  fontFamily: "var(--font-cormorant)", fontSize: "1.1rem",
                  color: "#CCCCCC", textDecoration: "line-through",
                }}>
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.4rem", marginBottom: "1.5rem",
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#5DA06A", display: "inline-block", flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: "0.58rem",
                color: "#5DA06A", letterSpacing: "0.05em",
              }}>In stock</span>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "1.5rem" }} />

            {/* Description */}
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: "0.76rem",
              color: "#5A5A5A", lineHeight: 1.8, marginBottom: "1.75rem",
            }}>
              {cleanDescription}
            </p>

            {/* ── Colour ──────────────────────────────────────────── */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{
                display: "flex", alignItems: "center",
                gap: "0.5rem", marginBottom: "0.75rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.54rem", fontWeight: 600,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1A1A",
                }}>Colour</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#999999" }}>
                  — {activeColor}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {product.colours.map((col) => {
                  const isLight = col.hex === "#FFFFFF" || col.hex === "#FAF8F5" || col.hex === "#F5F0E8";
                  const isActive = activeColor === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setActiveColor(col.name)}
                      title={col.name}
                      aria-label={`Select ${col.name}`}
                      style={{
                        width: "26px", height: "26px", borderRadius: "50%",
                        background: col.hex, padding: 0, cursor: "pointer",
                        border: `2px solid ${isActive ? "#111111" : "transparent"}`,
                        boxShadow: isLight
                          ? `inset 0 0 0 1px rgba(0,0,0,0.15), ${isActive ? "0 0 0 3px rgba(0,0,0,0.12)" : "0 0 0 2px rgba(0,0,0,0.06)"}`
                          : isActive
                            ? "0 0 0 3px rgba(0,0,0,0.1)"
                            : "0 0 0 2px transparent",
                        transition: "all 0.18s ease",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* ── Size ────────────────────────────────────────────── */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: "0.75rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.54rem", fontWeight: 600,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1A1A",
                }}>Size</span>
                <Link href="/size-guide" style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.56rem",
                  color: "#BBBBBB", textDecoration: "underline", textUnderlineOffset: "3px",
                  letterSpacing: "0.04em",
                }}>
                  Size guide
                </Link>
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {product.sizes.map((sz) => {
                  const isActive = activeSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => { setActiveSize(sz); setSizeError(false); }}
                      style={{
                        fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500,
                        letterSpacing: "0.06em",
                        padding: "0.52rem 1rem", minWidth: "46px", textAlign: "center",
                        border: `1px solid ${sizeError && !isActive ? "rgba(184,64,64,0.35)" : isActive ? "#111111" : "rgba(0,0,0,0.13)"}`,
                        background: isActive ? "#111111" : "transparent",
                        color: isActive ? "#FFFFFF" : "#3A3A3A",
                        cursor: "pointer", transition: "all 0.16s ease",
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
              {sizeError && (
                <p style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.56rem",
                  color: "#B84040", marginTop: "0.55rem", letterSpacing: "0.03em",
                }}>
                  Please select a size to continue.
                </p>
              )}
            </div>

            {/* ── Quantity ────────────────────────────────────────── */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.85rem", marginBottom: "1rem",
            }}>
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: "0.54rem", fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1A1A",
              }}>Qty</span>
              <div style={{
                display: "flex", alignItems: "center",
                border: "1px solid rgba(0,0,0,0.13)", height: "42px",
              }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  style={{
                    width: "40px", height: "100%", display: "flex", alignItems: "center",
                    justifyContent: "center", background: "none", border: "none",
                    cursor: "pointer", color: "#555555", fontSize: "1rem",
                  }}
                >−</button>
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.72rem",
                  color: "#111111", minWidth: "32px", textAlign: "center",
                  userSelect: "none" as const,
                }}>{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                  style={{
                    width: "40px", height: "100%", display: "flex", alignItems: "center",
                    justifyContent: "center", background: "none", border: "none",
                    cursor: "pointer", color: "#555555", fontSize: "1rem",
                  }}
                >+</button>
              </div>
            </div>

            {/* ── Add to Cart + Wishlist ───────────────────────────── */}
            <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, height: "54px",
                  background: added ? "#3D7A4E" : "#111111",
                  color: "#FFFFFF", border: "none",
                  fontFamily: "var(--font-inter)", fontSize: "0.58rem",
                  fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                  cursor: "pointer", transition: "background 0.28s ease",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
                }}
              >
                {added ? (
                  <>
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M1 5l3.5 4L11 1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Added to Bag
                  </>
                ) : "Add to Bag"}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                style={{
                  width: "54px", height: "54px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "none",
                  border: `1px solid ${wishlisted ? "rgba(184,64,64,0.35)" : "rgba(0,0,0,0.13)"}`,
                  cursor: "pointer",
                  color: wishlisted ? "#B84040" : "#888888",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { if (!wishlisted) (e.currentTarget as HTMLElement).style.color = "#333333"; }}
                onMouseLeave={(e) => { if (!wishlisted) (e.currentTarget as HTMLElement).style.color = "#888888"; }}
              >
                <svg width="17" height="15" viewBox="0 0 22 20" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
                  <path d="M11 18.5S1.5 12.5 1.5 6.5a5 5 0 0 1 9.5-2.17A5 5 0 0 1 20.5 6.5c0 6-9.5 12-9.5 12z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Trust strip */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "2rem", paddingTop: "0.25rem",
            }}>
              <svg width="12" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.4">
                <rect x="3" y="9" width="18" height="13" rx="1" />
                <path d="M8 9V7a4 4 0 0 1 8 0v2" strokeLinecap="round" />
              </svg>
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: "0.55rem",
                color: "#BBBBBB", letterSpacing: "0.04em",
              }}>
                Free returns · Secure checkout · Gift wrapping available
              </span>
            </div>

            {/* ── Accordions ──────────────────────────────────────── */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <Accordion title="Product Details" defaultOpen>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {product.details.map((d, i) => (
                    <li key={i} style={{
                      fontFamily: "var(--font-inter)", fontSize: "0.7rem",
                      color: "#5A5A5A", lineHeight: 1.65,
                      display: "flex", gap: "0.6rem", alignItems: "flex-start",
                    }}>
                      <span style={{ color: "var(--gold-dark)", flexShrink: 0, lineHeight: 1.65 }}>–</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Materials & Care">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#5A5A5A", lineHeight: 1.65 }}>
                    <strong style={{ color: "#2A2A2A", fontWeight: 600 }}>Composition — </strong>
                    {product.materials}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#5A5A5A", lineHeight: 1.65 }}>
                    <strong style={{ color: "#2A2A2A", fontWeight: 600 }}>Care — </strong>
                    {product.care}
                  </p>
                </div>
              </Accordion>

              <Accordion title="Delivery & Returns">
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#5A5A5A", lineHeight: 1.75 }}>
                  {product.shipping}
                </p>
              </Accordion>
            </div>
          </div>
          {/* /info */}
        </div>
        {/* /layout */}
      </div>

      {/* ── Related Products ────────────────────────────────────────── */}
      {related.length > 0 && (
        <div style={{
          background: "#FAFAF8",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          paddingTop: "clamp(3rem, 5vw, 5.5rem)",
          paddingBottom: "clamp(4rem, 7vw, 7rem)",
          paddingLeft: "var(--container-padding)",
          paddingRight: "var(--container-padding)",
        }}>
          <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
            <div style={{ marginBottom: "clamp(1.75rem, 3vw, 2.75rem)" }}>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
                letterSpacing: "0.24em", textTransform: "uppercase",
                color: "var(--gold-dark)", marginBottom: "0.55rem",
              }}>
                You May Also Like
              </p>
              <h2 style={{
                fontFamily: "var(--font-cormorant)", fontWeight: 300,
                fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                color: "#111111", lineHeight: 0.95, letterSpacing: "-0.01em",
              }}>
                Complete the Look
              </h2>
            </div>

            <div className="pdp-related-grid pdp-light-cards">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  href={`/product/${p.slug}`}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  bg={p.bg}
                  badge={p.badge}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Scoped styles ───────────────────────────────────────────── */}
      <style>{`
        /* Two-column PDP layout */
        .pdp-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
          gap: clamp(2.5rem, 5.5vw, 6.5rem);
          align-items: start;
        }

        /* Gallery sticky on desktop */
        .pdp-gallery { position: sticky; top: calc(var(--header-height) + 1.25rem); }

        /* Gallery interior: thumbs | main image */
        .pdp-gallery-inner {
          display: grid;
          grid-template-columns: 68px 1fr;
          gap: 0.6rem;
          align-items: start;
        }

        /* Vertical thumb strip */
        .pdp-thumbs {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        /* Info max-width on wide screens */
        .pdp-info { max-width: 540px; }

        /* Arrow nav — desktop hidden, mobile shown */
        .pdp-arrow {
          display: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: rgba(255,255,255,0.9);
          border: none;
          width: 36px; height: 36px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333333;
          backdrop-filter: blur(4px);
        }
        .pdp-arrow-left  { left:  0.65rem; }
        .pdp-arrow-right { right: 0.65rem; }

        /* Dot indicators — desktop hidden, mobile shown */
        .pdp-dots {
          display: none;
          position: absolute;
          bottom: 0.85rem;
          left: 50%;
          transform: translateX(-50%);
          gap: 0.35rem;
          align-items: center;
          z-index: 3;
        }

        /* Related grid */
        .pdp-related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.85rem, 1.8vw, 1.5rem);
        }

        /* Light-bg pcard overrides */
        .pdp-light-cards .pcard-name              { color: #555555; }
        .pdp-light-cards .pcard:hover .pcard-name { color: #111111; }
        .pdp-light-cards .pcard-price             { color: #111111; }
        .pdp-light-cards .pcard:hover .pcard-price{ color: #111111; }
        .pdp-light-cards .pcard-price-original    { color: #999999; }
        .pdp-light-cards .pcard-img               { border-color: rgba(0,0,0,0.08); }
        .pdp-light-cards .pcard:hover .pcard-img  { border-color: rgba(0,0,0,0.18); }

        /* ── Mobile ─────────────────────────────────── */
        @media (max-width: 860px) {
          .pdp-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .pdp-gallery { position: static; }
          .pdp-info    { max-width: 100%; }

          /* On mobile, hide thumb strip, show arrows + dots */
          .pdp-gallery-inner {
            grid-template-columns: 1fr;
          }
          .pdp-thumbs  { display: none; }
          .pdp-arrow   { display: flex; }
          .pdp-dots    { display: flex; }
        }

        @media (max-width: 860px) {
          .pdp-related-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
