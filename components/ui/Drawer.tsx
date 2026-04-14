"use client";

import { useEffect, type ReactNode } from "react";

// ─── Shared helper ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── Backdrop ─────────────────────────────────────────────────────────────────

interface BackdropProps {
  open:    boolean;
  onClick: () => void;
  zIndex?: number;
}

export function Backdrop({ open, onClick, zIndex = 200 }: BackdropProps) {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         zIndex - 1,
        background:     "rgba(8,8,8,0.72)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        opacity:        open ? 1 : 0,
        pointerEvents:  open ? "auto" : "none",
        transition:     "opacity 0.42s ease",
      }}
    />
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
// Base drawer primitive — right or left side, configurable width.
// Handles body-scroll lock and backdrop automatically.

export interface DrawerProps {
  open:        boolean;
  onClose:     () => void;
  side?:       "right" | "left";
  width?:      string;
  children:    ReactNode;
  label?:      string;
  /** z-index for the drawer panel (backdrop gets zIndex - 1) */
  zIndex?:     number;
  className?:  string;
}

export function Drawer({
  open,
  onClose,
  side     = "right",
  width    = "min(480px, 92vw)",
  children,
  label    = "Panel",
  zIndex   = 400,
  className,
}: DrawerProps) {
  // Body-scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const translateClosed = side === "right" ? "translateX(100%)" : "translateX(-100%)";

  return (
    <>
      <Backdrop open={open} onClick={onClose} zIndex={zIndex} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cls(className)}
        style={{
          position:    "fixed",
          top:          0,
          bottom:       0,
          [side]:       0,
          width,
          zIndex,
          background:  "var(--surface-1)",
          borderLeft:  side === "right" ? "1px solid var(--border-subtle)" : undefined,
          borderRight: side === "left"  ? "1px solid var(--border-subtle)" : undefined,
          display:     "flex",
          flexDirection: "column",
          transform:   open ? "translateX(0)" : translateClosed,
          transition:  "transform 0.42s var(--ease-out-expo)",
          overflowY:   "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}

// ─── DrawerHeader ─────────────────────────────────────────────────────────────

export interface DrawerHeaderProps {
  title:      string;
  subtitle?:  string;
  onClose:    () => void;
  children?:  ReactNode;
}

export function DrawerHeader({ title, subtitle, onClose, children }: DrawerHeaderProps) {
  return (
    <div
      style={{
        display:       "flex",
        alignItems:    "center",
        justifyContent: "space-between",
        padding:       "0 2rem",
        height:        "var(--header-height, 72px)",
        borderBottom:  "1px solid var(--border-subtle)",
        flexShrink:    0,
      }}
    >
      <div>
        <p
          style={{
            fontFamily:    "var(--font-inter)",
            fontSize:      "0.54rem",
            fontWeight:    500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "var(--gold)",
          }}
        >
          {title}
        </p>
        {subtitle && (
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize:   "0.72rem",
              color:      "var(--text-muted)",
              marginTop:  "0.2rem",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {children}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "none",
            border:     "none",
            cursor:     "pointer",
            color:      "var(--text-muted)",
            padding:    "0.4rem",
            display:    "flex",
            alignItems: "center",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── DrawerBody ───────────────────────────────────────────────────────────────

export interface DrawerBodyProps {
  children:   ReactNode;
  className?: string;
}

export function DrawerBody({ children, className }: DrawerBodyProps) {
  return (
    <div
      className={cls("flex-1 overflow-y-auto", className)}
      style={{ padding: "1.5rem 2rem" }}
    >
      {children}
    </div>
  );
}

// ─── DrawerFooter ─────────────────────────────────────────────────────────────

export interface DrawerFooterProps {
  children:   ReactNode;
  className?: string;
}

export function DrawerFooter({ children, className }: DrawerFooterProps) {
  return (
    <div
      className={cls(className)}
      style={{
        padding:    "1.5rem 2rem",
        borderTop:  "1px solid var(--border-subtle)",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}
