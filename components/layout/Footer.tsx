"use client";

import Link from "next/link";

const SHOP_LINKS = [
  { label: "New In",       href: "/new-in" },
  { label: "Shop All",     href: "/shop" },
  { label: "Collections",  href: "/collections" },
  { label: "Sale",         href: "/sale" },
];

const HOUSE_LINKS = [
  { label: "Our Story",    href: "/about" },
  { label: "Journal",      href: "/journal" },
  { label: "Sustainability", href: "/about" },
  { label: "Contact",      href: "/contact" },
];

const CARE_LINKS = [
  { label: "Track My Order", href: "/account/orders" },
  { label: "Returns",        href: "/shipping-returns" },
  { label: "Delivery",       href: "/shipping-returns" },
  { label: "Size Guide",     href: "/size-guide" },
  { label: "FAQs",           href: "/faq" },
  { label: "Contact Us",     href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",     href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Klarna"];

export default function Footer() {
  return (
    <footer style={{
      background: "#FFFFFF",
      borderTop: "1px solid rgba(0,0,0,0.07)",
    }}>
      {/* ── Main grid ─────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin: "0 auto",
          padding: "clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "start",
        }}
        className="footer-main-grid"
      >
        {/* Brand column */}
        <div>
          <Link href="/home" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.25rem" }}>
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.6rem, 2vw, 2rem)",
              fontWeight: 300,
              letterSpacing: "0.48em",
              textTransform: "uppercase",
              color: "var(--gold-dark)",
              lineHeight: 1,
              paddingRight: "0.48em",
            }}>
              Covora
            </div>
          </Link>

          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.95rem",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#888888",
            lineHeight: 1.6,
            letterSpacing: "0.02em",
            maxWidth: "200px",
            marginBottom: "2rem",
          }}>
            Refined luxury for the modern woman.
          </p>

          {/* Social */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "2.25rem" }}>
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#AAAAAA",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#AAAAAA")}
              >
                <span style={{ width: "14px", height: "1px", background: "rgba(201,169,110,0.4)", display: "inline-block" }} />
                {s}
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#AAAAAA",
              marginBottom: "0.65rem",
            }}>Join the Edit</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.15)" }}
            >
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  color: "#111111",
                  padding: "0.55rem 0",
                  letterSpacing: "0.02em",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--gold-dark)",
                  fontSize: "0.85rem",
                  paddingLeft: "0.65rem",
                  transition: "color 0.2s ease",
                }}
              >
                →
              </button>
            </form>
          </div>
        </div>

        <FooterColumn title="Shop"     links={SHOP_LINKS}  />
        <FooterColumn title="The House" links={HOUSE_LINKS} />
        <FooterColumn title="Help"     links={CARE_LINKS}  />
      </div>

      {/* ── Divider ───────────────────────────────────────── */}
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin: "0 auto",
          padding: "clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 4vw, 4rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.85rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.1em", color: "#CCCCCC" }}>
            © {new Date().getFullYear()} Covora
          </p>
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.52rem",
                letterSpacing: "0.08em",
                color: "#BBBBBB",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#555555")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#BBBBBB")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem" }}>
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.42rem",
                letterSpacing: "0.08em",
                padding: "0.18rem 0.5rem",
                background: "#F5F5F5",
                color: "#AAAAAA",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-main-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .footer-main-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.52rem",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--gold-dark)",
        marginBottom: "1.25rem",
      }}>
        {title}
      </p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.7rem", listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                color: "#888888",
                textDecoration: "none",
                letterSpacing: "0.02em",
                lineHeight: 1.5,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
