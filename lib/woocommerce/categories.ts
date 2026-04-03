import { wcFetch } from "./client";
import type { Category } from "@/types/category";

export async function getCategories(params: Record<string, string | number> = {}): Promise<Category[]> {
  return wcFetch<Category[]>("products/categories", {
    per_page: 100,
    hide_empty: false,
    ...params,
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await wcFetch<Category[]>("products/categories", { slug });
  return categories[0] ?? null;
}

export async function getMensCategories(): Promise<Category[]> {
  // Filter by parent "Mens" category — update parent ID to match your WooCommerce setup
  return wcFetch<Category[]>("products/categories", {
    per_page: 100,
    hide_empty: false,
    tag: "mens",
  });
}

export async function getWomensCategories(): Promise<Category[]> {
  return wcFetch<Category[]>("products/categories", {
    per_page: 100,
    hide_empty: false,
    tag: "womens",
  });
}
