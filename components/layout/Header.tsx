"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/cart";
import NavDrawer from "./NavDrawer";
import CartDrawer from "../cart/CartDrawer";

// ─── Navigation data ──────────────────────────────────────────────────────────

export interface NavLink  { label: string; href: string; }
export interface NavItem  {
  label:    string;
  href:     string;
  mega?: {
    columns:  { heading: string; links: NavLink[] }[];
    featured?: { label: string; href: string; tag?: string }[];
  };
}

export const NAV_ITEMS: NavItem[] = [
  { label: "New In",   href: "/new-in" },
  { label: "Shop All", href: "/shop"   },
  {
    label: "Clothing",
    href:  "/category/clothing",
    mega: {
      columns: [
        {
          heading: "By Style",
          links: [
            { label: "Dresses",          href: "/category/dresses"   },
            { label: "Tops & Blouses",   href: "/category/tops"      },
            { label: "Knitwear",         href: "/category/knitwear"  },
            { label: "Co-ords",          href: "/category/co-ords"   },
            { label: "Outerwear",        href: "/category/outerwear" },
            { label: "Swimwear",         href: "/category/swimwear"  },
          ],
        },
        {
          heading: "By Type",
          links: [
            { label: "Bottoms",          href: "/category/bottoms"   },
            { label: "Denim",            href: "/category/denim"     },
            { label: "Loungewear",       href: "/category/loungewear"},
            { label: "Lingerie & Sleep", href: "/category/lingerie"  },
            { label: "Activewear",       href: "/category/activewear"},
          ],
        },
      ],
      featured: [
        { label: "New Season",  href: "/new-in",     tag: "New"     },
        { label: "Bestsellers", href: "/collections"               },
        { label: "Exclusives",  href: "/collections", tag: "Limited" },
      ],
    },
  },
  {
    label: "Shoes & Bags",
    href:  "/category/shoes-bags",
    mega: {
      columns: [
        {
          heading: "Shoes",
          links: [
            { label: "Heels",    href: "/category/heels"    },
            { label: "Flats",    href: "/category/flats"    },
            { label: "Boots",    href: "/category/boots"    },
            { label: "Sneakers", href: "/category/sneakers" },
            { label: "Sandals",  href: "/category/sandals"  },
            { label: "Mules",    href: "/category/mules"    },
          ],
        },
        {
          heading: "Bags & Accessories",
          links: [
            { label: "Tote Bags",   href: "/category/totes"     },
            { label: "Clutches",    href: "/category/clutches"   },
            { label: "Crossbody",   href: "/category/crossbody"  },
            { label: "Mini Bags",   href: "/category/mini-bags"  },
            { label: "Jewellery",   href: "/category/jewellery"  },
            { label: "Scarves",     href: "/category/scarves"    },
          ],
        },
      ],
      featured: [
        { label: "New Shoes", href: "/new-in",               tag: "New" },
        { label: "Bag Edit",  href: "/collections"                     },
        { label: "Jewellery", href: "/category/jewellery"              },
      ],
    },
  },
  { label: "Beauty",      href: "/beauty"      },
  { label: "Collections", href: "/collections" },
  { label: "Sale",        href: "/sale"        },
];

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollDir,  setScrollDir]  = useState<"up" | "down">("up");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const isLanding = pathname === "/" || pathname === "/home";

  // Suppress header on pages with their own header
  if (pathname === "/mens" || pathname === "/womens") return null;

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setScrollDir(y > lastY ? "down" : "up");
      lastY = y;
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setDrawerOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isSolid  = !isLanding || scrolled || drawerOpen;
  const isHidden = !isLanding && scrolled && scrollDir === "down" && !drawerOpen;
  const hideChrome = isLanding && !scrolled && !drawerOpen;

  return (
    <>
      {/* ── Header shell ─────────────────────────────────────────── */}
      <header
        style={{
          position:            "fixed",
          top:                 0,
          left:                0,
          right:               0,
          zIndex:              100,
          transition:          "transform 0.5s var(--ease-out-expo), background 0.5s ease, border-color 0.5s ease",
          transform:           isHidden ? "translateY(-100%)" : "translateY(0)",
          background:          isSolid  ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter:      isSolid  ? "blur(20px) saturate(140%)" : "none",
          WebkitBackdropFilter:isSolid  ? "blur(20px) saturate(140%)" : "none",
          borderBottom:        `1px solid ${isSolid ? "rgba(0,0,0,0.07)" : "transparent"}`,
        }}
      >
        <div
          className="relative flex items-center w-full"
          style={{
            height:     isLanding && !scrolled ? "var(--header-height-lg)" : "var(--header-height)",
            padding:    "0 clamp(1.5rem, 3.5vw, 3.5rem)",
            transition: "height 0.5s var(--ease-out-expo)",
          }}
        >
          {/* ── Menu trigger ─────────────────────────────────────── */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            className="relative z-10 flex flex-col gap-[5px] p-2 -ml-2 group"
            style={{
              opacity:       hideChrome ? 0 : 1,
              pointerEvents: hideChrome ? "none" : "auto",
              transition:    "opacity 0.45s ease",
            }}
          >
            <span
              style={{
                display:    "block",
                width:      "20px",
                height:     "1px",
                background: isSolid ? "#555555" : "var(--ivory)",
                transition: "all 0.35s ease",
              }}
            />
            <span
              style={{
                display:    "block",
                width:      "13px",
                height:     "1px",
                background: isSolid ? "var(--gold-dark)" : "var(--gold)",
                transition: "all 0.35s ease",
                opacity:    0.85,
              }}
            />
            <span
              style={{
                display:    "block",
                width:      "8px",
                height:     "1px",
                background: isSolid ? "#AAAAAA" : "rgba(244,239,230,0.45)",
                transition: "all 0.35s ease",
              }}
            />
          </button>

          {/* ── Logo — centred ──────────────────────────────────── */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <Link
              href="/home"
              aria-label="Covora — Home"
              style={{
                fontFamily:    "var(--font-cormorant)",
                fontSize:      isLanding && !scrolled ? "clamp(1.5rem, 2.5vw, 2.2rem)" : "clamp(1.2rem, 1.8vw, 1.7rem)",
                fontWeight:    300,
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color:         isSolid ? "var(--gold-dark)" : "var(--gold)",
                display:       "block",
                paddingRight:  "0.5em",
                textDecoration:"none",
                lineHeight:    1,
                transition:    "font-size 0.5s var(--ease-out-expo), color 0.3s ease",
              }}
            >
              Covora
            </Link>
          </div>

          {/* ── Actions — right ─────────────────────────────────── */}
          <div
            className="flex items-center ml-auto"
            style={{
              gap:           "clamp(0.85rem, 1.4vw, 1.5rem)",
              opacity:       hideChrome ? 0 : 1,
              pointerEvents: hideChrome ? "none" : "auto",
              transition:    "opacity 0.45s ease",
            }}
          >
            <IconAction label="Search" onClick={() => setSearchOpen(true)} baseColor={isSolid ? "#666666" : "var(--ivory)"}>
              <SearchIcon />
            </IconAction>
            <IconAction label="Account" href="/account" className="hidden sm:flex" baseColor={isSolid ? "#666666" : "var(--ivory)"}>
              <AccountIcon />
            </IconAction>
            <IconAction label="Wishlist" href="/wishlist" className="hidden sm:flex" baseColor={isSolid ? "#666666" : "var(--ivory)"}>
              <WishlistIcon />
            </IconAction>
            {/* Bag */}
            <button
              onClick={openCart}
              aria-label={`Your bag — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
              className="relative flex items-center justify-center"
              style={{ color: isSolid ? "#666666" : "var(--ivory)", transition: "color var(--transition-fast)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isSolid ? "#666666" : "var(--ivory)")}
            >
              <BagIcon />
              {itemCount > 0 && (
                <span
                  className="absolute flex items-center justify-center"
                  style={{
                    top: "-6px", right: "-6px",
                    width: "15px", height: "15px",
                    borderRadius: "50%",
                    background:  "var(--gold)",
                    color:       "var(--black)",
                    fontSize:    "0.45rem",
                    fontWeight:  600,
                    fontFamily:  "var(--font-inter)",
                    letterSpacing: "0",
                  }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Search overlay ─────────────────────────────────────── */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Nav drawer — all screen sizes ──────────────────────── */}
      <NavDrawer
        links={NAV_ITEMS}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenSearch={() => { setDrawerOpen(false); setSearchOpen(true); }}
        onOpenCart={() => { setDrawerOpen(false); openCart(); }}
        cartCount={itemCount}
      />

      {/* ── Cart drawer ────────────────────────────────────────── */}
      <CartDrawer />
    </>
  );
}

// ─── IconAction ───────────────────────────────────────────────────────────────

function IconAction({
  label, href, onClick, children, className, baseColor = "var(--warm-grey)",
}: {
  label: string; href?: string; onClick?: () => void;
  children: React.ReactNode; className?: string; baseColor?: string;
}) {
  const style: React.CSSProperties = { color: baseColor, transition: "color var(--transition-fast)" };
  const enter = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "var(--gold-dark)");
  const leave = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = baseColor);

  if (href) return (
    <Link href={href} aria-label={label} className={`flex items-center justify-center ${className ?? ""}`}
      style={style} onMouseEnter={enter} onMouseLeave={leave}>
      {children}
    </Link>
  );
  return (
    <button aria-label={label} onClick={onClick}
      className={`flex items-center justify-center ${className ?? ""}`}
      style={style} onMouseEnter={enter} onMouseLeave={leave}>
      {children}
    </button>
  );
}

// ─── Search overlay ───────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { const t = setTimeout(() => inputRef.current?.focus(), 100); return () => clearTimeout(t); }
    else setQuery("");
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    onClose();
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 98,
          background: "rgba(0,0,0,0.2)", backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.48s var(--ease-out-expo)",
        }}
      >
        <div
          style={{
            background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.07)",
            paddingTop: "96px", paddingBottom: "3.5rem",
            paddingLeft: "clamp(1.5rem, 6vw, 8rem)",
            paddingRight: "clamp(1.5rem, 6vw, 8rem)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
              <span className="label-caps" style={{ fontSize: "0.48rem", letterSpacing: "0.42em", color: "rgba(154,117,64,0.5)" }}>
                Search Covora
              </span>
              <button
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#999999", fontFamily: "var(--font-inter)",
                  fontSize: "0.48rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  transition: "color 0.2s ease", padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#999999")}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1">
                  <path d="M1 1l8 8M9 1L1 9" strokeLinecap="round" />
                </svg>
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative", borderBottom: `1px solid ${query ? "rgba(154,117,64,0.5)" : "rgba(0,0,0,0.12)"}`, paddingBottom: "1rem", transition: "border-color 0.3s ease" }}>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  style={{
                    width: "100%", background: "transparent", border: "none", outline: "none",
                    fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4.5vw, 4rem)",
                    fontWeight: 300, color: "#111111", caretColor: "rgba(154,117,64,0.8)",
                    lineHeight: 1, letterSpacing: "-0.01em",
                  }}
                />
                {query && (
                  <button
                    type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear"
                    style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#AAAAAA", padding: "0.3rem" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem" }}>
                <span className="label-caps" style={{ fontSize: "0.42rem", color: "#AAAAAA" }}>
                  {query ? "↵ to search" : "Start typing to search"}
                </span>
                <span className="label-caps" style={{ fontSize: "0.42rem", color: "#AAAAAA" }}>Esc to close</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><circle cx="11" cy="11" r="7.5" /><path d="m20.5 20.5-4-4" strokeLinecap="round" /></svg>;
}
function AccountIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21" /><circle cx="12" cy="7" r="4" /></svg>;
}
function WishlistIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
}
function BagIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
}
