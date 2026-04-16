"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

// ─── Shared helper ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── ProductCard ──────────────────────────────────────────────────────────────
// Supports both CSS-gradient placeholders (mock) and real Next.js Image (API).

export interface ProductCardProps {
  href:           string;
  name:           string;
  price:          string;
  originalPrice?: string;
  /** CSS background string — used for gradient placeholders */
  bg?:            string;
  /** Real image URL — takes precedence over bg when provided */
  src?:           string;
  hoverSrc?:      string;
  badge?:         "New" | "Sale" | "Exclusive" | string;
  sizes?:         string;
  className?:     string;
}

export function ProductCard({
  href,
  name,
  price,
  originalPrice,
  bg,
  src,
  hoverSrc,
  badge,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  className,
}: ProductCardProps) {
  const hasImage = !!src;

  return (
    <Link href={href} className={cls("pcard group block", className)}>
      {/* ── Image area ── */}
      <div
        className="pcard-img"
        style={!hasImage && bg ? { background: bg } : undefined}
      >
        {/* Placeholder icon when no image */}
        {!hasImage && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.75rem" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.35)" strokeWidth="0.8">
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.4)" }}>Covora</span>
          </div>
        )}

        {hasImage && (
          <Image
            src={src!}
            alt={name}
            fill
            sizes={sizes}
            className="object-cover"
          />
        )}

        {/* Hover image swap */}
        {hasImage && hoverSrc && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms]">
            <Image
              src={hoverSrc}
              alt={`${name} — alternate`}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </div>
        )}

        {/* Badge */}
        {badge && <BadgePill badge={badge} />}

        {/* Quick-add overlay */}
        <div className="pcard-quick-add">
          <span
            style={{
              fontFamily:    "var(--font-inter)",
              fontSize:      "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--gold-dark)",
            }}
          >
            Quick Add
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="pcard-info">
        <p className="pcard-name">{name}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
          <span className="pcard-price">{price}</span>
          {originalPrice && (
            <span className="pcard-price-original">{originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── internal badge pill ───────────────────────────────────────────────────────

function BadgePill({ badge }: { badge: string }) {
  const isSale = badge === "Sale";
  const isNew  = badge === "New";

  const bg     = isSale ? "rgba(180,80,80,0.15)"          : isNew ? "var(--gold)"   : "rgba(201,169,110,0.12)";
  const color  = isSale ? "#D4948A"                        : isNew ? "var(--black)"  : "var(--gold)";
  const border = isSale ? "1px solid rgba(180,80,80,0.3)" : isNew ? "none"          : "1px solid rgba(201,169,110,0.25)";

  return (
    <span
      className="badge pcard-badge"
      style={{ background: bg, color, border }}
    >
      {badge}
    </span>
  );
}

// ─── EditorialCard ────────────────────────────────────────────────────────────

export interface EditorialCardProps {
  href:       string;
  title:      string;
  subtitle?:  string;
  eyebrow?:   string;
  /** CSS background for gradient placeholder */
  bg?:        string;
  src?:       string;
  layout?:    "portrait" | "landscape" | "square";
  sizes?:     string;
  className?: string;
}

export function EditorialCard({
  href,
  title,
  subtitle,
  eyebrow,
  bg,
  src,
  layout   = "portrait",
  sizes    = "(max-width: 768px) 100vw, 50vw",
  className,
}: EditorialCardProps) {
  const ratio = layout === "portrait" ? "2/3" : layout === "landscape" ? "3/2" : "1/1";

  return (
    <Link href={href} className={cls("group block", className)}>
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: ratio,
          background:  !src && bg ? bg : "#F0EDE8",
        }}
      >
        {src && (
          <Image
            src={src}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1s] group-hover:scale-[1.05]"
            style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
          />
        )}

        {/* Gradient scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(8,8,8,0.72) 0%, transparent 55%)" }}
        />

        {/* Overlaid text */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {eyebrow && (
            <p
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.55rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "var(--gold)",
                marginBottom:  "0.5rem",
              }}
            >
              {eyebrow}
            </p>
          )}
          <h3
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(1.4rem, 2vw, 2rem)",
              fontWeight:    300,
              color:         "var(--ivory)",
              lineHeight:    1.1,
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize:   "0.78rem",
                color:      "rgba(244,239,230,0.65)",
                marginTop:  "0.5rem",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── CollectionCard ───────────────────────────────────────────────────────────

export interface CollectionCardProps {
  href:       string;
  title:      string;
  label?:     string;
  bg?:        string;
  src?:       string;
  sizes?:     string;
  className?: string;
}

export function CollectionCard({
  href,
  title,
  label,
  bg,
  src,
  sizes    = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
}: CollectionCardProps) {
  return (
    <Link href={href} className={cls("group relative block overflow-hidden", className)}>
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "4/5",
          background:  !src && bg ? bg : "#F0EDE8",
        }}
      >
        {src && (
          <Image
            src={src}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.06]"
            style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
          />
        )}

        {/* Scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.08) 60%, transparent 100%)" }}
        />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-7">
          {label && (
            <p
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.54rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "var(--gold)",
                marginBottom:  "0.75rem",
              }}
            >
              {label}
            </p>
          )}
          <h3
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(1.6rem, 2.5vw, 2.5rem)",
              fontWeight:    300,
              color:         "var(--ivory)",
              lineHeight:    1.0,
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </h3>

          {/* Hover rule */}
          <div
            className="mt-4 group-hover:[transform:scaleX(1)!important]"
            style={{
              height:          "1px",
              background:      "var(--gold)",
              transformOrigin: "left",
              transform:       "scaleX(0)",
              transition:      "transform 0.45s var(--ease-luxury)",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

// ─── JournalCard ──────────────────────────────────────────────────────────────

export interface JournalCardProps {
  href:       string;
  title:      string;
  excerpt?:   string;
  bg?:        string;
  src?:       string;
  category?:  string;
  date?:      string;
  sizes?:     string;
  className?: string;
}

export function JournalCard({
  href,
  title,
  excerpt,
  bg,
  src,
  category,
  date,
  sizes    = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
}: JournalCardProps) {
  return (
    <Link href={href} className={cls("group block", className)}>
      {/* Image */}
      <div
        className="relative overflow-hidden mb-4"
        style={{
          aspectRatio: "3/2",
          background:  !src && bg ? bg : "#F0EDE8",
        }}
      >
        {src && (
          <Image
            src={src}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[0.9s] group-hover:scale-[1.04]"
            style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
          />
        )}
      </div>

      {/* Meta */}
      {(category || date) && (
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <span
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.54rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         "var(--gold)",
              }}
            >
              {category}
            </span>
          )}
          {category && date && (
            <span
              style={{
                display:    "inline-block",
                width:      "1px",
                height:     "10px",
                background: "rgba(0,0,0,0.12)",
              }}
            />
          )}
          {date && (
            <span
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "0.54rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "var(--text-muted)",
              }}
            >
              {date}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3
        className="gold-underline inline"
        style={{
          fontFamily:    "var(--font-cormorant)",
          fontSize:      "clamp(1.1rem, 1.6vw, 1.5rem)",
          fontWeight:    300,
          color:         "#222222",
          lineHeight:    1.2,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      {excerpt && (
        <p
          className="line-clamp-2 mt-2"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "0.82rem",
            color:      "#666666",
            lineHeight: 1.65,
          }}
        >
          {excerpt}
        </p>
      )}
    </Link>
  );
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────
// Typographic / icon service-strip item used on homepage.

export interface ServiceCardProps {
  icon?:       ReactNode;
  title:       string;
  description: string;
  href?:       string;
  className?:  string;
}

export function ServiceCard({ icon, title, description, href, className }: ServiceCardProps) {
  const inner = (
    <div
      className={cls("group flex flex-col items-center text-center gap-4", className)}
      style={{ padding: "2rem 1rem" }}
    >
      {icon && (
        <span
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          "2.5rem",
            height:         "2.5rem",
            color:          "var(--gold)",
          }}
        >
          {icon}
        </span>
      )}
      <div>
        <p
          style={{
            fontFamily:    "var(--font-cormorant)",
            fontSize:      "1.05rem",
            fontWeight:    400,
            letterSpacing: "0.06em",
            color:         "#222222",
            marginBottom:  "0.4rem",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "0.75rem",
            color:      "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}
