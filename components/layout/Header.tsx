"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import MobileMenu from "./MobileMenu";
import CartDrawer from "../cart/CartDrawer";

// ─── Navigation structure ─────────────────────────────────────────────────────

interface NavLink { label: string; href: string; }

interface NavItem {
  label:    string;
  href:     string;
  mega?:    {
    columns: {
      heading: string;
      links:   NavLink[];
    }[];
    featured?: { label: string; href: string; tag?: string; }[];
  };
}

const NAV_LEFT: NavItem[] = [
  { label: "New In",   href: "/new-in" },
  { label: "Shop All", href: "/shop" },
  {
    label: "Clothing",
    href:  "/category/clothing",
    mega: {
      columns: [
        {
          heading: "By Style",
          links: [
            { label: "Dresses",          href: "/category/dresses" },
            { label: "Tops & Blouses",   href: "/category/tops" },
            { label: "Knitwear",         href: "/category/knitwear" },
            { label: "Co-ords",          href: "/category/co-ords" },
            { label: "Outerwear",        href: "/category/outerwear" },
            { label: "Swimwear",         href: "/category/swimwear" },
          ],
        },
        {
          heading: "By Type",
          links: [
            { label: "Bottoms",          href: "/category/bottoms" },
            { label: "Denim",            href: "/category/denim" },
            { label: "Loungewear",       href: "/category/loungewear" },
            { label: "Lingerie & Sleep", href: "/category/lingerie" },
            { label: "Activewear",       href: "/category/activewear" },
          ],
        },
      ],
      featured: [
        { label: "New Season", href: "/new-in",       tag: "New" },
        { label: "Bestsellers", href: "/collections",  tag: undefined },
        { label: "Exclusives",  href: "/collections",  tag: "Limited" },
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
            { label: "Heels",         href: "/category/heels" },
            { label: "Flats",         href: "/category/flats" },
            { label: "Boots",         href: "/category/boots" },
            { label: "Sneakers",      href: "/category/sneakers" },
            { label: "Sandals",       href: "/category/sandals" },
            { label: "Mules",         href: "/category/mules" },
          ],
        },
        {
          heading: "Bags & Accessories",
          links: [
            { label: "Tote Bags",     href: "/category/totes" },
            { label: "Clutches",      href: "/category/clutches" },
            { label: "Crossbody",     href: "/category/crossbody" },
            { label: "Mini Bags",     href: "/category/mini-bags" },
            { label: "Jewellery",     href: "/category/jewellery" },
            { label: "Scarves",       href: "/category/scarves" },
          ],
        },
      ],
      featured: [
        { label: "New Shoes",    href: "/new-in",       tag: "New" },
        { label: "Bag Edit",     href: "/collections",  tag: undefined },
        { label: "Jewellery",    href: "/category/jewellery", tag: undefined },
      ],
    },
  },
  { label: "Beauty", href: "/beauty" },
];

const NAV_RIGHT: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Sale",        href: "/sale" },
];

