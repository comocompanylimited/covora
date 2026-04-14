import type { ReactNode, ElementType } from "react";

// ─── Shared helper ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── Container ────────────────────────────────────────────────────────────────
// Max-width wrapper with responsive horizontal padding.

export type ContainerSize = "sm" | "md" | "wide" | "full";

export interface ContainerProps {
  children:   ReactNode;
  size?:      ContainerSize;
  as?:        ElementType;
  className?: string;
}

const SIZE_CLASS: Record<ContainerSize, string> = {
  sm:   "container-sm",
  md:   "container-md",
  wide: "container-wide",
  full: "container",
};

export function Container({
  children,
  size     = "wide",
  as: Tag  = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={cls(SIZE_CLASS[size], className)}>
      {children}
    </Tag>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
// Vertical-rhythm section wrapper. Optionally nests a Container.

export type SectionSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "none";

export interface SectionProps {
  children:    ReactNode;
  spacing?:    SectionSpacing;
  container?:  ContainerSize | false;
  as?:         ElementType;
  id?:         string;
  className?:  string;
}

const SPACING_CLASS: Record<SectionSpacing, string> = {
  xs:   "section-xs",
  sm:   "section-sm",
  md:   "section-md",
  lg:   "section-lg",
  xl:   "section-xl",
  none: "",
};

export function Section({
  children,
  spacing   = "md",
  container = "wide",
  as: Tag   = "section",
  id,
  className,
}: SectionProps) {
  const inner =
    container === false
      ? children
      : <Container size={container}>{children}</Container>;

  return (
    <Tag id={id} className={cls(SPACING_CLASS[spacing], className)}>
      {inner}
    </Tag>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
// Reusable eyebrow + title + subtitle block.

export interface SectionHeaderProps {
  eyebrow?:   string;
  title:      string;
  subtitle?:  string;
  align?:     "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align     = "left",
  className,
}: SectionHeaderProps) {
  const alignStyle: React.CSSProperties =
    align === "center" ? { textAlign: "center", alignItems: "center" }  :
    align === "right"  ? { textAlign: "right",  alignItems: "flex-end" } :
    { textAlign: "left", alignItems: "flex-start" };

  return (
    <div
      className={cls("section-header", align === "center" ? "center" : undefined, className)}
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem", ...alignStyle }}
    >
      {eyebrow && (
        <p
          style={{
            fontFamily:    "var(--font-inter)",
            fontSize:      "0.58rem",
            fontWeight:    500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "var(--gold)",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="heading-lg">{title}</h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "clamp(0.85rem, 1vw, 1rem)",
            color:      "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth:   "38rem",
            marginTop:  "0.25rem",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
// Responsive CSS grid with preset column counts and gap sizes.

export type GridCols = 2 | 3 | 4 | 5;
export type GridGap  = "sm" | "md" | "lg";

export interface GridProps {
  children:   ReactNode;
  cols?:      GridCols;
  gap?:       GridGap;
  className?: string;
}

const COL_CLASS: Record<GridCols, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

const GAP_CLASS: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
};

export function Grid({ children, cols = 4, gap = "md", className }: GridProps) {
  return (
    <div className={cls("grid", COL_CLASS[cols], GAP_CLASS[gap], className)}>
      {children}
    </div>
  );
}

// ─── PageWrapper ──────────────────────────────────────────────────────────────
// Top-level page layout — adds header-offset padding and optional max-width.

export interface PageWrapperProps {
  children:   ReactNode;
  container?: ContainerSize | false;
  className?: string;
}

export function PageWrapper({ children, container = "wide", className }: PageWrapperProps) {
  const inner =
    container === false
      ? children
      : <Container size={container}>{children}</Container>;

  return (
    <main className={cls("page-with-header", className)}>
      {inner}
    </main>
  );
}
