// ─── Womens Category Data — Single Source of Truth ─────────────────────────────
// Used across: womens page, category nav, mega menu / drawer sections.

export interface CategoryItem {
  name: string
  slug: string
}

export interface CategoryGroup {
  id: string
  title: string
  slug: string
  items: CategoryItem[]
}

// ─── 1. Category Groups with subcategories ────────────────────────────────────
export const WOMENS_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "dresses",
    title: "Dresses",
    slug: "dresses",
    items: [
      { name: "View All",       slug: "dresses" },
      { name: "Midi Dresses",   slug: "midi-dresses" },
      { name: "Maxi Dresses",   slug: "maxi-dresses" },
      { name: "Mini Dresses",   slug: "mini-dresses" },
      { name: "Wrap Dresses",   slug: "wrap-dresses" },
      { name: "Evening Dresses", slug: "evening-dresses" },
    ],
  },
  {
    id: "tops",
    title: "Tops",
    slug: "tops",
    items: [
      { name: "View All",   slug: "tops" },
      { name: "Blouses",    slug: "blouses" },
      { name: "T-shirts",   slug: "t-shirts" },
      { name: "Bodysuits",  slug: "bodysuits" },
      { name: "Camisoles",  slug: "camisoles" },
      { name: "Crop Tops",  slug: "crop-tops" },
    ],
  },
  {
    id: "bottoms",
    title: "Bottoms",
    slug: "bottoms",
    items: [
      { name: "View All",        slug: "bottoms" },
      { name: "Trousers",        slug: "trousers" },
      { name: "Wide Leg Pants",  slug: "wide-leg-pants" },
      { name: "Midi Skirts",     slug: "midi-skirts" },
      { name: "Mini Skirts",     slug: "mini-skirts" },
      { name: "Shorts",          slug: "shorts" },
    ],
  },
  {
    id: "denim",
    title: "Denim",
    slug: "denim",
    items: [
      { name: "View All",      slug: "denim" },
      { name: "Jeans",         slug: "jeans" },
      { name: "Flared Jeans",  slug: "flared-jeans" },
      { name: "Denim Skirts",  slug: "denim-skirts" },
      { name: "Denim Jackets", slug: "denim-jackets" },
      { name: "Denim Co-ords", slug: "denim-co-ords" },
    ],
  },
  {
    id: "knitwear",
    title: "Knitwear",
    slug: "knitwear",
    items: [
      { name: "View All",      slug: "knitwear" },
      { name: "Cardigans",     slug: "cardigans" },
      { name: "Sweaters",      slug: "sweaters" },
      { name: "Knit Dresses",  slug: "knit-dresses" },
      { name: "Sweater Vests", slug: "sweater-vests" },
      { name: "Knit Co-ords",  slug: "knit-co-ords" },
    ],
  },
  {
    id: "co-ords",
    title: "Co-ords",
    slug: "co-ords",
    items: [
      { name: "View All",       slug: "co-ords" },
      { name: "Linen Sets",     slug: "linen-sets" },
      { name: "Blazer Sets",    slug: "blazer-sets" },
      { name: "Knit Sets",      slug: "knit-sets" },
      { name: "Loungewear Sets", slug: "loungewear-sets" },
      { name: "Summer Sets",    slug: "summer-sets" },
    ],
  },
  {
    id: "outerwear",
    title: "Outerwear",
    slug: "outerwear",
    items: [
      { name: "View All",        slug: "outerwear" },
      { name: "Blazers",         slug: "blazers" },
      { name: "Trench Coats",    slug: "trench-coats" },
      { name: "Winter Coats",    slug: "winter-coats" },
      { name: "Padded Jackets",  slug: "padded-jackets" },
      { name: "Faux Fur Coats",  slug: "faux-fur-coats" },
    ],
  },
  {
    id: "swimwear",
    title: "Swimwear",
    slug: "swimwear",
    items: [
      { name: "View All",         slug: "swimwear" },
      { name: "Bikinis",          slug: "bikinis" },
      { name: "Swimsuits",        slug: "swimsuits" },
      { name: "Beach Cover-ups",  slug: "beach-cover-ups" },
      { name: "Beach Sets",       slug: "beach-sets" },
    ],
  },
  {
    id: "lingerie-sleepwear",
    title: "Lingerie & Sleepwear",
    slug: "lingerie-sleepwear",
    items: [
      { name: "View All",   slug: "lingerie-sleepwear" },
      { name: "Lingerie",   slug: "lingerie" },
      { name: "Sleepwear",  slug: "sleepwear" },
      { name: "Loungewear", slug: "loungewear" },
      { name: "Shapewear",  slug: "shapewear" },
    ],
  },
  {
    id: "shoes",
    title: "Shoes",
    slug: "shoes",
    items: [
      { name: "View All", slug: "shoes" },
      { name: "Heels",    slug: "heels" },
      { name: "Boots",    slug: "boots" },
      { name: "Flats",    slug: "flats" },
      { name: "Sandals",  slug: "sandals" },
      { name: "Mules",    slug: "mules" },
    ],
  },
  {
    id: "bags-accessories",
    title: "Bags & Accessories",
    slug: "bags-accessories",
    items: [
      { name: "View All",        slug: "bags-accessories" },
      { name: "Handbags",        slug: "handbags" },
      { name: "Crossbody Bags",  slug: "crossbody-bags" },
      { name: "Jewellery",       slug: "jewellery" },
      { name: "Belts",           slug: "belts" },
      { name: "Sunglasses",      slug: "sunglasses" },
    ],
  },
]

// ─── 2. Trending (editorial curated items) ────────────────────────────────────
export const WOMENS_RECOMMENDED: CategoryItem[] = [
  { name: "Midi Dress",       slug: "midi-dresses" },
  { name: "Wide Leg Trousers", slug: "wide-leg-pants" },
  { name: "Linen Set",        slug: "linen-sets" },
  { name: "Silk Blouse",      slug: "blouses" },
  { name: "Blazer Dress",     slug: "blazer-sets" },
  { name: "Wrap Dress",       slug: "wrap-dresses" },
  { name: "Knit Cardigan",    slug: "cardigans" },
  { name: "Trench Coat",      slug: "trench-coats" },
  { name: "Platform Boots",   slug: "boots" },
  { name: "Crossbody Bag",    slug: "crossbody-bags" },
  { name: "Tailored Blazer",  slug: "blazers" },
  { name: "Bodysuit",         slug: "bodysuits" },
]
