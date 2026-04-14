// Server-safe — no client directive needed.

import type { ReactNode } from "react";

// ─── Shared helper ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── GoldDivider ─────────────────────────────────────────────────────────────
// A horizontal rule with a gold gradient fade — centre-weighted.

export interface GoldDividerProps {
  className?: string;
  spacing?:   "none" | "sm" | "md" | "lg";
}

const SPACING: Record<string, string> = {
  none: "",
  sm:   "my-6",
  md:   "my-10",
  lg:   "my-16",
};

export function GoldDivider({ className, spacing = "none" }: GoldDividerProps) {
  return (
    <div
      className={cls("divider-gold", SPACING[spacing], className)}
      role="separator"
      aria-hidden="true"
    />
  );
}

// ─── SubtleDivider ────────────────────────────────────────────────────────────
// A minimal 1px rule in the subtle border colour.

export interface SubtleDividerProps {
  variant?:   "subtle" | "default";
  vertical?:  boolean;
  spacing?:   "none" | "sm" | "md" | "lg";
  className?: string;
}

export function SubtleDivider({
  variant  = "subtle",
  vertical = false,
  spacing  = "none",
  className,
}: SubtleDividerProps) {
  if (vertical) {
    return (
      <div
        className={cls("divider-vertical", className)}
        role="separator"
        aria-hidden="true"
        style={{ alignSelf: "stretch" }}
      />
    );
  }

  return (
    <div
      className={cls(
        variant === "default" ? "divider-default" : "divider-subtle",
        SPACING[spacing],
        className
      )}
      role="separator"
      aria-hidden="true"
    />
  );
}

// ─── GoldDiamond ─────────────────────────────────────────────────────────────
// Decorative diamond-centred rule — used between editorial sections.

export interface GoldDiamondProps {
  className?: string;
  spacing?:   "none" | "sm" | "md" | "lg";
}

export function GoldDiamond({ className, spacing = "none" }: GoldDiamondProps) {
  return (
    <div
      className={cls("divider-diamond", SPACING[spacing], className)}
      role="separator"
      aria-hidden="true"
    >
      <span className="divider-diamond-gem" />
    </div>
  );
}

// ─── LabelDivider ─────────────────────────────────────────────────────────────
// Horizontal rule with centred text label — used in forms and section breaks.

export interface LabelDividerProps {
  children:   ReactNode;
  className?: string;
  spacing?:   "none" | "sm" | "md" | "lg";
}

export function LabelDivider({ children, className, spacing = "none" }: LabelDividerProps) {
  return (
    <div className={cls("divider-label", SPACING[spacing], className)} role="separator">
      <span
        style={{
          fontFamily:    "var(--font-inter)",
          fontSize:      "0.6rem",
          fontWeight:    500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          whiteSpace:    "nowrap",
        }}
      >
        {children}
      </span>
    </div>
  );
}
