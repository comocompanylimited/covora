"use client";

import { useState, useMemo, Fragment } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/Card";
import type { Product as MockProduct } from "@/lib/api";

// ─── Constants ─────────────────────────────────────────────────────────────────

const SIZES   = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOURS = ["Black", "Ivory", "Nude", "Navy", "Camel", "Burgundy"];

const PRICE_RANGES = [
  { label: "Under £50",    min: 0,   max: 49 },
  { label: "£50 – £150",  min: 50,  max: 149 },
  { label: "£150 – £300", min: 150, max: 299 },
  { label: "Over £300",   min: 300, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "newest",     label: "Newest" },
  { value: "price-asc",  label: "Price: Low – High" },
  { value: "price-desc", label: "Price: High – Low" },
];

function parsePrice(s: string): number {
  return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
}

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Crumb { label: string; href?: string; }

interface ShopClientProps {
  products:        MockProduct[];
  title:           string;
  eyebrow?:        string;
  breadcrumbs?:    Crumb[];
  /** Hide category filter — used on category-specific pages */
  hideCategories?: boolean;
  /** Available categories to show in filter (derived from products if not given) */
  categories?:     string[];
}

// ─── ShopClient ────────────────────────────────────────────────────────────────

export function ShopClient({
  products,
  title,
  eyebrow,
  breadcrumbs,
  hideCategories = false,
  categories,
}: ShopClientProps) {
  const [sizes,      setSizes]      = useState<string[]>([]);
  const [colours,    setColours]    = useState<string[]>([]);
  const [priceKey,   setPriceKey]   = useState("");
  const [saleOnly,   setSaleOnly]   = useState(false);
  const [sortBy,     setSortBy]     = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible,    setVisible]    = useState(24);

  // Derived category list
  const catList = categories ?? Array.from(new Set(products.map((p) => p.category))).sort();

  // Filtered + sorted
  const filtered = useMemo(() => {
    let list = [...products];

    if (priceKey) {
      const range = PRICE_RANGES.find((r) => r.label === priceKey);
      if (range) list = list.filter((p) => {
        const price = parsePrice(p.price);
        return price >= range.min && price <= (range.max === Infinity ? Infinity : range.max);
      });
    }

    if (saleOnly) list = list.filter((p) => p.badge === "Sale" || !!p.originalPrice);

    if (sortBy === "price-asc")  list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price-desc") list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return list;
  }, [products, priceKey, saleOnly, sortBy]);

  const displayed  = filtered.slice(0, visible);
  const hasMore    = visible < filtered.length;
  const activeCount = sizes.length + colours.length + (priceKey ? 1 : 0) + (saleOnly ? 1 : 0);

  function clearAll() {
    setSizes([]); setColours([]); setPriceKey(""); setSaleOnly(false); setVisible(24);
  }

  // ── Filter panel (shared by sidebar + drawer) ───────────────────────────────

  const filterPanel = (
    <>
      {/* Panel header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#111111" }}>
          Filters
        </span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#888888", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px", padding: 0 }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Size */}
      <FilterSection title="Size">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])}
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.58rem",
                fontWeight:    500,
                letterSpacing: "0.06em",
                padding:       "0.38rem 0.65rem",
                border:        `1px solid ${sizes.includes(s) ? "#111111" : "rgba(0,0,0,0.12)"}`,
                background:    sizes.includes(s) ? "#111111" : "transparent",
                color:         sizes.includes(s) ? "#ffffff" : "#666666",
                cursor:        "pointer",
                transition:    "all 0.18s ease",
              }}
            >{s}</button>
          ))}
        </div>
      </FilterSection>

      {/* Colour */}
      <FilterSection title="Colour">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {COLOURS.map((col) => (
            <button
              key={col}
              onClick={() => setColours((prev) => prev.includes(col) ? prev.filter((x) => x !== col) : [...prev, col])}
              style={{ display: "flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: "0.12rem 0", textAlign: "left" }}
            >
              <span style={{ width: "14px", height: "14px", flexShrink: 0, border: `1.5px solid ${colours.includes(col) ? "#111111" : "rgba(0,0,0,0.15)"}`, background: colours.includes(col) ? "#111111" : "transparent", borderRadius: "50%", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.73rem", color: colours.includes(col) ? "#111111" : "#666666" }}>{col}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => { setPriceKey(priceKey === range.label ? "" : range.label); setVisible(24); }}
              style={{ display: "flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: "0.12rem 0", textAlign: "left" }}
            >
              <span style={{ width: "14px", height: "14px", flexShrink: 0, border: `1.5px solid ${priceKey === range.label ? "var(--gold-dark)" : "rgba(0,0,0,0.15)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {priceKey === range.label && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold-dark)", display: "block" }} />}
              </span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.73rem", color: priceKey === range.label ? "#111111" : "#666666" }}>{range.label}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" last>
        <button
          onClick={() => { setSaleOnly(!saleOnly); setVisible(24); }}
          style={{ display: "flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: "0.12rem 0", textAlign: "left" }}
        >
          <span style={{ width: "14px", height: "14px", flexShrink: 0, border: `1px solid ${saleOnly ? "#111111" : "rgba(0,0,0,0.15)"}`, background: saleOnly ? "#111111" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {saleOnly && <svg width="8" height="7" viewBox="0 0 8 7" fill="none" stroke="#fff" strokeWidth="1.3"><path d="M1 3.5L3.2 5.5L7 1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.73rem", color: saleOnly ? "#111111" : "#666666" }}>Sale items only</span>
        </button>
      </FilterSection>
    </>
  );

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* ── Page header ─────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          paddingTop:   "clamp(2.5rem, 5vw, 4rem)",
          paddingBottom:"clamp(1.75rem, 3vw, 2.5rem)",
          paddingLeft:  "var(--container-padding)",
          paddingRight: "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>

          {/* Breadcrumb */}
          {breadcrumbs && (
            <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              {breadcrumbs.map((crumb, i) => (
                <Fragment key={i}>
                  {i > 0 && <span style={{ color: "#CCCCCC", fontSize: "0.65rem" }}>›</span>}
                  {crumb.href
                    ? <Link href={crumb.href} style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999999", textDecoration: "none" }}>{crumb.label}</Link>
                    : <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-dark)" }}>{crumb.label}</span>
                  }
                </Fragment>
              ))}
            </nav>
          )}

          {/* Title + sort */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              {eyebrow && (
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "0.6rem" }}>
                  {eyebrow}
                </p>
              )}
              <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 0.95 }}>
                {title}
              </h1>
            </div>
            <div className="sc-sort-desktop">
              <SortControl value={sortBy} onChange={(v) => { setSortBy(v); setVisible(24); }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile filter/sort bar ──────────────────────────────── */}
      <div className="sc-mobile-bar" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingTop: "0.85rem", paddingBottom: "0.85rem", paddingLeft: "var(--container-padding)", paddingRight: "var(--container-padding)", display: "flex", gap: "0.75rem" }}>
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#333333", background: "transparent", border: "1px solid rgba(0,0,0,0.12)", padding: "0.65rem 1rem", cursor: "pointer" }}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M1 1h12M3 5h8M5 9h4" strokeLinecap="round" />
          </svg>
          Filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        <div style={{ flex: 1 }}>
          <SortControl value={sortBy} onChange={(v) => { setSortBy(v); setVisible(24); }} compact />
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────────── */}
      <div
        className="sc-layout"
        style={{
          maxWidth:     "var(--container-wide)",
          margin:       "0 auto",
          paddingLeft:  "var(--container-padding)",
          paddingRight: "var(--container-padding)",
          paddingTop:   "clamp(2.5rem, 4vw, 3.5rem)",
          paddingBottom:"clamp(5rem, 8vw, 8rem)",
          display:      "grid",
          gridTemplateColumns: "220px 1fr",
          gap:          "clamp(3rem, 5vw, 5rem)",
          alignItems:   "start",
        }}
      >
        {/* Sidebar */}
        <aside className="sc-sidebar" style={{ position: "sticky", top: "calc(var(--header-height) + 1.5rem)" }}>
          {filterPanel}
        </aside>

        {/* Content */}
        <div>
          {/* Count row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.06em", color: "#999999" }}>
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ padding: "5rem 2rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ width: "28px", height: "1px", background: "var(--gold)", opacity: 0.5, margin: "0 auto 1.75rem" }} aria-hidden="true" />
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 300, color: "#111111", marginBottom: "0.85rem" }}>
                No pieces found
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#888888", marginBottom: "2rem", lineHeight: 1.8 }}>
                Try adjusting your filters to see more results.
              </p>
              <button onClick={clearAll} className="btn btn-inverse btn-sm">
                Clear Filters
              </button>
            </div>
          )}

          {/* Product grid */}
          {filtered.length > 0 && (
            <div className="sc-product-grid sc-light-cards">
              {displayed.map((p) => (
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
          )}

          {/* Load more */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 4vw, 4rem)" }}>
              <button onClick={() => setVisible((v) => v + 24)} className="btn btn-inverse btn-md">
                Load More
              </button>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#999999", marginTop: "0.85rem", letterSpacing: "0.06em" }}>
                Showing {displayed.length} of {filtered.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Filter drawer (mobile) ──────────────────────────────── */}
      <div
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
        style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.42)", opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none", transition: "opacity 0.35s ease" }}
      />
      <div
        style={{ position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 201, width: "min(340px, 88vw)", background: "#FAFAF8", borderRight: "1px solid rgba(0,0,0,0.08)", transform: drawerOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.42s cubic-bezier(0.16,1,0.30,1)", display: "flex", flexDirection: "column", overflowY: "auto" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#111111" }}>Filters</span>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close filters" style={{ background: "none", border: "none", cursor: "pointer", color: "#666666", padding: "0.25rem" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div style={{ padding: "1.5rem", flex: 1, overflowY: "auto" }}>
          {filterPanel}
        </div>
        <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
          <button onClick={() => setDrawerOpen(false)} className="btn btn-inverse btn-md" style={{ width: "100%" }}>
            View {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </button>
        </div>
      </div>

      {/* Page-scoped styles */}
      <style>{`
        .sc-layout { grid-template-columns: 220px 1fr; }
        .sc-sidebar { display: block; }
        .sc-mobile-bar { display: none !important; }
        .sc-sort-desktop { display: block; }

        .sc-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.85rem, 1.8vw, 1.5rem);
        }

        /* Light-background pcard overrides */
        .sc-light-cards .pcard-name              { color: #555555; }
        .sc-light-cards .pcard:hover .pcard-name { color: #111111; }
        .sc-light-cards .pcard-price             { color: #111111; }
        .sc-light-cards .pcard:hover .pcard-price{ color: #111111; }
        .sc-light-cards .pcard-price-original    { color: #999999; }
        .sc-light-cards .pcard-img               { border-color: rgba(0,0,0,0.08); }
        .sc-light-cards .pcard:hover .pcard-img  { border-color: rgba(0,0,0,0.18); }

        @media (max-width: 1200px) {
          .sc-product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 960px) {
          .sc-layout { grid-template-columns: 1fr !important; }
          .sc-sidebar { display: none !important; }
          .sc-mobile-bar { display: flex !important; }
          .sc-sort-desktop { display: none !important; }
          .sc-product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

// ─── FilterSection ─────────────────────────────────────────────────────────────

function FilterSection({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.07)", paddingBottom: last ? 0 : "1.5rem", marginBottom: last ? 0 : "1.5rem" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0 0 0.85rem", textAlign: "left" }}
      >
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#333333" }}>
          {title}
        </span>
        <span style={{ fontSize: "1rem", color: "#AAAAAA", lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.22s ease", display: "inline-block" }}>+</span>
      </button>
      {open && children}
    </div>
  );
}

// ─── SortControl ──────────────────────────────────────────────────────────────

export function SortControl({ value, onChange, compact }: { value: string; onChange: (v: string) => void; compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
      {!compact && (
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", whiteSpace: "nowrap" }}>
          Sort
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.04em", color: "#333333", background: "transparent", border: "1px solid rgba(0,0,0,0.12)", padding: "0.5rem 2rem 0.5rem 0.75rem", cursor: "pointer", outline: "none", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888888' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.6rem center", width: compact ? "100%" : "auto", minWidth: compact ? "auto" : "175px" }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
