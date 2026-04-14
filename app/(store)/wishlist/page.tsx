"use client";

import Link from "next/link";
import { useAuth } from "@/store/auth";

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div
        style={{
          background:     "#FAFAF8",
          minHeight:      "100vh",
          paddingTop:     "var(--header-height)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ width: "40px", height: "1px", background: "var(--border-gold)", margin: "0 auto 2.5rem" }} />
          <h1
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(2rem, 4vw, 3.5rem)",
              fontWeight:    300,
              color:         "#111111",
              letterSpacing: "0.01em",
              marginBottom:  "1rem",
            }}
          >
            Your Wishlist
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#888888", maxWidth: "320px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Sign in to view your saved pieces and pick up where you left off.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/account/login"  className="btn btn-primary btn-md">Sign In</Link>
            <Link href="/account/signup" className="btn btn-outline btn-md">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: "2rem", marginBottom: "3rem" }}>
          <p className="label-caps" style={{ fontSize: "0.56rem", color: "var(--gold)", marginBottom: "0.75rem" }}>
            My Account
          </p>
          <h1
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight:    300,
              color:         "#111111",
              letterSpacing: "-0.01em",
              lineHeight:    0.95,
            }}
          >
            Wishlist
          </h1>
        </div>

        {/* Empty state */}
        <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
          <HeartIcon />
          <h2
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight:    300,
              color:         "#111111",
              marginTop:     "1.5rem",
              marginBottom:  "0.75rem",
              letterSpacing: "0.02em",
            }}
          >
            Your wishlist is empty
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#888888", maxWidth: "300px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Save pieces you love by tapping the heart on any product.
          </p>
          <Link href="/shop" className="btn btn-primary btn-md">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
