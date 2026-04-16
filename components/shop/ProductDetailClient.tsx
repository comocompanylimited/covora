"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ui/Card";
import type { Product as MockProduct } from "@/lib/api";
import { useCart } from "@/store/cart";

// ─── Professional title generator ─────────────────────────────────────────
// CJ product names are often noisy marketing strings. This produces a concise,
// professional title by stripping noise and keeping only descriptive content.

// Marketing words that add no value to a title when they appear at the start
// or are surrounded by more informative words.
const _TITLE_NOISE_WORDS = [
  "sexy", "hot", "new", "fashion", "casual", "classic", "vintage", "stylish",
  "elegant", "trendy", "chic", "boho", "bohemian", "cute", "sweet",
  "beautiful", "gorgeous", "lovely", "charming", "pretty",
  "female", "ladies", "lady", "women's", "womens", "woman's",
  "self-pickup", "self pickup", "sell well", "free shipping",
  "hot sale", "new arrival", "fashion new", "best seller",
  "high quality", "high-quality", "luxury", "premium", "good quality",
];

// Known CJ brand names / store names to strip
const _BRAND_NOISE = [
  "yoins", "zaful", "shein", "romwe", "dresslily", "rosegal",
  "tbdress", "tidebuy", "sammydress", "floryday", "milanoo",
];

