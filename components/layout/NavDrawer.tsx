"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./Header";

interface Props {
  links:          NavItem[];
  isOpen:         boolean;
  onClose:        () => void;
  onOpenSearch?:  () => void;
  onOpenCart?:    () => void;
  cartCount?:     number;
}

export default function NavDrawer({ links, isOpen, onClose, onOpenSearch, onOpenCart, cartCount = 0 }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted,  setMounted]  = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => { setExpanded(null); onClose(); }, [pathname]);

  const toggle = (label: string) => setExpanded(p => p === label ? null : label);

  if (!mounted) return null;

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position:             "fixed",
          inset:                0,
          zIndex:               110,
          background:           "rgba(4,3,6,0.55)",
          backdropFilter:       "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity:              isOpen ? 1 : 0,
          pointerEvents:        isOpen ? "auto" : "none",
          transition:           "opacity 0.6s var(--ease-out-expo)",
        }}
      />

      {/* ── Drawer — right side ───────────────────────────────────── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position:             "fixed",
          top:                  0,
          right:                0,
          height:               "100dvh",
          width:                "clamp(320px, 85vw, 460px)",
          zIndex:               120,
          display:              "flex",
          flexDirection:        "column",
          background:           "rgba(5,4,8,0.97)",
          backdropFilter:       "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          borderLeft:           "1px solid rgba(201,169,110,0.14)",
          transform:            isOpen ? "translateX(0)" : "translateX(100%)",
          transition:           "transform 0.6s var(--ease-out-expo)",
          willChange:           "transform",
          overflowY:            "auto",
          overflowX:            "hidden",
        }}
      >
        {/* ── Head ──────────────────────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "0 clamp(1.5rem, 4vw, 2.5rem)",
            height:         "var(--header-height)",
            borderBottom:   "1px solid rgba(201,169,110,0.08)",
            flexShrink:     0,
          }}
        >
          <Link
            href="/home"
            onClick={onClose}
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "1.15rem",
              fontWeight:    300,
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color:         "var(--gold)",
              textDecoration:"none",
              paddingRight:  "0.44em",
              lineHeight:    1,
            }}
          >
            Covora
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              width:          "36px",
              height:         "36px",
              color:          "rgba(244,239,230,0.4)",
              background:     "none",
              border:         "1px solid rgba(255,255,255,0.08)",
              cursor:         "pointer",
              transition:     "color 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(244,239,230,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* ── Utility strip ─────────────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "flex-end",
            gap:            "0.25rem",
            padding:        "0.9rem clamp(1.5rem, 4vw, 2.5rem)",
            borderBottom:   "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {onOpenSearch && (
            <DrawerUtilBtn
              label="Search"
              onClick={() => { onClose(); onOpenSearch(); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="11" cy="11" r="7.5" />
                <path d="m20.5 20.5-4-4" strokeLinecap="round" />
              </svg>
            </DrawerUtilBtn>
          )}
          <DrawerUtilBtn label="Account" href="/account" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </DrawerUtilBtn>
          <DrawerUtilBtn label="Wishlist" href="/wishlist" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </DrawerUtilBtn>
          {onOpenCart && (
            <DrawerUtilBtn label="Bag" onClick={() => { onClose(); onOpenCart(); }} badge={cartCount}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </DrawerUtilBtn>
          )}
        </div>

        {/* ── Nav items ─────────────────────────────────────────── */}
        <nav style={{ flex: 1, padding: "clamp(1rem, 3vw, 2rem) 0" }}>
          {links.map((item, i) => {
            const hasSub     = !!item.mega;
            const isExpanded = expanded === item.label;
            const isActive   = pathname === item.href;
            const delay      = isOpen ? `${i * 55 + 80}ms` : "0ms";

            return (
              <div
                key={item.href}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  opacity:      isOpen ? 1 : 0,
                  transform:    isOpen ? "translateX(0)" : "translateX(28px)",
                  transition:   `opacity 0.55s ease ${delay}, transform 0.55s var(--ease-out-expo) ${delay}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  <Link
                    href={item.href}
                    onClick={hasSub ? e => { e.preventDefault(); toggle(item.label); } : onClose}
                    style={{
                      flex:          1,
                      display:       "flex",
                      alignItems:    "center",
                      gap:           "0.75rem",
                      padding:       "clamp(1rem, 2.5vw, 1.3rem) clamp(1.5rem, 4vw, 2.5rem)",
                      fontFamily:    "var(--font-cormorant)",
                      fontSize:      "clamp(1.8rem, 4vw, 2.5rem)",
                      fontWeight:    300,
                      letterSpacing: "0.01em",
                      color:         isActive ? "var(--gold)" : "rgba(244,239,230,0.82)",
                      textDecoration:"none",
                      transition:    "color 0.25s ease",
                      lineHeight:    1.1,
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "var(--gold-light)"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(244,239,230,0.82)"; }}
                  >
                    {/* Number */}
                    <span
                      style={{
                        fontFamily:    "var(--font-inter)",
                        fontSize:      "0.44rem",
                        fontWeight:    400,
                        letterSpacing: "0.12em",
                        color:         isActive ? "rgba(201,169,110,0.6)" : "rgba(255,255,255,0.2)",
                        alignSelf:     "flex-start",
                        marginTop:     "0.7rem",
                        flexShrink:    0,
                        transition:    "color 0.25s ease",
                        minWidth:      "1.5rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    {isActive && (
                      <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                    )}
                  </Link>

                  {hasSub && (
                    <button
                      onClick={() => toggle(item.label)}
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                      style={{
                        padding:    "0 clamp(1.2rem, 3vw, 2rem)",
                        color:      isExpanded ? "var(--gold)" : "rgba(255,255,255,0.2)",
                        background: "none",
                        border:     "none",
                        cursor:     "pointer",
                        transition: "color 0.25s ease, transform 0.35s var(--ease-out-expo)",
                        transform:  isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                        flexShrink: 0,
                        display:    "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M6 1v10M1 6h10" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub panel */}
                {hasSub && (
                  <div style={{ maxHeight: isExpanded ? "600px" : "0", overflow: "hidden", transition: "max-height 0.5s var(--ease-out-expo)" }}>
                    <div style={{ padding: "1rem clamp(1.5rem, 4vw, 2.5rem) 1.5rem calc(clamp(1.5rem, 4vw, 2.5rem) + 2rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${item.mega!.columns.length}, 1fr)`, gap: "1.5rem", marginBottom: item.mega?.featured ? "1.5rem" : 0 }}>
                        {item.mega!.columns.map(col => (
                          <div key={col.heading}>
                            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.45rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: "0.9rem" }}>
                              {col.heading}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                              {col.links.map(link => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={onClose}
                                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", textDecoration: "none", letterSpacing: "0.02em", padding: "0.2rem 0", transition: "color 0.2s ease" }}
                                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(244,239,230,0.75)")}
                                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {item.mega?.featured && (
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.1rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                          {item.mega.featured.map(f => (
                            <Link
                              key={f.label}
                              href={f.href}
                              onClick={onClose}
                              style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 300, color: "rgba(255,255,255,0.38)", textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s ease" }}
                              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                            >
                              {f.label}
                              {f.tag && (
                                <span style={{ fontSize: "0.4rem", fontFamily: "var(--font-inter)", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.15rem 0.45rem", background: "rgba(201,169,110,0.1)", color: "var(--gold)", border: "1px solid rgba(201,169,110,0.22)" }}>
                                  {f.tag}
                                </span>
                              )}
                              <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.15)", fontSize: "0.75rem" }}>→</span>
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

        {/* ── Footer ────────────────────────────────────────────── */}
        <div
          style={{
            borderTop:  "1px solid rgba(201,169,110,0.1)",
            padding:    "1.5rem clamp(1.5rem, 4vw, 2.5rem)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {[
              { label: "Contact", href: "/contact" },
              { label: "FAQs",    href: "/faq"     },
              { label: "Returns", href: "/returns"  },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,169,110,0.65)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.42rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.15)" }}>
              © {new Date().getFullYear()} Covora Lumière
            </p>
            <div style={{ display: "flex", gap: "0.65rem" }}>
              <div style={{ width: "18px", height: "1px", background: "rgba(201,169,110,0.25)" }} />
              <div style={{ width: "8px",  height: "1px", background: "rgba(201,169,110,0.12)" }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Utility button ────────────────────────────────────────────────────────────

function DrawerUtilBtn({
  label, href, onClick, children, badge = 0,
}: {
  label: string; href?: string; onClick?: () => void;
  children: React.ReactNode; badge?: number;
}) {
  const style: React.CSSProperties = {
    position:       "relative",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    width:          "38px",
    height:         "38px",
    color:          "rgba(244,239,230,0.38)",
    background:     "none",
    border:         "1px solid rgba(255,255,255,0.07)",
    cursor:         "pointer",
    transition:     "color 0.2s ease, border-color 0.2s ease",
    textDecoration: "none",
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--gold)";
    e.currentTarget.style.borderColor = "rgba(201,169,110,0.28)";
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "rgba(244,239,230,0.38)";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
  };

  const badge_el = badge > 0 ? (
    <span style={{
      position: "absolute", top: "-5px", right: "-5px",
      width: "14px", height: "14px", borderRadius: "50%",
      background: "var(--gold)", color: "var(--black)",
      fontSize: "0.42rem", fontWeight: 600, fontFamily: "var(--font-inter)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {badge > 9 ? "9+" : badge}
    </span>
  ) : null;

  if (href) return (
    <Link href={href} aria-label={label} style={style} onMouseEnter={enter} onMouseLeave={leave} onClick={onClick}>
      {children}{badge_el}
    </Link>
  );
  return (
    <button aria-label={label} onClick={onClick} style={style} onMouseEnter={enter} onMouseLeave={leave}>
      {children}{badge_el}
    </button>
  );
}
