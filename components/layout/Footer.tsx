import Link from "next/link";

// ─── Footer data ──────────────────────────────────────────────────────────────

const SHOP_LINKS = [
  { label: "New In",        href: "/new-arrivals" },
  { label: "Clothing",      href: "/category/clothing" },
  { label: "Shoes & Bags",  href: "/category/shoes-bags" },
  { label: "Beauty",        href: "/beauty" },
  { label: "Collections",   href: "/collections" },
  { label: "Sale",          href: "/sale" },
];

const HOUSE_LINKS = [
  { label: "Our Story",     href: "/about" },
  { label: "Journal",       href: "/journal" },
  { label: "Sustainability",href: "/about#sustainability" },
  { label: "Press",         href: "/about#press" },
  { label: "Careers",       href: "/about#careers" },
];

const CARE_LINKS = [
  { label: "Track My Order", href: "/track-order" },
  { label: "Returns",        href: "/returns" },
  { label: "Delivery",       href: "/delivery" },
  { label: "Size Guide",     href: "/size-guide" },
  { label: "FAQs",           href: "/faqs" },
  { label: "Contact Us",     href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/code-of-conduct" },
  { label: "Terms & Conditions", href: "/code-of-conduct" },
  { label: "Cookie Policy",  href: "/code-of-conduct" },
];

const PAYMENT_METHODS = [
  "Visa", "Mastercard", "American Express",
  "Apple Pay", "Google Pay", "Afterpay", "Klarna",
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      style={{
        background:  "var(--surface-base)",
        borderTop:   "1px solid rgba(201,169,110,0.18)",
      }}
    >
      {/* ── Main grid ─────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin:   "0 auto",
          padding:  "clamp(4rem, 7vw, 7rem) clamp(1.5rem, 4vw, 4rem)",
          display:  "grid",
          gridTemplateColumns: "1.9fr 1fr 1fr 1fr",
          gap:      "clamp(2.5rem, 4vw, 5rem)",
          alignItems: "start",
        }}
        className="footer-main-grid"
      >
        {/* Brand column */}
        <div>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}>
            <div
              style={{
                fontFamily:    "var(--font-cormorant)",
                fontSize:      "clamp(1.8rem, 2vw, 2.2rem)",
                fontWeight:    300,
                letterSpacing: "0.48em",
                textTransform: "uppercase",
                color:         "var(--gold)",
                lineHeight:    1,
                paddingRight:  "0.48em",
              }}
            >
              Covora
            </div>
          </Link>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize:   "clamp(0.85rem, 1vw, 1rem)",
              fontStyle:  "italic",
              color:      "var(--text-muted)",
              lineHeight: 1.6,
              letterSpacing: "0.03em",
              maxWidth:   "200px",
              marginBottom: "2rem",
            }}
          >
            Refined luxury for the modern woman.
          </p>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2.5rem" }}>
            {[
              { label: "Instagram",  href: "#" },
              { label: "TikTok",     href: "#" },
              { label: "Pinterest",  href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="label-caps"
                style={{
                  fontSize:   "0.55rem",
                  color:      "var(--text-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.2em",
                  transition: "color var(--transition-fast)",
                  display:    "inline-flex",
                  alignItems: "center",
                  gap:        "0.5rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <span style={{ width: "14px", height: "1px", background: "var(--border-gold)", display: "inline-block" }} />
                {s.label}
              </a>
            ))}
          </div>

          {/* Newsletter micro */}
          <div>
            <p className="label-caps" style={{ fontSize: "0.52rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              Join the Edit
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", borderBottom: "1px solid var(--border-mid)" }}
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
                  color: "var(--text-primary)",
                  padding: "0.6rem 0",
                  letterSpacing: "0.03em",
                }}
              />
              <button
                type="submit"
                className="label-caps"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--gold)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.2em",
                  paddingLeft: "0.75rem",
                  transition: "color var(--transition-fast)",
                }}
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Shop */}
        <FooterColumn title="Shop" links={SHOP_LINKS} />

        {/* The House */}
        <FooterColumn title="The House" links={HOUSE_LINKS} />

        {/* Customer Care */}
        <FooterColumn title="Care" links={CARE_LINKS} />
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin:   "0 auto",
          padding:  "0 clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <div className="divider-gold" />
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin:   "0 auto",
          padding:  "clamp(1.25rem, 2vw, 1.75rem) clamp(1.5rem, 4vw, 4rem)",
          display:  "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap:      "1rem",
        }}
      >
        {/* Legal links + copyright */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem" }}>
          <p className="label-caps" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Covora
          </p>
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="label-caps"
              style={{
                fontSize:   "0.52rem",
                color:      "var(--text-muted)",
                textDecoration: "none",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--off-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Payment + tagline */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              className="badge"
              style={{
                fontSize:   "0.42rem",
                padding:    "0.18rem 0.5rem",
                background: "var(--surface-2)",
                color:      "var(--text-muted)",
                border:     "1px solid var(--border-subtle)",
                letterSpacing: "0.1em",
              }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── FooterColumn ─────────────────────────────────────────────────────────────

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p
        className="label-caps"
        style={{ fontSize: "0.55rem", color: "var(--gold)", marginBottom: "1.5rem" }}
      >
        {title}
      </p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.75rem",
                color:         "var(--text-muted)",
                textDecoration:"none",
                letterSpacing: "0.02em",
                lineHeight:    1.5,
                transition:    "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--off-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
