import type { Metadata } from "next";
import { fetchProducts } from "@/lib/api";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title:       "Shop All — Covora",
  description: "Shop all women's luxury fashion at Covora. Clothing, shoes, bags and beauty.",
};

export default async function ShopPage() {
  const products = await fetchProducts({ limit: 20 });
  return (
    <ShopClient
      products={products}
      title="Shop All"
      eyebrow="Women's Collection"
      breadcrumbs={[
        { label: "Home", href: "/home" },
        { label: "Shop All" },
      ]}
    />
  );
}