const ALL_NAV = [...NAV_LEFT, ...NAV_RIGHT];

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [scrollDir,   setScrollDir]   = useState<"up" | "down">("up");
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const isLanding = pathname === "/" || pathname === "/home";
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Suppress header on isolated pages with their own header
  if (pathname === "/mens" || pathname === "/womens") return null;

  // Scroll behaviour
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

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [pathname]);

  // Escape key closes search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSearchOpen(false); setActiveMenu(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isSolid  = !isLanding || scrolled || !!activeMenu;
  const isHidden = !isLanding && scrolled && scrollDir === "down" && !activeMenu;

  function openMenu(label: string) {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(label);
  }

  function closeMenu() {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }

  function keepMenu() {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }

  const activeItem = ALL_NAV.find((n) => n.label === activeMenu);
  const hasMega    = !!activeItem?.mega;

  return (
    <>
      {/* ── Header shell ───────────────────────────────────────── */}
      <header
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          right:        0,
          zIndex:       100,
          transition:   "transform 0.5s var(--ease-out-expo), background 0.5s ease, border-color 0.5s ease",
          transform:    isHidden ? "translateY(-100%)" : "translateY(0)",
          background:   isSolid  ? "rgba(255,255,255,0.97)"  : "transparent",
          backdropFilter:        isSolid ? "blur(20px) saturate(140%)" : "none",
          WebkitBackdropFilter:  isSolid ? "blur(20px) saturate(140%)" : "none",
          borderBottom: `1px solid ${isSolid ? "rgba(0,0,0,0.08)" : "transparent"}`,
        }}
        onMouseLeave={closeMenu}
      >
        {/* ── Top bar ─────────────────────────────────────────── */}
        <div
          className="relative flex items-center w-full"
          style={{
            height:     isLanding && !scrolled ? "var(--header-height-lg)" : "var(--header-height)",
            padding:    "0 clamp(1.5rem, 3.5vw, 3.5rem)",
            transition: "height 0.5s var(--ease-out-expo)",
          }}
        >
          {/* Menu trigger — mobile only on lg+, always on smaller */}
          <button
            className="relative z-10 flex flex-col gap-[5px] p-2 -ml-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span style={{ display: "block", width: "22px", height: "1px", background: isSolid ? "#333333" : "var(--ivory)", transition: "all 0.3s ease" }} />
            <span style={{ display: "block", width: "14px", height: "1px", background: isSolid ? "var(--gold-dark)" : "var(--gold)", transition: "all 0.3s ease" }} />
          </button>

          {/* Hamburger for lg — keeps full menu accessible */}
          <button
            className="relative z-10 hidden lg:flex flex-col gap-[5px] p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span style={{ display: "block", width: "18px", height: "1px", background: isSolid ? "#BBBBBB" : "rgba(244,239,230,0.5)", transition: "all 0.3s ease" }} />
            <span style={{ display: "block", width: "11px", height: "1px", background: isSolid ? "var(--gold-dark)" : "var(--gold)", opacity: 0.7, transition: "all 0.3s ease" }} />
          </button>

          {/* Desktop nav ─────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center"
            style={{ gap: "clamp(1rem, 1.8vw, 1.75rem)", marginLeft: "clamp(1rem, 1.5vw, 1.5rem)" }}
          >
            {NAV_LEFT.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                active={pathname === item.href}
                menuActive={activeMenu === item.label}
                onEnter={() => openMenu(item.label)}
                onLeave={closeMenu}
                solid={isSolid}
              />
            ))}
          </nav>

          {/* Centre logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <Link
              href="/home"
              aria-label="Covora — Home"
              onMouseEnter={() => setActiveMenu(null)}
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
              className={isSolid ? "hover:text-[var(--gold)]" : "hover:text-[var(--gold-light)]"}
            >
              Covora
            </Link>
          </div>

          {/* Desktop right nav (Collections + Sale) */}
          <nav
            className="hidden lg:flex items-center ml-auto"
            style={{ gap: "clamp(1rem, 1.8vw, 1.75rem)", marginRight: "clamp(1rem, 1.5vw, 1.5rem)" }}
          >
            {NAV_RIGHT.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                active={pathname === item.href}
                menuActive={activeMenu === item.label}
                onEnter={() => openMenu(item.label)}
                onLeave={closeMenu}
                solid={isSolid}
              />
            ))}
          </nav>

          {/* Actions */}
          <div
            className="flex items-center lg:ml-0 ml-auto"
            style={{ gap: "clamp(0.85rem, 1.4vw, 1.5rem)" }}
            onMouseEnter={() => setActiveMenu(null)}
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
                    background: "var(--gold)",
                    color: "var(--black)",
                    fontSize: "0.45rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "0",
                  }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Mega menu panel ──────────────────────────────────── */}
        {hasMega && activeItem?.mega && (
          <MegaMenu
            mega={activeItem.mega}
            onEnter={keepMenu}
            onLeave={closeMenu}
          />
        )}
      </header>

      {/* ── Search overlay ─────────────────────────────────────── */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      <MobileMenu links={ALL_NAV} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ── Cart drawer ──────────────────────────────────────────── */}
      <CartDrawer />
    </>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({
  item,
  active,
  menuActive,
  onEnter,
  onLeave,
  solid = true,
}: {
  item:       NavItem;
  active:     boolean;
  menuActive: boolean;
  onEnter:    () => void;
  onLeave:    () => void;
  solid?:     boolean;
}) {
  const isActive    = active || menuActive;
  const baseColor   = solid ? "#666666" : "rgba(244,239,230,0.8)";
  const hoverColor  = solid ? "#111111" : "var(--ivory)";
  const activeColor = "var(--gold-dark)";

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative"
    >
      <Link
        href={item.href}
        style={{
          fontFamily:    "var(--font-inter)",
          fontSize:      "0.58rem",
          fontWeight:    500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         isActive ? activeColor : baseColor,
          textDecoration:"none",
          position:      "relative",
          paddingBottom: "2px",
          display:       "inline-block",
          transition:    "color var(--transition-fast)",
          whiteSpace:    "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.color = baseColor;
        }}
      >
        {item.label}
        {/* Underline */}
        <span
          style={{
            position:        "absolute",
            bottom:          "-1px",
            left:            0,
            width:           "100%",
            height:          "1px",
            background:      "var(--gold)",
            transform:       isActive ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition:      "transform 0.4s var(--ease-luxury)",
          }}
        />
      </Link>
    </div>
  );
}

