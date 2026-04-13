import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title:       `${formatTitle(slug)} — Covora`,
    description: `Shop ${formatTitle(slug)} at Covora. Refined luxury women's fashion.`,
  };
}

// Related categories for the sidebar suggestion
const CATEGORIES = [
  { label: "New In",          href: "/new-arrivals" },
  { label: "Dresses",         href: "/category/dresses" },
  { label: "Tops & Blouses",  href: "/category/tops" },
  { label: "Knitwear",        href: "/category/knitwear" },
  { label: "Co-ords",         href: "/category/co-ords" },
  { label: "Outerwear",       href: "/category/outerwear" },
  { label: "Bottoms",         href: "/category/bottoms" },
  { label: "Denim",           href: "/category/denim" },
  { label: "Swimwear",        href: "/category/swimwear" },
  { label: "Shoes",           href: "/category/shoes-bags" },
  { label: "Bags",            href: "/category/shoes-bags" },
  { label: "Beauty",          href: "/beauty" },
];

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const title     = formatTitle(slug);

  return (
    <div
      style={{
        background: "var(--surface-base)",
        minHeight:  "100vh",
        paddingTop: "calc(var(--header-height) + 3rem)",
      }}
    >
      {/* ── Page header ──────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          padding:      "3rem clamp(1.5rem, 4vw, 4rem) 3.5rem",
          maxWidth:     "var(--container-wide)",
          margin:       "0 auto",
        }}
      >
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <Link
            href="/"
            className="label-caps"
            style={{ fontSize: "0.52rem", color: "var(--text-muted)", textDecoration: "none" }}
          >
            Home
          </Link>
          <span style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>›</span>
          <span className="label-caps" style={{ fontSize: "0.52rem", color: "var(--gold)" }}>
            {title}
          </span>
        </nav>

        {/* Title */}
        <h1
          style={{
            fontFamily:    "var(--font-cormorant)",
            fontSize:      "clamp(2.5rem, 5vw, 5rem)",
            fontWeight:    300,
            color:         "var(--text-primary)",
            letterSpacing: "-0.01em",
            lineHeight:    0.95,
          }}
        >
          {title}
        </h1>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin:   "0 auto",
          padding:  "clamp(3rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem)",
          display:  "grid",
          gridTemplateColumns: "200px 1fr",
          gap:      "3rem",
          alignItems: "start",
        }}
        className="category-layout"
      >
        {/* Sidebar */}
        <aside>
          <p
            className="label-caps"
            style={{ fontSize: "0.52rem", color: "var(--gold)", marginBottom: "1.25rem" }}
          >
            Categories
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {CATEGORIES.map((cat) => {
              const isActive = cat.label.toLowerCase() === title.toLowerCase();
              return (
                <Link
                  key={cat.href + cat.label}
                  href={cat.href}
                  className={isActive ? "cat-nav-link cat-nav-active" : "cat-nav-link"}
                  style={{
                    fontFamily:    "var(--font-inter)",
                    fontSize:      "0.75rem",
                    color:         isActive ? "var(--gold)" : "var(--text-muted)",
                    textDecoration:"none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Empty state — products load here in Phase 3 */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            padding:        "6rem 2rem",
            border:         "1px solid var(--border-subtle)",
            textAlign:      "center",
          }}
        >
          <div
            style={{
              width:        "40px",
              height:       "1px",
              background:   "var(--border-gold)",
              marginBottom: "2rem",
            }}
          />
          <h2
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(1.5rem, 2.5vw, 2.2rem)",
              fontWeight:    300,
              color:         "var(--text-primary)",
              letterSpacing: "0.02em",
              marginBottom:  "1rem",
            }}
          >
            {title} — Coming Soon
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize:   "0.8rem",
              color:      "var(--text-muted)",
              maxWidth:   "340px",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            We&apos;re carefully curating our {title.toLowerCase()} edit.
            Be the first to know when it launches.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/new-arrivals"
              className="btn btn-outline btn-sm"
            >
              Shop New In
            </Link>
            <Link
              href="/collections"
              className="btn btn-ghost btn-sm"
            >
              View Collections
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cat-nav-link { transition: color 0.2s ease; }
        .cat-nav-link:hover { color: var(--off-white) !important; }
        .cat-nav-active:hover { color: var(--gold-light) !important; }
        @media (max-width: 768px) {
          .category-layout { grid-template-columns: 1fr !important; }
          .category-layout aside { display: none; }
        }
      `}</style>
    </div>
  );
}
