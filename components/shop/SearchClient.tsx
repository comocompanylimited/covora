"use client";

import { useState, useMemo, useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ui/Card";
import { SortControl } from "./ShopClient";
import type { Product as MockProduct } from "@/lib/api";

const SUGGESTIONS = ["Dresses", "Knitwear", "Bags", "Outerwear", "New In", "Sale"];
const SORT_OPTIONS_MAP: Record<string, (a: MockProduct, b: MockProduct) => number> = {
  "price-asc":  (a, b) => parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, "")),
  "price-desc": (a, b) => parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, "")),
};

interface Props {
  initialQuery:   string;
  initialResults: MockProduct[];
  allProducts:    MockProduct[];
}

export function SearchClient({ initialQuery, initialResults, allProducts }: Props) {
  const [query,   setQuery]  = useState(initialQuery);
  const [sortBy,  setSortBy] = useState("featured");
  const [visible, setVisible] = useState(8);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const list = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.badge ?? "").toLowerCase().includes(q)
    );
    if (SORT_OPTIONS_MAP[sortBy]) return [...list].sort(SORT_OPTIONS_MAP[sortBy]);
    return list;
  }, [query, sortBy, allProducts]);

  const displayed = results.slice(0, visible);
  const hasMore   = visible < results.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleSuggestion(label: string) {
    setQuery(label);
    setVisible(8);
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* ── Search header ───────────────────────────────────────── */}
      <div
        style={{
          background:    "#FFFFFF",
          borderBottom:  "1px solid rgba(0,0,0,0.07)",
          paddingTop:    "clamp(3rem, 5vw, 5rem)",
          paddingBottom: "clamp(2.5rem, 4vw, 4rem)",
          paddingLeft:   "var(--container-padding)",
          paddingRight:  "var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "1.75rem" }}>
            Search
          </p>

          <form onSubmit={handleSubmit} style={{ position: "relative", maxWidth: "680px" }}>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(8); }}
              placeholder="Search for pieces, categories…"
              autoFocus={!initialQuery}
              style={{
                width:         "100%",
                background:    "transparent",
                border:        "none",
                borderBottom:  "1px solid rgba(0,0,0,0.15)",
                outline:       "none",
                fontFamily:    "var(--font-cormorant)",
                fontSize:      "clamp(2rem, 4vw, 3.5rem)",
                fontWeight:    300,
                color:         "#111111",
                caretColor:    "var(--gold-dark)",
                lineHeight:    1.1,
                letterSpacing: "-0.01em",
                paddingBottom: "1rem",
                paddingRight:  "3rem",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); setVisible(8); }}
                aria-label="Clear"
                style={{ position: "absolute", right: "2rem", bottom: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.3)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" /></svg>
              </button>
            )}
            <button
              type="submit"
              aria-label="Search"
              style={{ position: "absolute", right: 0, bottom: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.3)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.3)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="11" cy="11" r="7.5" /><path d="m20.5 20.5-4-4" strokeLinecap="round" /></svg>
            </button>
          </form>

          {/* Suggestion chips — shown when no query */}
          {!hasQuery && (
            <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666", background: "transparent", border: "1px solid rgba(0,0,0,0.12)", padding: "0.45rem 0.9rem", cursor: "pointer", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.28)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#666666"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth:     "var(--container-wide)",
          margin:       "0 auto",
          paddingLeft:  "var(--container-padding)",
          paddingRight: "var(--container-padding)",
          paddingTop:   "clamp(3rem, 5vw, 5rem)",
          paddingBottom:"clamp(5rem, 8vw, 8rem)",
        }}
      >
        {/* Empty — no query */}
        {!hasQuery && (
          <div style={{ paddingTop: "1rem" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#AAAAAA", marginBottom: "3rem", letterSpacing: "0.02em" }}>
              Start typing to search across all pieces.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#333333", marginBottom: "1.25rem" }}>
              Popular categories
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 300, color: "#444444", background: "none", border: "1px solid rgba(0,0,0,0.1)", padding: "0.65rem 1.5rem", cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "0.03em" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.25)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#444444"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)"; }}
                >{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Has query — show result count + sort */}
        {hasQuery && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "clamp(2rem, 3.5vw, 3rem)", flexWrap: "wrap" }}>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#999999", letterSpacing: "0.06em" }}>
                {results.length === 0
                  ? `No results for "${query.trim()}"`
                  : `${results.length} result${results.length === 1 ? "" : "s"} for "${query.trim()}"`}
              </p>
              {results.length > 0 && (
                <SortControl value={sortBy} onChange={(v) => { setSortBy(v); setVisible(8); }} />
              )}
            </div>

            {/* No results state */}
            {results.length === 0 && (
              <div style={{ padding: "5rem 2rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ width: "28px", height: "1px", background: "var(--gold)", opacity: 0.5, margin: "0 auto 1.75rem" }} aria-hidden="true" />
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 300, color: "#111111", marginBottom: "0.85rem" }}>
                  No pieces found
                </h2>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#888888", lineHeight: 1.8, maxWidth: "320px", margin: "0 auto 2.5rem" }}>
                  Try a different search term or browse our categories.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/new-in" className="btn btn-inverse btn-sm">Shop New In</Link>
                  <Link href="/shop" className="btn btn-ghost btn-sm" style={{ color: "#555555" }}>Browse All</Link>
                </div>
              </div>
            )}

            {/* Results grid */}
            {results.length > 0 && (
              <>
                <div className="sc-product-grid sc-light-cards">
                  {displayed.map((p) => (
                    <ProductCard key={p.id} href={`/product/${p.slug}`} name={p.name} price={p.price} originalPrice={p.originalPrice} src={p.src} bg={p.bg} badge={p.badge} />
                  ))}
                </div>
                {hasMore && (
                  <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 4vw, 4rem)" }}>
                    <button onClick={() => setVisible((v) => v + 8)} className="btn btn-inverse btn-md">Load More</button>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#999999", marginTop: "0.85rem", letterSpacing: "0.06em" }}>
                      Showing {displayed.length} of {results.length}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <style>{`
        .sc-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.85rem, 1.8vw, 1.5rem);
        }
        .sc-light-cards .pcard-name              { color: #555555; }
        .sc-light-cards .pcard:hover .pcard-name { color: #111111; }
        .sc-light-cards .pcard-price             { color: #111111; }
        .sc-light-cards .pcard:hover .pcard-price{ color: #111111; }
        .sc-light-cards .pcard-price-original    { color: #999999; }
        .sc-light-cards .pcard-img               { border-color: rgba(0,0,0,0.08); }
        .sc-light-cards .pcard:hover .pcard-img  { border-color: rgba(0,0,0,0.18); }
        @media (max-width: 1200px) { .sc-product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .sc-product-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
