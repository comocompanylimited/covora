"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./Header";

interface Props {
  links:         NavItem[];
  isOpen:        boolean;
  onClose:       () => void;
  onOpenSearch?: () => void;
}

export default function NavDrawer({ links, isOpen, onClose, onOpenSearch }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted,  setMounted]  = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { setExpanded(null); onClose(); }, [pathname]);

  const toggle = (label: string) => setExpanded((p) => (p === label ? null : label));

  if (!mounted) return null;

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        110,
          background:    "rgba(10,8,6,0.45)",
          backdropFilter:"blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity:       isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition:    "opacity 0.55s var(--ease-out-expo)",
        }}
      />

      {/* ── Drawer ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          height:     "100dvh",
          width:      "clamp(300px, 88vw, 440px)",
          zIndex:     120,
          display:    "flex",
          flexDirection: "column",
          background: "#FAFAF8",
          borderRight:"1px solid rgba(0,0,0,0.06)",
          transform:  isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.55s var(--ease-out-expo)",
          willChange: "transform",
        }}
      >
        {/* ── Drawer head ─────────────────────────────────────────── */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            justifyContent: "space-between",
            padding:      "0 1.75rem",
            height:       "var(--header-height)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            flexShrink:   0,
          }}
        >
          {/* Covora wordmark */}
          <Link
            href="/home"
            onClick={onClose}
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "1.3rem",
              fontWeight:    300,
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color:         "var(--gold-dark)",
              textDecoration:"none",
              paddingRight:  "0.44em",
              lineHeight:    1,
            }}
          >
            Covora
          </Link>

          {/* Utility icons row */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Search shortcut */}
            {onOpenSearch && (
              <button
                aria-label="Search"
                onClick={() => { onClose(); onOpenSearch(); }}
                style={iconBtnStyle}
                onMouseEnter={iconHoverOn}
                onMouseLeave={iconHoverOff}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <circle cx="11" cy="11" r="7.5" />
                  <path d="m20.5 20.5-4-4" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {/* Close */}
            <button
              aria-label="Close navigation"
              onClick={onClose}
              style={iconBtnStyle}
              onMouseEnter={iconHoverOn}
              onMouseLeave={iconHoverOff}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Nav items ───────────────────────────────────────────── */}
        <nav
          style={{
            flex:       1,
            overflowY:  "auto",
            overflowX:  "hidden",
            paddingTop: "0.5rem",
          }}
        >
          {links.map((item, i) => {
            const hasSub     = !!item.mega;
            const isExpanded = expanded === item.label;
            const isActive   = pathname === item.href;
            const delay      = isOpen ? `${i * 42 + 60}ms` : "0ms";

            return (
              <div
                key={item.href}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  opacity:      isOpen ? 1 : 0,
                  transform:    isOpen ? "translateX(0)" : "translateX(-16px)",
                  transition:   `opacity 0.5s ease ${delay}, transform 0.5s var(--ease-out-expo) ${delay}`,
                }}
              >
                {/* ── Item row ───────────────────────────────────── */}
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  <Link
                    href={item.href}
                    onClick={hasSub ? (e) => { e.preventDefault(); toggle(item.label); } : onClose}
                    style={{
                      flex:          1,
                      display:       "flex",
                      alignItems:    "center",
                      padding:       "1.1rem 1.75rem",
                      fontFamily:    "var(--font-cormorant)",
                      fontSize:      "clamp(1.55rem, 3.5vw, 1.85rem)",
                      fontWeight:    300,
                      letterSpacing: "0.01em",
                      color:         isActive ? "var(--gold-dark)" : "#1E1E1E",
                      textDecoration:"none",
                      transition:    "color 0.25s ease",
                      lineHeight:    1.15,
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--gold-dark)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#1E1E1E"; }}
                  >
                    {item.label}
                    {/* Gold dot for active */}
                    {isActive && (
                      <span style={{
                        display:      "inline-block",
                        width:        "4px",
                        height:       "4px",
                        borderRadius: "50%",
                        background:   "var(--gold)",
                        marginLeft:   "0.6rem",
                        marginTop:    "0.1rem",
                        flexShrink:   0,
                      }} />
                    )}
                  </Link>

                  {/* Expand toggle */}
                  {hasSub && (
                    <button
                      onClick={() => toggle(item.label)}
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                      style={{
                        padding:    "0 1.5rem",
                        color:      isExpanded ? "var(--gold-dark)" : "#BBBBB5",
                        transition: "color 0.25s ease, transform 0.35s var(--ease-out-expo)",
                        transform:  isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                        flexShrink: 0,
                        display:    "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.1">
                        <path d="M6.5 1v11M1 6.5h11" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* ── Sub-panel ──────────────────────────────────── */}
                {hasSub && (
                  <div
                    style={{
                      maxHeight:  isExpanded ? "600px" : "0",
                      overflow:   "hidden",
                      transition: "max-height 0.5s var(--ease-out-expo)",
                    }}
                  >
                    <div
                      style={{
                        padding:    "1.25rem 1.75rem 1.5rem",
                        borderTop:  "1px solid rgba(0,0,0,0.05)",
                        background: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {/* Columns */}
                      <div
                        style={{
                          display:             "grid",
                          gridTemplateColumns: `repeat(${item.mega!.columns.length}, 1fr)`,
                          gap:                 "1.5rem",
                          marginBottom:        item.mega?.featured ? "1.5rem" : 0,
                        }}
                      >
                        {item.mega!.columns.map((col) => (
                          <div key={col.heading}>
                            <p
                              className="label-caps"
                              style={{ fontSize: "0.48rem", color: "var(--gold)", marginBottom: "0.85rem" }}
                            >
                              {col.heading}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                              {col.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={onClose}
                                  style={{
                                    fontFamily:    "var(--font-inter)",
                                    fontSize:      "0.78rem",
                                    color:         "#888888",
                                    textDecoration:"none",
                                    letterSpacing: "0.02em",
                                    padding:       "0.25rem 0",
                                    transition:    "color 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1E1E1E")}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Featured row */}
                      {item.mega?.featured && (
                        <div
                          style={{
                            borderTop:  "1px solid rgba(0,0,0,0.06)",
                            paddingTop: "1.1rem",
                            display:    "flex",
                            flexDirection: "column",
                            gap:        "0.55rem",
                          }}
                        >
                          <p
                            className="label-caps"
                            style={{ fontSize: "0.45rem", color: "var(--gold)", marginBottom: "0.35rem" }}
                          >
                            Featured
                          </p>
                          {item.mega.featured.map((f) => (
                            <Link
                              key={f.label}
                              href={f.href}
                              onClick={onClose}
                              style={{
                                display:       "flex",
                                alignItems:    "center",
                                gap:           "0.6rem",
                                fontFamily:    "var(--font-cormorant)",
                                fontSize:      "1rem",
                                fontWeight:    300,
                                color:         "#666666",
                                textDecoration:"none",
                                letterSpacing: "0.01em",
                                transition:    "color 0.2s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
                            >
                              <span>{f.label}</span>
                              {f.tag && (
                                <span
                                  style={{
                                    fontSize:   "0.42rem",
                                    fontFamily: "var(--font-inter)",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    padding:    "0.15rem 0.45rem",
                                    background: "rgba(201,169,110,0.1)",
                                    color:      "var(--gold)",
                                    border:     "1px solid rgba(201,169,110,0.22)",
                                    borderRadius: "2px",
                                  }}
                                >
                                  {f.tag}
                                </span>
                              )}
                              {/* Arrow */}
                              <span style={{ marginLeft: "auto", color: "rgba(0,0,0,0.2)", fontSize: "0.7rem" }}>→</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div
          style={{
            borderTop:     "1px solid rgba(0,0,0,0.06)",
            padding:       "1.5rem 1.75rem",
            flexShrink:    0,
            background:    "#FAFAF8",
          }}
        >
          {/* Utility links */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
            {[
              { label: "Account",  href: "/account" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Contact",  href: "/contact"  },
              { label: "FAQs",     href: "/faq"      },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="label-caps"
                style={{
                  fontSize:      "0.5rem",
                  color:         "#AAAAAA",
                  textDecoration:"none",
                  transition:    "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#AAAAAA")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Brand line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p
              className="label-caps"
              style={{ fontSize: "0.44rem", color: "#CCCCCC" }}
            >
              © {new Date().getFullYear()} Covora — Refined Luxury
            </p>
            {/* Gold accent line */}
            <div style={{ width: "24px", height: "1px", background: "linear-gradient(to right, var(--gold), transparent)" }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Shared icon button style helpers ────────────────────────────────────────

const iconBtnStyle: React.CSSProperties = {
  display:    "flex",
  alignItems: "center",
  justifyContent: "center",
  color:      "#AAAAAA",
  background: "none",
  border:     "none",
  cursor:     "pointer",
  padding:    "0.25rem",
  transition: "color 0.2s ease",
};

const iconHoverOn  = (e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "var(--gold-dark)");
const iconHoverOff = (e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "#AAAAAA");
