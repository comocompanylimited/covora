import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Search — Covora",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  let products: import("@/types/product").Product[] = [];
  let error = false;

  if (q) {
    try {
      products = await getProducts({ search: q, per_page: 24 });
    } catch {
      error = true;
    }
  }

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* Search input */}
        <div className="mb-16 max-w-xl">
          <p className="label-caps text-[var(--gold)] mb-6">Search</p>
          <form method="get" className="relative">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search for pieces, collections…"
              autoFocus
              className="input-luxury text-2xl font-[var(--font-cormorant)] pr-12 font-light"
            />
            <button
              type="submit"
              className="absolute right-0 bottom-3 text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>

        {/* Results */}
        {q && (
          <div>
            <p className="label-caps text-[var(--warm-grey)] mb-10">
              {products.length === 0
                ? `No results for "${q}"`
                : `${products.length} result${products.length === 1 ? "" : "s"} for "${q}"`}
            </p>

            {products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {products.length === 0 && !error && (
              <div className="py-12 text-center">
                <p className="text-[var(--warm-grey)] text-sm mb-8">
                  Try exploring our collections instead.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  {["Mens", "Womens", "Beauty", "New Arrivals"].map((label) => (
                    <a
                      key={label}
                      href={`/${label.toLowerCase().replace(" ", "-")}`}
                      className="btn btn-outline"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
