"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLink  { label: string; href: string; }
interface NavItem  { label: string; href: string; mega?: { columns: { heading: string; links: NavLink[] }[] } }

interface MobileMenuProps {
  links:    NavItem[];
  isOpen:   boolean;
  onClose:  () => void;
}

export default function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset expansion on close
  useEffect(() => {
    if (!isOpen) setExpanded(null);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[88vw] max-w-[400px] z-[120] flex flex-col",
          "transition-transform duration-[520ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "#FFFFFF", borderRight: "1px solid rgba(0,0,0,0.07)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            height: "var(--header-height)",
            padding: "0 1.5rem",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <Link
            href="/home"
            onClick={onClose}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize:   "1.35rem",
              fontWeight: 300,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "var(--gold-dark)",
              textDecoration: "none",
              paddingRight: "0.42em",
            }}
          >
            Covora
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{ color: "#888888", transition: "color var(--transition-fast)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto" style={{ padding: "1.5rem 0" }}>
          {links.map((item, i) => {
            const hasSub = !!item.mega;
            const isExpanded = expanded === item.label;

            return (
              <div key={item.href} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={hasSub ? undefined : onClose}
                    className={cn(
                      "flex-1 py-5 px-6",
                      "opacity-0",
                      isOpen && "animate-fade-up"
                    )}
                    style={{
                      fontFamily:    "var(--font-cormorant)",
                      fontSize:      "clamp(1.4rem, 4vw, 1.7rem)",
                      fontWeight:    300,
                      color:         "#222222",
                      textDecoration:"none",
                      letterSpacing: "0.02em",
                      display:       "block",
                      animationDelay:`${i * 50 + 80}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {item.label}
                  </Link>

                  {hasSub && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : item.label)}
                      style={{
                        padding: "1.25rem 1.5rem",
                        color:   "#AAAAAA",
                        transition: "color var(--transition-fast), transform 0.3s ease",
                        transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }}
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M7 1v12M1 7h12" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub-links */}
                {hasSub && isExpanded && (
                  <div
                    style={{
                      background:   "#F7F5F2",
                      borderTop:    "1px solid rgba(0,0,0,0.06)",
                      padding:      "1.25rem 1.5rem 1.5rem",
                      animation:    "fadeDown 0.25s var(--ease-out-expo) both",
                    }}
                  >
                    {item.mega!.columns.map((col) => (
                      <div key={col.heading} style={{ marginBottom: "1.25rem" }}>
                        <p
                          className="label-caps"
                          style={{ fontSize: "0.5rem", color: "var(--gold-dark)", marginBottom: "0.75rem" }}
                        >
                          {col.heading}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {col.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={onClose}
                              style={{
                                fontFamily:    "var(--font-inter)",
                                fontSize:      "0.8rem",
                                color:         "#777777",
                                textDecoration:"none",
                                letterSpacing: "0.02em",
                                padding:       "0.35rem 0",
                                transition:    "color var(--transition-fast)",
                              }}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer links */}
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
            padding:   "1.5rem",
            display:   "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Account", href: "/account" },
              { label: "Contact", href: "/contact" },
              { label: "FAQs",    href: "/faq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="label-caps"
                style={{
                  fontSize:      "0.52rem",
                  color:         "#888888",
                  textDecoration:"none",
                  transition:    "color var(--transition-fast)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p
            className="label-caps"
            style={{ fontSize: "0.48rem", color: "#BBBBBB" }}
          >
            © {new Date().getFullYear()} Covora — Refined Luxury
          </p>
        </div>
      </div>
    </>
  );
}
