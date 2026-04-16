"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/cart";

export default function FloatingActions() {
  const pathname  = usePathname();
  const { itemCount, openCart } = useCart();

  // Hide on landing/entry/account pages
  if (
    pathname === "/" ||
    pathname === "/home" ||
    pathname.startsWith("/account")
  ) return null;

  return (
    <div className="covora-fab" aria-label="Quick actions">

      {/* Wishlist */}
      <Link
        href="/wishlist"
        aria-label="Wishlist"
        className="covora-fab-btn"
        style={{ position: "relative" }}
      >
        <svg width="17" height="15" viewBox="0 0 22 20" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M11 18.5S1.5 12.5 1.5 6.5a5 5 0 0 1 9.5-2.17A5 5 0 0 1 20.5 6.5c0 6-9.5 12-9.5 12z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Account */}
      <Link
        href="/account"
        aria-label="Account"
        className="covora-fab-btn"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Cart */}
      <button
        onClick={openCart}
        aria-label={`Bag — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
        className="covora-fab-btn"
        style={{ position: "relative" }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
          <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {itemCount > 0 && (
          <span className="covora-fab-badge">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>

    </div>
  );
}
