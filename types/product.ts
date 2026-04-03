export interface ProductImage {
  id: number;
  src: string;
  alt: string;
  name: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
  variation: boolean;
  visible: boolean;
}

export interface ProductVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  attributes: { name: string; option: string }[];
  image: ProductImage | null;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: "publish" | "draft" | "private";
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  manage_stock: boolean;
  categories: ProductCategory[];
  tags: ProductTag[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  variations: number[];
  // ACF / custom fields
  acf?: {
    materials?: string;
    care_instructions?: string;
    fit_notes?: string;
    campaign_image?: string;
  };
}

export interface ProductsQuery {
  category?: string | number;
  tag?: string;
  page?: number;
  per_page?: number;
  orderby?: "date" | "popularity" | "rating" | "price" | "price-desc" | "menu_order";
  order?: "asc" | "desc";
  search?: string;
  on_sale?: boolean;
  featured?: boolean;
  status?: string;
  stock_status?: string;
  collection?: string;
}
