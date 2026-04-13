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
  { label: "New In", href: "/new-arrivals" },
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
        { label: "New Season", href: "/new-arrivals",  tag: "New" },
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
        { label: "New Shoes",    href: "/new-arrivals", tag: "New" },
        { label: "Bag Edit",     href: "/collections",  tag: undefined },
        { label: "Jewellery",    href: "/category/jewellery", tag: undefined },
      ],
    },
  },
  { label: "Beauty", href: "/beauty" },
];

const NAV_RIGHT: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Journal",     href: "/journal" },
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
  const isLanding = pathname === "/";
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
          background:   isSolid  ? "rgba(8,8,8,0.95)"  : "transparent",
          backdropFilter:        isSolid ? "blur(24px) saturate(160%)" : "none",
          WebkitBackdropFilter:  isSolid ? "blur(24px) saturate(160%)" : "none",
          borderBottom: `1px solid ${isSolid ? "rgba(201,169,110,0.07)" : "transparent"}`,
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
          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-10 flex flex-col gap-[5px] p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span style={{ display: "block", width: "22px", height: "1px", background: "var(--off-white)", transition: "all 0.3s ease" }} />
            <span style={{ display: "block", width: "14px", height: "1px", background: "var(--gold)",      transition: "all 0.3s ease" }} />
          </button>

          {/* Left nav */}
          <nav
            className="hidden lg:flex items-center"
            style={{ gap: "clamp(1.75rem, 2.5vw, 2.75rem)" }}
          >
            {NAV_LEFT.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                active={pathname.startsWith(item.href) && item.href !== "/"}
                menuActive={activeMenu === item.label}
                onEnter={() => openMenu(item.label)}
                onLeave={closeMenu}
              />
            ))}
          </nav>

          {/* Centre logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <Link
              href="/"
              aria-label="Covora — Home"
              onMouseEnter={() => setActiveMenu(null)}
              style={{
                fontFamily:    "var(--font-cormorant)",
                fontSize:      isLanding && !scrolled ? "clamp(1.5rem, 2.5vw, 2.2rem)" : "clamp(1.2rem, 1.8vw, 1.7rem)",
                fontWeight:    300,
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color:         "var(--gold)",
                display:       "block",
                paddingRight:  "0.5em",
                textDecoration:"none",
                lineHeight:    1,
                transition:    "font-size 0.5s var(--ease-out-expo), color 0.3s ease",
              }}
              className="hover:text-[var(--gold-light)]"
            >
              Covora
            </Link>
          </div>

          {/* Right nav + actions */}
          <div className="hidden lg:flex items-center ml-auto" style={{ gap: "clamp(1.75rem, 2.5vw, 2.75rem)" }}>
            {NAV_RIGHT.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                active={pathname.startsWith(item.href)}
                menuActive={false}
                onEnter={() => openMenu(item.label)}
                onLeave={closeMenu}
              />
            ))}
          </div>

          {/* Actions */}
          <div
            className="flex items-center ml-auto lg:ml-6"
            style={{ gap: "clamp(0.85rem, 1.4vw, 1.5rem)" }}
            onMouseEnter={() => setActiveMenu(null)}
          >
            <IconAction label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </IconAction>
            <IconAction label="Account" href="/account" className="hidden sm:flex">
              <AccountIcon />
            </IconAction>
            <button
              onClick={openCart}
              aria-label={`Your bag — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
              className="relative flex items-center justify-center"
              style={{ color: "var(--warm-grey)", transition: "color var(--transition-fast)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
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
}: {
  item:       NavItem;
  active:     boolean;
  menuActive: boolean;
  onEnter:    () => void;
  onLeave:    () => void;
}) {
  const isActive = active || menuActive;

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
          fontSize:      "0.6rem",
          fontWeight:    500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         isActive ? "var(--gold)" : "var(--warm-grey)",
          textDecoration:"none",
          position:      "relative",
          paddingBottom: "2px",
          display:       "inline-block",
          transition:    "color var(--transition-fast)",
        }}
        onMouseEnter={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--off-white)";
        }}
        onMouseLeave={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--warm-grey)";
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
                      color:         "var(--text-muted)",
                      textDecoration:"none",
                      letterSpacing: "0.03em",
                      transition:    "color var(--transition-fast)",
                      display:       "inline-block",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ivory)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
          <div style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "2.5rem" }}>
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
                    color:          "var(--text-secondary)",
                    fontFamily:     "var(--font-cormorant)",
                    fontSize:       "1.05rem",
                    fontWeight:     300,
                    letterSpacing:  "0.02em",
                    transition:     "color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
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
}: {
  label:      string;
  href?:      string;
  onClick?:   () => void;
  children:   React.ReactNode;
  className?: string;
}) {
  const style: React.CSSProperties = {
    color:      "var(--warm-grey)",
    transition: "color var(--transition-fast)",
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "var(--gold)");
  const leave = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "var(--warm-grey)");

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
          background:     "rgba(0,0,0,0.5)",
          backdropFilter: "blur(3px)",
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
            background:   "rgba(6,6,6,0.98)",
            borderBottom: "1px solid var(--border-dark)",
            paddingTop:   "96px",
            paddingBottom:"3.5rem",
            paddingLeft:  "clamp(1.5rem, 6vw, 8rem)",
            paddingRight: "clamp(1.5rem, 6vw, 8rem)",
          }}
        >
          <div style={{ maxWidth: "860px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
              <span className="label-caps" style={{ fontSize: "0.48rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.45)" }}>
                Search Covora
              </span>
              <button
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--warm-grey)", fontFamily: "var(--font-inter)",
                  fontSize: "0.48rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  transition: "color 0.2s ease", padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--off-white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1">
                  <path d="M1 1l8 8M9 1L1 9" strokeLinecap="round" />
                </svg>
                Close
              </button>
            </div>
            {/* Input */}
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative", borderBottom: `1px solid ${query ? "rgba(201,169,110,0.38)" : "rgba(201,169,110,0.12)"}`, paddingBottom: "1rem", transition: "border-color 0.3s ease" }}>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  style={{
                    width: "100%", background: "transparent", border: "none", outline: "none",
                    fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4.5vw, 4rem)",
                    fontWeight: 300, color: "var(--ivory)", caretColor: "rgba(201,169,110,0.8)",
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
                      color: "var(--warm-grey)", padding: "0.3rem",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem", opacity: 0.55 }}>
                <span className="label-caps" style={{ fontSize: "0.42rem", color: "var(--warm-grey)" }}>
                  {query ? "↵ to search" : "Start typing to search"}
                </span>
                <span className="label-caps" style={{ fontSize: "0.42rem", color: "var(--warm-grey)" }}>
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

function BagIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
