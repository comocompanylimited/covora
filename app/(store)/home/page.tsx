// Main homepage — complete luxury design.
// Server component — inside (store) layout → gets Header + Footer.

import Link from "next/link";
import type { Metadata } from "next";
import { fetchProducts, fetchCollections } from "@/lib/api";
import { ProductCard } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Covora — Women's Luxury Fashion",
  description:
    "Shop the new season at Covora. Refined women's clothing, shoes, bags and beauty.",
};

// ─── Static data ───────────────────────────────────────────────────────────────

const FEATURE_CATS = [
  {
    label:    "Dresses",
    sub:      "Day to Evening",
    href:     "/category/dresses",
    bg:       "linear-gradient(160deg, #0e0b14 0%, #1a1224 50%, #120d1c 100%)",
    accent:   "#C9A96E",
  },
  {
    label:    "Tops",
    sub:      "Effortless Ease",
    href:     "/category/tops",
    bg:       "linear-gradient(160deg, #110e0a 0%, #1e1710 50%, #160f0a 100%)",
    accent:   "#C9A96E",
  },
  {
    label:    "Outerwear",
    sub:      "The Outer Edit",
    href:     "/category/outerwear",
    bg:       "linear-gradient(160deg, #090d12 0%, #111a22 50%, #0b1219 100%)",
    accent:   "#C9A96E",
  },
  {
    label:    "Shoes & Bags",
    sub:      "Finish the Look",
    href:     "/category/shoes-bags",
    bg:       "linear-gradient(160deg, #110c08 0%, #1c1208 50%, #140e06 100%)",
    accent:   "#C9A96E",
  },
] as const;

const MOOD_PANELS = [
  {
    label:  "Evening",
    sub:    "Dressed for the occasion",
    href:   "/category/dresses",
    bg:     "linear-gradient(135deg, #0a0810 0%, #160e22 60%, #0d0915 100%)",
  },
  {
    label:  "Everyday Luxury",
    sub:    "Elevated essentials",
    href:   "/shop",
    bg:     "linear-gradient(135deg, #0e0c08 0%, #1a1408 60%, #120e06 100%)",
  },
  {
    label:  "Minimal Tailoring",
    sub:    "Structure, refined",
    href:   "/category/outerwear",
    bg:     "linear-gradient(135deg, #090b0e 0%, #131820 60%, #0b0e14 100%)",
  },
  {
    label:  "Statement Pieces",
    sub:    "Bold. Intentional. Yours.",
    href:   "/new-in",
    bg:     "linear-gradient(135deg, #0e0a08 0%, #1c130a 60%, #140c08 100%)",
  },
] as const;

