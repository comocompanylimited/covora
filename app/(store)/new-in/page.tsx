import type { Metadata } from "next";
import { fetchNewIn } from "@/lib/api";
import { STATIC_PRODUCTS } from "@/lib/static-products";
import { ShopClient } from "@/components/shop/ShopClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:       "New In — Covora",
  description: "Discover the latest arrivals in women's luxury fashion at Covora.",
};

export default async function NewInPage() {
  let products = await fetchNewIn();
  if (products.length === 0) {
    products = STATIC_PRODUCTS.filter((p) => "badge" in p && p.badge === "New");
  }
  return (
    <ShopClient
      products={products}
      title="New In"
      eyebrow="Latest Arrivals"
      breadcrumbs={[
        { label: "Home", href: "/home" },
        { label: "New In" },
      ]}
    />
  );
}
