"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";

interface MobileMenuProps {
  links: { label: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
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
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[80vw] max-w-sm z-[70] bg-[var(--charcoal)] flex flex-col",
          "transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 h-[72px] border-b border-[var(--border-dark)]">
          <Logo size="md" />
          <button
            onClick={onClose}
            className="text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-8 py-10">
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block py-4 text-[var(--off-white)] hover:text-[var(--gold)] transition-colors duration-300",
                    "font-[var(--font-cormorant)] text-2xl font-light tracking-wide border-b border-[var(--border-dark)]",
                    "opacity-0 translate-y-2",
                    isOpen && "animate-fade-up"
                  )}
                  style={{ animationDelay: `${i * 60 + 100}ms`, animationFillMode: "forwards" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer links */}
        <div className="px-8 py-8 border-t border-[var(--border-dark)]">
          <div className="flex flex-col gap-3">
            {[
              { label: "Account", href: "/account" },
              { label: "Search", href: "/search" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
