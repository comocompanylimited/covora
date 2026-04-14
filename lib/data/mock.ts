// ─── Covora shared data types ─────────────────────────────────────────────────
// Data is now served from the live API (lib/api/).
// These interfaces are kept here so existing component imports stay stable.

export interface MockProduct {
  id:            string;
  slug:          string;
  name:          string;
  price:         string;
  originalPrice?: string;
  category:      string;
  badge?:        "New" | "Sale" | "Exclusive";
  /** Real image URL from the API */
  src?:          string;
  /** CSS background fallback when no image is available */
  bg?:           string;
}

export interface MockCollection {
  id:       string;
  slug:     string;
  name:     string;
  subtitle: string;
  season?:  string;
  /** Real image URL from the API */
  src?:     string;
  /** CSS background fallback when no image is available */
  bg?:      string;
}

export interface MockArticle {
  id:       string;
  slug:     string;
  title:    string;
  excerpt:  string;
  category: string;
  date:     string;
  readTime: string;
  src?:     string;
  bg?:      string;
}

// ─── Categories (for nav/browsing) ───────────────────────────────────────────

export const WOMENS_CATEGORIES = [
  { label: "New In",           slug: "new-in",          href: "/new-arrivals" },
  { label: "Dresses",          slug: "dresses",         href: "/category/dresses" },
  { label: "Tops",             slug: "tops",            href: "/category/tops" },
  { label: "Bottoms",          slug: "bottoms",         href: "/category/bottoms" },
  { label: "Skirts",           slug: "skirts",          href: "/category/skirts" },
  { label: "Knitwear",         slug: "knitwear",        href: "/category/knitwear" },
  { label: "Outerwear",        slug: "outerwear",       href: "/category/outerwear" },
  { label: "Denim",            slug: "denim",           href: "/category/denim" },
  { label: "Co-ords",          slug: "co-ords",         href: "/category/co-ords" },
  { label: "Occasion Wear",    slug: "occasion-wear",   href: "/category/occasion-wear" },
  { label: "Activewear",       slug: "activewear",      href: "/category/activewear" },
  { label: "Swimwear",         slug: "swimwear",        href: "/category/swimwear" },
  { label: "Lingerie & Sleep", slug: "lingerie",        href: "/category/lingerie" },
  { label: "Shoes",            slug: "shoes-bags",      href: "/category/shoes-bags" },
  { label: "Bags",             slug: "bags",            href: "/category/bags" },
  { label: "Jewellery",        slug: "jewellery",       href: "/category/jewellery" },
  { label: "Accessories",      slug: "accessories",     href: "/accessories" },
  { label: "Beauty",           slug: "beauty",          href: "/beauty" },
  { label: "Sale",             slug: "sale",            href: "/sale" },
];
