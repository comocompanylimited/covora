"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SplitLanding() {
  const [hovered, setHovered] = useState<"mens" | "womens" | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Staggered mount for entrance animation
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = (side: "mens" | "womens") => {
    router.push(`/${side}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--black)] select-none">
      {/* ── Film grain ─────────────────────────────────────────────── */}
      <div className="grain-overlay" aria-hidden />

      {/* ── Split panels ─────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        <Panel
          side="mens"
          hovered={hovered}
          mounted={mounted}
          onHover={setHovered}
          onEnter={handleEnter}
          label="For Him"
          heading="Men"
          subheading="Refined. Confident. Defined."
          cta="Enter Mens"
          videoSrc="https://pub-98b9c2a87ab54dd9924de5af1f2e080e.r2.dev/mens.mp4"
        />
        <Panel
          side="womens"
          hovered={hovered}
          mounted={mounted}
          onHover={setHovered}
          onEnter={handleEnter}
          label="For Her"
          heading="Women"
          subheading="Elegant. Bold. Timeless."
          cta="Enter Womens"
          videoSrc="https://pub-98b9c2a87ab54dd9924de5af1f2e080e.r2.dev/womens.mp4"
        />
      </div>

      {/* ── Centre spine ─────────────────────────────────────────── */}
      <div
        className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ width: "1px" }}
      >
        <div
          className="h-full transition-opacity duration-700"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.35) 30%, rgba(201,169,110,0.35) 70%, transparent 100%)",
            opacity: hovered ? 0.8 : 0.5,
          }}
        />
      </div>

      {/* ── Centre logo — full-viewport overlay ─────────────────── */}
      <div
        className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.4s var(--ease-out-expo)",
          transitionDelay: "0.3s",
        }}
      >
        <div
          style={{
            transform: mounted ? "scale(1)" : "scale(0.92)",
            transition: "transform 1.4s var(--ease-out-expo)",
            transitionDelay: "0.3s",
            position: "relative",
          }}
        >
          {/* Halo */}
          <div
            className="absolute rounded-full transition-all duration-700"
            style={{
              inset: "-2rem",
              background: "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
              opacity: hovered ? 1 : 0.6,
            }}
          />
          <span
            className="relative block"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.4rem, 3vw, 2.6rem)",
              fontWeight: 300,
              letterSpacing: "0.55em",
              paddingLeft: "0.55em",
              color: "var(--gold)",
              textTransform: "uppercase",
            }}
          >
            Covora
          </span>
        </div>
      </div>

      {/* ── Bottom tagline ───────────────────────────────────────── */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        style={{
          opacity: mounted ? 0.5 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 1.2s ease, transform 1.2s var(--ease-out-expo)",
          transitionDelay: "1s",
        }}
      >
        <p
          className="label-caps text-[var(--warm-grey)]"
          style={{ letterSpacing: "0.35em", fontSize: "0.55rem" }}
        >
          Enter the House of Covora
        </p>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div
        className="absolute bottom-10 right-10 z-20 pointer-events-none hidden md:flex flex-col items-center gap-3"
        style={{
          opacity: mounted ? 0.35 : 0,
          transition: "opacity 1s ease",
          transitionDelay: "1.2s",
        }}
      >
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50%       { opacity: 0.7;  transform: scaleY(1.15); }
        }
        @keyframes videoZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ─── Panel ────────────────────────────────────────────────────────────────────

interface PanelProps {
  side: "mens" | "womens";
  hovered: "mens" | "womens" | null;
  mounted: boolean;
  onHover: (side: "mens" | "womens" | null) => void;
  onEnter: (side: "mens" | "womens") => void;
  label: string;
  heading: string;
  subheading: string;
  cta: string;
  videoSrc: string;
}

function Panel({
  side,
  hovered,
  mounted,
  onHover,
  onEnter,
  label,
  heading,
  subheading,
  cta,
  videoSrc,
}: PanelProps) {
  const isHovered = hovered === side;
  const isOpposite = hovered !== null && hovered !== side;
  const isMens = side === "mens";

  // Each panel expands slightly on hover
  const flexBasis = isHovered ? "55%" : isOpposite ? "45%" : "50%";

  return (
    <div
      className="relative flex-1 overflow-hidden cursor-pointer h-1/2 md:h-full"
      style={{
        flexBasis,
        transition: "flex-basis 0.8s var(--ease-out-expo)",
      }}
      onMouseEnter={() => onHover(side)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onEnter(side)}
      role="button"
      tabIndex={0}
      aria-label={`Enter ${side}`}
      onKeyDown={(e) => e.key === "Enter" && onEnter(side)}
    >
      {/* ── Background gradient (fallback / base) ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: isMens
            ? "linear-gradient(160deg, #0c0c0c 0%, #161410 60%, #0a0a0a 100%)"
            : "linear-gradient(200deg, #0c0c0b 0%, #17140f 60%, #0a0a0a 100%)",
        }}
      />

      {/* ── Video ─────────────────────────────────────────────────── */}
      {/* Zoom-animation wrapper — clipped by panel's overflow-hidden */}
      <div
        className="absolute inset-0"
        style={{
          animation: "videoZoom 10s ease-out forwards",
          willChange: "transform",
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: isHovered ? "scale(1.03)" : "scale(1)",
            filter: isHovered
              ? "brightness(0.65) contrast(1.05)"
              : isOpposite
              ? "brightness(0.4)"
              : "brightness(0.55)",
            transition: "opacity 1.5s ease, transform 1.2s var(--ease-out-expo), filter 0.8s ease",
          }}
        />
      </div>

      {/* ── Dark overlay ~60% ─────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.60)", pointerEvents: "none" }}
      />

      {/* ── Gradient mask — bottom-heavy for text legibility ─────── */}
      <div
        className="absolute inset-0"
        style={{
          background: isMens
            ? "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 40%, rgba(8,8,8,0.1) 70%, transparent 100%)"
            : "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 40%, rgba(8,8,8,0.1) 70%, transparent 100%)",
          transition: "opacity 0.8s ease",
        }}
      />

      {/* ── Vignette edges ────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: isMens
            ? "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 40%)"
            : "linear-gradient(to left, rgba(0,0,0,0.25) 0%, transparent 40%)",
        }}
      />

      {/* ── Gold edge line ────────────────────────────────────────── */}
      <div
        className="absolute inset-y-0 z-10"
        style={{
          [isMens ? "right" : "left"]: 0,
          width: "1px",
          background: "linear-gradient(to bottom, transparent 10%, var(--gold) 50%, transparent 90%)",
          opacity: isHovered ? 0.6 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* ── Vertical side label ───────────────────────────────────── */}
      <div
        className="absolute top-12 z-10 hidden md:flex items-center gap-3"
        style={{
          [isMens ? "left" : "right"]: "2rem",
          opacity: mounted ? (isOpposite ? 0.3 : 0.7) : 0,
          transform: mounted ? "none" : isMens ? "translateX(-10px)" : "translateX(10px)",
          transition: "opacity 0.6s ease, transform 0.8s var(--ease-out-expo)",
          transitionDelay: isMens ? "0.6s" : "0.75s",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: isMens ? "rotate(180deg)" : "none",
            fontFamily: "var(--font-inter)",
            fontSize: "0.55rem",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--warm-grey)",
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: "1px",
            height: "28px",
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            opacity: 0.5,
          }}
        />
      </div>

      {/* ── Main content — bottom aligned, editorial ──────────────── */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={{
          padding: "clamp(1.5rem, 4vw, 4rem)",
          paddingBottom: "clamp(2.5rem, 6vh, 5rem)",
        }}
      >
        {/* Category label */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease, transform 1s var(--ease-out-expo)",
            transitionDelay: isMens ? "0.35s" : "0.5s",
          }}
        >
          <p
            className="label-caps"
            style={{
              color: "var(--gold)",
              letterSpacing: isHovered ? "0.42em" : "0.28em",
              transition: "letter-spacing 0.6s var(--ease-luxury)",
              marginBottom: "1.25rem",
              fontSize: "0.58rem",
              opacity: isOpposite ? 0.5 : 1,
            }}
          >
            {label}
          </p>
        </div>

        {/* Heading */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.1s ease, transform 1.1s var(--ease-out-expo)",
            transitionDelay: isMens ? "0.45s" : "0.6s",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3.2rem, 6.5vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: isHovered ? "var(--ivory)" : "rgba(242,237,228,0.88)",
              transform: isHovered ? "translateY(-3px)" : "translateY(0)",
              transition: "color 0.5s ease, transform 0.7s var(--ease-out-expo)",
              marginBottom: "1.25rem",
            }}
          >
            {heading}
          </h2>
        </div>

        {/* Subheading — only on hover */}
        <div
          style={{
            overflow: "hidden",
            height: isHovered ? "2rem" : "0",
            opacity: isHovered ? 1 : 0,
            transition: "height 0.55s var(--ease-out-expo), opacity 0.45s ease",
            marginBottom: isHovered ? "1.5rem" : "0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--warm-grey-light)",
              letterSpacing: "0.06em",
              transform: isHovered ? "translateY(0)" : "translateY(6px)",
              transition: "transform 0.55s var(--ease-out-expo)",
            }}
          >
            {subheading}
          </p>
        </div>

        {/* Gold rule */}
        <div
          style={{
            height: "1px",
            background: "var(--gold)",
            width: isHovered ? "48px" : "24px",
            opacity: isHovered ? 0.7 : 0.3,
            transition: "width 0.5s var(--ease-out-expo), opacity 0.4s ease",
            marginBottom: "1.5rem",
          }}
        />

        {/* CTA */}
        <div
          style={{
            opacity: mounted ? (isOpposite ? 0.4 : 0.85) : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease, transform 0.8s var(--ease-out-expo)",
            transitionDelay: isMens ? "0.8s" : "0.95s",
          }}
        >
          <button
            tabIndex={-1}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: isHovered ? "var(--gold)" : "var(--off-white)",
              border: `1px solid ${isHovered ? "var(--gold)" : "rgba(201,169,110,0.3)"}`,
              background: isHovered ? "rgba(201,169,110,0.06)" : "transparent",
              padding: "0.9rem 2rem",
              transition: "all 0.45s var(--ease-luxury)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {cta}
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              style={{
                transform: isHovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.4s var(--ease-luxury)",
              }}
            >
              <path d="M1 4h12M9 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
