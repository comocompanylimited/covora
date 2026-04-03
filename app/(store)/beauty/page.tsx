import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Newsletter from "@/components/common/Newsletter";

export const metadata: Metadata = {
  title: "Beauty — Covora",
  description: "Covora Beauty. Luxury makeup, skincare, and fragrance.",
};

const BEAUTY_CATEGORIES = [
  { name: "Fragrance", slug: "fragrance" },
  { name: "Skincare", slug: "skincare" },
  { name: "Makeup", slug: "makeup" },
  { name: "Beauty Sets", slug: "beauty-sets" },
];

export default async function BeautyPage() {
  let products: import("@/types/product").Product[] = [];
  try {
    products = await getProducts({ category: "beauty", per_page: 12 });
  } catch {}

  return (
    <div className="bg-[var(--black)] min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1208, #0a0808)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[rgba(10,10,10,0.35)] to-transparent" />
        <div className="relative z-10 w-full px-6 lg:px-24 pb-20 lg:pb-28">
          <p className="label-caps text-[var(--gold)] mb-6">Covora Beauty</p>
          <h1
            className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light leading-none mb-6"
            style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
          >
            The Art of
            <br />
            <span className="italic text-[var(--gold)]">Refinement.</span>
          </h1>
          <p className="text-[var(--warm-grey)] text-sm max-w-md leading-relaxed mb-10">
            Luxury beauty for those who understand that the ritual is as
            important as the result.
          </p>
          <div className="flex gap-4">
            {BEAUTY_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/womens/category/${cat.slug}`}
                className="btn btn-outline"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-caps text-[var(--gold)] mb-3">The Collection</p>
              <h2 className="heading-lg text-[var(--ivory)]">Covora Beauty</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        </section>
      )}

      {products.length === 0 && (
        <section className="py-32 text-center">
          <p className="label-caps text-[var(--warm-grey)] mb-4">Coming Soon</p>
          <h2 className="heading-lg text-[var(--ivory)]">The beauty collection<br />is arriving shortly.</h2>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
