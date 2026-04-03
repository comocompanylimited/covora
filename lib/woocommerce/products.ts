import { wcFetch, wcFetchWithMeta } from "./client";
import type { Product, ProductVariation, ProductsQuery } from "@/types/product";

export async function getProducts(query: ProductsQuery = {}): Promise<Product[]> {
  const params: Record<string, string | number | boolean> = {
    per_page: query.per_page ?? 24,
    page: query.page ?? 1,
    status: query.status ?? "publish",
  };
  if (query.category) params.category = query.category;
  if (query.tag) params.tag = query.tag;
  if (query.search) params.search = query.search;
  if (query.on_sale) params.on_sale = true;
  if (query.featured) params.featured = true;
  if (query.stock_status) params.stock_status = query.stock_status;
  if (query.orderby) {
    if (query.orderby === "price-desc") {
      params.orderby = "price";
      params.order = "desc";
    } else {
      params.orderby = query.orderby;
      params.order = query.order ?? "desc";
    }
  }
  return wcFetch<Product[]>("products", params);
}

export async function getProductsWithMeta(
  query: ProductsQuery & { min_price?: number; max_price?: number } = {}
) {
  const params: Record<string, string | number | boolean> = {
    per_page: query.per_page ?? 24,
    page: query.page ?? 1,
    status: "publish",
  };
  if (query.category) params.category = query.category;
  if (query.tag) params.tag = query.tag;
  if (query.search) params.search = query.search;
  if (query.on_sale) params.on_sale = true;
  if (query.featured) params.featured = true;
  if (query.min_price != null) params.min_price = query.min_price;
  if (query.max_price != null) params.max_price = query.max_price;
  if (query.orderby) {
    if (query.orderby === "price-desc") {
      params.orderby = "price";
      params.order = "desc";
    } else {
      params.orderby = query.orderby;
      params.order = query.order ?? "desc";
    }
  }
  return wcFetchWithMeta<Product[]>("products", params);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await wcFetch<Product[]>("products", { slug });
  return products[0] ?? null;
}

export async function getProductById(id: number): Promise<Product> {
  return wcFetch<Product>(`products/${id}`);
}

export async function getProductVariations(productId: number): Promise<ProductVariation[]> {
  return wcFetch<ProductVariation[]>(`products/${productId}/variations`, { per_page: 100 });
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return wcFetch<Product[]>("products", { featured: true, per_page: limit, status: "publish" });
}

export async function getNewArrivals(limit = 12): Promise<Product[]> {
  return wcFetch<Product[]>("products", {
    orderby: "date",
    order: "desc",
    per_page: limit,
    status: "publish",
  });
}

export async function getBestSellers(limit = 12): Promise<Product[]> {
  return wcFetch<Product[]>("products", {
    orderby: "popularity",
    order: "desc",
    per_page: limit,
    status: "publish",
  });
}

export async function getRelatedProducts(productId: number, categoryId: number, limit = 4): Promise<Product[]> {
  const products = await wcFetch<Product[]>("products", {
    category: categoryId,
    per_page: limit + 1,
    status: "publish",
    orderby: "popularity",
    order: "desc",
  });
  return products.filter((p) => p.id !== productId).slice(0, limit);
}
