import type { Metadata } from "next";
import { fetchProducts } from "@/lib/api";
import { STATIC_PRODUCTS } from "@/lib/static-products";
import { ShopClient } from "@/components/shop/ShopClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:       "Shop All — Covora",
  description: "Shop all women's luxury fashion at Covora. Clothing, shoes, bags and beauty.",
};

export default async function ShopPage() {
  let products: typeof STATIC_PRODUCTS[number][] = [];

  try {
    const apiProducts = await fetchProducts({ limit: 100 });
    if (apiProducts.length > 0) {
      products = apiProducts as typeof STATIC_PRODUCTS[number][];
    }
  } catch {
    // ignore — fall through to static
  }

  // Guaranteed fallback — always show something
  if (products.length === 0) {
    products = [...STATIC_PRODUCTS];
  }

  return (
    <ShopClient
      products={products}
      title="Shop All"
      eyebrow="Women's Collection"
      breadcrumbs={[
        { label: "Home",     href: "/home" },
        { label: "Shop All" },
      ]}
    />
  );
}
