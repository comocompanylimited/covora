// Entry page — lives outside (store) layout intentionally.
// No header. No footer. No scroll. Full viewport only.

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Covora — Women's Luxury Fashion",
  description:
    "Covora is a women's luxury fashion house. Refined clothing, shoes, bags and beauty for the modern woman.",
};

export default function EntryPage() {
  return (
    <main
      style={{
        position:       "fixed",
        inset:          0,
        overflow:       "hidden",
        background:     "#080808",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position:       "absolute",
          inset:          0,
          width:          "100%",
          height:         "100%",
          objectFit:      "cover",
          objectPosition: "center",
          pointerEvents:  "none",
        }}
      >
        <source src="https://pub-98b9c2a87ab54dd9924de5af1f2e080e.r2.dev/womens.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlay — deep dark scrim so glass card reads clearly */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(to bottom, rgba(4,3,6,0.72) 0%, rgba(4,3,6,0.82) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Centre content ─────────────────────────────── */}
      <div
        className="entry-glass-card"
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "2.5rem",
          position:      "relative",
          zIndex:        1,
          textAlign:     "center",
        }}
      >
        {/* Wordmark */}
        <div>
          <h1
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(3.5rem, 10vw, 8rem)",
              fontWeight:    300,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--ivory)",
              lineHeight:    1,
              paddingRight:  "0.22em",
            }}
          >
            Covora
          </h1>
          <p
            style={{
              fontFamily:    "var(--font-inter)",
              fontSize:      "0.58rem",
              fontWeight:    400,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color:         "var(--gold)",
              marginTop:     "0.85rem",
            }}
          >
            Women&rsquo;s Luxury Fashion
          </p>
        </div>

        {/* Gold hairline */}
        <div
          aria-hidden="true"
          style={{
            width:      "36px",
            height:     "1px",
            background: "var(--gold)",
            opacity:    0.45,
          }}
        />

        {/* CTA */}
        <Link href="/home" className="btn btn-glass btn-md">
          Enter Store
        </Link>
      </div>

      {/* Copyright */}
      <p
        style={{
          position:      "absolute",
          bottom:        "2rem",
          fontFamily:    "var(--font-inter)",
          fontSize:      "0.48rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
        }}
      >
        &copy; {new Date().getFullYear()} Covora. All rights reserved.
      </p>
    </main>
  );
}
