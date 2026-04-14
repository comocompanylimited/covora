import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProduct, fetchCategory } from "@/lib/api";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product — Covora" };
  return {
    title:       `${product.name} — Covora`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const allInCategory = await fetchCategory(product.categorySlug);
  const related = allInCategory.filter((p) => p.slug !== slug).slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
