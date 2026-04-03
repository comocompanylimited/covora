import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Newsletter from "@/components/common/Newsletter";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Womens — Covora",
  description:
    "Discover the Covora Womens collection. Luxury fashion crafted for the modern woman.",
};

const PLACEHOLDER_PRODUCTS: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 100,
  name: ["The Silk Dress", "The Cashmere Coat", "The Tailored Blazer", "The Wrap Skirt",
    "The Knit Set", "The Evening Gown", "The Leather Trouser", "The Satin Blouse"][i],
  slug: `womens-product-${i + 1}`,
  permalink: "",
  type: "simple" as const,
  status: "publish" as const,
  description: "",
  short_description: "",
  sku: `SKU-W${i + 1}`,
  price: String((i + 1) * 110 + 195),
  regular_price: String((i + 1) * 110 + 195),
  sale_price: "",
  on_sale: i === 1,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  stock_status: "instock" as const,
  stock_quantity: null,
  manage_stock: false,
  categories: [],
  tags: [],
  images: [{ id: 1, src: `/images/womens-placeholder-${(i % 4) + 1}.jpg`, alt: "", name: "" }],
  attributes: [],
  variations: [],
}));

const WOMENS_CATEGORIES = [
  { name: "Dresses", slug: "dresses" },
  { name: "Tops", slug: "tops" },
  { name: "Knitwear", slug: "knitwear" },
  { name: "Outerwear", slug: "outerwear" },
  { name: "Handbags", slug: "handbags" },
  { name: "Footwear", slug: "footwear" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Accessories", slug: "accessories" },
];

async function getWomensProducts() {
  try {
    const products = await getProducts({ category: "womens", per_page: 8 });
    return products.length > 0 ? products : PLACEHOLDER_PRODUCTS;
  } catch {
    return PLACEHOLDER_PRODUCTS;
  }
}

export default async function WomensPage() {
  const products = await getWomensProducts();

  return (
    <div className="bg-[var(--black)] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0a0a0a 0%, #1a1510 60%, #0d0a08 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[rgba(10,10,10,0.3)] to-transparent" />

        <div className="relative z-10 w-full px-6 lg:px-24 pb-20 lg:pb-28">
          <p className="label-caps text-[var(--gold)] mb-6">New Season</p>
          <h1
            className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light leading-none mb-6"
            style={{ fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.01em" }}
          >
            The Womens
            <br />
            <span className="italic text-[var(--gold)]">Collection.</span>
          </h1>
          <p className="text-[var(--warm-grey)] text-sm max-w-md leading-relaxed mb-10">
            Elegance defined. Each piece a quiet declaration of confidence,
            crafted for the woman who knows her power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/womens/category/new-arrivals" className="btn btn-primary">
              New Arrivals
            </Link>
            <Link href="/collections" className="btn btn-outline">
              View All Collections
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 right-12 flex flex-col items-center gap-2 opacity-40">
          <span className="label-caps text-[var(--warm-grey)] text-[0.5rem] rotate-90 mb-6">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* ── Category Navigation ───────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 overflow-x-auto">
        <div className="flex gap-0 min-w-max mx-auto justify-center">
          {WOMENS_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/womens/category/${cat.slug}`}
              className="group px-6 py-4 border-r border-[var(--border-dark)] last:border-r-0 first:border-l border-l border-[var(--border-dark)]"
            >
              <span className="label-caps text-[var(--warm-grey)] group-hover:text-[var(--gold)] transition-colors duration-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider-gold mx-6 lg:mx-12" />

      {/* ── New Arrivals ──────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-caps text-[var(--gold)] mb-3">Just Arrived</p>
            <h2 className="heading-lg text-[var(--ivory)]">New Arrivals</h2>
          </div>
          <Link href="/new-arrivals" className="hidden sm:block label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-300">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </section>

      {/* ── Beauty Highlights ─────────────────────────────────────── */}
      <section className="py-12 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="divider-gold mb-24" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Beauty editorial block */}
          <div className="relative h-[60vh] overflow-hidden bg-[var(--charcoal-mid)] group">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #1a1208, #0a0a0a)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 z-10">
              <p className="label-caps text-[var(--gold)] mb-3">Covora Beauty</p>
              <h3 className="heading-md text-[var(--ivory)] mb-4">
                The Art of
                <br />
                <span className="italic">Refinement.</span>
              </h3>
              <Link href="/beauty" className="btn btn-outline text-[0.6rem]">
                Explore Beauty
              </Link>
            </div>
          </div>

          {/* Accessories block */}
          <div className="relative h-[60vh] overflow-hidden bg-[var(--charcoal-mid)] group">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #1a1510, #0a0a0a)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 z-10">
              <p className="label-caps text-[var(--gold)] mb-3">Accessories</p>
              <h3 className="heading-md text-[var(--ivory)] mb-4">
                The Finishing
                <br />
                <span className="italic">Touch.</span>
              </h3>
              <Link href="/accessories" className="btn btn-outline text-[0.6rem]">
                Shop Accessories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editorial Campaign ────────────────────────────────────── */}
      <section className="relative h-[80vh] overflow-hidden mx-6 lg:mx-12 mb-24">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #0d0a08 0%, #1a1510 50%, #0a0a0a 100%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-end px-12 lg:px-20 text-right max-w-2xl ml-auto">
          <p className="label-caps text-[var(--gold)] mb-5">The Signature Edit</p>
          <h2
            className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1.05 }}
          >
            Dressed in
            <br />
            <span className="italic">power.</span>
          </h2>
          <p className="text-[var(--warm-grey)] text-sm leading-relaxed mb-10 max-w-sm">
            The Womens Signature Collection — pieces that command a room before
            a word is spoken.
          </p>
          <Link href="/collections/signature-womens" className="btn btn-outline self-end">
            Discover the Edit
          </Link>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
