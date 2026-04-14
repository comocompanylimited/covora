"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"
import AccountShell from "@/components/account/AccountShell"
import { fetchAllProducts, type Product } from "@/lib/api"

export default function WishlistPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [wishlist,    setWishlist]    = useState<string[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/account/login")
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    fetchAllProducts().then(setAllProducts)
  }, [])

  if (isLoading) return null

  const savedItems = allProducts.filter((p) => wishlist.includes(p.slug))

  function removeItem(slug: string) {
    setWishlist((prev) => prev.filter((s) => s !== slug))
  }

  return (
    <AccountShell>
      {/* Header */}
      <div style={{ marginBottom: "2.25rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          marginBottom: "0.85rem",
        }}>My Account</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 300,
            color: "#111111",
            lineHeight: 1.1,
          }}>Wishlist</h1>
          {savedItems.length > 0 && (
            <span style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              color: "#AAAAAA",
            }}>{savedItems.length} {savedItems.length === 1 ? "item" : "items"}</span>
          )}
        </div>
      </div>

      {savedItems.length === 0 ? (
        <div style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.07)",
          padding: "5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.1rem",
          textAlign: "center",
        }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 300, color: "#333333" }}>
            Your wishlist is empty
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", color: "#AAAAAA", lineHeight: 1.7, maxWidth: "260px" }}>
            Save pieces you love and find them here when you&apos;re ready.
          </p>
          <Link href="/shop" style={{
            marginTop: "0.5rem",
            fontFamily: "var(--font-inter)",
            fontSize: "0.56rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            background: "#111111",
            padding: "0.85rem 2rem",
            textDecoration: "none",
          }}>
            Browse the Collection
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }} className="wishlist-grid">
          {savedItems.map((product) => (
            <div
              key={product.slug}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <Link href={`/product/${product.slug}`} style={{ display: "block", flexShrink: 0 }}>
                <div style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  background: product.bg ?? "#F0EDE8",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {product.src && (
                    <Image
                      src={product.src}
                      alt={product.name}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  {product.badge && (
                    <span style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.46rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#111111",
                      background: "#FFFFFF",
                      padding: "0.2rem 0.5rem",
                    }}>{product.badge}</span>
                  )}
                </div>
              </Link>

              {/* Details */}
              <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "0.75rem" }}>
                <div>
                  <Link href={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
                    <p style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1rem",
                      fontWeight: 300,
                      color: "#111111",
                      lineHeight: 1.2,
                      marginBottom: "0.2rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111111")}
                    >{product.name}</p>
                  </Link>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#AAAAAA" }}>{product.category}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "#333333" }}>
                    {product.price}
                  </p>
                  <button
                    onClick={() => removeItem(product.slug)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#CCCCCC",
                      padding: "0.25rem",
                      display: "flex",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#B84040")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#CCCCCC")}
                    aria-label="Remove from wishlist"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <Link href={`/product/${product.slug}`} style={{
                  display: "block",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.52rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#111111",
                  padding: "0.7rem",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#333333")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#111111")}
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .wishlist-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </AccountShell>
  )
}
