import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  linkTo?: string;
}

const sizeMap = {
  sm: "text-lg tracking-[0.35em]",
  md: "text-2xl tracking-[0.4em]",
  lg: "text-4xl tracking-[0.45em]",
  xl: "text-6xl tracking-[0.5em]",
};

export default function Logo({ className, size = "md", linkTo = "/" }: LogoProps) {
  const classes = cn(
    "font-[var(--font-cormorant)] font-light text-[var(--gold)] uppercase select-none",
    sizeMap[size],
    className
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className={cn(classes, "hover:text-[var(--gold-light)] transition-colors duration-300")}>
        Covora
      </Link>
    );
  }

  return <span className={classes}>Covora</span>;
}
