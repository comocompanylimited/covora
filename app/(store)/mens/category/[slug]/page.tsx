import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/woocommerce/categories";
import { getProductsWithMeta } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { MENS_SORT_OPTIONS, FILTER_PARAM_KEYS } from "@/lib/data/mens-filters";
import type { Product } from "@/types/product";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SearchParams {
  page?:      string;
  sort?:      string;
  // filter keys (matches MENS_FILTERS[].id + price_min/price_max)
  category?:  string;
  color?:     string;
  size?:      string;
  price_min?: string;
  price_max?: string;
  style?:     string;
  fit?:       string;
  type?:      string;
  material?:  string;
  length?:    string;
  details?:   string;
  pattern?:   string;
  neckline?:  string;
  sleeve?:    string;
  features?:  string;
}

interface Props {
  params:       Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `Mens ${name} — Covora`,
    description: `Shop the Covora Mens ${name} collection. Refined luxury menswear.`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function MensCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const {
    page: pageStr,
    sort = "recommend",
    price_min,
    price_max,
  } = sp;

  const currentPage = Math.max(1, parseInt(pageStr ?? "1", 10));

  // ── Resolve sort option → WooCommerce params ────────────────────────────
  const sortOpt = MENS_SORT_OPTIONS.find((o) => o.value === sort)
    ?? MENS_SORT_OPTIONS[0];

  // ── Fetch ───────────────────────────────────────────────────────────────
  let products: Product[] = [];
  let total     = 0;
  let totalPages = 1;
  let categoryName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  try {
    const category = await getCategoryBySlug(slug);
    if (category) categoryName = category.name;

    const result = await getProductsWithMeta({
      category:  category?.id ?? slug,
      per_page:  24,
      page:      currentPage,
      orderby:   sortOpt.wcOrderby,
      order:     sortOpt.wcOrder,
      min_price: price_min ? Number(price_min) : undefined,
      max_price: price_max ? Number(price_max) : undefined,
    });

    products   = result.data;
    total      = result.total;
    totalPages = result.totalPages;
  } catch {
    /* WooCommerce offline — show empty state */
  }

  // ── Build sort URL preserving all current filters ───────────────────────
  const buildSortUrl = (sortVal: string) => {
    const p = new URLSearchParams();
    // Forward every active filter param except page
    FILTER_PARAM_KEYS.forEach((key) => {
      const val = (sp as Record<string, string | undefined>)[key];
      if (val) p.set(key, val);
    });
    p.set("sort", sortVal);
    return `?${p.toString()}`;
  };

  // ── Count active filters for the header badge ───────────────────────────
  const activeFilterCount = FILTER_PARAM_KEYS.filter((k) => {
    const val = (sp as Record<string, string | undefined>)[k];
    return val != null && val !== "";
  }).length;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">

      {/* ── Category header ─────────────────────────────────────────── */}
      <section className="py-14 px-6 lg:px-12 border-b border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <p className="label-caps text-[var(--warm-grey)] mb-4" style={{ fontSize: "0.5rem" }}>
            <Link
              href="/mens"
              className="hover:text-[var(--gold)] transition-colors duration-300"
            >
              Mens
            </Link>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-[var(--off-white)]">{categoryName}</span>
          </p>

