"use client";

import type { ReactNode } from "react";

// ─── Shared helper ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export type BadgeVariant = "gold" | "outline" | "dark" | "new" | "sale" | "exclusive";
export type BadgeSize    = "sm" | "md";

export interface BadgeProps {
  variant?:   BadgeVariant;
  size?:      BadgeSize;
  children:   ReactNode;
  className?: string;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  gold:      "badge badge-gold",
  outline:   "badge badge-outline",
  dark:      "badge badge-dark",
  new:       "badge badge-new",
  sale:      "badge badge-sale",
  exclusive: "badge badge-gold",
};

const SIZE_STYLE: Record<BadgeSize, React.CSSProperties> = {
  sm: { fontSize: "0.5rem",  padding: "0.22rem 0.6rem"  },
  md: { fontSize: "0.55rem", padding: "0.3rem 0.75rem"  },
};

export function Badge({ variant = "outline", size = "md", children, className }: BadgeProps) {
  return (
    <span className={cls(VARIANT_CLASS[variant], className)} style={SIZE_STYLE[size]}>
      {children}
    </span>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
// Clickable filter tag — used in category filters, product attributes, etc.

export interface TagProps {
  active?:    boolean;
  onClick?:   () => void;
  href?:      string;
  children:   ReactNode;
  className?: string;
}

export function Tag({ active = false, onClick, children, className }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls("badge transition-all duration-200", className)}
      style={{
        background:    active ? "var(--gold)"           : "transparent",
        color:         active ? "var(--black)"           : "var(--text-muted)",
        border:        active ? "1px solid var(--gold)"  : "1px solid var(--border-default)",
        cursor:        "pointer",
        fontSize:      "0.55rem",
        padding:       "0.3rem 0.9rem",
        letterSpacing: "0.18em",
      }}
    >
      {children}
    </button>
  );
}

// ─── StatusDot ────────────────────────────────────────────────────────────────

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface StatusDotProps {
  status:     StockStatus;
  className?: string;
}

const STATUS_CONFIG: Record<StockStatus, { color: string; label: string }> = {
  "in-stock":     { color: "#7BBFA5", label: "In Stock"     },
  "low-stock":    { color: "#C9A96E", label: "Low Stock"    },
  "out-of-stock": { color: "#8A7A7A", label: "Out of Stock" },
};

export function StatusDot({ status, className }: StatusDotProps) {
  const { color, label } = STATUS_CONFIG[status];
  return (
    <span className={cls("flex items-center gap-1.5", className)}>
      <span
        style={{
          display:      "inline-block",
          width:        "5px",
          height:       "5px",
          borderRadius: "50%",
          background:   color,
          flexShrink:   0,
        }}
      />
      <span
        style={{
          fontFamily:    "var(--font-inter)",
          fontSize:      "0.52rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </span>
  );
}

// ─── PriceBadge ───────────────────────────────────────────────────────────────
// Inline price display — used outside product cards (e.g. wishlist, quick view).

export interface PriceBadgeProps {
  price:          string;
  originalPrice?: string;
  className?:     string;
}

export function PriceBadge({ price, originalPrice, className }: PriceBadgeProps) {
  return (
    <span className={cls("flex items-baseline gap-2", className)}>
      <span
        style={{
          fontFamily:    "var(--font-cormorant)",
          fontSize:      "1.1rem",
          fontWeight:    400,
          color:         originalPrice ? "var(--gold-light)" : "var(--text-secondary)",
          letterSpacing: "0.02em",
        }}
      >
        {price}
      </span>
      {originalPrice && (
        <span
          style={{
            fontFamily:     "var(--font-cormorant)",
            fontSize:       "0.9rem",
            color:          "var(--text-muted)",
            textDecoration: "line-through",
          }}
        >
          {originalPrice}
        </span>
      )}
    </span>
  );
}
