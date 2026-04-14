import type { Metadata } from "next";
import { fetchNewIn } from "@/lib/api";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title:       "New In — Covora",
  description: "Discover the latest arrivals in women's luxury fashion at Covora.",
};

export default async function NewInPage() {
  const products = await fetchNewIn();
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
