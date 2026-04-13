"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost" | "white" | "inverse" | "icon";
export type ButtonSize    = "sm" | "md" | "lg" | "xl";

interface BaseProps {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  loading?:  boolean;
  fullWidth?: boolean;
  className?: string;
}

type ButtonProps     = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type Props = ButtonProps | LinkButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "btn btn-primary",
  outline:
    "btn btn-outline",
  ghost:
    "btn btn-ghost",
  white:
    "btn btn-white",
  inverse:
    "btn btn-inverse",
  icon:
    "btn btn-icon",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>((props, ref) => {
  const {
    variant   = "primary",
    size      = "md",
    loading   = false,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    variantClasses[variant],
    variant !== "icon" && sizeClasses[size],
    fullWidth && "w-full",
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
});

Button.displayName = "Button";
export default Button;

function LoadingDots() {
  return (
    <span className="flex gap-[3px] items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="rounded-full bg-current"
          style={{
            width: "3px",
            height: "3px",
            animation: "pulse 1.2s ease infinite",
            animationDelay: `${i * 180}ms`,
          }}
        />
      ))}
    </span>
  );
}
