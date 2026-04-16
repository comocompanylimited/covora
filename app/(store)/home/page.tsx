// Main homepage — Phase 3 (corrected): full-bleed hero, white-base sections.
// Server component — inside (store) layout → gets Header + Footer.

import Link from "next/link";
import type { Metadata } from "next";
import { fetchProducts, fetchCollections } from "@/lib/api";
import { ProductCard, CollectionCard } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Covora — Women's Luxury Fashion",
  description:
    "Shop the new season at Covora. Refined women's clothing, shoes, bags and beauty.",
};

// ─── Category tiles ────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Dresses",   href: "/category/dresses",   bg: "linear-gradient(155deg, #12101a 0%, #1e1624 100%)" },
  { label: "Knitwear",  href: "/category/knitwear",  bg: "linear-gradient(155deg, #1a1210 0%, #241a16 100%)" },
  { label: "Outerwear", href: "/category/outerwear", bg: "linear-gradient(155deg, #111820 0%, #18222e 100%)" },
  { label: "Shoes",     href: "/category/shoes",     bg: "linear-gradient(155deg, #181414 0%, #241c18 100%)" },
  { label: "Bags",      href: "/category/bags",      bg: "linear-gradient(155deg, #141210 0%, #201a12 100%)" },
  { label: "Sets",      href: "/category/sets",      bg: "linear-gradient(155deg, #121a12 0%, #1a2618 100%)" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [allProducts, allCollections] = await Promise.all([
    fetchProducts({ limit: 4 }),
    fetchCollections({ limit: 3 }),
  ]);
  const newIn    = allProducts;
  const featured = allCollections;

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      {/*
        Full-bleed background video.
        Header is transparent here (isLanding = /home), text overlaid on video.
      */}
      <section
        style={{
          minHeight:     "92svh",
          display:       "flex",
          flexDirection: "column",
          justifyContent:"flex-end",
          paddingTop:    "var(--header-height)",
          paddingBottom: "clamp(5rem, 8vw, 9rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
          position:      "relative",
          overflow:      "hidden",
          background:    "#0a080c",
        }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            objectPosition: "center",
            pointerEvents: "none",
          }}
        >
          <source src="/videos/women.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer cinematic overlay */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Deep bottom scrim */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,3,6,0.92) 0%, rgba(4,3,6,0.55) 40%, rgba(4,3,6,0.18) 70%, rgba(4,3,6,0.04) 100%)" }} />
          {/* Subtle left vignette for text zone */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,3,6,0.38) 0%, transparent 60%)" }} />
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "var(--container-wide)",
            margin:   "0 auto",
            width:    "100%",
            position: "relative",
          }}
        >
          {/* Season label — glass pill */}
          <div className="hero-label-pill" style={{ marginBottom: "1.75rem" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", opacity: 0.7, flexShrink: 0 }} />
            Spring / Summer 2026
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(4.5rem, 10vw, 12rem)",
              fontWeight:    300,
              color:         "var(--ivory)",
              lineHeight:    0.88,
              letterSpacing: "-0.025em",
              marginBottom:  "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            New<br />Collection
          </h1>

          {/* Gold rule */}
          <div
            aria-hidden="true"
            style={{
              width:        "32px",
              height:       "1px",
              background:   "var(--gold)",
              opacity:      0.65,
              marginBottom: "1.5rem",
            }}
          />

          {/* Subtext */}
          <p
            style={{
              fontFamily:    "var(--font-inter)",
              fontSize:      "0.8rem",
              color:         "var(--text-secondary)",
              lineHeight:    1.85,
              maxWidth:      "340px",
              letterSpacing: "0.01em",
              marginBottom:  "2.5rem",
            }}
          >
            Refined pieces for every occasion. Selected for quality, crafted to last.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/new-in" className="btn btn-white btn-md" style={{ borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-gold)" }}>
              Shop New In
            </Link>
            <Link href="/collections" className="btn btn-glass btn-md">
              View Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. NEW IN ──────────────────────────────────────────────── */}
      <section
        style={{
          background:    "#FAFAF8",
          borderTop:     "1px solid rgba(0,0,0,0.05)",
          paddingTop:    "clamp(5.5rem, 9vw, 9rem)",
          paddingBottom: "clamp(5.5rem, 9vw, 9rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>

          {/* Header row */}
          <div
            style={{
              display:        "flex",
              alignItems:     "flex-end",
              justifyContent: "space-between",
              gap:            "1.5rem",
              marginBottom:   "clamp(2.5rem, 4.5vw, 4rem)",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily:    "var(--font-inter)",
                  fontSize:      "0.52rem",
                  fontWeight:    500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color:         "var(--gold-dark)",
                  marginBottom:  "0.7rem",
                }}
              >
                Latest Arrivals
              </p>
              <h2
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontSize:      "clamp(2rem, 3.5vw, 4rem)",
                  fontWeight:    300,
                  color:         "#111111",
                  lineHeight:    1.0,
                  letterSpacing: "-0.01em",
                }}
              >
                New In
              </h2>
            </div>
            <Link
              href="/new-in"
              className="btn btn-ghost btn-sm"
              style={{ flexShrink: 0, color: "#777777" }}
            >
              View All →
            </Link>
          </div>

          {/* Grid */}
          {newIn.length > 0 ? (
            <div className="hp-light-grid hp-product-grid">
              {newIn.map((p) => (
                <ProductCard
                  key={p.id}
                  href={`/product/${p.slug}`}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  src={p.src}
                  bg={p.bg}
                  badge={p.badge}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ width: "28px", height: "1px", background: "var(--gold)", opacity: 0.4, margin: "0 auto 1.75rem" }} />
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: "#111111", marginBottom: "0.75rem" }}>
                New arrivals coming soon
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#AAAAAA", marginBottom: "2rem" }}>
                Explore our full collection in the meantime.
              </p>
              <Link href="/shop" className="btn btn-inverse btn-sm">Shop All</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. SHOP BY CATEGORY ────────────────────────────────────── */}
      <section
        style={{
          background:    "#F2EFE9",
          borderTop:     "1px solid rgba(0,0,0,0.05)",
          paddingTop:    "clamp(5.5rem, 9vw, 9rem)",
          paddingBottom: "clamp(5.5rem, 9vw, 9rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4.5vw, 4rem)" }}>
            <p
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.52rem",
                fontWeight:    500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color:         "var(--gold-dark)",
                marginBottom:  "0.7rem",
              }}
            >
              Browse
            </p>
            <h2
              style={{
                fontFamily:    "var(--font-cormorant)",
                fontSize:      "clamp(2rem, 3.5vw, 4rem)",
                fontWeight:    300,
                color:         "#111111",
                lineHeight:    1.0,
                letterSpacing: "-0.01em",
              }}
            >
              Shop by Category
            </h2>
          </div>

          <div className="hp-cat-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.href} href={cat.href} className="hp-cat-tile">
                {/* Gradient image area */}
                <div
                  className="hp-cat-bg"
                  style={{ background: cat.bg }}
                  aria-hidden="true"
                />
                {/* Bottom scrim for text readability */}
                <div className="hp-cat-overlay" aria-hidden="true" />
                {/* Label */}
                <div className="hp-cat-content">
                  <span className="hp-cat-line" aria-hidden="true" />
                  <p className="hp-cat-label">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED COLLECTIONS ────────────────────────────────── */}
      <section
        style={{
          background:    "#FAFAF8",
          borderTop:     "1px solid rgba(0,0,0,0.05)",
          paddingTop:    "clamp(5.5rem, 9vw, 9rem)",
          paddingBottom: "clamp(5.5rem, 9vw, 9rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>

          <div
            style={{
              display:        "flex",
              alignItems:     "flex-end",
              justifyContent: "space-between",
              gap:            "1.5rem",
              marginBottom:   "clamp(2.5rem, 4.5vw, 4rem)",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily:    "var(--font-inter)",
                  fontSize:      "0.52rem",
                  fontWeight:    500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color:         "var(--gold-dark)",
                  marginBottom:  "0.7rem",
                }}
              >
                Featured
              </p>
              <h2
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontSize:      "clamp(2rem, 3.5vw, 4rem)",
                  fontWeight:    300,
                  color:         "#111111",
                  lineHeight:    1.0,
                  letterSpacing: "-0.01em",
                }}
              >
                Collections
              </h2>
            </div>
            <Link
              href="/collections"
              className="btn btn-ghost btn-sm"
              style={{ flexShrink: 0, color: "#777777" }}
            >
              View All →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="hp-collection-grid">
              {featured.map((col) => (
                <CollectionCard
                  key={col.id}
                  href={`/collection/${col.slug}`}
                  title={col.name}
                  label={col.season}
                  src={col.src}
                  bg={col.bg}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem 2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#AAAAAA", marginBottom: "1.5rem" }}>
                Collections are being curated. Check back soon.
              </p>
              <Link href="/shop" className="btn btn-inverse btn-sm">Shop All Pieces</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. SERVICE STRIP ───────────────────────────────────────── */}
      <section
        style={{
          background:    "#EEEAE3",
          borderTop:     "1px solid rgba(0,0,0,0.05)",
          paddingTop:    "clamp(3.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 5vw, 5rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div className="hp-services-grid" style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          {[
            { icon: "↩", label: "Free Returns",      sub: "On all UK orders" },
            { icon: "⚡", label: "Next-Day Delivery", sub: "Order before 2 pm" },
            { icon: "✦",  label: "Expert Styling",    sub: "Personal shopping available" },
            { icon: "◇",  label: "Gift Wrapping",     sub: "Complimentary on request" },
          ].map((s) => (
            <div key={s.label} className="hp-service-card">
              <p
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontSize:      "1.6rem",
                  color:         "var(--gold)",
                  lineHeight:    1,
                  marginBottom:  "1rem",
                }}
              >
                {s.icon}
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-inter)",
                  fontSize:      "0.56rem",
                  fontWeight:    500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         "#1A1A1A",
                  marginBottom:  "0.4rem",
                }}
              >
                {s.label}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#888888" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Page-scoped styles ─────────────────────────────────────── */}
      <style>{`

        /* ─ Product grid ────────────────────────────── */
        .hp-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        @media (max-width: 960px) { .hp-product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-product-grid { grid-template-columns: 1fr; } }

        /* Override pcard text for white/light background */
        .hp-light-grid .pcard-name                 { color: #555555; }
        .hp-light-grid .pcard:hover .pcard-name    { color: #111111; }
        .hp-light-grid .pcard-price                { color: #111111; }
        .hp-light-grid .pcard:hover .pcard-price   { color: #111111; }
        .hp-light-grid .pcard-price-original       { color: #999999; }
        .hp-light-grid .pcard-img {
          border-color: rgba(0,0,0,0.08);
        }
        .hp-light-grid .pcard:hover .pcard-img {
          border-color: rgba(0,0,0,0.18);
        }

        /* ─ Category tiles ──────────────────────────── */
        .hp-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
        }
        @media (max-width: 768px) { .hp-cat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-cat-grid { grid-template-columns: 1fr; } }

        .hp-cat-tile {
          display:         block;
          position:        relative;
          aspect-ratio:    2 / 3;
          overflow:        hidden;
          text-decoration: none;
        }
        .hp-cat-bg {
          position:   absolute;
          inset:      0;
          transition: transform 0.95s cubic-bezier(0.16, 1, 0.30, 1);
        }
        .hp-cat-tile:hover .hp-cat-bg { transform: scale(1.05); }

        .hp-cat-overlay {
          position:   absolute;
          inset:      0;
          background: linear-gradient(
            to top,
            rgba(6,6,6,0.88) 0%,
            rgba(6,6,6,0.28) 40%,
            rgba(6,6,6,0.04) 70%,
            transparent 100%
          );
          transition: opacity 0.4s ease;
        }
        .hp-cat-tile:hover .hp-cat-overlay { opacity: 0.85; }

        .hp-cat-content {
          position:       absolute;
          bottom:         0;
          left:           0;
          right:          0;
          padding:        clamp(1.25rem, 2.5vw, 2rem);
          display:        flex;
          flex-direction: column;
          gap:            0.75rem;
        }
        .hp-cat-line {
          display:    block;
          width:      20px;
          height:     1px;
          background: rgba(201,169,110,0.6);
          transition: width 0.5s cubic-bezier(0.16, 1, 0.30, 1);
        }
        .hp-cat-tile:hover .hp-cat-line { width: 38px; }

        .hp-cat-label {
          font-family:    var(--font-cormorant), serif;
          font-size:      clamp(1.2rem, 1.8vw, 1.8rem);
          font-weight:    300;
          color:          #F4EFE6;
          letter-spacing: 0.04em;
          line-height:    1.0;
          transition:     color 0.3s ease;
        }
        .hp-cat-tile:hover .hp-cat-label { color: var(--gold-bright); }

        /* ─ Collection grid ──────────────────────────── */
        .hp-collection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        @media (max-width: 900px) { .hp-collection-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-collection-grid { grid-template-columns: 1fr; } }

        /* ─ Service strip ────────────────────────────── */
        .hp-services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        @media (max-width: 768px) {
          .hp-services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .hp-services-grid { grid-template-columns: 1fr; } }

      `}</style>
    </>
  );
}
