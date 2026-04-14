import type { Metadata } from "next";
import { searchProducts, fetchAllProducts } from "@/lib/api";
import { SearchClient } from "@/components/shop/SearchClient";

export const metadata: Metadata = {
  title:       "Search — Covora",
  description: "Search for pieces, categories and collections across Covora.",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;

  const [initialResults, allProducts] = await Promise.all([
    q ? searchProducts(q) : Promise.resolve([]),
    fetchAllProducts(),
  ]);

  return (
    <SearchClient
      initialQuery={q}
      initialResults={initialResults}
      allProducts={allProducts}
    />
  );
}
