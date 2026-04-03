import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Newsletter from "@/components/common/Newsletter";

export const metadata: Metadata = {
  title: "Accessories — Covora",
  description: "Covora Accessories. Bags, jewellery, sunglasses, belts and watches.",
};

const ACCESSORY_CATEGORIES = [
  { name: "Bags", slug: "bags" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Sunglasses", slug: "sunglasses" },
  { name: "Belts", slug: "belts" },
  { name: "Watches", slug: "watches" },
];

export default async function AccessoriesPage() {
  let products: import("@/types/product").Product[] = [];
  try {
    products = await getProducts({ category: "accessories", per_page: 12 });
  } catch {}

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      <section className="py-20 px-6 lg:px-12 border-b border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="label-caps text-[var(--gold)] mb-4">The Finishing Touch</p>
            <h1 className="heading-xl text-[var(--ivory)]">Accessories</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {ACCESSORY_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/womens/category/${cat.slug}`}
                className="label-caps border border-[var(--border-dark)] text-[var(--warm-grey)] px-4 py-2 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-[0.6rem]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="label-caps text-[var(--warm-grey)] mb-4">Coming Soon</p>
            <h2 className="heading-md text-[var(--ivory)]">The accessories collection<br />is arriving shortly.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </section>

      <Newsletter />
    </div>
  );
}
