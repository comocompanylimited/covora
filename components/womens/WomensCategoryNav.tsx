"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  WOMENS_CATEGORY_GROUPS,
  WOMENS_RECOMMENDED,
} from "@/lib/data/womens-categories"

// ─── Horizontal Category Bar + Subcategory Panel ──────────────────────────────

function CategoryBar() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const active = WOMENS_CATEGORY_GROUPS.find((g) => g.id === activeId) ?? null
  const subcategories = active?.items.filter((i) => i.name !== "View All") ?? []

  function enter(id: string) {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveId(id)
  }

  function leave() {
    leaveTimer.current = setTimeout(() => setActiveId(null), 220)
  }

  function toggle(id: string) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <div onMouseLeave={leave}>
      {/* ── Category row ───────────────────────────────────────── */}
      <div className="border-y border-[var(--border-dark)]">
        <div className="px-6 lg:px-10">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${WOMENS_CATEGORY_GROUPS.length}, 1fr)`,
                width: "100%",
                minWidth: "800px",
              }}
            >
              {WOMENS_CATEGORY_GROUPS.map((group, idx) => {
                const isActive = group.id === activeId
                const isLast = idx === WOMENS_CATEGORY_GROUPS.length - 1
                return (
                  <button
                    key={group.id}
                    onMouseEnter={() => enter(group.id)}
                    onClick={() => toggle(group.id)}
                    className="relative py-[1.1rem] text-center transition-colors duration-200"
                    style={{
                      color: isActive ? "#ffffff" : "#C9A96E",
                      borderRight: isLast ? "none" : "1px solid rgba(201,169,110,0.07)",
                    }}
                  >
                    <span
                      className="font-display block transition-colors duration-200 leading-tight px-1"
                      style={{
                        fontSize: "clamp(0.6rem, 0.78vw, 0.78rem)",
                        fontWeight: 300,
                        letterSpacing: "0.03em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {group.title}
                    </span>

                    {/* Active gold underline */}
                    <span
                      className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[var(--gold)] transition-transform duration-300 origin-center"
                      style={{
                        transform: isActive ? "scaleX(0.6)" : "scaleX(0)",
                        opacity: 0.65,
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Subcategory panel ──────────────────────────────────── */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: activeId ? "420px" : "0px",
          opacity: activeId ? 1 : 0,
          transition: "max-height 0.28s var(--ease-out-expo), opacity 0.2s ease",
          background: "#050504",
          borderBottom: activeId ? "1px solid rgba(201,169,110,0.08)" : "none",
        }}
      >
        {active && (
          <div className="px-6 lg:px-10 py-7">
            <div className="flex items-center gap-5 mb-5 pb-5 border-b border-[var(--border-dark)]">
              <span
                className="font-display text-[var(--ivory)]"
                style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", fontWeight: 300, letterSpacing: "0.01em" }}
              >
                {active.title}
              </span>
              <span
                className="block flex-shrink-0"
                style={{ width: "1px", height: "12px", background: "rgba(201,169,110,0.2)" }}
              />
              <Link
                href={`/womens/category/${active.slug}`}
                className="label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-200 flex items-center gap-1.5"
                style={{ fontSize: "0.42rem", letterSpacing: "0.2em" }}
              >
                View All
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                  <path d="M1 2.5h7M5.5 1l2 1.5-2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span
                className="label-caps text-[var(--warm-grey-dark)] ml-auto"
                style={{ fontSize: "0.4rem", letterSpacing: "0.15em" }}
              >
                {subcategories.length} styles
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "0",
              }}
            >
              {subcategories.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/womens/category/${item.slug}`}
                  className="group flex items-center gap-3 py-[0.7rem] pr-4 border-b border-[var(--border-dark)] hover:border-[rgba(201,169,110,0.18)] transition-all duration-200"
                >
                  <span
                    className="label-caps tabular-nums flex-shrink-0 group-hover:text-[var(--gold)] transition-colors duration-200"
                    style={{ fontSize: "0.37rem", letterSpacing: "0.1em", color: "var(--warm-grey-dark)", minWidth: "1.1rem", textAlign: "right" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-shrink-0 block group-hover:opacity-40 transition-opacity duration-200"
                    style={{ width: "1px", height: "9px", background: "var(--border-dark)" }}
                  />
                  <span
                    className="font-display flex-1 group-hover:text-[var(--ivory)] transition-colors duration-200"
                    style={{ fontSize: "clamp(0.78rem, 1vw, 0.9rem)", fontWeight: 300, color: "var(--warm-grey)", letterSpacing: "0.01em" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="flex-shrink-0 opacity-0 group-hover:opacity-40 transition-opacity duration-200 text-[var(--gold)]"
                    style={{ fontSize: "0.5rem" }}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Trending Row ─────────────────────────────────────────────────────────────

const LABEL_W = "96px"

function TrendingRow() {
  return (
    <div className="border-t border-[var(--border-dark)]" style={{ borderBottom: "1px solid rgba(201,169,110,0.4)" }}>
      <div className="px-6 lg:px-10">
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `${LABEL_W} 1fr`,
              width: "100%",
              minWidth: "800px",
            }}
          >
            {/* Label cell */}
            <div
              className="flex items-center justify-center"
              style={{
                borderRight: "1px solid rgba(201,169,110,0.07)",
                paddingRight: "1.2rem",
                alignSelf: "stretch",
              }}
            >
              <span
                className="label-caps text-[var(--gold)]"
                style={{ fontSize: "0.42rem", letterSpacing: "0.28em" }}
              >
                Trending
              </span>
            </div>

            {/* Items */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${WOMENS_RECOMMENDED.length}, 1fr)`,
                width: "100%",
              }}
            >
              {WOMENS_RECOMMENDED.map((item, idx) => {
                const isLast = idx === WOMENS_RECOMMENDED.length - 1
                return (
                  <Link
                    key={item.slug}
                    href={`/womens/category/${item.slug}`}
                    className="relative py-[0.95rem] px-2 text-center font-display transition-colors duration-200 hover:text-[var(--ivory)]"
                    style={{
                      fontSize: "clamp(0.6rem, 0.78vw, 0.78rem)",
                      fontWeight: 300,
                      letterSpacing: "0.025em",
                      color: "#C9A96E",
                      borderRight: isLast ? "none" : "1px solid rgba(201,169,110,0.07)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── WomensCategoryNav ────────────────────────────────────────────────────────

export default function WomensCategoryNav() {
  return (
    <div className="bg-[var(--black)]">
      <CategoryBar />
      <TrendingRow />
    </div>
  )
}
