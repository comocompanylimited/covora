import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchCollections } from "@/lib/api";

export const metadata: Metadata = {
  title:       "Collections — Covora",
  description: "Discover all Covora collections. Signature, seasonal, and exclusive edits.",
};

export default async function CollectionsPage() {
  const collections = await fetchCollections();
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
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
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link href="/home" style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999999", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#CCCCCC", fontSize: "0.65rem" }}>›</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-dark)" }}>
              Collections
            </span>
          </nav>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "0.85rem" }}>
            Covora
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 6rem)", fontWeight: 300, color: "#111111", lineHeight: 0.92, letterSpacing: "-0.02em" }}>
            Collections
          </h1>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────── */}
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
        <div className="coll-grid">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/collection/${col.slug}`}
              className="coll-card"
            >
              {/* Background */}
              <div className="coll-bg" style={{ background: col.bg ?? "#1a1214" }}>
                {col.src && (
                  <Image src={col.src} alt={col.name} fill sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                )}
              </div>
              {/* Overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset:    0,
                  background: "linear-gradient(to top, rgba(6,5,8,0.88) 0%, rgba(6,5,8,0.3) 45%, rgba(6,5,8,0.04) 80%, transparent 100%)",
                }}
              />
              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(1.5rem, 3vw, 2rem)" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.46rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  {col.season}
                </p>
                <h2 className="coll-name">{col.name}</h2>
                <p className="coll-sub">{col.subtitle}</p>
                <div className="coll-arrow" aria-hidden="true">
                  <svg width="18" height="8" viewBox="0 0 18 8" fill="none" stroke="currentColor" strokeWidth="1"><path d="M0 4h16M12 1l4 3-4 3" /></svg>
                </div>
              </div>
              <div className="coll-line" />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .coll-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        .coll-card {
          position: relative;
          display: block;
          aspect-ratio: 3/4;
          overflow: hidden;
          text-decoration: none;
        }
        .coll-bg {
          position: absolute;
          inset: 0;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.30, 1);
        }
        .coll-card:hover .coll-bg { transform: scale(1.05); }
        .coll-name {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(1.3rem, 2vw, 2rem);
          font-weight: 300;
          color: var(--ivory);
          line-height: 1.1;
          margin-bottom: 0.55rem;
          transition: color 0.3s ease;
        }
        .coll-card:hover .coll-name { color: var(--gold); }
        .coll-sub {
          font-family: var(--font-inter);
          font-size: 0.65rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin-bottom: 1.1rem;
          max-width: 26ch;
        }
        .coll-arrow {
          color: rgba(255,255,255,0.28);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .coll-card:hover .coll-arrow {
          color: var(--gold);
          transform: translateX(5px);
        }
        .coll-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.30, 1);
        }
        .coll-card:hover .coll-line { transform: scaleX(1); }
        @media (max-width: 900px)  { .coll-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px)  { .coll-grid { grid-template-columns: 1fr; } .coll-card { aspect-ratio: 4/3; } }
      `}</style>
    </div>
  );
}
