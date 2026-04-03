"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { isOpen, items, itemCount, subtotal, closeCart, removeItem, updateQuantity } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[420px] z-[90] bg-[var(--charcoal)] flex flex-col",
          "transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 h-[72px] border-b border-[var(--border-dark)]">
          <div>
            <p className="label-caps text-[var(--gold)]">Your Bag</p>
            {itemCount > 0 && (
              <p className="text-[var(--warm-grey)] text-xs mt-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <p className="heading-md text-[var(--warm-grey)] font-light">Your bag is empty.</p>
              <p className="text-[var(--warm-grey)] text-sm">Discover the new collection.</p>
              <Button href="/collections" variant="outline" size="sm" onClick={closeCart}>
                Explore Now
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Image */}
                  <Link href={`/product/${item.slug}`} onClick={closeCart} className="shrink-0">
                    <div className="relative w-20 h-28 bg-[var(--charcoal-mid)] overflow-hidden">
                      <Image
                        src={item.image || "/images/placeholder.jpg"}
                        alt={item.imageAlt || item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-[var(--font-cormorant)] text-base text-[var(--ivory)] hover:text-[var(--gold)] transition-colors leading-tight"
                      >
                        {item.name}
                      </Link>
                      {Object.keys(item.selectedAttributes).length > 0 && (
                        <p className="label-caps text-[var(--warm-grey)] mt-1">
                          {Object.entries(item.selectedAttributes)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center border border-[var(--border-dark)]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors text-lg leading-none"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-[var(--off-white)] text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors text-lg leading-none"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-[var(--font-cormorant)] text-[var(--gold)] text-base">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--warm-grey)] hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-[var(--border-dark)]">
            <div className="flex items-center justify-between mb-2">
              <span className="label-caps text-[var(--warm-grey)]">Subtotal</span>
              <span className="font-[var(--font-cormorant)] text-xl text-[var(--ivory)]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-[var(--warm-grey)] text-xs mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <Button href="/checkout" variant="primary" className="w-full" onClick={closeCart}>
              Proceed to Checkout
            </Button>
            <Button href="/cart" variant="outline" className="w-full mt-3" onClick={closeCart}>
              View Full Bag
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
