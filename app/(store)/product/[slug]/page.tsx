import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductVariations, getRelatedProducts } from "@/lib/woocommerce/products";
import ProductDetail from "@/components/product/ProductDetail";
import ProductCard from "@/components/product/ProductCard";
import type { Product, ProductVariation } from "@/types/product";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: `${product.name} — Covora`,
      description: product.short_description.replace(/<[^>]*>/g, "").slice(0, 160),
      openGraph: {
        images: product.images[0] ? [{ url: product.images[0].src }] : [],
      },
    };
  } catch {
    return { title: "Product — Covora" };
  }
}

// Placeholder for development without WooCommerce
function getPlaceholderProduct(slug: string): Product {
  return {
    id: 1,
    name: "The Merino Rollneck",
    slug,
    permalink: "",
    type: "variable",
    status: "publish",
    description:
      "<p>A masterpiece of precision knitwear. Crafted from the finest grade-A merino wool, this rollneck defines understated luxury. The perfect weight — substantial enough to anchor a winter wardrobe, refined enough to wear beneath a tailored coat.</p><p>Relaxed but structured. Minimal yet powerful.</p>",
    short_description:
      "Grade-A merino wool rollneck. Crafted for the modern wardrobe.",
    sku: "CVR-MRN-001",
    price: "295",
    regular_price: "295",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 128,
    virtual: false,
    stock_status: "instock",
    stock_quantity: 24,
    manage_stock: true,
    categories: [{ id: 1, name: "Knitwear", slug: "knitwear" }],
    tags: [],
    images: [
      { id: 1, src: "/images/product-1.jpg", alt: "The Merino Rollneck", name: "" },
      { id: 2, src: "/images/product-1b.jpg", alt: "The Merino Rollneck — detail", name: "" },
      { id: 3, src: "/images/product-1c.jpg", alt: "The Merino Rollneck — worn", name: "" },
    ],
    attributes: [
      { id: 1, name: "Colour", options: ["Black", "Ivory", "Camel", "Navy"], variation: true, visible: true },
      { id: 2, name: "Size", options: ["XS", "S", "M", "L", "XL"], variation: true, visible: true },
    ],
    variations: [1, 2, 3, 4],
    acf: {
      materials: "100% Grade-A Merino Wool",
      care_instructions: "Dry clean only. Store folded.",
      fit_notes: "True to size. Model is 6'1\" wearing size M.",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product: Product;
  let variations: ProductVariation[] = [];
  let related: Product[] = [];

  try {
    const fetched = await getProductBySlug(slug);
    if (!fetched) notFound();
    product = fetched;

    if (product.type === "variable" && product.variations.length > 0) {
      variations = await getProductVariations(product.id);
    }
    if (product.categories.length > 0) {
      related = await getRelatedProducts(product.id, product.categories[0].id, 4);
    }
  } catch {
    // In development without WooCommerce, show a placeholder
    product = getPlaceholderProduct(slug);
  }

  return (
    <div className="bg-[var(--black)] pt-[72px]">
      <ProductDetail product={product} variations={variations} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="divider-gold mb-16" />
          <div className="mb-12">
            <p className="label-caps text-[var(--gold)] mb-3">You May Also Like</p>
            <h2 className="heading-lg text-[var(--ivory)]">Complete the Look</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
