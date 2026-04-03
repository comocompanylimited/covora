"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "icon";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkButtonProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] active:bg-[var(--gold-dark)]",
  outline:
    "bg-transparent text-[var(--off-white)] border border-[var(--border-gold)] hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-[rgba(201,169,110,0.05)]",
  ghost:
    "bg-transparent text-[var(--warm-grey)] hover:text-[var(--gold)]",
  icon:
    "bg-transparent text-[var(--off-white)] hover:text-[var(--gold)] p-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-3 text-[0.6rem] tracking-[0.2em]",
  md: "px-8 py-4 text-[0.65rem] tracking-[0.18em]",
  lg: "px-12 py-5 text-[0.7rem] tracking-[0.2em]",
};

const base =
  "inline-flex items-center justify-center gap-2 font-[var(--font-inter)] font-medium uppercase transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--gold)] disabled:opacity-40 disabled:pointer-events-none";

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      ...rest
    } = props;

    const classes = cn(
      base,
      variant !== "icon" && sizeClasses[size],
      variantClasses[variant],
      loading && "opacity-60 pointer-events-none",
      className
    );

    if ("href" in props && props.href !== undefined) {
      const { href, ...linkRest } = rest as LinkButtonProps;
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {loading ? <LoadingDots /> : children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={(rest as ButtonProps).disabled || loading}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading ? <LoadingDots /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

function LoadingDots() {
  return (
    <span className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}