// ─── MegaMenu ─────────────────────────────────────────────────────────────────

function MegaMenu({
  mega,
  onEnter,
  onLeave,
}: {
  mega:    NonNullable<NavItem["mega"]>;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="mega-menu mega-menu-enter"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(2rem, 3vw, 3rem) clamp(1.5rem, 3.5vw, 3.5rem)",
          display: "grid",
          gridTemplateColumns: mega.featured
            ? `repeat(${mega.columns.length}, 1fr) 1.2fr`
            : `repeat(${mega.columns.length}, 1fr)`,
          gap: "3rem",
        }}
      >
        {/* Category columns */}
        {mega.columns.map((col) => (
          <div key={col.heading}>
            <p
              className="label-caps"
              style={{ color: "var(--gold)", fontSize: "0.52rem", marginBottom: "1.25rem" }}
            >
              {col.heading}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily:    "var(--font-inter)",
                      fontSize:      "0.72rem",
                      color:         "#888888",
                      textDecoration:"none",
                      letterSpacing: "0.03em",
                      transition:    "color var(--transition-fast)",
                      display:       "inline-block",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured column */}
        {mega.featured && (
          <div style={{ borderLeft: "1px solid rgba(0,0,0,0.08)", paddingLeft: "2.5rem" }}>
            <p
              className="label-caps"
              style={{ color: "var(--gold)", fontSize: "0.52rem", marginBottom: "1.25rem" }}
            >
              Featured
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {mega.featured.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "0.65rem",
                    textDecoration: "none",
                    color:          "#555555",
                    fontFamily:     "var(--font-cormorant)",
                    fontSize:       "1.05rem",
                    fontWeight:     300,
                    letterSpacing:  "0.02em",
                    transition:     "color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
                >
                  {item.label}
                  {item.tag && (
                    <span
                      className="badge"
                      style={{
                        fontSize:   "0.45rem",
                        padding:    "0.18rem 0.5rem",
                        background: "rgba(201,169,110,0.12)",
                        color:      "var(--gold)",
                        border:     "1px solid rgba(201,169,110,0.25)",
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── IconAction ───────────────────────────────────────────────────────────────

function IconAction({
  label,
  href,
  onClick,
  children,
  className,
  baseColor = "var(--warm-grey)",
}: {
  label:      string;
  href?:      string;
  onClick?:   () => void;
  children:   React.ReactNode;
  className?: string;
  baseColor?: string;
}) {
  const style: React.CSSProperties = {
    color:      baseColor,
    transition: "color var(--transition-fast)",
  };
  const hoverColor = "var(--gold-dark)";
  const enter = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = hoverColor);
  const leave = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = baseColor);

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        className={cn("flex items-center justify-center", className)}
        style={style}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn("flex items-center justify-center", className)}
      style={style}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {children}
    </button>
  );
}

// ─── Search overlay ───────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query,    setQuery]    = useState("");
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    } else {
      setQuery("");
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         98,
          background:     "rgba(0,0,0,0.2)",
          backdropFilter: "blur(2px)",
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? "auto" : "none",
          transition:     "opacity 0.35s ease",
        }}
      />
      {/* Panel */}
      <div
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          right:      0,
          zIndex:     99,
          transform:  open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.48s var(--ease-out-expo)",
        }}
      >
        <div
          style={{
            background:   "#FFFFFF",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            paddingTop:   "96px",
            paddingBottom:"3.5rem",
            paddingLeft:  "clamp(1.5rem, 6vw, 8rem)",
            paddingRight: "clamp(1.5rem, 6vw, 8rem)",
            boxShadow:    "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ maxWidth: "860px" }}>
            {/* Header */}
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
            {/* Input */}
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
                    type="button"
                    onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                    aria-label="Clear"
                    style={{
                      position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#AAAAAA", padding: "0.3rem",
                    }}
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
                <span className="label-caps" style={{ fontSize: "0.42rem", color: "#AAAAAA" }}>
                  Esc to close
                </span>
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
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="11" cy="11" r="7.5" />
      <path d="m20.5 20.5-4-4" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