function cleanProductTitle(raw: string): string {
  if (!raw?.trim()) return raw;

  let t = raw.trim()
    // Strip everything after a pipe/bar separator (CJ often adds model codes after |)
    .replace(/\s*[|｜/／]\s*.+$/g, "")
    // Strip bracketed content at end (sizes, colour codes, model numbers)
    .replace(/[\s_-]*[\[\(（【][^\]\)）】]{0,40}[\]\)）】]\s*$/g, "")
    // Strip trailing ALL-CAPS code sequences (SKUs like ABCD1234, CJXXXX)
    .replace(/\s+[A-Z]{2,}[\d-]{2,}[A-Z\d-]*$/g, "")
    .replace(/\s+CJ[A-Z0-9-]+$/gi, "")
    // Strip trailing standalone numbers (sizes, item codes)
    .replace(/\s+#?\d{4,}$/g, "")
    // Remove CJ store/brand names
    .replace(new RegExp(`\\b(${_BRAND_NOISE.join("|")})\\b`, "gi"), "")
    // Remove leading "Women's" / "Ladies'" (the whole store is women's)
    .replace(/^(Women'?s?|Womens|Lady|Ladies|Female|Girls?)\s+/i, "")
    // Remove noise marketing words from the start only
    .replace(
      new RegExp(`^(${_TITLE_NOISE_WORDS.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\s+`, "gi"),
      ""
    )
    // Clean up punctuation artefacts
    .replace(/^[,\-–—\s]+/, "")
    .replace(/[,\-–—\s]+$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Enforce a reasonable max length — cut at a word boundary around 60 chars
  if (t.length > 65) {
    const cut = t.lastIndexOf(" ", 62);
    t = cut > 20 ? t.slice(0, cut).replace(/[,\-–—\s]+$/, "") : t.slice(0, 62);
  }

  // Title-case if entirely lowercase or entirely uppercase
  const isAllCaps = t === t.toUpperCase() && /[A-Z]/.test(t);
  const isAllLower = t === t.toLowerCase() && /[a-z]/.test(t);
  if (isAllCaps || isAllLower) {
    t = t
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (ch) => ch.toUpperCase())
      // Keep small words lowercase unless at start
      .replace(/\s(And|Or|Of|In|On|At|A|An|The|For|To|With|By)\s/gi,
        (m) => m.toLowerCase());
  }

  return t || raw.trim();
}

// ─── Premium description generator ────────────────────────────────────────
const FABRIC_KEYWORDS: Record<string, string> = {
  lace: "intricate lace detailing",
  satin: "lustrous satin",
  velvet: "sumptuous velvet",
  silk: "fluid silk",
  chiffon: "lightweight chiffon",
  cashmere: "ultra-soft cashmere",
  knit: "fine-gauge knit",
  cotton: "breathable premium cotton",
  denim: "premium denim",
  leather: "refined leather",
  suede: "supple suede",
  linen: "crisp linen",
  tulle: "delicate tulle layers",
  sequin: "hand-applied sequin embellishment",
  embroid: "intricate embroidery",
  mesh: "sheer mesh panelling",
};

const STYLE_KEYWORDS: Record<string, string> = {
  "wrap": "a flattering wrap silhouette",
  "bodycon": "a sculpting bodycon cut",
  "flare": "a graceful flared hem",
  "a-line": "a classic A-line silhouette",
  "midi": "an elegant midi length",
  "maxi": "a sweeping maxi length",
  "mini": "a chic mini length",
  "oversized": "an effortlessly oversized fit",
  "fitted": "a tailored fitted cut",
  "flowy": "a romantic flowing drape",
  "ruched": "a signature ruched finish",
  "pleated": "refined pleating",
  "asymmetr": "an architectural asymmetric hem",
  "backless": "a daring open-back design",
  "off-shoulder": "a sophisticated off-shoulder neckline",
  "one-shoulder": "a sleek one-shoulder neckline",
  "v-neck": "a flattering V-neckline",
  "halter": "a refined halter neckline",
};

const OCCASION_KEYWORDS: Record<string, string> = {
  "cocktail": "cocktail events",
  "evening": "evenings out",
  "banquet": "formal occasions",
  "party": "celebrations",
  "office": "the office",
  "work": "the workplace",
  "casual": "everyday styling",
  "beach": "sun-filled days",
  "wedding": "weddings and formal ceremonies",
  "prom": "prom and black-tie events",
  "brunch": "weekend brunches",
  "date": "date nights",
};

const CATEGORY_CLOSINGS: Record<string, string> = {
  "Dresses":        "Wear alone or layer with a tailored blazer for effortless day-to-evening dressing.",
  "Tops & Blouses": "Pairs perfectly with wide-leg trousers or your favourite denim for a polished finish.",
  "Knitwear":       "A wardrobe staple that transitions seamlessly from season to season.",
  "Co-ords":        "Wear as a set for instant impact, or mix with separates for a fresh take.",
  "Outerwear":      "The finishing touch to elevate every outfit, season after season.",
  "Loungewear":     "Luxuriously comfortable without compromising on style — effortless from morning to night.",
  "Bottoms":        "A refined essential that pairs with everything in your wardrobe.",
  "Denim":          "The perfect blend of casual cool and considered style.",
  "Heels":          "Elevate any look with these sophisticated heels — designed for the modern woman.",
  "Flats":          "Combine comfort with elegance — a pair you will reach for daily.",
  "Boots":          "From polished to relaxed, these boots anchor any outfit with quiet confidence.",
  "Sneakers":       "Where comfort meets contemporary style — an everyday essential.",
  "Sandals":        "The perfect warm-weather companion for effortless, sun-ready style.",
  "Mules":          "Slip on and step out — minimal effort, maximum polish.",
  "Tote Bags":      "Roomy enough for your essentials, refined enough for any occasion.",
  "Crossbody Bags": "A hands-free silhouette that moves with you through every moment of the day.",
  "Clutches":       "The perfect evening companion — sleek, compact and always in style.",
  "Shoulder Bags":  "A timeless style that adds polish to both casual and dressed-up looks.",
  "Jewellery":      "A finishing touch that speaks volumes — wear alone or layer to curate your signature look.",
  "Scarves":        "Draped, tied or wrapped — a versatile piece that defines the look.",
  "Accessories":    "The detail that makes the difference — a considered finishing touch.",
  "Skincare":       "Formulated with skin-loving ingredients to illuminate your natural radiance.",
  "Makeup":         "Designed to enhance your natural beauty with effortless, buildable coverage.",
  "Hair":           "Salon-quality results from the comfort of your own home.",
};

function usePremiumDescription(name: string, category: string, rawDescription: string): string {
  return useMemo(() => {
    const n = name.toLowerCase();

    // Find fabric
    let fabric = "";
    for (const [kw, label] of Object.entries(FABRIC_KEYWORDS)) {
      if (n.includes(kw)) { fabric = label; break; }
    }

    // Find style
    let style = "";
    for (const [kw, label] of Object.entries(STYLE_KEYWORDS)) {
      if (n.includes(kw)) { style = label; break; }
    }

    // Find occasion
    let occasion = "";
    for (const [kw, label] of Object.entries(OCCASION_KEYWORDS)) {
      if (n.includes(kw)) { occasion = label; break; }
    }

    const closing = CATEGORY_CLOSINGS[category] ?? "A carefully considered piece that earns a permanent place in a curated wardrobe.";

    // Build opening sentence
    let opening = "";
    if (fabric && style) {
      opening = `Crafted from ${fabric} and cut to ${style}, this piece effortlessly balances artistry with wearability.`;
    } else if (fabric) {
      opening = `Crafted from ${fabric}, this piece is designed for the woman who values both quality and refined style.`;
    } else if (style) {
      opening = `Designed with ${style}, this piece flatters the silhouette with understated elegance.`;
    } else {
      // Fall back: try to extract a descriptive phrase from the raw CJ description
      const stripped = rawDescription.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
      const firstSentence = stripped.split(/[.!?]/)[0]?.trim() ?? "";
      if (firstSentence.length > 20 && firstSentence.length < 200) {
        opening = firstSentence + ".";
      } else {
        opening = "A meticulously crafted piece that reflects Covora's commitment to luxury, quality and considered design.";
      }
    }

    // Middle sentence
    let middle = "";
    if (occasion) {
      middle = `Ideal for ${occasion}, it offers a versatile elegance that reads equally well dressed up or down.`;
    } else {
      middle = "Versatile enough for both elevated everyday dressing and special occasions alike.";
    }

    return `${opening} ${middle} ${closing}`;
  }, [name, category, rawDescription]);
}

// ─── Premium details bullets ───────────────────────────────────────────────
function usePremiumDetails(name: string, category: string, rawDetails: string[]): string[] {
  return useMemo(() => {
    const n = name.toLowerCase();
    const bullets: string[] = [];

    // Category-specific first bullet
    const catBullet: Record<string, string> = {
      "Dresses":        "Expertly constructed for a flawless fit and flowing silhouette",
      "Tops & Blouses": "Considered cut designed to flatter and move with the body",
      "Knitwear":       "Fine-gauge construction for warmth without bulk",
      "Co-ords":        "Designed as a matching set — worn together or mixed with key separates",
      "Outerwear":      "Structured outer layer designed to finish any look with polish",
      "Loungewear":     "Ultra-soft fabrication for luxurious comfort at home or on the go",
      "Bottoms":        "Refined cut designed to sit smoothly and elongate the leg",
      "Denim":          "Premium denim construction with authentic washes and finishes",
      "Heels":          "Elevated heel crafted for all-day wearability without compromise",
      "Flats":          "Cushioned footbed for comfort from morning to night",
      "Boots":          "Durable construction with premium finishing details",
      "Sneakers":       "Lightweight sole engineered for all-day comfort",
      "Sandals":        "Adjustable straps for a secure, personalised fit",
      "Mules":          "Slip-on ease with an elegant, fashion-forward silhouette",
      "Tote Bags":      "Spacious main compartment with interior organisation pockets",
      "Crossbody Bags": "Adjustable crossbody strap for versatile, hands-free carrying",
      "Clutches":       "Compact silhouette holds your evening essentials with ease",
      "Shoulder Bags":  "Top-carry handles and removable strap for versatile styling",
      "Jewellery":      "Precision-crafted with high-quality metals and stones",
      "Scarves":        "Generously sized for multiple styling options",
      "Accessories":    "Thoughtfully crafted detail to complete any look",
      "Skincare":       "Dermatologist-tested formula suitable for all skin types",
      "Makeup":         "Long-wearing formula for all-day confidence",
      "Hair":           "Professional-grade finish for salon-worthy results",
    };

    bullets.push(catBullet[category] ?? "Exceptional attention to quality and finishing detail");

    // Fabric/material bullet
    for (const [kw, label] of Object.entries(FABRIC_KEYWORDS)) {
      if (n.includes(kw)) {
        bullets.push(`${label.charAt(0).toUpperCase() + label.slice(1)} for a luxurious drape and feel`);
        break;
      }
    }

    // Feature bullets from name
    if (n.includes("long sleeve") || n.includes("long-sleeve")) bullets.push("Long sleeves for elevated warmth and coverage");
    else if (n.includes("short sleeve") || n.includes("short-sleeve")) bullets.push("Short sleeves for effortless warm-weather dressing");
    else if (n.includes("sleeveless")) bullets.push("Sleeveless cut — perfect for layering or wearing alone");

    if (n.includes("pocket")) bullets.push("Discreet pockets for practical, everyday ease");
    if (n.includes("zip") || n.includes("zipper")) bullets.push("Concealed zip for a clean, seamless silhouette");
    if (n.includes("button")) bullets.push("Button fastening for a refined, adjustable fit");
    if (n.includes("elastic")) bullets.push("Elasticated waistband for a comfortable, adjustable fit");
    if (n.includes("lining") || n.includes("lined")) bullets.push("Fully lined for a polished finish and comfortable wear");

    // Pad to at least 2 bullets
    if (bullets.length < 2) {
      bullets.push("Premium quality materials and craftsmanship throughout");
    }

    // Don't exceed 4
    return bullets.slice(0, 4);
  }, [name, category, rawDetails]);
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
  const displayName    = useMemo(() => cleanProductTitle(product.name), [product.name]);
  const premiumDesc    = usePremiumDescription(product.name, product.category, product.description);
  const premiumDetails = usePremiumDetails(product.name, product.category, product.details);

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
      name:               displayName,
      slug:               product.slug,
      price:              priceNum,
      quantity:           qty,
      image:              product.images[0]?.src ?? "",
      imageAlt:           displayName,
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
            { label: displayName,      href: undefined },
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
              {displayName}
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
              {premiumDesc}
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
                  {premiumDetails.map((d, i) => (
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
