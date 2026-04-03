import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/woocommerce/categories";
import { getProductsWithMeta } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `Womens ${name} — Covora` };
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "date", label: "Newest" },
  { value: "price", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
  { value: "popularity", label: "Best Selling" },
];

export default async function WomensCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = "1", sort = "featured" } = await searchParams;
  const currentPage = parseInt(page, 10);

  let products: Product[] = [];
  let total = 0;
  let totalPages = 1;
  let categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  try {
    const category = await getCategoryBySlug(slug);
    if (category) categoryName = category.name;

    const result = await getProductsWithMeta({
      category: category?.id ?? slug,
      per_page: 24,
      page: currentPage,
      orderby: sort === "price-desc" ? "price" : (sort as "date" | "popularity" | "price" | "menu_order"),
      order: sort === "price-desc" ? "desc" : sort === "price" ? "asc" : "desc",
    });
    products = result.data;
    total = result.total;
    totalPages = result.totalPages;
  } catch {
    // No WooCommerce — empty state
  }

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      <section className="py-20 px-6 lg:px-12 border-b border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-caps text-[var(--warm-grey)] mb-3">
            <a href="/womens" className="hover:text-[var(--gold)] transition-colors">Womens</a>
            {" / "}
            <span className="text-[var(--off-white)]">{categoryName}</span>
          </p>
          <div className="flex items-end justify-between">
            <h1 className="heading-xl text-[var(--ivory)]">{categoryName}</h1>
            {total > 0 && (
              <p className="label-caps text-[var(--warm-grey)] hidden sm:block">{total} pieces</p>
            )}
          </div>
        </div>
      </section>

      <div className="border-b border-[var(--border-dark)] px-6 lg:px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-end gap-6">
          <span className="label-caps text-[var(--warm-grey)]">Sort by</span>
          {SORT_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`?sort=${opt.value}`}
              className={`label-caps transition-colors duration-300 text-[0.6rem] ${
                sort === opt.value ? "text-[var(--gold)]" : "text-[var(--warm-grey)] hover:text-[var(--off-white)]"
              }`}
            >
              {opt.label}
            </a>
          ))}
        </div>
      </div>

      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="label-caps text-[var(--warm-grey)] mb-4">Coming Soon</p>
            <p className="heading-md text-[var(--ivory)]">
              The {categoryName} collection is arriving shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 8} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`?page=${p}&sort=${sort}`}
                className={`w-10 h-10 flex items-center justify-center border text-xs transition-all duration-300 ${
                  p === currentPage
                    ? "border-[var(--gold)] text-[var(--gold)]"
                    : "border-[var(--border-dark)] text-[var(--warm-grey)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
