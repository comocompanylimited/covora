"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "outline" | "ghost" | "white" | "inverse" | "icon";
export type ButtonSize    = "xs" | "sm" | "md" | "lg" | "xl";

interface SharedProps {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  iconLeft?:  ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  children?:  ReactNode;
  className?: string;
}

export interface ButtonProps extends SharedProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?:     never;
  external?: never;
}

export interface LinkButtonProps extends SharedProps {
  href:       string;
  external?:  boolean;
  disabled?:  boolean;
  onClick?:   React.MouseEventHandler<HTMLAnchorElement>;
}

type Props = ButtonProps | LinkButtonProps;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  ghost:   "btn btn-ghost",
  white:   "btn btn-white",
  inverse: "btn btn-inverse",
  icon:    "btn btn-icon",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  loading: boolean,
  fullWidth: boolean,
  extra?: string
) {
  return [
    VARIANT_CLASS[variant],
    variant !== "icon" ? SIZE_CLASS[size] : "",
    fullWidth ? "w-full" : "",
    loading ? "opacity-60 pointer-events-none" : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function Dots() {
  return (
    <span aria-hidden style={{ display: "inline-flex", alignItems: "center", gap: "3px", marginLeft: "4px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "currentColor",
            opacity: 0.65,
            animation: `btn-dot-pulse 1.2s ${i * 180}ms ease infinite`,
          }}
        />
      ))}
    </span>
  );
}

function Inner({
  loading,
  iconLeft,
  iconRight,
  children,
}: {
  loading: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      {iconLeft  && <span aria-hidden style={{ display: "flex", flexShrink: 0 }}>{iconLeft}</span>}
      <span style={loading ? { opacity: 0.7 } : undefined}>{children}</span>
      {loading   && <Dots />}
      {!loading && iconRight && <span aria-hidden style={{ display: "flex", flexShrink: 0 }}>{iconRight}</span>}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
  const {
    variant   = "primary",
    size      = "md",
    loading   = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    children,
    className,
    ...rest
  } = props;

  const cls = classes(variant, size, loading, fullWidth, className);

  // ── Link / anchor mode ────────────────────────────────────────────────────
  if ("href" in props && props.href !== undefined) {
    const { href, external, disabled, onClick } = props as LinkButtonProps;

    if (external) {
      return (
        <a
          href={href}
          className={cls}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled}
        >
          <Inner loading={loading} iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
        </a>
      );
    }

    return (
      <Link href={href} className={cls} onClick={onClick} aria-disabled={disabled}>
        <Inner loading={loading} iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
      </Link>
    );
  }

  // ── Button mode ───────────────────────────────────────────────────────────
  const { disabled, ...btnRest } = rest as ButtonProps;

  return (
    <button
      ref={ref}
      className={cls}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...btnRest}
    >
      <Inner loading={loading} iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
    </button>
  );
});

Button.displayName = "Button";
export default Button;
