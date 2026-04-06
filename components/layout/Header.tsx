"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import MobileMenu from "./MobileMenu";
import CartDrawer from "../cart/CartDrawer";

const NAV_LEFT = [
  { label: "Mens", href: "/mens" },
  { label: "Womens", href: "/womens" },
  { label: "Beauty", href: "/beauty" },
];

const NAV_RIGHT = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

const ALL_NAV = [...NAV_LEFT, ...NAV_RIGHT];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setScrollDir(y > lastY ? "down" : "up");
      lastY = y;
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Mens/Womens pages use their own isolated headers — suppress shared header there.
  if (pathname === "/mens" || pathname === "/womens") return null;

  // On landing: transparent until scrolled. On other pages: always solid.
  const isSolid = !isLanding || scrolled;
  // Hide header when scrolling down (not on landing)
  const isHidden = !isLanding && scrolled && scrollDir === "down";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "transform 0.5s var(--ease-out-expo), background 0.6s ease, border-color 0.6s ease",
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
          background: isSolid ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: isSolid ? "blur(20px) saturate(150%)" : "none",
          WebkitBackdropFilter: isSolid ? "blur(20px) saturate(150%)" : "none",
          borderBottom: `1px solid ${isSolid ? "rgba(201,169,110,0.08)" : "transparent"}`,
        }}
      >
        {/* Height: taller on landing, standard elsewhere */}
        <div
          className="relative flex items-center"
          style={{
            height: isLanding && !scrolled ? "88px" : "72px",
            padding: "0 clamp(1.25rem, 3vw, 3rem)",
            transition: "height 0.5s var(--ease-out-expo)",
          }}
        >
          {/* ── Mobile hamburger ─────────────────────────── */}
          <button
            className="lg:hidden relative z-10 flex flex-col gap-[5px] p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span
              className="block transition-all duration-300"
              style={{ width: "22px", height: "1px", background: "var(--off-white)" }}
            />
            <span
              className="block transition-all duration-300"
              style={{ width: "14px", height: "1px", background: "var(--gold)" }}
            />
          </button>

          {/* ── Left nav — desktop ───────────────────────── */}
          <nav className="hidden lg:flex items-center" style={{ gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
            {NAV_LEFT.map((link) => (
              <HeaderNavLink
                key={link.href}
                href={link.href}
                active={pathname.startsWith(link.href)}
              >
                {link.label}
              </HeaderNavLink>
            ))}
          </nav>

          {/* ── Logo — absolute centre ───────────────────── */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link
              href="/"
              aria-label="Covora — Home"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: isLanding && !scrolled ? "clamp(1.5rem, 2.8vw, 2.4rem)" : "clamp(1.2rem, 2vw, 1.8rem)",
                fontWeight: 300,
                letterSpacing: "0.48em",
                textTransform: "uppercase",
                color: "var(--gold)",
                display: "block",
                paddingRight: "0.48em",
                transition: "font-size 0.5s var(--ease-out-expo), color 0.3s ease",
                textDecoration: "none",
                lineHeight: 1,
              }}
              className="hover:text-[var(--gold-light)]"
            >
              Covora
            </Link>
          </div>

          {/* ── Right nav — desktop ──────────────────────── */}
          <nav
            className="hidden lg:flex items-center ml-auto"
            style={{ gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
          >
            {NAV_RIGHT.map((link) => (
              <HeaderNavLink
                key={link.href}
                href={link.href}
                active={pathname.startsWith(link.href)}
              >
                {link.label}
              </HeaderNavLink>
            ))}
          </nav>

          {/* ── Actions ──────────────────────────────────── */}
          <div
            className="flex items-center ml-auto lg:ml-6"
            style={{ gap: "clamp(0.75rem, 1.5vw, 1.5rem)" }}
          >
            <HeaderAction href="/search" label="Search">
              <SearchIcon />
            </HeaderAction>
            <HeaderAction href="/account" label="Account" className="hidden sm:flex">
              <AccountIcon />
            </HeaderAction>
            <button
              onClick={openCart}
              aria-label={`Your bag — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
              className="relative flex items-center justify-center transition-colors duration-300"
              style={{ color: "var(--warm-grey)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span
                  className="absolute flex items-center justify-center"
                  style={{
                    top: "-7px",
                    right: "-7px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    color: "var(--black)",
                    fontSize: "0.48rem",
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
      </header>

      <MobileMenu links={ALL_NAV} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
    </>
  );
}

// ─── Nav link with refined underline ────────────────────────────────────────

function HeaderNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.6rem",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: active ? "var(--gold)" : "var(--warm-grey)",
        textDecoration: "none",
        position: "relative",
        paddingBottom: "2px",
        transition: "color 0.3s ease",
      }}
      className={cn("group", active && "nav-active")}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.color = "var(--off-white)";
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.color = "var(--warm-grey)";
      }}
    >
      {children}
      {/* Animated underline */}
      <span
        style={{
          position: "absolute",
          bottom: "-1px",
          left: 0,
          width: "100%",
          height: "1px",
          background: "var(--gold)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: active ? "left" : "right",
          transition: "transform 0.45s var(--ease-luxury)",
        }}
        className="group-hover:[transform:scaleX(1)!important] group-hover:[transform-origin:left!important]"
      />
    </Link>
  );
}

// ─── Icon action button ───────────────────────────────────────────────────────

function HeaderAction({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("flex items-center justify-center transition-colors duration-300", className)}
      style={{ color: "var(--warm-grey)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
    >
      {children}
    </Link>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="11" cy="11" r="7.5" />
      <path d="m20.5 20.5-4-4" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
