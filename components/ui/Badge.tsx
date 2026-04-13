import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ─── Badge ────────────────────────────────────────────────────────────────────

export type BadgeVariant = "gold" | "outline" | "dark" | "new" | "sale" | "exclusive";

interface BadgeProps {
  variant?:   BadgeVariant;
  children:   ReactNode;
  className?: string;
  size?:      "sm" | "md";
}

const variantClasses: Record<BadgeVariant, string> = {
  gold:      "badge badge-gold",
  outline:   "badge badge-outline",
  dark:      "badge badge-dark",
  new:       "badge badge-new",
  sale:      "badge badge-sale",
  exclusive: "badge badge-gold",
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { fontSize: "0.5rem", padding: "0.22rem 0.6rem" },
  md: { fontSize: "0.55rem", padding: "0.3rem 0.75rem" },
};

export function Badge({ variant = "outline", children, className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(variantClasses[variant], className)}
      style={sizeStyles[size]}
    >
      {children}
    </span>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
// Clickable / filterable tag (e.g. category filters, product attributes)

interface TagProps {
  active?:    boolean;
  onClick?:   () => void;
  children:   ReactNode;
  className?: string;
}

export function Tag({ active = false, onClick, children, className }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("badge transition-all duration-200", className)}
      style={{
        background:   active ? "var(--gold)"               : "transparent",
        color:        active ? "var(--black)"               : "var(--text-muted)",
        border:       active ? "1px solid var(--gold)"      : "1px solid var(--border-default)",
        cursor:       onClick ? "pointer" : "default",
        fontSize:     "0.55rem",
        padding:      "0.3rem 0.9rem",
        letterSpacing:"0.18em",
      }}
    >
      {children}
    </button>
  );
}

// ─── StatusDot ────────────────────────────────────────────────────────────────

interface StatusDotProps {
  status:     "in-stock" | "low-stock" | "out-of-stock";
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  const config = {
    "in-stock":      { color: "#7BBFA5", label: "In Stock" },
    "low-stock":     { color: "#C9A96E", label: "Low Stock" },
    "out-of-stock":  { color: "#8A7A7A", label: "Out of Stock" },
  };
  const { color, label } = config[status];

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span
        className="rounded-full flex-shrink-0"
        style={{ width: "5px", height: "5px", background: color }}
      />
      <span className="label-caps" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>
        {label}
      </span>
    </span>
  );
}

// ─── PriceBadge ───────────────────────────────────────────────────────────────

interface PriceBadgeProps {
  price:          string;
  originalPrice?: string;
  className?:     string;
}

export function PriceBadge({ price, originalPrice, className }: PriceBadgeProps) {
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.1rem",
          fontWeight: 400,
          color: originalPrice ? "var(--gold-light)" : "var(--text-secondary)",
          letterSpacing: "0.02em",
        }}
      >
        {price}
      </span>
      {originalPrice && (
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            textDecoration: "line-through",
          }}
        >
          {originalPrice}
        </span>
      )}
    </span>
  );
}
