"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
  /** Show category above name */
  showCategory?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
  className,
  showCategory = true,
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImage = product.images[0];
  const hoverImage = product.images[1] ?? null;
  const hasHoverImage = !!hoverImage;

  const colourAttr = product.attributes.find(
    (a) => a.name.toLowerCase() === "colour" || a.name.toLowerCase() === "color"
  );

  const category = product.categories[0]?.name;
  const isSoldOut = product.stock_status === "outofstock";

  return (
    <article
      className={cn("group relative", className)}
      style={{ "--card-duration": "0.85s" } as React.CSSProperties}
    >
      <Link href={`/product/${product.slug}`} className="block" tabIndex={0}>

        {/* ── Image area ────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "3/4",
            background: "var(--charcoal-mid)",
          }}
        >
          {/* Primary image */}
          {primaryImage && (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover",
                "transition-[transform,opacity]",
                hasHoverImage
                  ? "duration-[800ms] group-hover:opacity-0"
                  : "duration-[1000ms] group-hover:scale-[1.05]"
              )}
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              priority={priority}
              onLoad={() => setImgLoaded(true)}
            />
          )}

          {/* Hover image */}
          {hasHoverImage && (
            <Image
              src={hoverImage.src}
              alt={hoverImage.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 scale-[1.02] group-hover:opacity-100 group-hover:scale-100 transition-[opacity,transform] duration-[900ms]"
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
            />
          )}

          {/* Placeholder shimmer until image loads */}
          {!imgLoaded && !primaryImage && (
            <div className="absolute inset-0 skeleton" />
          )}

          {/* Subtle dark overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)",
              opacity: 0,
            }}
          />

          {/* ── Wishlist ─────────────────────────────────────────── */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v); }}
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            className="absolute top-4 right-4 z-10 transition-all duration-400"
            style={{
              opacity: 0,
              transform: "translateY(-4px)",
              color: wishlisted ? "var(--gold)" : "var(--ivory)",
            }}
            onMouseEnter={(e) => { if (!wishlisted) (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { if (!wishlisted) (e.currentTarget as HTMLElement).style.color = "var(--ivory)"; }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* ── Sold out overlay ─────────────────────────────────── */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span
                className="label-caps"
                style={{
                  color: "var(--warm-grey-light)",
                  border: "1px solid rgba(107,101,96,0.4)",
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                }}
              >
                Sold Out
              </span>
            </div>
          )}

          {/* ── New arrival marker ─────────────────────────────── */}
          {!isSoldOut && !product.on_sale && product.total_sales === 0 && (
            <div
              className="absolute top-4 left-4"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--gold)",
                opacity: 0.8,
              }}
            />
          )}
        </div>

        {/* ── Text area — generous whitespace, editorial ─────────── */}
        <div style={{ paddingTop: "1.25rem", paddingBottom: "0.5rem" }}>

          {/* Category — small, muted, above name */}
          {showCategory && category && (
            <p
              className="label-caps"
              style={{
                color: "var(--warm-grey)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
                opacity: 0.7,
              }}
            >
              {category}
            </p>
          )}

          {/* Product name — large, light Cormorant, no color-change on hover */}
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "0.01em",
              color: "var(--ivory)",
              marginBottom: "0.6rem",
              position: "relative",
              display: "inline-block",
            }}
          >
            {product.name}
            {/* Subtle gold underline that draws in on hover */}
            <span
              className="absolute bottom-0 left-0 w-full h-px"
              style={{
                background: "var(--gold)",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.5s var(--ease-out-expo)",
                opacity: 0.5,
              }}
            />
          </h3>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: colourAttr ? "0.85rem" : "0",
            }}
          >
            {product.on_sale && product.sale_price ? (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1rem",
                    color: "var(--gold)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {formatPrice(product.sale_price)}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "0.85rem",
                    color: "var(--warm-grey)",
                    textDecoration: "line-through",
                    opacity: 0.6,
                  }}
                >
                  {formatPrice(product.regular_price)}
                </span>
              </>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1rem",
                  color: "var(--warm-grey-light)",
                  letterSpacing: "0.02em",
                }}
              >
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Colour swatches — square, refined */}
          {colourAttr && colourAttr.options.length > 1 && (
            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
              {colourAttr.options.slice(0, 5).map((colour) => (
                <SquareSwatch key={colour} colour={colour} />
              ))}
              {colourAttr.options.length > 5 && (
                <span
                  className="label-caps"
                  style={{ color: "var(--warm-grey)", fontSize: "0.5rem", marginLeft: "0.15rem" }}
                >
                  +{colourAttr.options.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* CSS for group hover states via style tag */}
      <style>{`
        article:hover .wishlist-btn { opacity: 1 !important; transform: translateY(0) !important; }
        article:hover h3 > span { transform: scaleX(1) !important; }
      `}</style>
    </article>
  );
}

// ─── Square swatch — more refined than round ─────────────────────────────────

const COLOUR_MAP: Record<string, string> = {
  black: "#1a1a1a", white: "#f2ede4", ivory: "#f2ede4", gold: "#c9a96e",
  navy: "#1a2744", camel: "#b8905c", brown: "#5a3520", grey: "#6a6460",
  gray: "#6a6460", cream: "#ede8d8", tan: "#c8aa80", burgundy: "#6e2b32",
  green: "#2a4e1a", khaki: "#b8a87c", beige: "#c8aa80", charcoal: "#2a2a2a",
  sand: "#c4b090", stone: "#9a9080",
};

function SquareSwatch({ colour }: { colour: string }) {
  const bg = COLOUR_MAP[colour.toLowerCase()] ?? "var(--warm-grey)";
  const isLight = ["white", "ivory", "cream"].includes(colour.toLowerCase());

  return (
    <span
      title={colour}
      aria-label={colour}
      style={{
        display: "block",
        width: "10px",
        height: "10px",
        background: bg,
        border: isLight ? "1px solid rgba(255,255,255,0.2)" : "none",
        flexShrink: 0,
      }}
    />
  );
}
