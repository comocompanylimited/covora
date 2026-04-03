"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/store/cart"
import { wcAddToCart } from "@/lib/graphql/cart"

interface Props {
  id: string
  databaseId: number
  name: string
  slug: string
  price?: string | null
  imageUrl?: string | null
}

type AddState = "idle" | "loading" | "added" | "error"

export default function MensProductCard({ id, databaseId, name, slug, price, imageUrl }: Props) {
  const [hovered,  setHovered]  = useState(false)
  const [addState, setAddState] = useState<AddState>("idle")
  const { addItem } = useCart()

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()   // don't navigate — button is inside the Link
    e.stopPropagation()
    if (addState === "loading") return

    setAddState("loading")

    // 1. Optimistic local cart update (keeps header badge accurate immediately)
    addItem({
      productId: databaseId,
      name,
      slug,
      price: price ? parseFloat(price.replace(/[^0-9.]/g, "")) : 0,
      quantity: 1,
      image: imageUrl ?? "",
      imageAlt: name,
      selectedAttributes: {},
      sku: "",
      maxQuantity: null,
    })

    // 2. Real WooCommerce backend sync
    const cart = await wcAddToCart(databaseId, 1)

    if (cart) {
      setAddState("added")
    } else {
      // Local cart already updated — just flag the backend sync failed
      setAddState("error")
    }

    setTimeout(() => setAddState("idle"), 2200)
  }

  const btnLabel =
    addState === "loading" ? "Adding…"  :
    addState === "added"   ? "Added ✓"  :
    addState === "error"   ? "Retry"    :
    "Add to Bag"

  const btnColor =
    addState === "added" ? "rgba(110,180,110,0.85)" :
    addState === "error" ? "#c97a6e"                :
    "var(--gold)"

  return (
    <Link
      href={`/product/${slug}`}
      style={{ display: "block", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#111110",
          border: `1px solid ${hovered ? "rgba(201,169,110,0.28)" : "rgba(201,169,110,0.08)"}`,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.55)"
            : "0 2px 12px rgba(0,0,0,0.3)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* ── Image stage ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 5",
            background: "#141412",
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{
                objectFit: "contain",
                padding: "1.25rem",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: "1rem 1.1rem 1.3rem" }}>

          {/* Gold hairline accent */}
          <div
            style={{
              width: hovered ? "28px" : "16px",
              height: "1px",
              background: "rgba(201,169,110,0.45)",
              marginBottom: "0.75rem",
              transition: "width 0.35s ease",
            }}
          />

          {/* Product name */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              fontWeight: 300,
              letterSpacing: "0.03em",
              color: hovered ? "var(--ivory)" : "var(--off-white)",
              lineHeight: 1.3,
              marginBottom: "0.5rem",
              transition: "color 0.25s ease",
            }}
          >
            {name}
          </p>

          {/* Price */}
          {price && (
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.62rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              {price}
            </p>
          )}

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={addState === "loading"}
            style={{
              width: "100%",
              padding: "0.6rem 0",
              background: addState === "idle" ? "transparent" : btnColor,
              border: `1px solid ${addState === "idle" ? "rgba(201,169,110,0.25)" : btnColor}`,
              cursor: addState === "loading" ? "wait" : "pointer",
              fontFamily: "var(--font-inter)",
              fontSize: "0.52rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: addState === "idle" ? "var(--warm-grey)" : "var(--black)",
              transition: "all 0.25s ease",
              display: "block",
            }}
            onMouseEnter={e => {
              if (addState === "idle") {
                e.currentTarget.style.background = "var(--gold)"
                e.currentTarget.style.borderColor = "var(--gold)"
                e.currentTarget.style.color = "var(--black)"
              }
            }}
            onMouseLeave={e => {
              if (addState === "idle") {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)"
                e.currentTarget.style.color = "var(--warm-grey)"
              }
            }}
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </Link>
  )
}