          <div className="flex items-end justify-between gap-6">
            <h1 className="heading-xl text-[var(--ivory)]">{categoryName}</h1>
            {total > 0 && (
              <p
                className="label-caps text-[var(--warm-grey)] hidden sm:block flex-shrink-0"
                style={{ fontSize: "0.5rem" }}
              >
                {total} {total === 1 ? "piece" : "pieces"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Sidebar + Products ──────────────────────────────────────── */}
      {/*
        flex-wrap  = mobile: filter bar wraps to its own row above products
        lg:flex-nowrap = desktop: sidebar + products side by side
      */}
      <div className="flex flex-wrap lg:flex-nowrap max-w-[1400px] mx-auto">

        {/* FilterSidebar renders: desktop aside + mobile filter bar + mobile drawer */}
        <Suspense
          fallback={
            <div className="hidden lg:block w-60 xl:w-64 flex-shrink-0 border-r border-[var(--border-dark)]" />
          }
        >
          <FilterSidebar totalProducts={total} />
        </Suspense>

        {/* ── Main content column ───────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Desktop sort bar */}
          <div className="hidden lg:flex items-center justify-between px-8 py-[0.9rem] border-b border-[var(--border-dark)]">
            <span
              className="label-caps text-[var(--warm-grey)]"
              style={{ fontSize: "0.48rem" }}
            >
              {total > 0 ? `${total} pieces` : ""}
              {activeFilterCount > 0 && (
                <span className="ml-2 text-[var(--gold)]">
                  · {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
                </span>
              )}
            </span>

            {/* Sort links — server-rendered, preserve filter params */}
            <div className="flex items-center gap-1">
              <span
                className="label-caps text-[var(--warm-grey-dark)] mr-3"
                style={{ fontSize: "0.46rem", letterSpacing: "0.18em" }}
              >
                Sort
              </span>
              {MENS_SORT_OPTIONS.map((opt) => (
                <Link
                  key={opt.value}
                  href={buildSortUrl(opt.value)}
                  className={`label-caps px-2.5 py-1 transition-colors duration-300 ${
                    sort === opt.value
                      ? "text-[var(--gold)]"
                      : "text-[var(--warm-grey)] hover:text-[var(--off-white)]"
                  }`}
                  style={{ fontSize: "0.46rem", letterSpacing: "0.16em" }}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Product grid / empty state */}
          <section className="px-6 lg:px-8 py-10 lg:py-12">
            {products.length === 0 ? (
              <div className="py-28 text-center">
                <p className="label-caps text-[var(--warm-grey)] mb-5">
                  No pieces found
                </p>
                <p className="heading-md text-[var(--ivory)] mb-8">
                  The{" "}
                  <span className="italic text-[var(--gold)]">{categoryName}</span>{" "}
                  collection is arriving shortly.
                </p>
                <Link href="/mens" className="btn btn-outline">
                  Browse All Mens
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12">
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={i < 6}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-1.5 px-8 pb-16">
              {currentPage > 1 && (
                <Link
                  href={(() => {
                    const params = new URLSearchParams();
                    FILTER_PARAM_KEYS.forEach((k) => {
                      const v = (sp as Record<string, string | undefined>)[k];
                      if (v) params.set(k, v);
                    });
                    params.set("sort", sort);
                    params.set("page", String(currentPage - 1));
                    return `?${params.toString()}`;
                  })()}
                  className="w-10 h-10 flex items-center justify-center border border-[var(--border-dark)] text-[var(--warm-grey)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-xs"
                  aria-label="Previous page"
                >
                  ‹
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const pageUrl = (() => {
                  const params = new URLSearchParams();
                  FILTER_PARAM_KEYS.forEach((k) => {
                    const v = (sp as Record<string, string | undefined>)[k];
                    if (v) params.set(k, v);
                  });
                  params.set("sort", sort);
                  params.set("page", String(p));
                  return `?${params.toString()}`;
                })();
                return (
                  <Link
                    key={p}
                    href={pageUrl}
                    className={`w-10 h-10 flex items-center justify-center border text-xs transition-all duration-300 ${
                      p === currentPage
                        ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,169,110,0.06)]"
                        : "border-[var(--border-dark)] text-[var(--warm-grey)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    }`}
                    aria-current={p === currentPage ? "page" : undefined}
                  >
                    {p}
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link
                  href={(() => {
                    const params = new URLSearchParams();
                    FILTER_PARAM_KEYS.forEach((k) => {
                      const v = (sp as Record<string, string | undefined>)[k];
                      if (v) params.set(k, v);
                    });
                    params.set("sort", sort);
                    params.set("page", String(currentPage + 1));
                    return `?${params.toString()}`;
                  })()}
                  className="w-10 h-10 flex items-center justify-center border border-[var(--border-dark)] text-[var(--warm-grey)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-xs"
                  aria-label="Next page"
                >
                  ›
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
