import type { Metadata } from "next";
import { getNewArrivals } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Newsletter from "@/components/common/Newsletter";

export const metadata: Metadata = {
  title: "New Arrivals — Covora",
  description: "The latest pieces from the House of Covora. Discover what just arrived.",
};

export default async function NewArrivalsPage() {
  let products: import("@/types/product").Product[] = [];
  try {
    products = await getNewArrivals(24);
  } catch {}

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      <section className="py-20 px-6 lg:px-12 border-b border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-caps text-[var(--gold)] mb-4">Just Arrived</p>
          <h1 className="heading-xl text-[var(--ivory)]">New Arrivals</h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="label-caps text-[var(--warm-grey)] mb-4">Coming Soon</p>
            <h2 className="heading-md text-[var(--ivory)]">New pieces arriving shortly.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 8} />
            ))}
          </div>
        )}
      </section>

      <Newsletter />
    </div>
  );
}
