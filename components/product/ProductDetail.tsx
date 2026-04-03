"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import type { Product, ProductVariation } from "@/types/product";

interface Props {
  product: Product;
  variations: ProductVariation[];
}

export default function ProductDetail({ product, variations }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [addedConfirm, setAddedConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "care">("description");
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem, openCart } = useCart();

  const matchedVariation = variations.find((v) =>
    v.attributes.every((a) => selectedAttrs[a.name] === a.option)
  );

  const isOutOfStock =
    matchedVariation?.stock_status === "outofstock" ||
    (!matchedVariation && product.stock_status === "outofstock");

  const currentPrice = matchedVariation?.price ?? product.price;
  const currentRegularPrice = matchedVariation?.regular_price ?? product.regular_price;
  const onSale =
    parseFloat(currentPrice) > 0 &&
    parseFloat(currentRegularPrice) > 0 &&
    parseFloat(currentPrice) < parseFloat(currentRegularPrice);

  const allVariationAttrsSelected =
    product.attributes.filter((a) => a.variation).every((a) => selectedAttrs[a.name]);

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    setAdding(true);
    addItem({
      productId: product.id,
      variationId: matchedVariation?.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(currentPrice) || 0,
      quantity,
      image: product.images[0]?.src ?? "",
      imageAlt: product.images[0]?.alt ?? product.name,
      selectedAttributes: selectedAttrs,
      sku: matchedVariation?.sku ?? product.sku,
      maxQuantity: matchedVariation?.stock_quantity ?? product.stock_quantity,
    });
    await new Promise((r) => setTimeout(r, 500));
    setAdding(false);
    setAddedConfirm(true);
    setTimeout(() => setAddedConfirm(false), 2200);
    openCart();
  };

  return (
    <div
      style={{
        maxWidth: "1500px",
        margin: "0 auto",
        padding: "clamp(1rem, 3vw, 3rem) clamp(1.25rem, 4vw, 4rem)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
        }}
        className="lg:grid-cols-[1.1fr_0.9fr]"
      >

        {/* ══ GALLERY ════════════════════════════════════════════════ */}
        <div
          style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
          className="flex-col-reverse lg:flex-row"
        >
          {/* Thumbnail strip — vertical on desktop */}
          {product.images.length > 1 && (
            <div
              style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}
              className="flex-row overflow-x-auto lg:flex-col lg:overflow-visible lg:w-[72px]"
            >
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "60px",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    outline: "none",
                    transition: "opacity 0.3s ease",
                    opacity: activeImage === i ? 1 : 0.4,
                    boxShadow: activeImage === i
                      ? "inset 0 0 0 1px var(--gold)"
                      : "none",
                  }}
                  className="lg:w-full hover:opacity-70"
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `${product.name} ${i + 1}`}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div
            style={{
              position: "relative",
              flex: 1,
              aspectRatio: "3/4",
              overflow: "hidden",
              background: "var(--charcoal-mid)",
            }}
            className="group"
          >
            {product.images[activeImage] ? (
              <Image
                src={product.images[activeImage].src}
                alt={product.images[activeImage].alt || product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-[1200ms]"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                priority
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "var(--charcoal-mid)" }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "1px",
                    background: "var(--border-mid)",
                  }}
                />
              </div>
            )}

            {/* Image nav arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "rgba(10,10,10,0.6)",
                    border: "1px solid var(--border-dark)",
                    color: "var(--off-white)",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                  }}
                  aria-label="Previous image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "rgba(10,10,10,0.6)",
                    border: "1px solid var(--border-dark)",
                    color: "var(--off-white)",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                  }}
                  aria-label="Next image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ══ PRODUCT INFO ════════════════════════════════════════════ */}
        <div
          style={{
            paddingTop: "clamp(0rem, 2vw, 2rem)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Breadcrumb */}
          {product.categories.length > 0 && (
            <p
              className="label-caps"
              style={{
                color: "var(--warm-grey)",
                marginBottom: "1.25rem",
                letterSpacing: "0.2em",
                fontSize: "0.57rem",
              }}
            >
              {product.categories.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && <span style={{ margin: "0 0.5rem", opacity: 0.4 }}>/</span>}
                  {c.name}
                </span>
              ))}
            </p>
          )}

          {/* Product name */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              color: "var(--ivory)",
              marginBottom: "1.5rem",
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {onSale ? (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.6rem",
                    color: "var(--gold)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {formatPrice(currentPrice)}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.2rem",
                    color: "var(--warm-grey)",
                    textDecoration: "line-through",
                    opacity: 0.6,
                  }}
                >
                  {formatPrice(currentRegularPrice)}
                </span>
              </>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.6rem",
                  color: "var(--ivory)",
                  letterSpacing: "0.02em",
                }}
              >
                {formatPrice(currentPrice)}
              </span>
            )}
          </div>

          {/* Short description */}
          {product.short_description && (
            <p
              style={{
                color: "var(--warm-grey)",
                fontSize: "0.82rem",
                lineHeight: 1.85,
                marginBottom: "2rem",
                letterSpacing: "0.02em",
                maxWidth: "38ch",
              }}
              dangerouslySetInnerHTML={{
                __html: product.short_description,
              }}
            />
          )}

          {/* Gold rule */}
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, var(--gold), transparent)",
              opacity: 0.25,
              marginBottom: "2rem",
              width: "80px",
            }}
          />

          {/* Variant selectors */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2rem" }}>
            {product.attributes
              .filter((a) => a.visible || a.variation)
              .map((attr) => {
                const isColour =
                  attr.name.toLowerCase() === "colour" || attr.name.toLowerCase() === "color";
                const isSize = attr.name.toLowerCase() === "size";
                return (
                  <div key={attr.id}>
                    {/* Attribute label row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.85rem",
                      }}
                    >
                      <p
                        className="label-caps"
                        style={{ color: "var(--off-white)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                      >
                        {attr.name}
                        {selectedAttrs[attr.name] && (
                          <span
                            style={{
                              marginLeft: "0.5rem",
                              fontFamily: "var(--font-cormorant)",
                              fontSize: "0.85rem",
                              fontWeight: 300,
                              textTransform: "none",
                              letterSpacing: "0.03em",
                              color: "var(--warm-grey-light)",
                            }}
                          >
                            — {selectedAttrs[attr.name]}
                          </span>
                        )}
                      </p>
                      {isSize && (
                        <button
                          className="label-caps"
                          style={{
                            color: "var(--warm-grey)",
                            fontSize: "0.55rem",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            letterSpacing: "0.18em",
                            textDecoration: "underline",
                            textUnderlineOffset: "3px",
                          }}
                        >
                          Size Guide
                        </button>
                      )}
                    </div>

                    {isColour ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                        {attr.options.map((opt) => (
                          <ColourOptionBtn
                            key={opt}
                            colour={opt}
                            selected={selectedAttrs[attr.name] === opt}
                            onClick={() => setSelectedAttrs((p) => ({ ...p, [attr.name]: opt }))}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {attr.options.map((opt) => {
                          const unavailable =
                            variations.length > 0 &&
                            !variations.some(
                              (v) =>
                                v.attributes.some((a) => a.name === attr.name && a.option === opt) &&
                                v.stock_status !== "outofstock"
                            );
                          return (
                            <SizeBtn
                              key={opt}
                              label={opt}
                              selected={selectedAttrs[attr.name] === opt}
                              unavailable={unavailable}
                              onClick={() =>
                                !unavailable &&
                                setSelectedAttrs((p) => ({ ...p, [attr.name]: opt }))
                              }
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Low stock notice */}
          {product.stock_quantity !== null &&
            product.stock_quantity > 0 &&
            product.stock_quantity <= 5 && (
              <p
                className="label-caps"
                style={{
                  color: "var(--gold)",
                  fontSize: "0.57rem",
                  marginBottom: "1.25rem",
                  letterSpacing: "0.2em",
                }}
              >
                Only {product.stock_quantity} remaining
              </p>
            )}

          {/* Quantity + Add to Bag */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
            {/* Qty */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--border-dark)",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: "42px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--warm-grey)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
              >
                −
              </button>
              <span
                style={{
                  width: "34px",
                  textAlign: "center",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  color: "var(--off-white)",
                  letterSpacing: "0.05em",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(q + 1, product.stock_quantity ?? 99))
                }
                style={{
                  width: "42px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--warm-grey)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
              >
                +
              </button>
            </div>

            {/* Add to bag */}
            <button
              onClick={handleAddToCart}
              disabled={
                adding ||
                isOutOfStock ||
                (product.type === "variable" && !allVariationAttrsSelected)
              }
              style={{
                flex: 1,
                height: "52px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                border: "none",
                outline: "none",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.35s var(--ease-luxury)",
                background: isOutOfStock
                  ? "var(--charcoal-mid)"
                  : addedConfirm
                  ? "rgba(201,169,110,0.15)"
                  : "var(--gold)",
                color: isOutOfStock
                  ? "var(--warm-grey)"
                  : addedConfirm
                  ? "var(--gold)"
                  : "var(--black)",
              }}
              onMouseEnter={(e) => {
                if (!isOutOfStock && !addedConfirm)
                  (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                if (!isOutOfStock && !addedConfirm)
                  (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              }}
            >
              {adding ? (
                <LoadingDots />
              ) : addedConfirm ? (
                <>
                  <CheckIcon />
                  Added to Bag
                </>
              ) : isOutOfStock ? (
                "Sold Out"
              ) : product.type === "variable" && !allVariationAttrsSelected ? (
                "Select Options"
              ) : (
                "Add to Bag"
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted((v) => !v)}
              aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
              style={{
                width: "52px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${wishlisted ? "var(--gold)" : "var(--border-dark)"}`,
                background: wishlisted ? "rgba(201,169,110,0.08)" : "transparent",
                color: wishlisted ? "var(--gold)" : "var(--warm-grey)",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!wishlisted) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)";
                  (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                }
              }}
              onMouseLeave={(e) => {
                if (!wishlisted) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-dark)";
                  (e.currentTarget as HTMLElement).style.color = "var(--warm-grey)";
                }
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Trust strip */}
          <div
            style={{
              display: "flex",
              gap: "0",
              borderTop: "1px solid var(--border-dark)",
              borderBottom: "1px solid var(--border-dark)",
              padding: "1.25rem 0",
              marginBottom: "2rem",
            }}
          >
            {[
              { label: "Free Returns", sub: "28 days" },
              { label: "Secure Payment", sub: "Encrypted" },
              { label: "Luxury Packaging", sub: "Complimentary" },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid var(--border-dark)" : "none",
                  padding: "0 0.5rem",
                }}
              >
                <p
                  className="label-caps"
                  style={{ color: "var(--off-white)", fontSize: "0.55rem", marginBottom: "0.25rem" }}
                >
                  {item.label}
                </p>
                <p style={{ color: "var(--warm-grey)", fontSize: "0.68rem" }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Accordion tabs */}
          <div>
            {(["description", "details", "care"] as const).map((tab) => (
              <AccordionTab
                key={tab}
                label={
                  tab === "description" ? "Description" : tab === "details" ? "Materials" : "Care"
                }
                open={activeTab === tab}
                onToggle={() =>
                  setActiveTab((t) => (t === tab ? "description" : tab))
                }
              >
                {tab === "description" && (
                  <div
                    className="covora-prose"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                )}
                {tab === "details" && (
                  <p style={{ color: "var(--warm-grey)", fontSize: "0.82rem", lineHeight: 1.85 }}>
                    {product.acf?.materials ??
                      "Premium natural materials. Full composition available on request."}
                  </p>
                )}
                {tab === "care" && (
                  <p style={{ color: "var(--warm-grey)", fontSize: "0.82rem", lineHeight: 1.85 }}>
                    {product.acf?.care_instructions ??
                      "Handle with care. Refer to the inner care label for specific instructions."}
                  </p>
                )}
              </AccordionTab>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const COLOUR_MAP: Record<string, string> = {
  black: "#1a1a1a", white: "#f2ede4", ivory: "#f2ede4", gold: "#c9a96e",
  navy: "#1a2744", camel: "#b8905c", brown: "#5a3520", grey: "#6a6460",
  gray: "#6a6460", cream: "#ede8d8", tan: "#c8aa80", burgundy: "#6e2b32",
  green: "#2a4e1a", khaki: "#b8a87c", beige: "#c8aa80", charcoal: "#2a2a2a",
};

function ColourOptionBtn({
  colour,
  selected,
  onClick,
}: { colour: string; selected: boolean; onClick: () => void }) {
  const bg = COLOUR_MAP[colour.toLowerCase()] ?? "var(--warm-grey)";
  const isLight = ["white", "ivory", "cream"].includes(colour.toLowerCase());

  return (
    <button
      onClick={onClick}
      title={colour}
      aria-label={colour}
      aria-pressed={selected}
      style={{
        width: "28px",
        height: "28px",
        background: bg,
        border: selected
          ? "2px solid var(--gold)"
          : isLight
          ? "1px solid rgba(255,255,255,0.25)"
          : "2px solid transparent",
        boxShadow: selected ? "0 0 0 1px var(--gold)" : "none",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: selected ? "scale(1.1)" : "scale(1)",
        borderRadius: "0",
        flexShrink: 0,
      }}
    />
  );
}

function SizeBtn({
  label,
  selected,
  unavailable,
  onClick,
}: { label: string; selected: boolean; unavailable: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={unavailable}
      aria-pressed={selected}
      style={{
        minWidth: "52px",
        height: "44px",
        padding: "0 0.75rem",
        fontFamily: "var(--font-inter)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        cursor: unavailable ? "not-allowed" : "pointer",
        border: selected
          ? "1px solid var(--gold)"
          : "1px solid var(--border-dark)",
        background: selected ? "rgba(201,169,110,0.07)" : "transparent",
        color: selected
          ? "var(--gold)"
          : unavailable
          ? "var(--warm-grey-dark)"
          : "var(--off-white)",
        textDecoration: unavailable ? "line-through" : "none",
        opacity: unavailable ? 0.4 : 1,
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        if (!unavailable && !selected) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)";
          (e.currentTarget as HTMLElement).style.color = "var(--ivory)";
        }
      }}
      onMouseLeave={(e) => {
        if (!unavailable && !selected) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-dark)";
          (e.currentTarget as HTMLElement).style.color = "var(--off-white)";
        }
      }}
    >
      {label}
    </button>
  );
}

function AccordionTab({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: "1px solid var(--border-dark)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: open ? "var(--ivory)" : "var(--warm-grey)",
          transition: "color 0.3s ease",
        }}
      >
        <span
          className="label-caps"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
        >
          {label}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.35s var(--ease-luxury)",
            color: "var(--warm-grey)",
          }}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "600px" : "0",
          opacity: open ? 1 : 0,
          transition: "max-height 0.5s var(--ease-out-expo), opacity 0.35s ease",
        }}
      >
        <div style={{ paddingBottom: "1.25rem" }}>{children}</div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "currentColor",
            animation: "pulse 1.2s ease infinite",
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
