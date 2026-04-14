// Server-safe — no client directive needed (no hooks or event handlers).

import type { CSSProperties } from "react";

// ─── Shared helper ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── SkeletonBox ──────────────────────────────────────────────────────────────
// Generic shimmer block — supply width/height/borderRadius via style or className.

export interface SkeletonBoxProps {
  width?:        CSSProperties["width"];
  height?:       CSSProperties["height"];
  borderRadius?: CSSProperties["borderRadius"];
  className?:    string;
  style?:        CSSProperties;
}

export function SkeletonBox({
  width,
  height,
  borderRadius,
  className,
  style,
}: SkeletonBoxProps) {
  return (
    <div
      className={cls("skeleton", className)}
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}

// ─── SkeletonText ─────────────────────────────────────────────────────────────
// One or more lines of shimmer text at a given size.

export interface SkeletonTextProps {
  lines?:     number;
  size?:      "xs" | "sm" | "md" | "lg";
  className?: string;
}

const LINE_HEIGHT: Record<string, string> = {
  xs: "0.5rem",
  sm: "0.65rem",
  md: "0.82rem",
  lg: "1.1rem",
};

export function SkeletonText({ lines = 1, size = "sm", className }: SkeletonTextProps) {
  const h = LINE_HEIGHT[size];
  return (
    <div className={cls("flex flex-col gap-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height:       h,
            borderRadius: "2px",
            // Last line is slightly shorter for a natural look
            width: i === lines - 1 && lines > 1 ? "70%" : "100%",
          }}
        />
      ))}
    </div>
  );
}

// ─── SkeletonProductCard ──────────────────────────────────────────────────────
// Matches the ProductCard layout exactly — 3:4 image + name + price.

export interface SkeletonProductCardProps {
  className?: string;
}

export function SkeletonProductCard({ className }: SkeletonProductCardProps) {
  return (
    <div className={cls("block", className)} aria-hidden="true">
      {/* Image — 3:4 ratio */}
      <SkeletonBox
        style={{
          width:       "100%",
          aspectRatio: "3 / 4",
          borderRadius: "0",
        }}
      />

      {/* Info */}
      <div style={{ paddingTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Name */}
        <SkeletonBox height="0.5rem" width="60%" />
        {/* Price */}
        <SkeletonBox height="0.9rem" width="35%" />
      </div>
    </div>
  );
}

// ─── SkeletonProductGrid ──────────────────────────────────────────────────────
// Full product grid of loading cards — used while data fetches.

export interface SkeletonProductGridProps {
  count?:     number;
  className?: string;
}

export function SkeletonProductGrid({ count = 8, className }: SkeletonProductGridProps) {
  return (
    <div
      className={cls("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8", className)}
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}
