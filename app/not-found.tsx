import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Covora",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div
      style={{
        background:     "var(--surface-base)",
        minHeight:      "100vh",
        paddingTop:     "var(--header-height)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "580px",
          width:    "100%",
          margin:   "0 auto",
          padding:  "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 2.5rem)",
          textAlign:"center",
        }}
      >
        {/* Decorative number */}
        <p
          style={{
            fontFamily:    "var(--font-cormorant)",
            fontSize:      "clamp(6rem, 18vw, 12rem)",
            fontWeight:    300,
            color:         "transparent",
            WebkitTextStroke: "1px rgba(201,169,110,0.15)",
            lineHeight:    1,
            marginBottom:  "0",
            letterSpacing: "-0.02em",
            userSelect:    "none",
          }}
        >
          404
        </p>

        {/* Gold line */}
        <div style={{ width: "40px", height: "1px", background: "var(--border-gold)", margin: "-1rem auto 2rem" }} />

        <p className="label-caps" style={{ fontSize: "0.56rem", color: "var(--gold)", marginBottom: "1.25rem", letterSpacing: "0.38em" }}>
          Page Not Found
        </p>

        <h1
          style={{
            fontFamily:    "var(--font-cormorant)",
            fontSize:      "clamp(1.8rem, 4vw, 3rem)",
            fontWeight:    300,
            color:         "var(--text-primary)",
            letterSpacing: "0.01em",
            lineHeight:    1.15,
            marginBottom:  "1.25rem",
          }}
        >
          We couldn&apos;t find that page.
        </h1>

        <p
          style={{
            fontFamily:   "var(--font-inter)",
            fontSize:     "0.8rem",
            color:        "var(--text-muted)",
            lineHeight:   1.85,
            marginBottom: "3rem",
            maxWidth:     "400px",
            margin:       "0 auto 3rem",
          }}
        >
          The page you&apos;re looking for may have been moved, renamed, or no longer exists.
          Please use the links below to find what you&apos;re after.
        </p>

        {/* Quick links */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <Link href="/"       className="btn btn-primary btn-md">Return Home</Link>
          <Link href="/shop"   className="btn btn-outline btn-md">Shop All</Link>
          <Link href="/new-in" className="btn btn-ghost btn-md">New In</Link>
        </div>

        {/* Category shortcuts */}
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "2rem" }}>
          <p className="label-caps" style={{ fontSize: "0.48rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            Browse categories
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Clothing",  href: "/category/clothing" },
              { label: "Shoes",     href: "/category/shoes-bags" },
              { label: "Bags",      href: "/category/bags" },
              { label: "Beauty",    href: "/beauty" },
              { label: "Sale",      href: "/sale" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="badge"
                style={{
                  textDecoration: "none",
                  border:  "1px solid var(--border-default)",
                  color:   "var(--text-muted)",
                  background: "transparent",
                  fontSize: "0.52rem",
                  padding: "0.4rem 0.85rem",
                  letterSpacing: "0.08em",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
