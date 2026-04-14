import type { Metadata } from "next";
import { fetchCategory } from "@/lib/api";
import { ShopClient } from "@/components/shop/ShopClient";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = formatTitle(slug);
  return {
    title:       `${title} — Covora`,
    description: `Shop ${title} at Covora. Refined luxury women's fashion.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const title = formatTitle(slug);
  const products = await fetchCategory(slug);

  return (
    <ShopClient
      products={products}
      title={title}
      eyebrow="Women's Collection"
      breadcrumbs={[
        { label: "Home",     href: "/home" },
        { label: "Shop All", href: "/shop" },
        { label: title },
      ]}
      hideCategories
    />
  );
}
