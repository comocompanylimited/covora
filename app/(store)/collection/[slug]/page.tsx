import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Newsletter from "@/components/common/Newsletter";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `${name} Collection — Covora` };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  let products: import("@/types/product").Product[] = [];
  try {
    products = await getProducts({ tag: slug, per_page: 24 });
  } catch {}

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden flex items-end">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a14, #0a0a0a)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[rgba(10,10,10,0.4)] to-transparent" />
        <div className="relative z-10 px-6 lg:px-24 pb-16">
          <p className="label-caps text-[var(--gold)] mb-4">Collection</p>
          <h1
            className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 1 }}
          >
            {name}
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="label-caps text-[var(--warm-grey)] mb-4">Coming Soon</p>
            <h2 className="heading-md text-[var(--ivory)]">
              The {name} collection is arriving shortly.
            </h2>
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
