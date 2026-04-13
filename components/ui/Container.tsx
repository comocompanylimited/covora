import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ─── Container ────────────────────────────────────────────────────────────────

interface ContainerProps {
  children:   ReactNode;
  size?:      "sm" | "md" | "wide" | "full";
  className?: string;
  as?:        "div" | "section" | "article" | "main" | "aside";
}

export function Container({
  children,
  size     = "wide",
  className,
  as: Tag  = "div",
}: ContainerProps) {
  const sizeClass =
    size === "sm"   ? "container-sm"   :
    size === "md"   ? "container-md"   :
    size === "wide" ? "container-wide" :
    "container";

  return (
    <Tag className={cn(sizeClass, className)}>
      {children}
    </Tag>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface SectionProps {
  children:    ReactNode;
  spacing?:    "xs" | "sm" | "md" | "lg" | "xl" | "none";
  container?:  "sm" | "md" | "wide" | "full" | false;
  className?:  string;
  id?:         string;
  as?:         "section" | "div" | "article";
}

export function Section({
  children,
  spacing   = "md",
  container = "wide",
  className,
  id,
  as: Tag   = "section",
}: SectionProps) {
  const spacingClass =
    spacing === "xs"   ? "section-xs"  :
    spacing === "sm"   ? "section-sm"  :
    spacing === "md"   ? "section-md"  :
    spacing === "lg"   ? "section-lg"  :
    spacing === "xl"   ? "section-xl"  :
    "";

  const content = container === false
    ? children
    : <Container size={container}>{children}</Container>;

  return (
    <Tag id={id} className={cn(spacingClass, className)}>
      {content}
    </Tag>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
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
  const alignClass =
    align === "center" ? "text-center items-center" :
    align === "right"  ? "text-right items-end"     :
    "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-3 mb-12 lg:mb-16", alignClass, className)}>
      {eyebrow && (
        <p className="label-caps text-[var(--gold)]" style={{ fontSize: "0.58rem" }}>
          {eyebrow}
        </p>
      )}
      <h2 className="heading-lg">{title}</h2>
      {subtitle && (
        <p
          className="body-lg max-w-xl"
          style={{ color: "var(--text-muted)", marginTop: "0.25rem" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface GridProps {
  children:   ReactNode;
  cols?:      2 | 3 | 4 | 5;
  gap?:       "sm" | "md" | "lg";
  className?: string;
}

const colClasses: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

const gapClasses: Record<string, string> = {
  sm: "gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
};

export function Grid({ children, cols = 4, gap = "md", className }: GridProps) {
  return (
    <div className={cn("grid", colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

interface DividerProps {
  variant?:   "subtle" | "default" | "gold";
  className?: string;
  spacing?:   "none" | "sm" | "md" | "lg";
}

export function Divider({ variant = "default", className, spacing = "none" }: DividerProps) {
  const spacingClass =
    spacing === "sm" ? "my-6" :
    spacing === "md" ? "my-10" :
    spacing === "lg" ? "my-16" :
    "";

  return (
    <div
      className={cn(
        "divider",
        variant === "subtle"  ? "divider-subtle"  :
        variant === "gold"    ? "divider-gold"    :
        "divider-default",
        spacingClass,
        className
      )}
    />
  );
}