const GALLERY_CELLS = [
  { bg: "linear-gradient(160deg, #100d16 0%, #1a1326 100%)", span: "tall" },
  { bg: "linear-gradient(160deg, #0e0c0a 0%, #1e1608 100%)", span: "normal" },
  { bg: "linear-gradient(160deg, #090d12 0%, #14202e 100%)", span: "normal" },
  { bg: "linear-gradient(160deg, #0e0a08 0%, #201408 100%)", span: "wide" },
  { bg: "linear-gradient(160deg, #0a0d10 0%, #12181e 100%)", span: "normal" },
  { bg: "linear-gradient(160deg, #0c0a12 0%, #16122a 100%)", span: "normal" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [allProducts, allCollections] = await Promise.all([
    fetchProducts({ limit: 8 }),
    fetchCollections({ limit: 3 }),
  ]);

  const newIn        = allProducts.slice(0, 4);
  const bestsellers  = allProducts.slice(4, 8).length ? allProducts.slice(4, 8) : allProducts.slice(0, 4);

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight:      "100svh",
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "flex-end",
          paddingTop:     "var(--header-height)",
          paddingBottom:  "clamp(5rem, 8vw, 9rem)",
          paddingLeft:    "var(--container-padding)",
          paddingRight:   "var(--container-padding)",
          position:       "relative",
          overflow:       "hidden",
          background:     "#0a080c",
        }}
      >
        <video
          autoPlay muted loop playsInline aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}
        >
          <source src="https://pub-98b9c2a87ab54dd9924de5af1f2e080e.r2.dev/womens.mp4" type="video/mp4" />
        </video>

        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,3,6,0.92) 0%, rgba(4,3,6,0.55) 40%, rgba(4,3,6,0.18) 70%, rgba(4,3,6,0.04) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,3,6,0.38) 0%, transparent 60%)" }} />
        </div>

        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", width: "100%", position: "relative" }}>
          <div className="hero-label-pill" style={{ marginBottom: "1.75rem" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", opacity: 0.7, flexShrink: 0 }} />
            Spring / Summer 2026
          </div>

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

          <div aria-hidden="true" style={{ width: "32px", height: "1px", background: "var(--gold)", opacity: 0.65, marginBottom: "1.5rem" }} />

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

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/new-in"     className="btn btn-white btn-md" style={{ borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-gold)" }}>Shop New In</Link>
            <Link href="/collections" className="btn btn-glass btn-md">View Collection</Link>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED CATEGORIES STRIP ───────────────────────────── */}
      <section
        style={{
          background:    "#0A0908",
          paddingTop:    "clamp(5rem, 8vw, 8rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
            <p className="hp-eyebrow" style={{ color: "rgba(201,169,110,0.65)" }}>Browse the Edit</p>
            <h2 className="hp-section-title" style={{ color: "var(--ivory)" }}>
              Shop by Category
            </h2>
          </div>

          <div className="hp-feat-cat-grid">
            {FEATURE_CATS.map((cat) => (
              <Link key={cat.href} href={cat.href} className="hp-feat-cat-card">
                <div className="hp-feat-cat-bg" style={{ background: cat.bg }} aria-hidden="true" />
                {/* Grain texture overlay */}
                <div className="hp-feat-cat-grain" aria-hidden="true" />
                {/* Bottom scrim */}
                <div className="hp-feat-cat-scrim" aria-hidden="true" />
                {/* Gold accent line top */}
                <div className="hp-feat-cat-top-line" aria-hidden="true" />
                {/* Content */}
                <div className="hp-feat-cat-content">
                  <div className="hp-feat-cat-rule" aria-hidden="true" />
                  <p className="hp-feat-cat-sub">{cat.sub}</p>
                  <p className="hp-feat-cat-label">{cat.label}</p>
                  <div className="hp-feat-cat-arrow">
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. NEW ARRIVALS ────────────────────────────────────────── */}
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
          <div className="hp-section-header">
            <div>
              <p className="hp-eyebrow">Latest Arrivals</p>
              <h2 className="hp-section-title hp-title-dark">New In</h2>
            </div>
            <Link href="/new-in" className="btn btn-ghost btn-sm hp-view-all">View All →</Link>
          </div>

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
            <div className="hp-empty-state">
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

      {/* ── 4. EDITORIAL PROMO BANNER ──────────────────────────────── */}
      <section className="hp-promo-banner">
        {/* Background */}
        <div className="hp-promo-bg" aria-hidden="true" />
        <div className="hp-promo-overlay" aria-hidden="true" />

        <div className="hp-promo-content" style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <div className="hp-promo-inner">
            <p className="hp-promo-eyebrow">Spring / Summer 2026</p>
            <h2 className="hp-promo-headline">
              Dressed for<br />
              <em>every moment</em>
            </h2>
            <p className="hp-promo-sub">
              Pieces that move with you — from quiet mornings to luminous evenings.
            </p>
            <Link href="/collections" className="btn btn-gold btn-md hp-promo-cta">
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. BESTSELLERS ─────────────────────────────────────────── */}
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
          <div className="hp-section-header">
            <div>
              <p className="hp-eyebrow">Curated</p>
              <h2 className="hp-section-title hp-title-dark">The Covora Edit</h2>
            </div>
            <Link href="/collections" className="btn btn-ghost btn-sm hp-view-all">View All →</Link>
          </div>

          {bestsellers.length > 0 ? (
            <div className="hp-bestseller-layout">
              {/* Featured large card */}
              <Link href={`/product/${bestsellers[0]?.slug}`} className="hp-bs-feature group">
                <div className="hp-bs-feature-img" style={bestsellers[0]?.src ? undefined : { background: bestsellers[0]?.bg }}>
                  {!bestsellers[0]?.src && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="0.7">
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.42rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,169,110,0.35)" }}>Covora</span>
                    </div>
                  )}
                </div>
                <div className="hp-bs-feature-info">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dark)" }}>Editor's Pick</span>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem,2vw,1.8rem)", fontWeight: 300, color: "#111111", lineHeight: 1.2, marginTop: "0.4rem" }}>{bestsellers[0]?.name}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#888888", marginTop: "0.35rem" }}>{bestsellers[0]?.price}</p>
                </div>
              </Link>

              {/* Supporting 3 cards */}
              <div className="hp-bs-supporting">
                {bestsellers.slice(1, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    href={`/product/${p.slug}`}
                    name={p.name}
                    price={p.price}
                    originalPrice={p.originalPrice}
                    src={p.src}
                    bg={p.bg}
                    badge={p.badge}
                    className="hp-bs-card"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="hp-empty-state">
              <Link href="/shop" className="btn btn-inverse btn-sm">Shop All Pieces</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. BRAND STORY ─────────────────────────────────────────── */}
      <section className="hp-brand-story">
        {/* Visual side */}
        <div className="hp-brand-visual" aria-hidden="true">
          <div className="hp-brand-visual-bg" />
          <div className="hp-brand-wordmark">Covora</div>
          <div className="hp-brand-rule" />
          <div className="hp-brand-visual-sub">Lumière</div>
        </div>

        {/* Text side */}
        <div className="hp-brand-text">
          <p className="hp-eyebrow" style={{ color: "var(--gold-dark)" }}>Our Philosophy</p>
          <h2
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(2.2rem, 4vw, 4.5rem)",
              fontWeight:    300,
              color:         "#111111",
              lineHeight:    1.05,
              letterSpacing: "-0.01em",
              marginBottom:  "1.75rem",
              marginTop:     "0.75rem",
            }}
          >
            Crafted for the<br />
            <em style={{ fontStyle: "italic" }}>modern woman</em>
          </h2>
          <div style={{ width: "32px", height: "1px", background: "var(--gold)", opacity: 0.55, marginBottom: "1.75rem" }} />
          <p
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(1rem, 1.3vw, 1.2rem)",
              fontStyle:     "italic",
              fontWeight:    300,
              color:         "#555555",
              lineHeight:    1.9,
              letterSpacing: "0.02em",
              maxWidth:      "440px",
              marginBottom:  "2.5rem",
            }}
          >
            Every piece at Covora is chosen with a single intention — to make
            you feel effortlessly composed. Not louder, not more. Just completely
            yourself, at your most refined.
          </p>
          <Link href="/about" className="btn btn-outline-dark btn-md">
            Discover Our Story
          </Link>
        </div>
      </section>

      {/* ── 7. SHOP BY MOOD ────────────────────────────────────────── */}
      <section
        style={{
          background:    "#0A0908",
          paddingTop:    "clamp(5rem, 8vw, 8rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
            <p className="hp-eyebrow" style={{ color: "rgba(201,169,110,0.65)" }}>Explore</p>
            <h2 className="hp-section-title" style={{ color: "var(--ivory)" }}>
              Shop by Mood
            </h2>
          </div>

          <div className="hp-mood-grid">
            {MOOD_PANELS.map((m) => (
              <Link key={m.href + m.label} href={m.href} className="hp-mood-card">
                <div className="hp-mood-bg" style={{ background: m.bg }} aria-hidden="true" />
                <div className="hp-mood-scrim" aria-hidden="true" />
                <div className="hp-mood-content">
                  <p className="hp-mood-sub">{m.sub}</p>
                  <p className="hp-mood-label">{m.label}</p>
                  <div className="hp-mood-rule" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CAMPAIGN GALLERY ────────────────────────────────────── */}
      <section
        style={{
          background:    "#F8F6F2",
          borderTop:     "1px solid rgba(0,0,0,0.05)",
          paddingTop:    "clamp(5rem, 8vw, 8rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <div className="hp-section-header" style={{ marginBottom: "clamp(2rem, 3.5vw, 3rem)" }}>
            <div>
              <p className="hp-eyebrow">Campaign</p>
              <h2 className="hp-section-title hp-title-dark">The Visual Edit</h2>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm hp-view-all">
              @covora →
            </a>
          </div>

          <div className="hp-gallery-grid">
            {GALLERY_CELLS.map((cell, i) => (
              <div
                key={i}
                className={`hp-gallery-cell hp-gallery-cell--${cell.span}`}
                style={{ background: cell.bg }}
                aria-hidden="true"
              >
                <div className="hp-gallery-inner">
                  <div className="hp-gallery-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="0.7">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4.5" />
                      <circle cx="17.5" cy="6.5" r="0.8" fill="rgba(201,169,110,0.3)" stroke="none" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.38rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.3)" }}>
                    @covora
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. VIP EMAIL SIGNUP ────────────────────────────────────── */}
      <section className="hp-vip">
        <div className="hp-vip-bg" aria-hidden="true" />
        <div className="hp-vip-content" style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
          <div style={{ width: "1px", height: "52px", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.5))", margin: "0 auto 2.5rem" }} />
          <p className="hp-eyebrow" style={{ color: "rgba(201,169,110,0.65)", textAlign: "center" }}>Private Access</p>
          <h2
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(2.2rem, 4vw, 4.5rem)",
              fontWeight:    300,
              color:         "var(--ivory)",
              lineHeight:    1.05,
              textAlign:     "center",
              letterSpacing: "-0.01em",
              marginTop:     "0.75rem",
              marginBottom:  "1rem",
            }}
          >
            Join the Covora World
          </h2>
          <p
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "1.05rem",
              fontStyle:     "italic",
              fontWeight:    300,
              color:         "rgba(196,189,180,0.65)",
              lineHeight:    1.7,
              letterSpacing: "0.02em",
              textAlign:     "center",
              marginBottom:  "3rem",
            }}
          >
            Receive exclusive drops, early access, and private styling notes — curated for you alone.
          </p>

          <form className="hp-vip-form" onSubmit={undefined}>
            <div className="hp-vip-input-wrap">
              <input
                type="email"
                placeholder="Your email address"
                className="hp-vip-input"
                required
              />
            </div>
            <button type="submit" className="btn hp-vip-btn">
              Receive Access
            </button>
          </form>

          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: "1.5rem" }}>
            No noise. Unsubscribe at any time.
          </p>

          <div style={{ width: "1px", height: "52px", background: "linear-gradient(to top, transparent, rgba(201,169,110,0.5))", margin: "2.5rem auto 0" }} />
        </div>
      </section>

      {/* ── 10. SERVICE STRIP ──────────────────────────────────────── */}
      <section
        style={{
          background:    "#F2EFE9",
          borderTop:     "1px solid rgba(0,0,0,0.05)",
          paddingTop:    "clamp(3.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 5vw, 5rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div className="hp-services-grid" style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          {[
            { icon: "↩", label: "Free Returns",       sub: "On all UK orders" },
            { icon: "⚡", label: "Next-Day Delivery",  sub: "Order before 2 pm" },
            { icon: "✦",  label: "Expert Styling",     sub: "Personal shopping available" },
            { icon: "◇",  label: "Gift Wrapping",      sub: "Complimentary on request" },
          ].map((s) => (
            <div key={s.label} className="hp-service-card">
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", color: "var(--gold)", lineHeight: 1, marginBottom: "1rem" }}>{s.icon}</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1A1A", marginBottom: "0.4rem" }}>{s.label}</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#888888" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Page-scoped styles ─────────────────────────────────────── */}
      <style>{`

        /* ─── Typography helpers ─────────────────── */
        .hp-eyebrow {
          font-family:    var(--font-inter);
          font-size:      0.52rem;
          font-weight:    500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color:          var(--gold-dark);
          margin-bottom:  0.65rem;
          display:        block;
        }
        .hp-section-title {
          font-family:    var(--font-cormorant);
          font-size:      clamp(2.2rem, 3.5vw, 4.2rem);
          font-weight:    300;
          color:          var(--ivory);
          line-height:    1.0;
          letter-spacing: -0.01em;
        }
        .hp-title-dark { color: #111111; }

        .hp-section-header {
          display:         flex;
          align-items:     flex-end;
          justify-content: space-between;
          gap:             1.5rem;
          margin-bottom:   clamp(2.5rem, 4.5vw, 4rem);
        }
        .hp-view-all { flex-shrink: 0; color: #777777; }

        /* ─── Featured category grid ─────────────── */
        .hp-feat-cat-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   clamp(0.5rem, 1.2vw, 1rem);
        }
        @media (max-width: 900px) { .hp-feat-cat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-feat-cat-grid { grid-template-columns: 1fr 1fr; gap: 0.5rem; } }

        .hp-feat-cat-card {
          display:         block;
          position:        relative;
          aspect-ratio:    2 / 3;
          overflow:        hidden;
          text-decoration: none;
          cursor:          pointer;
        }
        .hp-feat-cat-bg {
          position:   absolute;
          inset:      0;
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.30, 1);
        }
        .hp-feat-cat-card:hover .hp-feat-cat-bg { transform: scale(1.06); }

        .hp-feat-cat-grain {
          position:   absolute;
          inset:      0;
          opacity:    0.035;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        .hp-feat-cat-scrim {
          position:   absolute;
          inset:      0;
          background: linear-gradient(
            to top,
            rgba(4,3,6,0.94) 0%,
            rgba(4,3,6,0.35) 45%,
            rgba(4,3,6,0.06) 70%,
            transparent 100%
          );
          transition: opacity 0.4s ease;
        }
        .hp-feat-cat-card:hover .hp-feat-cat-scrim { opacity: 0.88; }

        .hp-feat-cat-top-line {
          position:   absolute;
          top:        0;
          left:       0;
          right:      0;
          height:     1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.25), transparent);
          opacity:    0;
          transition: opacity 0.5s ease;
        }
        .hp-feat-cat-card:hover .hp-feat-cat-top-line { opacity: 1; }

        .hp-feat-cat-content {
          position:        absolute;
          bottom:          0;
          left:            0;
          right:           0;
          padding:         clamp(1.25rem, 2.5vw, 2.25rem);
          display:         flex;
          flex-direction:  column;
          gap:             0.5rem;
        }
        .hp-feat-cat-rule {
          display:    block;
          width:      18px;
          height:     1px;
          background: rgba(201,169,110,0.55);
          transition: width 0.55s cubic-bezier(0.16,1,0.30,1);
          margin-bottom: 0.3rem;
        }
        .hp-feat-cat-card:hover .hp-feat-cat-rule { width: 36px; }

        .hp-feat-cat-sub {
          font-family:    var(--font-inter);
          font-size:      0.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.65);
          transition:     color 0.3s ease;
        }
        .hp-feat-cat-label {
          font-family:    var(--font-cormorant);
          font-size:      clamp(1.3rem, 2vw, 2rem);
          font-weight:    300;
          color:          #F4EFE6;
          letter-spacing: 0.03em;
          line-height:    1.0;
          transition:     color 0.3s ease;
        }
        .hp-feat-cat-card:hover .hp-feat-cat-label { color: var(--gold-bright); }

        .hp-feat-cat-arrow {
          font-family:    var(--font-inter);
          font-size:      0.9rem;
          color:          rgba(201,169,110,0.0);
          transition:     color 0.4s ease, transform 0.4s ease;
          transform:      translateX(-6px);
          margin-top:     0.2rem;
        }
        .hp-feat-cat-card:hover .hp-feat-cat-arrow {
          color:     rgba(201,169,110,0.7);
          transform: translateX(0);
        }

        /* ─── Product grid ───────────────────────── */
        .hp-product-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   clamp(1rem, 2vw, 1.5rem);
        }
        @media (max-width: 960px) { .hp-product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-product-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; } }

        /* Light grid overrides */
        .hp-light-grid .pcard-name                 { color: #555555; }
        .hp-light-grid .pcard:hover .pcard-name    { color: #111111; }
        .hp-light-grid .pcard-price                { color: #111111; }
        .hp-light-grid .pcard:hover .pcard-price   { color: #111111; }
        .hp-light-grid .pcard-price-original       { color: #999999; }
        .hp-light-grid .pcard-img                  { border-color: rgba(0,0,0,0.08); }
        .hp-light-grid .pcard:hover .pcard-img     { border-color: rgba(0,0,0,0.18); }

        /* ─── Promo banner ───────────────────────── */
        .hp-promo-banner {
          position:       relative;
          overflow:       hidden;
          min-height:     clamp(460px, 55vw, 680px);
          display:        flex;
          align-items:    center;
          padding:        clamp(5rem, 10vw, 10rem) var(--container-padding);
        }
        .hp-promo-bg {
          position: absolute;
          inset:    0;
          background: radial-gradient(ellipse at 60% 50%, #1a0e28 0%, #0a060f 55%, #050306 100%);
        }
        .hp-promo-overlay {
          position:   absolute;
          inset:      0;
          background: linear-gradient(to right, rgba(4,3,6,0.55) 0%, transparent 65%);
        }
        .hp-promo-content {
          width:    100%;
          position: relative;
        }
        .hp-promo-inner {
          max-width: 580px;
        }
        .hp-promo-eyebrow {
          font-family:    var(--font-inter);
          font-size:      0.5rem;
          font-weight:    500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.65);
          margin-bottom:  1.25rem;
          display:        block;
        }
        .hp-promo-headline {
          font-family:    var(--font-cormorant);
          font-size:      clamp(3rem, 6vw, 7rem);
          font-weight:    300;
          color:          var(--ivory);
          line-height:    0.95;
          letter-spacing: -0.02em;
          margin-bottom:  clamp(1.5rem, 3vw, 2.5rem);
        }
        .hp-promo-headline em {
          font-style:  italic;
          color:       var(--gold-light);
        }
        .hp-promo-sub {
          font-family:    var(--font-inter);
          font-size:      0.85rem;
          color:          rgba(196,189,180,0.65);
          line-height:    1.85;
          max-width:      380px;
          letter-spacing: 0.01em;
          margin-bottom:  2.5rem;
        }
        .hp-promo-cta { }

        /* ─── Bestseller layout ──────────────────── */
        .hp-bestseller-layout {
          display:               grid;
          grid-template-columns: 1.1fr 2fr;
          gap:                   clamp(1rem, 2.5vw, 2.5rem);
          align-items:           start;
        }
        @media (max-width: 860px) { .hp-bestseller-layout { grid-template-columns: 1fr; } }

        .hp-bs-feature {
          display:         block;
          text-decoration: none;
        }
        .hp-bs-feature-img {
          position:     relative;
          aspect-ratio: 2 / 3;
          overflow:     hidden;
          border:       1px solid rgba(0,0,0,0.07);
          transition:   border-color 0.3s ease;
        }
        .hp-bs-feature:hover .hp-bs-feature-img { border-color: rgba(0,0,0,0.18); }

        .hp-bs-feature-info {
          padding-top: 1rem;
        }
        .hp-bs-supporting {
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          gap:                   clamp(0.75rem, 1.5vw, 1.25rem);
          align-content:         start;
        }
        @media (max-width: 640px) { .hp-bs-supporting { grid-template-columns: repeat(2, 1fr); } }
        .hp-bs-card .pcard-name  { color: #555555; }
        .hp-bs-card .pcard-price { color: #111111; }
        .hp-bs-card .pcard-img   { border-color: rgba(0,0,0,0.07); }

        /* ─── Brand story ────────────────────────── */
        .hp-brand-story {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          min-height:            clamp(500px, 60vw, 720px);
        }
        @media (max-width: 768px) { .hp-brand-story { grid-template-columns: 1fr; } }

        .hp-brand-visual {
          position:        relative;
          background:      #0a0808;
          overflow:        hidden;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          gap:             1.25rem;
          padding:         clamp(3rem, 6vw, 6rem);
          min-height:      clamp(320px, 40vw, 520px);
        }
        .hp-brand-visual-bg {
          position:   absolute;
          inset:      0;
          background: radial-gradient(ellipse at 50% 50%, #1c1016 0%, #0a0808 65%, #080606 100%);
        }
        .hp-brand-wordmark {
          position:       relative;
          font-family:    var(--font-cormorant);
          font-size:      clamp(3rem, 6vw, 6.5rem);
          font-weight:    300;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color:          var(--gold);
          line-height:    1;
          padding-right:  0.38em;
        }
        .hp-brand-rule {
          position:   relative;
          width:      42px;
          height:     1px;
          background: rgba(201,169,110,0.4);
        }
        .hp-brand-visual-sub {
          position:       relative;
          font-family:    var(--font-cormorant);
          font-size:      clamp(0.85rem, 1.2vw, 1.1rem);
          font-style:     italic;
          letter-spacing: 0.38em;
          color:          rgba(201,169,110,0.4);
        }

        .hp-brand-text {
          background: #FAFAF8;
          padding:    clamp(3.5rem, 6vw, 7rem) clamp(2.5rem, 5vw, 6rem);
          display:    flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ─── Mood grid ──────────────────────────── */
        .hp-mood-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   clamp(0.5rem, 1.2vw, 1rem);
        }
        @media (max-width: 900px) { .hp-mood-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-mood-grid { grid-template-columns: 1fr 1fr; gap: 0.5rem; } }

        .hp-mood-card {
          display:         block;
          position:        relative;
          aspect-ratio:    3 / 4;
          overflow:        hidden;
          text-decoration: none;
        }
        .hp-mood-bg {
          position:   absolute;
          inset:      0;
          transition: transform 1s cubic-bezier(0.16,1,0.30,1);
        }
        .hp-mood-card:hover .hp-mood-bg { transform: scale(1.05); }

        .hp-mood-scrim {
          position:   absolute;
          inset:      0;
          background: linear-gradient(
            to top,
            rgba(4,3,6,0.92) 0%,
            rgba(4,3,6,0.3) 50%,
            rgba(4,3,6,0.06) 80%,
            transparent 100%
          );
        }
        .hp-mood-content {
          position:        absolute;
          bottom:          0;
          left:            0;
          right:           0;
          padding:         clamp(1rem, 2.5vw, 2rem);
          display:         flex;
          flex-direction:  column;
          gap:             0.35rem;
        }
        .hp-mood-sub {
          font-family:    var(--font-inter);
          font-size:      0.48rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.55);
          transition:     color 0.3s ease;
        }
        .hp-mood-card:hover .hp-mood-sub { color: rgba(201,169,110,0.85); }

        .hp-mood-label {
          font-family:    var(--font-cormorant);
          font-size:      clamp(1.1rem, 1.7vw, 1.65rem);
          font-weight:    300;
          color:          #F4EFE6;
          letter-spacing: 0.03em;
          line-height:    1.1;
          transition:     color 0.3s ease;
        }
        .hp-mood-card:hover .hp-mood-label { color: var(--gold-bright); }

        .hp-mood-rule {
          width:      0;
          height:     1px;
          background: rgba(201,169,110,0.55);
          margin-top: 0.5rem;
          transition: width 0.5s cubic-bezier(0.16,1,0.30,1);
        }
        .hp-mood-card:hover .hp-mood-rule { width: 28px; }

        /* ─── Gallery grid ───────────────────────── */
        .hp-gallery-grid {
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows:    auto auto;
          gap:                   clamp(0.5rem, 1vw, 0.75rem);
        }
        @media (max-width: 640px) { .hp-gallery-grid { grid-template-columns: repeat(2, 1fr); } }

        .hp-gallery-cell {
          position:    relative;
          overflow:    hidden;
          aspect-ratio: 4/5;
          cursor:      pointer;
          transition:  filter 0.35s ease;
        }
        .hp-gallery-cell--wide {
          grid-column: span 1;
          aspect-ratio: 4/5;
        }
        .hp-gallery-cell--tall {
          aspect-ratio: 3/4;
        }
        .hp-gallery-cell:hover { filter: brightness(1.08); }

        .hp-gallery-inner {
          position:        absolute;
          inset:           0;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          gap:             0.6rem;
          opacity:         0;
          transition:      opacity 0.35s ease;
          background:      rgba(4,3,6,0.18);
        }
        .hp-gallery-cell:hover .hp-gallery-inner { opacity: 1; }
        .hp-gallery-icon { }

        /* ─── VIP section ────────────────────────── */
        .hp-vip {
          position:        relative;
          background:      #060406;
          padding:         clamp(5.5rem, 10vw, 10rem) var(--container-padding);
          overflow:        hidden;
          display:         flex;
          align-items:     center;
          justify-content: center;
        }
        .hp-vip-bg {
          position:   absolute;
          inset:      0;
          background: radial-gradient(ellipse at 50% 40%, rgba(30,18,44,0.8) 0%, rgba(6,4,6,0) 65%);
          pointer-events: none;
        }
        .hp-vip-content {
          text-align: center;
        }
        .hp-vip-form {
          display:        flex;
          flex-direction: column;
          gap:            0.85rem;
          align-items:    stretch;
        }
        @media (min-width: 520px) {
          .hp-vip-form {
            flex-direction: row;
            align-items:    stretch;
          }
          .hp-vip-input-wrap { flex: 1; }
        }
        .hp-vip-input-wrap {
          border-bottom: 1px solid rgba(201,169,110,0.3);
        }
        @media (min-width: 520px) {
          .hp-vip-input-wrap {
            border-bottom: none;
            border-bottom: 1px solid rgba(201,169,110,0.3);
          }
        }
        .hp-vip-input {
          width:          100%;
          background:     transparent;
          border:         none;
          outline:        none;
          font-family:    var(--font-inter);
          font-size:      0.82rem;
          color:          rgba(244,239,230,0.8);
          padding:        0.85rem 0;
          letter-spacing: 0.04em;
        }
        .hp-vip-input::placeholder { color: rgba(244,239,230,0.28); }

        .hp-vip-btn {
          background:     rgba(201,169,110,0.12);
          border:         1px solid rgba(201,169,110,0.35);
          color:          var(--gold);
          font-family:    var(--font-inter);
          font-size:      0.58rem;
          font-weight:    500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding:        0.85rem 1.75rem;
          cursor:         pointer;
          transition:     background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          white-space:    nowrap;
        }
        .hp-vip-btn:hover {
          background:   rgba(201,169,110,0.22);
          border-color: rgba(201,169,110,0.6);
          color:        var(--gold-bright);
        }

        /* ─── Service strip ──────────────────────── */
        .hp-services-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   clamp(1rem, 2vw, 1.5rem);
        }
        @media (max-width: 768px) { .hp-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hp-services-grid { grid-template-columns: 1fr; } }

        .hp-service-card {
          padding:    clamp(1.5rem, 3vw, 2.5rem) 0.5rem;
          text-align: center;
        }

        /* ─── Empty state ────────────────────────── */
        .hp-empty-state {
          text-align: center;
          padding:    4rem 2rem;
          border:     1px solid rgba(0,0,0,0.07);
        }

        /* ─── btn-gold ───────────────────────────── */
        .btn-gold {
          background:     var(--gold) !important;
          color:          var(--black) !important;
          border:         1px solid transparent !important;
          transition:     background 0.3s ease, color 0.3s ease !important;
        }
        .btn-gold:hover {
          background: var(--gold-light) !important;
        }

        /* ─── btn-outline-dark ───────────────────── */
        .btn-outline-dark {
          background:     transparent;
          border:         1px solid rgba(0,0,0,0.22);
          color:          #111111;
          font-family:    var(--font-inter);
          font-size:      0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding:        0.85rem 2rem;
          text-decoration: none;
          display:        inline-block;
          transition:     border-color 0.3s ease, background 0.3s ease;
          cursor:         pointer;
        }
        .btn-outline-dark:hover {
          border-color: rgba(0,0,0,0.55);
          background:   rgba(0,0,0,0.04);
        }

      `}</style>
    </>
  );
}
