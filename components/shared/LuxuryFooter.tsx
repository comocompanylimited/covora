import Link from "next/link"

// ─── LuxuryFooter ─────────────────────────────────────────────────────────────
// Premium shared footer for Mens and Womens pages.
// Server Component — no client-side state required.

const PAYMENT_METHODS = [
  "Visa", "Mastercard", "American Express", "Apple Pay",
  "Google Pay", "Afterpay", "Link", "UnionPay",
]

export default function LuxuryFooter() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(201,169,110,0.5)" }}>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "clamp(2rem, 4vw, 5rem)",
          alignItems: "start",
        }}
        className="footer-main-grid"
      >

        {/* ── Brand column ─────────────────────────────────────── */}
        <div>
          <Link href="/home" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.6rem" }}>
            <div
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.8rem, 2.2vw, 2.4rem)",
                fontWeight: 300,
                letterSpacing: "0.44em",
                textTransform: "uppercase",
                color: "var(--gold)",
                lineHeight: 1,
                paddingRight: "0.44em",
              }}
            >
              Covora
            </div>
            <div
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                fontStyle: "italic",
                letterSpacing: "0.32em",
                color: "rgba(201,169,110,0.5)",
                lineHeight: 1.5,
                marginTop: "0.2rem",
              }}
            >
              Lumière
            </div>
          </Link>

          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.88rem, 1vw, 0.98rem)",
              fontStyle: "italic",
              letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.75,
              maxWidth: "280px",
              marginBottom: "2.2rem",
            }}
          >
            A luxury fashion house crafting refined pieces for the modern individual.
            Each garment selected for its craft, not its noise.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <SocialLink href="https://instagram.com" label="Instagram"><InstagramIcon /></SocialLink>
            <SocialLink href="https://tiktok.com" label="TikTok"><TikTokIcon /></SocialLink>
            <SocialLink href="https://facebook.com" label="Facebook"><FacebookIcon /></SocialLink>
            <SocialLink href="https://twitter.com" label="X / Twitter"><XIcon /></SocialLink>
            <SocialLink href="https://youtube.com" label="YouTube"><YouTubeIcon /></SocialLink>
          </div>
        </div>

        {/* ── Account & Orders ─────────────────────────────────── */}
        <FooterColumn
          title="Account & Orders"
          links={[
            { label: "My Account", href: "/account" },
            { label: "Track Order", href: "/track-order" },
          ]}
        />

        {/* ── Support ──────────────────────────────────────────── */}
        <div>
          <p
            className="label-caps"
            style={{ fontSize: "0.42rem", letterSpacing: "0.32em", color: "rgba(201,169,110,0.75)", marginBottom: "1.5rem" }}
          >
            Support
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
            <li>
              <a
                href="mailto:concierge@covoralumiere.com"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(255,255,255,0.48)", letterSpacing: "0.02em", textDecoration: "none", transition: "color 0.25s ease", lineHeight: 1.5 }}
                className="hover:text-[rgba(255,255,255,0.82)]"
              >
                concierge@covoralumiere.com
              </a>
            </li>
            <li>
              <a
                href="tel:+6490000000"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(255,255,255,0.48)", letterSpacing: "0.02em", textDecoration: "none", transition: "color 0.25s ease" }}
                className="hover:text-[rgba(255,255,255,0.82)]"
              >
                +64 9 000 0000
              </a>
            </li>
          </ul>
        </div>

        {/* ── About Covora ─────────────────────────────────────── */}
        <FooterColumn
          title="About Covora"
          links={[
            { label: "FAQs", href: "/faqs" },
            { label: "Returns", href: "/returns" },
            { label: "Delivery", href: "/delivery" },
            { label: "Size Guide", href: "/size-guide" },
            { label: "Code of Conduct", href: "/code-of-conduct" },
          ]}
        />
      </div>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0 clamp(1.5rem, 4vw, 4rem)" }} />

      {/* ── Payments ───────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <p
          className="label-caps"
          style={{ fontSize: "0.4rem", letterSpacing: "0.32em", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}
        >
          We Accept
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", alignItems: "center" }}>
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.32rem 0.75rem",
                borderRadius: "2px",
                whiteSpace: "nowrap",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0 clamp(1.5rem, 4vw, 4rem)" }} />

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.4rem clamp(1.5rem, 4vw, 4rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span
          className="label-caps"
          style={{ fontSize: "0.38rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)" }}
        >
          © {new Date().getFullYear()} Covora Lumière. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.82rem",
            fontStyle: "italic",
            letterSpacing: "0.12em",
            color: "rgba(201,169,110,0.35)",
          }}
        >
          Maison de Luxe
        </span>
      </div>

    </footer>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p
        className="label-caps"
        style={{ fontSize: "0.42rem", letterSpacing: "0.32em", color: "rgba(201,169,110,0.75)", marginBottom: "1.5rem" }}
      >
        {title}
      </p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "clamp(0.88rem, 1vw, 0.98rem)",
        fontWeight: 300,
        letterSpacing: "0.04em",
        color: "rgba(255,255,255,0.48)",
        textDecoration: "none",
        transition: "color 0.25s ease",
        lineHeight: 1.4,
      }}
      className="hover:text-[rgba(255,255,255,0.88)]"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        color: "rgba(255,255,255,0.4)",
        transition: "color 0.25s ease",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
      }}
      className="hover:text-[rgba(255,255,255,0.9)] hover:border-[rgba(255,255,255,0.2)]"
    >
      {children}
    </a>
  )
}

// ─── Social Icons (inline SVG) ────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0A0A0A" />
    </svg>
  )
}
