// Main homepage — luxury editorial redesign.
// Server component — inside (store) layout → gets Header + Footer.

import Link from "next/link";
import type { Metadata } from "next";
import { fetchProducts, fetchCollections } from "@/lib/api";
import { ProductCard } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Covora — Women's Luxury Fashion",
  description: "Shop the new season at Covora. Refined women's clothing, shoes, bags and beauty.",
};

// ─── Static data ───────────────────────────────────────────────────────────────

const R2 = "https://pub-1d6c9d49352543bd9274a49abd4df1f95.r2.dev";

const EDIT_CATS = [
  { n: "01", label: "Dresses",   sub: "Day to Evening",  href: "/category/dresses",   img: `${R2}/womenindress.png` },
  { n: "02", label: "Outerwear", sub: "The Outer Edit",  href: "/category/outerwear", img: `${R2}/outer%20wear.png` },
  { n: "03", label: "Knitwear",  sub: "Effortless Ease", href: "/category/knitwear",  img: `${R2}/womensknitwear.png` },
  { n: "04", label: "Shoes",     sub: "Finish the Look", href: "/category/shoes",     img: `${R2}/shoesandbags.png` },
] as const;

const MOOD_PANELS = [
  { label: "Evening Edit",        sub: "Dressed for the occasion", href: "/category/dresses",   img: `${R2}/womenindress.png` },
  { label: "Everyday Luxury",     sub: "Elevated essentials",      href: "/shop",               img: `${R2}/womensknitwear.png` },
  { label: "Tailored Minimalism", sub: "Structure, refined",       href: "/category/outerwear", img: `${R2}/outer%20wear.png` },
  { label: "Statement Dressing",  sub: "Bold. Intentional. Yours.", href: "/new-in",            img: `${R2}/bags.png` },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [allProducts, allCollections] = await Promise.all([
    fetchProducts({ limit: 8 }),
    fetchCollections({ limit: 3 }),
  ]);

  const newIn       = allProducts.slice(0, 4);
  const bestsellers = allProducts.slice(4, 8).length ? allProducts.slice(4, 8) : allProducts.slice(0, 4);

  return (
    <>

      {/* ══════════════════════════════════════════════════════════
          1. HERO — full-bleed cinematic video
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-hero">
        {/* Video */}
        <video autoPlay muted loop playsInline aria-hidden="true" className="hp-hero-video">
          <source src="https://pub-98b9c2a87ab54dd9924de5af1f2e080e.r2.dev/womens.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div aria-hidden="true" className="hp-hero-overlay-bot" />
        <div aria-hidden="true" className="hp-hero-overlay-left" />
        <div aria-hidden="true" className="hp-hero-overlay-top" />

        {/* Grain */}
        <div aria-hidden="true" className="hp-hero-grain" />

        {/* Content */}
        <div className="hp-hero-inner">
          <div className="hp-hero-content">

            {/* Season pill */}
            <div className="hp-season-pill">
              <span className="hp-season-dot" aria-hidden="true" />
              <span>Spring / Summer 2026</span>
              <span className="hp-season-rule" aria-hidden="true" />
              <span style={{ opacity: 0.45 }}>New Collection</span>
            </div>

            {/* Headline */}
            <h1 className="hp-hero-headline">
              The<br />
              <em>New Season</em><br />
              Edit
            </h1>

            {/* Gold rule */}
            <div className="hp-hero-rule" aria-hidden="true" />

            {/* Sub */}
            <p className="hp-hero-sub">
              Refined pieces for every occasion.<br />
              Selected for quality, crafted to last.
            </p>

            {/* CTAs */}
            <div className="hp-hero-ctas">
              <Link href="/new-in"      className="btn btn-white btn-md hp-cta-primary">Shop New In</Link>
              <Link href="/collections" className="btn btn-glass  btn-md">View Collection</Link>
            </div>
          </div>

          {/* Right column — editorial detail */}
          <div className="hp-hero-aside" aria-hidden="true">
            <div className="hp-hero-aside-inner">
              <div className="hp-aside-rule" />
              <p className="hp-aside-label">SS26</p>
              <div className="hp-aside-rule" />
              <p className="hp-aside-number">001</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hp-scroll-indicator" aria-hidden="true">
          <div className="hp-scroll-line" />
          <span className="hp-scroll-label">Scroll</span>
        </div>

        {/* Bottom count strip */}
        <div className="hp-hero-strip">
          {["Dresses", "Outerwear", "Shoes", "Bags"].map((c, i) => (
            <Link key={c} href={`/category/${c.toLowerCase()}`} className="hp-hero-strip-item">
              <span className="hp-hero-strip-num">0{i + 1}</span>
              <span className="hp-hero-strip-label">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. EDITORIAL CATEGORIES — asymmetric layout
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-section hp-section--dark">
        <div className="hp-container">
          <div className="hp-section-eyebrow-row">
            <p className="hp-eyebrow hp-eyebrow--gold">The Edit</p>
            <h2 className="hp-section-h2 hp-section-h2--light">Shop by Category</h2>
            <Link href="/shop" className="hp-section-link hp-section-link--light">All Categories →</Link>
          </div>
        </div>

        {/* Asymmetric grid: 1 large + 3 column */}
        <div className="hp-cat-asymmetric">
          {/* Large feature card */}
          <Link href={EDIT_CATS[0].href} className="hp-cat-large">
            <img src={EDIT_CATS[0].img} alt={EDIT_CATS[0].label} className="hp-cat-bg hp-cat-img" />
            <div className="hp-cat-grain-overlay" />
            <div className="hp-cat-scrim" />
            <div className="hp-cat-large-content">
              <span className="hp-cat-num">{EDIT_CATS[0].n}</span>
              <div>
                <p className="hp-cat-sub">{EDIT_CATS[0].sub}</p>
                <p className="hp-cat-label hp-cat-label--lg">{EDIT_CATS[0].label}</p>
                <div className="hp-cat-rule" />
              </div>
              <span className="hp-cat-cta">Shop Now →</span>
            </div>
          </Link>

          {/* 3 smaller cards stacked */}
          <div className="hp-cat-col">
            {EDIT_CATS.slice(1).map(cat => (
              <Link key={cat.href} href={cat.href} className="hp-cat-small">
                <img src={cat.img} alt={cat.label} className="hp-cat-bg hp-cat-img" />
                <div className="hp-cat-grain-overlay" />
                <div className="hp-cat-scrim" />
                <div className="hp-cat-small-content">
                  <span className="hp-cat-num hp-cat-num--sm">{cat.n}</span>
                  <div>
                    <p className="hp-cat-sub hp-cat-sub--sm">{cat.sub}</p>
                    <p className="hp-cat-label">{cat.label}</p>
                  </div>
                  <span className="hp-cat-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. NEW ARRIVALS
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-section hp-section--light">
        <div className="hp-container">
          <div className="hp-section-eyebrow-row">
            <p className="hp-eyebrow">Latest Arrivals</p>
            <h2 className="hp-section-h2">New In</h2>
            <Link href="/new-in" className="hp-section-link">View All →</Link>
          </div>

          {newIn.length > 0 ? (
            <div className="hp-product-grid hp-product-grid--light">
              {newIn.map(p => (
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
            <EmptyProducts />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. EDITORIAL PROMO — full-width campaign
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-promo">
        <div className="hp-promo-bg" aria-hidden="true" />
        <div className="hp-promo-grain" aria-hidden="true" />

        {/* Left thin rule */}
        <div className="hp-promo-side-rule" aria-hidden="true" />

        <div className="hp-container" style={{ position: "relative" }}>
          <div className="hp-promo-layout">
            <div className="hp-promo-text">
              <p className="hp-eyebrow hp-eyebrow--gold-dim">Spring / Summer 2026</p>
              <h2 className="hp-promo-headline">
                Dressed for<br />
                <em>every luminous<br />moment</em>
              </h2>
              <div style={{ width: "40px", height: "1px", background: "rgba(201,169,110,0.45)", margin: "2rem 0" }} />
              <p className="hp-promo-body">
                Pieces that move with you — from quiet mornings<br className="hp-br" />
                to the most luminous of evenings.
              </p>
              <Link href="/collections" className="btn hp-promo-btn">
                Explore the Collection
              </Link>
            </div>

            {/* Visual panel */}
            <div className="hp-promo-visual" aria-hidden="true">
              <img src={`${R2}/womenindress.png`} alt="Covora Campaign" className="hp-cat-img" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              <div className="hp-promo-visual-frame" style={{ position: "absolute", inset: "1.5rem", border: "1px solid rgba(201,169,110,0.18)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: "2rem", left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
                <p className="hp-promo-visual-season" style={{ background: "rgba(4,3,6,0.55)", display: "inline-block", padding: "0.3rem 1rem" }}>SS 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. CURATED EDIT / BESTSELLERS — asymmetric
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-section hp-section--cream">
        <div className="hp-container">
          <div className="hp-section-eyebrow-row">
            <p className="hp-eyebrow">Curated</p>
            <h2 className="hp-section-h2">The Covora Edit</h2>
            <Link href="/shop" className="hp-section-link">View All →</Link>
          </div>

          {bestsellers.length > 0 ? (
            <div className="hp-curated-layout">
              {/* Featured large */}
              <Link href={`/product/${bestsellers[0]?.slug ?? "#"}`} className="hp-curated-hero group">
                <div
                  className="hp-curated-hero-img"
                  style={!bestsellers[0]?.src ? { background: bestsellers[0]?.bg ?? "linear-gradient(160deg,#0e0c12,#1a1626)" } : undefined}
                >
                  {!bestsellers[0]?.src && <PlaceholderOverlay />}
                </div>
                <div className="hp-curated-hero-meta">
                  <p className="hp-eyebrow" style={{ fontSize: "0.45rem" }}>Editor's Pick</p>
                  <p className="hp-curated-hero-name">{bestsellers[0]?.name}</p>
                  <p className="hp-curated-hero-price">{bestsellers[0]?.price}</p>
                </div>
              </Link>

              {/* 3 supporting */}
              <div className="hp-curated-grid">
                {bestsellers.slice(1, 4).map(p => (
                  <ProductCard
                    key={p.id}
                    href={`/product/${p.slug}`}
                    name={p.name}
                    price={p.price}
                    originalPrice={p.originalPrice}
                    src={p.src}
                    bg={p.bg}
                    badge={p.badge}
                    className="hp-curated-card"
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyProducts />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. BRAND STORY — split layout
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-brand">
        {/* Visual left */}
        <div className="hp-brand-visual" aria-hidden="true">
          <img src={`${R2}/womensknitwear.png`} alt="Covora" className="hp-cat-img" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div className="hp-brand-visual-bg" style={{ opacity: 0.45 }} />
          <div className="hp-brand-frame" />
          <div className="hp-brand-corner hp-brand-corner--tl" />
          <div className="hp-brand-corner hp-brand-corner--br" />
        </div>

        {/* Text right */}
        <div className="hp-brand-text">
          <p className="hp-eyebrow">Our Philosophy</p>
          <h2 className="hp-brand-headline">
            Crafted for<br />
            <em>the modern<br />woman</em>
          </h2>
          <div style={{ width: "36px", height: "1px", background: "var(--gold)", opacity: 0.45, margin: "2rem 0" }} />
          <p className="hp-brand-body">
            Every piece at Covora is chosen with a single intention — to make you feel
            effortlessly composed. Not louder, not more. Just completely yourself,
            at your most refined.
          </p>
          <p className="hp-brand-body" style={{ marginTop: "1rem" }}>
            We believe a well-considered wardrobe is one of the most powerful things a
            woman can own. Timeless silhouettes, exceptional fabrics, enduring elegance.
          </p>
          <Link href="/about" className="hp-brand-link">
            <span>Discover Our Story</span>
            <span className="hp-brand-link-line" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. SHOP BY MOOD
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-section hp-section--dark">
        <div className="hp-container">
          <div className="hp-section-eyebrow-row">
            <p className="hp-eyebrow hp-eyebrow--gold">Explore</p>
            <h2 className="hp-section-h2 hp-section-h2--light">Shop by Mood</h2>
            <Link href="/shop" className="hp-section-link hp-section-link--light">All →</Link>
          </div>
        </div>

        <div className="hp-mood-grid hp-container">
          {MOOD_PANELS.map((m, i) => (
            <Link key={m.href + m.label} href={m.href} className="hp-mood-card">
              <img src={m.img} alt={m.label} className="hp-mood-bg hp-cat-img" />
              <div className="hp-mood-grain" />
              <div className="hp-mood-scrim" />
              <div className="hp-mood-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="hp-mood-content">
                <p className="hp-mood-sub">{m.sub}</p>
                <p className="hp-mood-label">{m.label}</p>
                <div className="hp-mood-rule" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. CAMPAIGN GALLERY
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-section hp-section--offwhite">
        <div className="hp-container">
          <div className="hp-section-eyebrow-row" style={{ marginBottom: "clamp(2rem,3.5vw,3rem)" }}>
            <p className="hp-eyebrow">Campaign</p>
            <h2 className="hp-section-h2">The Visual Edit</h2>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hp-section-link">@covora →</a>
          </div>
        </div>

        <div className="hp-gallery hp-container">
          {/* Row 1 */}
          <div className="hp-gallery-row hp-gallery-row--1">
            <GalleryCell img={`${R2}/womenindress.png`}     alt="Women in Dress"  wide />
            <GalleryCell img={`${R2}/womensknitwear.png`}   alt="Knitwear" />
            <GalleryCell img={`${R2}/shoesandbags.png`}     alt="Shoes & Bags" />
          </div>
          {/* Row 2 */}
          <div className="hp-gallery-row hp-gallery-row--2">
            <GalleryCell img={`${R2}/bags.png`}             alt="Bags" />
            <GalleryCell img={`${R2}/outer%20wear.png`}     alt="Outerwear" />
            <GalleryCell img={`${R2}/Sets.png`}             alt="Sets"            wide />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9. VIP NEWSLETTER
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-vip">
        <div className="hp-vip-bg" aria-hidden="true" />
        <div className="hp-vip-grain" aria-hidden="true" />

        <div className="hp-vip-inner">
          <div className="hp-vip-thread" aria-hidden="true" />

          <p className="hp-eyebrow hp-eyebrow--gold" style={{ textAlign: "center" }}>Private Access</p>

          <h2 className="hp-vip-headline">
            Join the<br />
            <em>Covora World</em>
          </h2>

          <p className="hp-vip-body">
            Exclusive drops. Early access. Private styling notes.<br className="hp-br" />
            Curated for you alone.
          </p>

          <form className="hp-vip-form" onSubmit={undefined}>
            <div className="hp-vip-field">
              <input
                type="email"
                placeholder="Your email address"
                className="hp-vip-input"
                required
              />
            </div>
            <button type="submit" className="hp-vip-btn">
              Receive Access
            </button>
          </form>

          <p className="hp-vip-note">No noise. Unsubscribe at any time.</p>
          <div className="hp-vip-thread hp-vip-thread--bottom" aria-hidden="true" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          10. SERVICE STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="hp-section hp-section--cream" style={{ paddingTop: "clamp(3rem,5vw,5rem)", paddingBottom: "clamp(3rem,5vw,5rem)" }}>
        <div className="hp-services hp-container">
          {[
            { icon: "↩", label: "Free Returns",      sub: "On all UK orders" },
            { icon: "⚡", label: "Next-Day Delivery", sub: "Order before 2 pm" },
            { icon: "✦",  label: "Expert Styling",    sub: "Personal shopping" },
            { icon: "◇",  label: "Gift Wrapping",     sub: "Complimentary on request" },
          ].map(s => (
            <div key={s.label} className="hp-service">
              <p className="hp-service-icon">{s.icon}</p>
              <p className="hp-service-label">{s.label}</p>
              <p className="hp-service-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════════════════ */}
      <style>{`

        /* ─── Layout helpers ─────────────────────────────────── */
        .hp-container {
          max-width:     var(--container-wide);
          margin:        0 auto;
          padding-left:  var(--container-padding);
          padding-right: var(--container-padding);
        }
        .hp-section {
          padding-top:    clamp(5.5rem, 9vw, 9rem);
          padding-bottom: clamp(5.5rem, 9vw, 9rem);
        }
        .hp-section--dark     { background: #0A0908; }
        .hp-section--light    { background: #FAFAF8; border-top: 1px solid rgba(0,0,0,0.05); }
        .hp-section--cream    { background: #F2EFE9; border-top: 1px solid rgba(0,0,0,0.05); }
        .hp-section--offwhite { background: #F5F3EF; border-top: 1px solid rgba(0,0,0,0.05); }

        .hp-section-eyebrow-row {
          display:         flex;
          align-items:     flex-end;
          justify-content: space-between;
          gap:             1.5rem;
          margin-bottom:   clamp(2.5rem,4.5vw,4rem);
          flex-wrap:       wrap;
        }

        /* ─── Typography ─────────────────────────────────────── */
        .hp-eyebrow {
          font-family:    var(--font-inter);
          font-size:      0.52rem;
          font-weight:    500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color:          var(--gold-dark);
          display:        block;
          margin-bottom:  0.5rem;
        }
        .hp-eyebrow--gold     { color: rgba(201,169,110,0.65); }
        .hp-eyebrow--gold-dim { color: rgba(201,169,110,0.55); margin-bottom: 1.25rem; }

        .hp-section-h2 {
          font-family:    var(--font-cormorant);
          font-size:      clamp(2.2rem,3.5vw,4rem);
          font-weight:    300;
          color:          #111;
          line-height:    1.0;
          letter-spacing: -0.01em;
          flex:           1;
        }
        .hp-section-h2--light { color: rgba(244,239,230,0.88); }

        .hp-section-link {
          font-family:    var(--font-inter);
          font-size:      0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color:          #888;
          text-decoration: none;
          flex-shrink:    0;
          transition:     color 0.2s ease;
        }
        .hp-section-link:hover { color: var(--gold-dark); }
        .hp-section-link--light { color: rgba(255,255,255,0.3); }
        .hp-section-link--light:hover { color: rgba(201,169,110,0.8); }

        /* ─── HERO ───────────────────────────────────────────── */
        .hp-hero {
          position:       relative;
          min-height:     100svh;
          display:        flex;
          flex-direction: column;
          overflow:       hidden;
          background:     #060408;
        }
        .hp-hero-video {
          position:       absolute;
          inset:          0;
          width:          100%;
          height:         100%;
          object-fit:     cover;
          object-position: center;
          pointer-events: none;
        }
        .hp-hero-overlay-bot {
          position:   absolute;
          inset:      0;
          background: linear-gradient(to top, rgba(4,3,6,0.96) 0%, rgba(4,3,6,0.6) 35%, rgba(4,3,6,0.18) 65%, rgba(4,3,6,0.04) 100%);
          pointer-events: none;
        }
        .hp-hero-overlay-left {
          position:   absolute;
          inset:      0;
          background: linear-gradient(to right, rgba(4,3,6,0.52) 0%, transparent 55%);
          pointer-events: none;
        }
        .hp-hero-overlay-top {
          position:   absolute;
          inset:      0;
          background: linear-gradient(to bottom, rgba(4,3,6,0.35) 0%, transparent 20%);
          pointer-events: none;
        }
        .hp-hero-grain {
          position:       absolute;
          inset:          -50%;
          width:          200%;
          height:         200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity:        0.028;
          pointer-events: none;
          animation:      grain 8s steps(10) infinite;
          mix-blend-mode: overlay;
        }

        .hp-hero-inner {
          position:       relative;
          flex:           1;
          display:        flex;
          align-items:    flex-end;
          justify-content:space-between;
          padding:        var(--header-height) var(--container-padding) clamp(6rem,10vw,10rem);
          max-width:      calc(var(--container-wide) + var(--container-padding) * 2);
          margin:         0 auto;
          width:          100%;
          gap:            2rem;
        }

        .hp-hero-content { max-width: 640px; }

        /* Season pill */
        .hp-season-pill {
          display:        inline-flex;
          align-items:    center;
          gap:            0.85rem;
          padding:        0.5rem 1.1rem;
          border:         1px solid rgba(201,169,110,0.2);
          background:     rgba(201,169,110,0.06);
          backdrop-filter: blur(8px);
          margin-bottom:  2rem;
          font-family:    var(--font-inter);
          font-size:      0.5rem;
          font-weight:    400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.75);
        }
        .hp-season-dot {
          width:        4px;
          height:       4px;
          border-radius:50%;
          background:   var(--gold);
          opacity:      0.7;
          flex-shrink:  0;
        }
        .hp-season-rule {
          width:      20px;
          height:     1px;
          background: rgba(201,169,110,0.35);
          flex-shrink:0;
        }

        /* Headline */
        .hp-hero-headline {
          font-family:    var(--font-cormorant);
          font-size:      clamp(4.5rem,10vw,12rem);
          font-weight:    300;
          color:          var(--ivory);
          line-height:    0.9;
          letter-spacing: -0.03em;
          margin-bottom:  clamp(2rem,4vw,3.5rem);
        }
        .hp-hero-headline em {
          font-style:  italic;
          color:       rgba(201,169,110,0.85);
        }
        .hp-hero-rule {
          width:        40px;
          height:       1px;
          background:   var(--gold);
          opacity:      0.6;
          margin-bottom:1.5rem;
        }
        .hp-hero-sub {
          font-family:    var(--font-inter);
          font-size:      0.82rem;
          color:          rgba(196,189,180,0.68);
          line-height:    1.9;
          max-width:      360px;
          letter-spacing: 0.015em;
          margin-bottom:  2.5rem;
        }
        .hp-hero-ctas {
          display:     flex;
          gap:         0.85rem;
          flex-wrap:   wrap;
          align-items: center;
        }
        .hp-cta-primary {
          border-radius: var(--radius-pill) !important;
          box-shadow:    var(--shadow-gold) !important;
        }

        /* btn-glass */
        .btn-glass {
          background:           rgba(255,255,255,0.07) !important;
          backdrop-filter:      blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border:               1px solid rgba(255,255,255,0.16) !important;
          color:                var(--ivory) !important;
        }
        .btn-glass:hover {
          background:   rgba(255,255,255,0.13) !important;
          border-color: rgba(255,255,255,0.28) !important;
        }

        /* Aside editorial column */
        .hp-hero-aside {
          display:        flex;
          align-items:    flex-end;
          padding-bottom: 0.5rem;
        }
        @media (max-width: 768px) { .hp-hero-aside { display: none; } }
        .hp-hero-aside-inner {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            1.1rem;
        }
        .hp-aside-rule {
          width:      1px;
          height:     48px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.35));
        }
        .hp-aside-label {
          font-family:    var(--font-inter);
          font-size:      0.45rem;
          letter-spacing: 0.3em;
          color:          rgba(201,169,110,0.45);
          writing-mode:   vertical-rl;
          text-transform: uppercase;
        }
        .hp-aside-number {
          font-family:    var(--font-cormorant);
          font-size:      0.9rem;
          font-style:     italic;
          letter-spacing: 0.15em;
          color:          rgba(201,169,110,0.25);
        }

        /* Scroll indicator */
        .hp-scroll-indicator {
          position:       absolute;
          bottom:         2.5rem;
          left:           50%;
          transform:      translateX(-50%);
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            0.65rem;
        }
        @media (max-width: 540px) { .hp-scroll-indicator { display: none; } }
        .hp-scroll-line {
          width:     1px;
          height:    36px;
          background:linear-gradient(to bottom, rgba(201,169,110,0.5), transparent);
          animation: scrollPulse 2.2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(0.7); }
        }
        .hp-scroll-label {
          font-family:    var(--font-inter);
          font-size:      0.4rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.4);
          writing-mode:   vertical-rl;
        }

        /* Bottom category strip */
        .hp-hero-strip {
          position:      relative;
          display:       flex;
          border-top:    1px solid rgba(255,255,255,0.06);
          background:    rgba(4,3,6,0.65);
          backdrop-filter: blur(8px);
        }
        .hp-hero-strip-item {
          flex:           1;
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            0.3rem;
          padding:        1.1rem 0.5rem;
          text-decoration:none;
          border-right:   1px solid rgba(255,255,255,0.05);
          transition:     background 0.3s ease;
        }
        .hp-hero-strip-item:last-child { border-right: none; }
        .hp-hero-strip-item:hover { background: rgba(201,169,110,0.06); }
        .hp-hero-strip-num {
          font-family:    var(--font-inter);
          font-size:      0.4rem;
          letter-spacing: 0.2em;
          color:          rgba(201,169,110,0.35);
        }
        .hp-hero-strip-label {
          font-family:    var(--font-cormorant);
          font-size:      clamp(0.75rem, 1.4vw, 1rem);
          font-weight:    300;
          letter-spacing: 0.08em;
          color:          rgba(244,239,230,0.55);
          transition:     color 0.3s ease;
        }
        .hp-hero-strip-item:hover .hp-hero-strip-label { color: var(--gold); }

        /* ─── EDITORIAL CATEGORY ASYMMETRIC ─────────── */
        .hp-cat-asymmetric {
          display:               grid;
          grid-template-columns: 1.45fr 1fr;
          gap:                   clamp(0.4rem, 0.8vw, 0.65rem);
          padding:               0 var(--container-padding);
          max-width:             calc(var(--container-wide) + var(--container-padding) * 2);
          margin:                0 auto;
        }
        @media (max-width: 768px) { .hp-cat-asymmetric { grid-template-columns: 1fr; } }

        .hp-cat-large {
          display:         block;
          position:        relative;
          aspect-ratio:    2 / 3;
          overflow:        hidden;
          text-decoration: none;
          cursor:          pointer;
        }
        @media (max-width: 768px) { .hp-cat-large { aspect-ratio: 3/4; } }

        .hp-cat-col {
          display:        flex;
          flex-direction: column;
          gap:            clamp(0.4rem, 0.8vw, 0.65rem);
        }
        .hp-cat-small {
          display:         block;
          position:        relative;
          flex:            1;
          overflow:        hidden;
          text-decoration: none;
          cursor:          pointer;
          min-height:      120px;
        }

        /* Shared cat parts */
        .hp-cat-bg {
          position:   absolute;
          inset:      0;
          transition: transform 1.1s cubic-bezier(0.16,1,0.30,1);
        }
        .hp-cat-img {
          width:       100%;
          height:      100%;
          object-fit:  cover;
          object-position: center;
          display:     block;
        }
        .hp-cat-large:hover  .hp-cat-bg,
        .hp-cat-small:hover  .hp-cat-bg  { transform: scale(1.06); }

        .hp-cat-grain-overlay {
          position:   absolute;
          inset:      -50%;
          width:      200%;
          height:     200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity:    0.04;
          pointer-events: none;
        }
        .hp-cat-scrim {
          position:   absolute;
          inset:      0;
          background: linear-gradient(to top, rgba(4,3,6,0.94) 0%, rgba(4,3,6,0.25) 45%, rgba(4,3,6,0.05) 70%, transparent 100%);
          transition: opacity 0.4s ease;
        }
        .hp-cat-large:hover .hp-cat-scrim,
        .hp-cat-small:hover .hp-cat-scrim { opacity: 0.85; }

        /* Large content */
        .hp-cat-large-content {
          position:        absolute;
          inset:           0;
          display:         flex;
          flex-direction:  column;
          justify-content: space-between;
          padding:         clamp(1.25rem,2.5vw,2rem);
        }
        .hp-cat-num {
          font-family:    var(--font-inter);
          font-size:      0.48rem;
          letter-spacing: 0.2em;
          color:          rgba(201,169,110,0.35);
          align-self:     flex-start;
        }
        .hp-cat-num--sm {
          font-size: 0.42rem;
        }
        .hp-cat-sub {
          font-family:    var(--font-inter);
          font-size:      0.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.6);
          margin-bottom:  0.4rem;
          transition:     color 0.3s ease;
        }
        .hp-cat-sub--sm { font-size: 0.44rem; }
        .hp-cat-label {
          font-family:    var(--font-cormorant);
          font-size:      clamp(1.8rem,3vw,3rem);
          font-weight:    300;
          color:          rgba(244,239,230,0.88);
          letter-spacing: 0.02em;
          line-height:    1.0;
          transition:     color 0.3s ease;
        }
        .hp-cat-label--lg { font-size: clamp(2.2rem,4.5vw,4.5rem); }
        .hp-cat-large:hover .hp-cat-label,
        .hp-cat-small:hover .hp-cat-label { color: var(--gold-bright); }
        .hp-cat-large:hover .hp-cat-sub,
        .hp-cat-small:hover .hp-cat-sub   { color: rgba(201,169,110,0.85); }

        .hp-cat-rule {
          width:      0;
          height:     1px;
          background: rgba(201,169,110,0.55);
          margin-top: 0.85rem;
          transition: width 0.55s cubic-bezier(0.16,1,0.30,1);
        }
        .hp-cat-large:hover .hp-cat-rule { width: 42px; }

        .hp-cat-cta {
          font-family:    var(--font-inter);
          font-size:      0.52rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0);
          transition:     color 0.4s ease, transform 0.4s ease;
          transform:      translateX(-8px);
          display:        block;
        }
        .hp-cat-large:hover .hp-cat-cta {
          color:     rgba(201,169,110,0.7);
          transform: translateX(0);
        }

        /* Small content */
        .hp-cat-small-content {
          position:        absolute;
          inset:           0;
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          padding:         clamp(1rem,2vw,1.75rem);
        }
        .hp-cat-arrow {
          font-family: var(--font-inter);
          font-size:   0.9rem;
          color:       rgba(201,169,110,0);
          transition:  color 0.35s ease, transform 0.35s ease;
          transform:   translateX(-4px);
        }
        .hp-cat-small:hover .hp-cat-arrow {
          color:     rgba(201,169,110,0.65);
          transform: translateX(0);
        }

        /* ─── PRODUCT GRIDS ──────────────────────────── */
        .hp-product-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   clamp(1rem,2vw,1.5rem);
        }
        @media (max-width: 960px) { .hp-product-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .hp-product-grid { grid-template-columns: repeat(2,1fr); gap: 0.75rem; } }

        .hp-product-grid--light .pcard-name              { color: #555; }
        .hp-product-grid--light .pcard:hover .pcard-name { color: #111; }
        .hp-product-grid--light .pcard-price             { color: #111; }
        .hp-product-grid--light .pcard-img               { border-color: rgba(0,0,0,0.08); }
        .hp-product-grid--light .pcard:hover .pcard-img  { border-color: rgba(0,0,0,0.18); }
        .hp-product-grid--light .pcard-price-original    { color: #999; }

        /* ─── PROMO BANNER ───────────────────────────── */
        .hp-promo {
          position:        relative;
          overflow:        hidden;
          min-height:      clamp(520px,60vw,740px);
          display:         flex;
          align-items:     center;
          padding:         clamp(5rem,10vw,10rem) 0;
        }
        .hp-promo-bg {
          position:   absolute;
          inset:      0;
          background: radial-gradient(ellipse at 65% 50%, #1e0d2e 0%, #0a060f 55%, #050306 100%);
        }
        .hp-promo-grain {
          position:       absolute;
          inset:          -50%;
          width:          200%;
          height:         200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity:        0.032;
          pointer-events: none;
        }
        .hp-promo-side-rule {
          position:   absolute;
          left:       clamp(1.5rem,4vw,4rem);
          top:        0;
          bottom:     0;
          width:      1px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.15) 20%, rgba(201,169,110,0.15) 80%, transparent);
        }

        .hp-promo-layout {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          gap:                   clamp(3rem,6vw,7rem);
          align-items:           center;
        }
        @media (max-width: 860px) { .hp-promo-layout { grid-template-columns: 1fr; } }

        .hp-promo-headline {
          font-family:    var(--font-cormorant);
          font-size:      clamp(3rem,6vw,7.5rem);
          font-weight:    300;
          color:          var(--ivory);
          line-height:    0.92;
          letter-spacing: -0.02em;
          margin-bottom:  0;
        }
        .hp-promo-headline em {
          font-style: italic;
          color:       rgba(201,169,110,0.88);
        }
        .hp-promo-body {
          font-family:    var(--font-inter);
          font-size:      0.82rem;
          color:          rgba(196,189,180,0.58);
          line-height:    1.9;
          max-width:      380px;
          letter-spacing: 0.01em;
          margin-bottom:  2.5rem;
        }
        .hp-promo-btn {
          background:     transparent !important;
          border:         1px solid rgba(201,169,110,0.38) !important;
          color:          var(--gold) !important;
          font-family:    var(--font-inter) !important;
          font-size:      0.58rem !important;
          font-weight:    500 !important;
          letter-spacing: 0.22em !important;
          text-transform: uppercase !important;
          padding:        1rem 2.5rem !important;
          transition:     background 0.3s ease, border-color 0.3s ease, color 0.3s ease !important;
        }
        .hp-promo-btn:hover {
          background:   rgba(201,169,110,0.1) !important;
          border-color: rgba(201,169,110,0.65) !important;
          color:        var(--gold-bright) !important;
        }

        .hp-promo-visual {
          position:     relative;
          aspect-ratio: 3/4;
          overflow:     hidden;
        }
        @media (max-width: 860px) { .hp-promo-visual { display: none; } }
        .hp-promo-visual-bg {
          position:   absolute;
          inset:      0;
          background: linear-gradient(145deg, #1a0e2a 0%, #0d0816 55%, #080510 100%);
        }
        .hp-promo-visual-frame {
          position: absolute;
          inset:    1.5rem;
          border:   1px solid rgba(201,169,110,0.1);
        }
        .hp-promo-visual-inner {
          position:        absolute;
          inset:           0;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          gap:             1.2rem;
        }
        .hp-promo-visual-word {
          font-family:    var(--font-cormorant);
          font-size:      clamp(2.5rem,4vw,4.5rem);
          font-weight:    300;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.22);
          padding-right:  0.38em;
        }
        .hp-promo-visual-season {
          font-family:    var(--font-inter);
          font-size:      0.46rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.18);
        }

        /* ─── CURATED / BESTSELLERS ──────────────────── */
        .hp-curated-layout {
          display:               grid;
          grid-template-columns: 1fr 2fr;
          gap:                   clamp(1.5rem,3vw,3rem);
          align-items:           start;
        }
        @media (max-width: 900px) { .hp-curated-layout { grid-template-columns: 1fr; } }

        .hp-curated-hero {
          display:         block;
          text-decoration: none;
        }
        .hp-curated-hero-img {
          position:     relative;
          aspect-ratio: 2/3;
          overflow:     hidden;
          border:       1px solid rgba(0,0,0,0.07);
          transition:   border-color 0.3s ease;
        }
        .hp-curated-hero:hover .hp-curated-hero-img { border-color: rgba(0,0,0,0.18); }
        .hp-curated-hero-meta { padding-top: 1rem; }
        .hp-curated-hero-name {
          font-family:    var(--font-cormorant);
          font-size:      clamp(1.2rem,1.8vw,1.7rem);
          font-weight:    300;
          color:          #111;
          line-height:    1.2;
          margin-top:     0.35rem;
        }
        .hp-curated-hero-price {
          font-family: var(--font-inter);
          font-size:   0.82rem;
          color:       #888;
          margin-top:  0.3rem;
        }

        .hp-curated-grid {
          display:               grid;
          grid-template-columns: repeat(3,1fr);
          gap:                   clamp(0.75rem,1.5vw,1.25rem);
        }
        @media (max-width: 640px) { .hp-curated-grid { grid-template-columns: repeat(2,1fr); } }
        .hp-curated-card .pcard-name  { color: #555; }
        .hp-curated-card .pcard-price { color: #111; }
        .hp-curated-card .pcard-img   { border-color: rgba(0,0,0,0.07); }

        /* ─── BRAND STORY ────────────────────────────── */
        .hp-brand {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          min-height:            clamp(520px,60vw,740px);
        }
        @media (max-width: 768px) { .hp-brand { grid-template-columns: 1fr; } }

        .hp-brand-visual {
          position:        relative;
          overflow:        hidden;
          display:         flex;
          align-items:     center;
          justify-content: center;
          min-height:      clamp(360px,45vw,560px);
        }
        .hp-brand-visual-bg {
          position:   absolute;
          inset:      0;
          background: radial-gradient(ellipse at 50% 45%, #1c1016 0%, #0a0808 62%, #080606 100%);
        }
        .hp-brand-grain {
          position:       absolute;
          inset:          -50%;
          width:          200%;
          height:         200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity:        0.04;
          pointer-events: none;
        }
        .hp-brand-frame {
          position: absolute;
          inset:    clamp(2rem,4vw,4rem);
          border:   1px solid rgba(201,169,110,0.08);
          pointer-events: none;
        }
        .hp-brand-center {
          position:        relative;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          gap:             1.2rem;
        }
        .hp-brand-wordmark {
          font-family:    var(--font-cormorant);
          font-size:      clamp(3rem,5vw,6rem);
          font-weight:    300;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color:          var(--gold);
          line-height:    1;
          padding-right:  0.38em;
        }
        .hp-brand-hr {
          width:      36px;
          height:     1px;
          background: rgba(201,169,110,0.35);
        }
        .hp-brand-tagline {
          font-family:    var(--font-cormorant);
          font-size:      clamp(0.85rem,1.2vw,1.1rem);
          font-style:     italic;
          letter-spacing: 0.38em;
          color:          rgba(201,169,110,0.3);
        }
        .hp-brand-corner {
          position:   absolute;
          width:      24px;
          height:     24px;
        }
        .hp-brand-corner--tl {
          top:    clamp(1.5rem,3vw,3rem);
          left:   clamp(1.5rem,3vw,3rem);
          border-top:  1px solid rgba(201,169,110,0.18);
          border-left: 1px solid rgba(201,169,110,0.18);
        }
        .hp-brand-corner--br {
          bottom: clamp(1.5rem,3vw,3rem);
          right:  clamp(1.5rem,3vw,3rem);
          border-bottom: 1px solid rgba(201,169,110,0.18);
          border-right:  1px solid rgba(201,169,110,0.18);
        }

        .hp-brand-text {
          background: #FAFAF8;
          padding:    clamp(3.5rem,7vw,8rem) clamp(2.5rem,5.5vw,7rem);
          display:    flex;
          flex-direction: column;
          justify-content: center;
        }
        .hp-brand-headline {
          font-family:    var(--font-cormorant);
          font-size:      clamp(2.4rem,4vw,5rem);
          font-weight:    300;
          color:          #111;
          line-height:    1.0;
          letter-spacing: -0.01em;
          margin-top:     0.65rem;
        }
        .hp-brand-headline em { font-style: italic; }
        .hp-brand-body {
          font-family:    var(--font-cormorant);
          font-size:      clamp(0.95rem,1.2vw,1.1rem);
          font-style:     italic;
          font-weight:    300;
          color:          #666;
          line-height:    1.9;
          letter-spacing: 0.02em;
          max-width:      420px;
        }
        .hp-brand-link {
          display:        inline-flex;
          align-items:    center;
          gap:            1rem;
          font-family:    var(--font-inter);
          font-size:      0.56rem;
          font-weight:    500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          var(--gold-dark);
          text-decoration:none;
          margin-top:     2.5rem;
          transition:     color 0.2s ease;
        }
        .hp-brand-link:hover { color: var(--gold); }
        .hp-brand-link-line {
          display:    block;
          width:      28px;
          height:     1px;
          background: currentColor;
          transition: width 0.35s ease;
        }
        .hp-brand-link:hover .hp-brand-link-line { width: 48px; }

        /* ─── SHOP BY MOOD ───────────────────────────── */
        .hp-mood-grid {
          display:               grid;
          grid-template-columns: repeat(4,1fr);
          gap:                   clamp(0.4rem,0.8vw,0.65rem);
          margin-top:            0;
          padding-top:           0;
        }
        @media (max-width: 900px) { .hp-mood-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .hp-mood-grid { grid-template-columns: 1fr 1fr; gap: 0.4rem; } }

        .hp-mood-card {
          display:         block;
          position:        relative;
          aspect-ratio:    3/4;
          overflow:        hidden;
          text-decoration: none;
        }
        .hp-mood-bg {
          position:    absolute;
          inset:       0;
          width:       100%;
          height:      100%;
          object-fit:  cover;
          object-position: center;
          display:     block;
          transition:  transform 1.1s cubic-bezier(0.16,1,0.30,1);
        }
        .hp-mood-card:hover .hp-mood-bg { transform: scale(1.05); }

        .hp-mood-grain {
          position:       absolute;
          inset:          -50%;
          width:          200%;
          height:         200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity:        0.04;
          pointer-events: none;
        }
        .hp-mood-scrim {
          position:   absolute;
          inset:      0;
          background: linear-gradient(to top, rgba(4,3,6,0.94) 0%, rgba(4,3,6,0.28) 50%, rgba(4,3,6,0.06) 80%, transparent 100%);
        }
        .hp-mood-num {
          position:       absolute;
          top:            clamp(1rem,2vw,1.5rem);
          right:          clamp(1rem,2vw,1.5rem);
          font-family:    var(--font-inter);
          font-size:      0.44rem;
          letter-spacing: 0.2em;
          color:          rgba(201,169,110,0.28);
        }
        .hp-mood-content {
          position:        absolute;
          bottom:          0;
          left:            0;
          right:           0;
          padding:         clamp(1rem,2.5vw,2rem);
          display:         flex;
          flex-direction:  column;
          gap:             0.35rem;
        }
        .hp-mood-sub {
          font-family:    var(--font-inter);
          font-size:      0.46rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color:          rgba(201,169,110,0.5);
          transition:     color 0.3s ease;
        }
        .hp-mood-card:hover .hp-mood-sub { color: rgba(201,169,110,0.82); }
        .hp-mood-label {
          font-family:    var(--font-cormorant);
          font-size:      clamp(1.1rem,1.8vw,1.8rem);
          font-weight:    300;
          color:          rgba(244,239,230,0.85);
          letter-spacing: 0.02em;
          line-height:    1.1;
          transition:     color 0.3s ease;
        }
        .hp-mood-card:hover .hp-mood-label { color: var(--gold-bright); }
        .hp-mood-rule {
          width:      0;
          height:     1px;
          background: rgba(201,169,110,0.5);
          margin-top: 0.5rem;
          transition: width 0.5s cubic-bezier(0.16,1,0.30,1);
        }
        .hp-mood-card:hover .hp-mood-rule { width: 24px; }

        /* ─── GALLERY ────────────────────────────────── */
        .hp-gallery {
          display:        flex;
          flex-direction: column;
          gap:            clamp(0.4rem,0.8vw,0.65rem);
        }
        .hp-gallery-row {
          display: grid;
          gap:     clamp(0.4rem,0.8vw,0.65rem);
        }
        .hp-gallery-row--1 { grid-template-columns: 2fr 1fr 1fr; }
        .hp-gallery-row--2 { grid-template-columns: 1fr 1fr 2fr; }
        @media (max-width: 640px) {
          .hp-gallery-row--1,
          .hp-gallery-row--2 { grid-template-columns: repeat(2,1fr); }
        }

        .hp-gallery-cell {
          position:     relative;
          aspect-ratio: 3/4;
          overflow:     hidden;
          transition:   filter 0.4s ease;
          cursor:       pointer;
        }
        .hp-gallery-cell:hover { filter: brightness(1.1); }
        .hp-gallery-cell-inner {
          position:        absolute;
          inset:           0;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          gap:             0.65rem;
          opacity:         0;
          transition:      opacity 0.35s ease;
          background:      rgba(4,3,6,0.2);
        }
        .hp-gallery-cell:hover .hp-gallery-cell-inner { opacity: 1; }

        /* ─── VIP SECTION ────────────────────────────── */
        .hp-vip {
          position:        relative;
          background:      #050307;
          overflow:        hidden;
          padding:         clamp(5.5rem,10vw,10rem) var(--container-padding);
          display:         flex;
          align-items:     center;
          justify-content: center;
        }
        .hp-vip-bg {
          position:   absolute;
          inset:      0;
          background: radial-gradient(ellipse at 50% 35%, rgba(28,16,44,0.85) 0%, rgba(5,3,7,0) 62%);
          pointer-events: none;
        }
        .hp-vip-grain {
          position:       absolute;
          inset:          -50%;
          width:          200%;
          height:         200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity:        0.035;
          pointer-events: none;
        }
        .hp-vip-inner {
          position:   relative;
          text-align: center;
          max-width:  580px;
          margin:     0 auto;
        }
        .hp-vip-thread {
          width:      1px;
          height:     56px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.45));
          margin:     0 auto 2.5rem;
        }
        .hp-vip-thread--bottom {
          background: linear-gradient(to top, transparent, rgba(201,169,110,0.45));
          margin:     2.5rem auto 0;
        }
        .hp-vip-headline {
          font-family:    var(--font-cormorant);
          font-size:      clamp(2.5rem,5vw,5.5rem);
          font-weight:    300;
          color:          var(--ivory);
          line-height:    0.95;
          letter-spacing: -0.01em;
          margin:         0.75rem 0 1.25rem;
        }
        .hp-vip-headline em {
          font-style: italic;
          color:       rgba(201,169,110,0.82);
        }
        .hp-vip-body {
          font-family:    var(--font-cormorant);
          font-size:      clamp(1rem,1.4vw,1.2rem);
          font-style:     italic;
          font-weight:    300;
          color:          rgba(196,189,180,0.55);
          line-height:    1.75;
          letter-spacing: 0.025em;
          margin-bottom:  3rem;
        }
        .hp-vip-form {
          display:        flex;
          flex-direction: column;
          gap:            0.8rem;
        }
        @media (min-width: 520px) {
          .hp-vip-form { flex-direction: row; }
          .hp-vip-field { flex: 1; }
        }
        .hp-vip-field {
          border-bottom: 1px solid rgba(201,169,110,0.25);
          transition:    border-color 0.3s ease;
        }
        .hp-vip-field:focus-within { border-color: rgba(201,169,110,0.55); }
        .hp-vip-input {
          width:          100%;
          background:     transparent;
          border:         none;
          outline:        none;
          font-family:    var(--font-inter);
          font-size:      0.82rem;
          color:          rgba(244,239,230,0.75);
          padding:        0.9rem 0;
          letter-spacing: 0.04em;
        }
        .hp-vip-input::placeholder { color: rgba(244,239,230,0.22); }
        .hp-vip-btn {
          background:     rgba(201,169,110,0.1);
          border:         1px solid rgba(201,169,110,0.32);
          color:          var(--gold);
          font-family:    var(--font-inter);
          font-size:      0.56rem;
          font-weight:    500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding:        0.9rem 1.75rem;
          cursor:         pointer;
          transition:     all 0.3s ease;
          white-space:    nowrap;
        }
        .hp-vip-btn:hover {
          background:   rgba(201,169,110,0.2);
          border-color: rgba(201,169,110,0.6);
          color:        var(--gold-bright);
        }
        .hp-vip-note {
          font-family:    var(--font-inter);
          font-size:      0.48rem;
          letter-spacing: 0.14em;
          color:          rgba(255,255,255,0.18);
          margin-top:     1.5rem;
        }

        /* ─── SERVICE STRIP ──────────────────────────── */
        .hp-services {
          display:               grid;
          grid-template-columns: repeat(4,1fr);
          gap:                   clamp(1rem,2vw,1.5rem);
        }
        @media (max-width: 768px) { .hp-services { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .hp-services { grid-template-columns: 1fr; } }
        .hp-service {
          padding:    clamp(1.5rem,3vw,2.5rem) 0.5rem;
          text-align: center;
        }
        .hp-service-icon {
          font-family:   var(--font-cormorant);
          font-size:     1.6rem;
          color:         var(--gold);
          line-height:   1;
          margin-bottom: 1rem;
        }
        .hp-service-label {
          font-family:    var(--font-inter);
          font-size:      0.56rem;
          font-weight:    500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color:          #1A1A1A;
          margin-bottom:  0.4rem;
        }
        .hp-service-sub {
          font-family: var(--font-inter);
          font-size:   0.72rem;
          color:       #888;
        }

        /* ─── Misc ───────────────────────────────────── */
        .hp-br { display: block; }
        @media (max-width: 640px) { .hp-br { display: none; } }

        /* hero-label-pill (used in hero) */
        .hero-label-pill {
          display:     inline-flex;
          align-items: center;
          gap:         0.6rem;
        }

      `}</style>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function GalleryCell({ img, alt, wide = false }: { img: string; alt: string; wide?: boolean }) {
  return (
    <div className="hp-gallery-cell">
      <img
        src={img}
        alt={alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
      />
      <div className="hp-gallery-cell-inner">
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.38rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", background: "rgba(4,3,6,0.45)", padding: "0.3rem 0.65rem" }}>@covora</span>
      </div>
    </div>
  );
}

function PlaceholderOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="0.8">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.42rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,169,110,0.3)" }}>Covora</span>
    </div>
  );
}

function EmptyProducts() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div style={{ width: "28px", height: "1px", background: "var(--gold)", opacity: 0.35, margin: "0 auto 1.75rem" }} />
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: "#111", marginBottom: "0.75rem" }}>
        New arrivals coming soon
      </p>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#AAA", marginBottom: "2rem" }}>
        Explore our full collection in the meantime.
      </p>
      <Link href="/shop" className="btn btn-inverse btn-sm">Shop All</Link>
    </div>
  );
}
