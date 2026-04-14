import type { Metadata } from "next";
import Link from "next/link";
import EmailSignup from "@/components/ui/EmailSignup";

export const metadata: Metadata = {
  title:       "Sale — Covora",
  description: "Shop the Covora sale. Discover reduced luxury pieces across clothing, shoes, bags and beauty.",
};

const SALE_CATEGORIES = [
  { label: "All Sale",          href: "/sale",              count: "—" },
  { label: "Dresses",           href: "/category/dresses",  count: "—" },
  { label: "Tops & Blouses",    href: "/category/tops",     count: "—" },
  { label: "Knitwear",          href: "/category/knitwear", count: "—" },
  { label: "Shoes",             href: "/category/shoes-bags", count: "—" },
  { label: "Bags",              href: "/category/shoes-bags", count: "—" },
  { label: "Beauty",            href: "/beauty",            count: "—" },
];

export default function SalePage() {
  return (
    <div
      style={{
        background: "#FAFAF8",
        minHeight:  "100vh",
        paddingTop: "var(--header-height)",
      }}
    >
      {/* ── Hero banner ─────────────────────────────────────── */}
      <div
        style={{
          background:    "linear-gradient(135deg, #F5F3F0 0%, rgba(0,0,0,0.04) 100%)",
          borderBottom:  "1px solid rgba(0,0,0,0.07)",
          padding:       "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)",
          textAlign:     "center",
          position:      "relative",
          overflow:      "hidden",
        }}
      >
        {/* Decorative grain */}
        <div className="grain-overlay" style={{ opacity: 0.015 }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            className="label-caps"
            style={{ fontSize: "0.56rem", color: "var(--gold)", marginBottom: "1.5rem", letterSpacing: "0.4em" }}
          >
            The Edit
          </p>

          <h1
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(3.5rem, 9vw, 9rem)",
              fontWeight:    300,
              color:         "#111111",
              letterSpacing: "-0.025em",
              lineHeight:    0.88,
              marginBottom:  "2rem",
            }}
          >
            Sale
          </h1>

          <p
            style={{
              fontFamily:  "var(--font-cormorant)",
              fontSize:    "clamp(1rem, 1.5vw, 1.3rem)",
              fontStyle:   "italic",
              color:       "#888888",
              letterSpacing: "0.04em",
              marginBottom: "3rem",
            }}
          >
            Refined pieces at exceptional value
          </p>

          {/* Category pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
            {SALE_CATEGORIES.map((cat) => (
              <Link
                key={cat.href + cat.label}
                href={cat.href}
                className="sale-cat-link badge"
                style={{
                  background:    "transparent",
                  color:         "#888888",
                  border:        "1px solid var(--border-default)",
                  fontSize:      "0.55rem",
                  padding:       "0.45rem 1.1rem",
                  textDecoration:"none",
                  letterSpacing: "0.18em",
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <style>{`
            .sale-cat-link { transition: all 0.2s ease; }
            .sale-cat-link:hover {
              background: rgba(201,169,110,0.1) !important;
              border-color: var(--gold) !important;
              color: var(--gold) !important;
            }
          `}</style>
        </div>
      </div>

      {/* ── Coming soon body ─────────────────────────────────── */}
      <div
        style={{
          maxWidth:  "var(--container-wide)",
          margin:    "0 auto",
          padding:   "clamp(5rem, 9vw, 9rem) clamp(1.5rem, 4vw, 4rem)",
          textAlign: "center",
        }}
      >
        {/* Divider line */}
        <div
          style={{
            width:        "48px",
            height:       "1px",
            background:   "var(--border-gold)",
            margin:       "0 auto 3rem",
          }}
        />

        <h2
          style={{
            fontFamily:    "var(--font-cormorant)",
            fontSize:      "clamp(1.8rem, 3vw, 3rem)",
            fontWeight:    300,
            color:         "#111111",
            letterSpacing: "0.02em",
            marginBottom:  "1.25rem",
          }}
        >
          The Sale Edit is Being Curated
        </h2>
        <p
          style={{
            fontFamily:  "var(--font-inter)",
            fontSize:    "0.82rem",
            color:       "#888888",
            maxWidth:    "420px",
            margin:      "0 auto 3rem",
            lineHeight:  1.85,
          }}
        >
          We&apos;re selecting exceptional pieces at reduced prices.
          Sign up below to be notified the moment our sale goes live.
        </p>

        {/* Email signup */}
        <div style={{ marginBottom: "4rem" }}>
          <EmailSignup placeholder="Your email address" buttonLabel="Notify Me" />
        </div>

        {/* Continue shopping links */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/new-arrivals"   className="btn btn-primary btn-md">New In</Link>
          <Link href="/collections"    className="btn btn-outline btn-md">Collections</Link>
        </div>
      </div>
    </div>
  );
}
