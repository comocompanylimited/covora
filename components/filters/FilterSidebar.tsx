"use client"

import { useState, useTransition, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { MENS_FILTERS, MENS_SORT_OPTIONS } from "@/lib/data/mens-filters"
import type { FilterGroup } from "@/lib/data/mens-filters"

// ─── Price constants ──────────────────────────────────────────────────────────
const P_MIN = 1
const P_MAX = 533

// ─── Init expanded state from group defaults ──────────────────────────────────
function initExpanded(): Record<string, boolean> {
  const out: Record<string, boolean> = {}
  MENS_FILTERS.forEach((g) => { out[g.id] = g.defaultExpanded ?? false })
  return out
}

// ─── FilterSidebar ────────────────────────────────────────────────────────────
// Renders:
//   1. Desktop sticky <aside> (hidden on mobile)
//   2. Mobile filter bar — full-width flex item that forces wrap in parent flex
//   3. Mobile slide-over drawer (conditionally rendered)
//
// Parent flex container must have: flex flex-wrap lg:flex-nowrap
// ─────────────────────────────────────────────────────────────────────────────

export default function FilterSidebar({ totalProducts }: { totalProducts: number }) {
  const router   = useRouter()
  const pathname = usePathname()
  const sp       = useSearchParams()
  const [, startT] = useTransition()

  // ── Local state ───────────────────────────────────────────────────────────
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded,   setExpanded]   = useState<Record<string, boolean>>(initExpanded)
  const [showMore,   setShowMore]   = useState<Record<string, boolean>>({})
  // Price slider uses local state; commits to URL on pointer-up
  const [localMin, setLocalMin] = useState(() => Number(sp.get("price_min") ?? P_MIN))
  const [localMax, setLocalMax] = useState(() => Number(sp.get("price_max") ?? P_MAX))

  // ── URL helpers ───────────────────────────────────────────────────────────
  const getVals = useCallback(
    (id: string) => {
      const v = sp.get(id)
      return v ? v.split(",").filter(Boolean) : []
    },
    [sp]
  )

  const push = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(sp.toString())
      p.delete("page") // reset pagination on any filter change
      Object.entries(updates).forEach(([k, v]) =>
        v ? p.set(k, v) : p.delete(k)
      )
      startT(() => router.push(`${pathname}?${p.toString()}`))
    },
    [sp, pathname, router]
  )

  const toggleCheckbox = useCallback(
    (id: string, val: string) => {
      const cur = getVals(id)
      const next = cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val]
      push({ [id]: next.length ? next.join(",") : null })
    },
    [getVals, push]
  )

  const clearAll = useCallback(
    () => startT(() => router.push(pathname)),
    [pathname, router]
  )

  const commitPrice = useCallback(
    () =>
      push({
        price_min: localMin === P_MIN ? null : String(localMin),
        price_max: localMax === P_MAX ? null : String(localMax),
      }),
    [push, localMin, localMax]
  )

  // ── Derived ───────────────────────────────────────────────────────────────
  const currentSort = sp.get("sort") ?? "recommend"

  const activeCount = MENS_FILTERS.reduce((n, g) => {
    if (g.type === "price")
      return n + (sp.has("price_min") || sp.has("price_max") ? 1 : 0)
    return n + getVals(g.id).length
  }, 0)

  // ── Group body renderers ──────────────────────────────────────────────────

  const renderGroupBody = (group: FilterGroup) => {
    const vals    = getVals(group.id)
    const opts    = group.options ?? []
    const vmAfter = group.viewMoreAfter
    const showing = vmAfter && !showMore[group.id] ? opts.slice(0, vmAfter) : opts

    // ── Color swatches ──────────────────────────────────────────────────
    if (group.type === "color") {
      return (
        <div className="grid grid-cols-4 gap-x-2 gap-y-5 px-6 pb-6 pt-3">
          {opts.map((opt) => {
            const active = vals.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggleCheckbox(group.id, opt.value)}
                className="flex flex-col items-center gap-1.5"
                aria-label={opt.label}
                aria-pressed={active}
              >
                <span
                  className="block w-6 h-6 rounded-full transition-all duration-300"
                  style={{
                    background: opt.hex ?? "#888",
                    border: active
                      ? "2px solid var(--gold)"
                      : opt.value === "white"
                      ? "1px solid rgba(255,255,255,0.25)"
                      : "2px solid transparent",
                    boxShadow: active
                      ? "0 0 0 1.5px var(--gold)"
                      : "none",
                  }}
                />
                <span
                  className="label-caps transition-colors duration-200"
                  style={{
                    fontSize: "0.42rem",
                    letterSpacing: "0.14em",
                    color: active ? "var(--gold)" : "var(--warm-grey)",
                  }}
                >
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      )
    }

    // ── Size grid ───────────────────────────────────────────────────────
    if (group.type === "size") {
      return (
        <div className="grid grid-cols-4 gap-1.5 px-6 pb-6 pt-3">
          {opts.map((opt) => {
            const active = vals.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggleCheckbox(group.id, opt.value)}
                aria-pressed={active}
                className="py-1.5 text-center transition-all duration-200 border"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.5rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? "var(--gold)" : "var(--warm-grey)",
                  borderColor: active ? "var(--gold)" : "var(--border-dark)",
                  background: active ? "rgba(201,169,110,0.07)" : "transparent",
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )
    }

    // ── Price dual-range slider ─────────────────────────────────────────
    if (group.type === "price") {
      const minPct = ((localMin - P_MIN) / (P_MAX - P_MIN)) * 100
      const maxPct = ((localMax - P_MIN) / (P_MAX - P_MIN)) * 100
      return (
        <div className="px-6 pb-6 pt-4">
          {/* Custom range thumb styles */}
          <style>{`
            .cvr-thumb{-webkit-appearance:none;appearance:none;position:absolute;left:0;width:100%;height:0;background:transparent;pointer-events:none;outline:none;cursor:pointer}
            .cvr-thumb::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:var(--gold);pointer-events:all;cursor:pointer;border:2px solid var(--black);box-shadow:0 0 0 1px var(--gold);transition:transform .2s ease,box-shadow .2s ease}
            .cvr-thumb::-webkit-slider-thumb:hover{transform:scale(1.2);box-shadow:0 0 0 2px var(--gold)}
            .cvr-thumb::-moz-range-thumb{width:10px;height:10px;border-radius:50%;background:var(--gold);pointer-events:all;cursor:pointer;border:2px solid var(--black);box-shadow:0 0 0 1px var(--gold)}
            .cvr-thumb::-webkit-slider-runnable-track{background:transparent}
            .cvr-thumb::-moz-range-track{background:transparent}
          `}</style>

          {/* Track */}
          <div className="relative h-px bg-white/10 mx-1 mt-2 mb-8">
            <div
              className="absolute h-px bg-[var(--gold)]"
              style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
            />
          </div>

          {/* Two stacked range inputs */}
          <div className="relative h-0">
            <input
              type="range"
              min={P_MIN}
              max={P_MAX}
              value={localMin}
              className="cvr-thumb"
              style={{ zIndex: localMin > P_MAX - 60 ? 5 : 3 }}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), localMax - 1)
                setLocalMin(v)
              }}
              onMouseUp={commitPrice}
              onTouchEnd={commitPrice}
            />
            <input
              type="range"
              min={P_MIN}
              max={P_MAX}
              value={localMax}
              className="cvr-thumb"
              style={{ zIndex: 4 }}
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), localMin + 1)
                setLocalMax(v)
              }}
              onMouseUp={commitPrice}
              onTouchEnd={commitPrice}
            />
          </div>

          {/* Price labels */}
          <div className="flex justify-between mt-7">
            <span
              className="label-caps text-[var(--warm-grey)]"
              style={{ fontSize: "0.5rem" }}
            >
              NZ${localMin}
            </span>
            <span
              className="label-caps text-[var(--warm-grey)]"
              style={{ fontSize: "0.5rem" }}
            >
              NZ${localMax}
            </span>
          </div>
        </div>
      )
    }

    // ── Default: checkbox list ──────────────────────────────────────────
    return (
      <div className="px-6 pb-5 pt-1">
        <ul className="space-y-3">
          {showing.map((opt) => {
            const active = vals.includes(opt.value)
            return (
              <li key={opt.value}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleCheckbox(group.id, opt.value)}
                    className="sr-only"
                  />
                  {/* Custom square checkbox */}
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 border transition-all duration-200"
                    style={{
                      borderColor: active ? "var(--gold)" : "var(--border-dark)",
                      background: active ? "var(--gold)" : "transparent",
                    }}
                    aria-hidden
                  >
                    {active && (
                      <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                        <path
                          d="M1 2.5l1.5 1.5 3.5-3.5"
                          stroke="var(--black)"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className="font-display leading-snug transition-colors duration-200 group-hover:text-[var(--off-white)]"
                    style={{
                      fontSize: "clamp(0.82rem, 1.1vw, 0.93rem)",
                      color: active ? "var(--ivory)" : "var(--warm-grey)",
                    }}
                  >
                    {opt.label}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>

        {/* View More / Show Less */}
        {vmAfter && opts.length > vmAfter && (
          <button
            onClick={() =>
              setShowMore((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
            }
            className="mt-4 label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-300"
            style={{ fontSize: "0.46rem", letterSpacing: "0.2em" }}
          >
            {showMore[group.id]
              ? "− Show Less"
              : `+ View More (${opts.length - vmAfter})`}
          </button>
        )}
      </div>
    )
  }

  // ── Full group (header + collapsible body) ────────────────────────────────
  const renderGroup = (group: FilterGroup) => {
    const isExp   = expanded[group.id] ?? false
    const hasActive =
      group.type === "price"
        ? sp.has("price_min") || sp.has("price_max")
        : getVals(group.id).length > 0

    return (
      <div key={group.id} className="border-b border-[var(--border-dark)]">
        {/* Group header / toggle */}
        <button
          onClick={() =>
            setExpanded((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
          }
          className="w-full flex items-center justify-between px-6 py-4 group"
        >
          <div className="flex items-center gap-2">
            <span
              className="label-caps transition-colors duration-200"
              style={{
                fontSize: "0.51rem",
                letterSpacing: "0.22em",
                color: hasActive ? "var(--gold)" : "var(--ivory)",
              }}
            >
              {group.label}
            </span>
            {hasActive && (
              <span className="w-1 h-1 rounded-full bg-[var(--gold)]" aria-hidden />
            )}
          </div>
          <span
            className="text-[var(--warm-grey)] group-hover:text-[var(--gold)] transition-all duration-300"
            style={{
              fontSize: "0.6rem",
              display: "inline-block",
              transform: isExp ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          >
            ↓
          </span>
        </button>

        {/* Collapsible body */}
        {isExp && renderGroupBody(group)}
      </div>
    )
  }

  // ── Sort list for mobile drawer ───────────────────────────────────────────
  const sortList = (
    <div className="border-b border-[var(--border-dark)] px-6 py-5">
      <p
        className="label-caps text-[var(--gold)] mb-4"
        style={{ fontSize: "0.49rem", letterSpacing: "0.26em" }}
      >
        Sort by
      </p>
      <ul className="space-y-3">
        {MENS_SORT_OPTIONS.map((opt) => (
          <li key={opt.value}>
            <button
              onClick={() => {
                push({ sort: opt.value })
                setMobileOpen(false)
              }}
              className={`w-full text-left font-display transition-colors duration-200 ${
                currentSort === opt.value
                  ? "text-[var(--gold)] italic"
                  : "text-[var(--warm-grey)] hover:text-[var(--ivory)]"
              }`}
              style={{ fontSize: "0.93rem" }}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  // ── Shared sidebar header (filters count + clear all) ─────────────────────
  const sidebarHeader = (
    <div className="flex items-center justify-between px-6 py-[1.1rem] border-b border-[var(--border-dark)] flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <span
          className="label-caps text-[var(--ivory)]"
          style={{ fontSize: "0.56rem", letterSpacing: "0.22em" }}
        >
          Filters
        </span>
        {activeCount > 0 && (
          <span
            className="inline-flex items-center justify-center w-[1.1rem] h-[1.1rem] bg-[var(--gold)] text-[var(--black)]"
            style={{
              fontSize: "0.45rem",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {activeCount}
          </span>
        )}
      </div>
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-300"
          style={{ fontSize: "0.46rem", letterSpacing: "0.2em" }}
        >
          Clear all
        </button>
      )}
    </div>
  )

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── 1. Desktop sidebar ──────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 w-60 xl:w-64 border-r border-[var(--border-dark)] sticky top-[72px] self-start overflow-y-auto"
        style={{ height: "calc(100vh - 72px)" }}
      >
        {sidebarHeader}
        <div className="flex-1 overflow-y-auto">
          {MENS_FILTERS.map(renderGroup)}
        </div>
      </aside>

      {/* ── 2. Mobile filter bar ─────────────────────────────────────────── */}
      {/* w-full makes this a full-row flex item, pushing main content below  */}
      <div className="lg:hidden w-full flex items-center justify-between px-5 py-3 border-b border-[var(--border-dark)] bg-[var(--black)]">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 label-caps text-[var(--warm-grey)] hover:text-[var(--ivory)] transition-colors duration-300"
          style={{ fontSize: "0.52rem", letterSpacing: "0.2em" }}
        >
          {/* Filter icon */}
          <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden>
            <path
              d="M0 1h13M2 4.5h9M4.5 8h4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          Filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        {totalProducts > 0 && (
          <span
            className="label-caps text-[var(--warm-grey-dark)]"
            style={{ fontSize: "0.46rem" }}
          >
            {totalProducts} pieces
          </span>
        )}
      </div>

      {/* ── 3. Mobile slide-over drawer ──────────────────────────────────── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/70"
            style={{ backdropFilter: "blur(2px)" }}
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />

          {/* Drawer panel */}
          <div
            className="fixed inset-y-0 left-0 z-50 flex flex-col bg-[var(--black)] border-r border-[var(--border-dark)]"
            style={{ width: "min(320px, 90vw)" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-[1.1rem] border-b border-[var(--border-dark)] flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span
                  className="label-caps text-[var(--ivory)]"
                  style={{ fontSize: "0.56rem" }}
                >
                  Filters & Sort
                </span>
                {activeCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center w-[1.1rem] h-[1.1rem] bg-[var(--gold)] text-[var(--black)]"
                    style={{
                      fontSize: "0.45rem",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                    }}
                  >
                    {activeCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-300"
                    style={{ fontSize: "0.46rem" }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--warm-grey)] hover:text-[var(--ivory)] transition-colors duration-300"
                  aria-label="Close filters"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M2 2l11 11M13 2L2 13"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto">
              {sortList}
              {MENS_FILTERS.map(renderGroup)}
            </div>

            {/* Drawer footer CTA */}
            <div className="px-6 py-4 border-t border-[var(--border-dark)] flex-shrink-0">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full py-3.5 bg-[var(--gold)] text-[var(--black)] label-caps hover:bg-[var(--gold-light)] transition-colors duration-300"
                style={{ fontSize: "0.54rem", letterSpacing: "0.22em" }}
              >
                View Results{totalProducts > 0 ? ` (${totalProducts})` : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
