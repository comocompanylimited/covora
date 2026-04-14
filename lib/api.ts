// ─── Central API config ───────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://comodo-backend.zeabur.app"

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    },
    cache: "no-store",
  })

  if (!res.ok) throw new Error("API error")
  return res.json()
}

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface Product {
  id:            string
  slug:          string
  name:          string
  price:         string
  originalPrice?: string
  category:      string
  categorySlug:  string
  badge?:        "New" | "Sale" | "Exclusive"
  src?:          string
  bg?:           string
}

export interface ProductDetail extends Product {
  description: string
  sku:         string
  images:      { bg: string; alt: string; src?: string }[]
  sizes:       string[]
  colours:     { name: string; hex: string }[]
  details:     string[]
  materials:   string
  care:        string
  shipping:    string
}

export interface Collection {
  id:       string
  slug:     string
  name:     string
  subtitle: string
  season?:  string
  src?:     string
  bg?:      string
}

// ─── Normalization helpers ────────────────────────────────────────────────────

type ApiRaw = Record<string, unknown>

function formatPrice(value: unknown): string {
  if (value == null || value === "") return "£0"
  const num =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.]/g, ""))
      : Number(value)
  if (isNaN(num)) return "£0"
  return `£${num % 1 === 0 ? num : num.toFixed(2)}`
}

function getCategory(raw: ApiRaw): { name: string; slug: string } {
  const cat = raw.category
  if (cat && typeof cat === "object" && !Array.isArray(cat)) {
    const c = cat as ApiRaw
    return {
      name: String(c.name ?? ""),
      slug: String(c.slug ?? ""),
    }
  }
  if (typeof cat === "string") {
    return { name: cat, slug: cat.toLowerCase().replace(/\s+/g, "-") }
  }
  const cats = raw.categories
  if (Array.isArray(cats) && cats.length > 0) {
    const c = cats[0] as ApiRaw
    return { name: String(c.name ?? ""), slug: String(c.slug ?? "") }
  }
  return { name: "", slug: "" }
}

function getImageSrc(raw: ApiRaw): string | undefined {
  const imgs = raw.images
  if (Array.isArray(imgs) && imgs.length > 0) {
    const img = imgs[0] as ApiRaw
    const src = img.src ?? img.url
    if (typeof src === "string" && src) return src
  }
  if (typeof raw.image === "string" && raw.image) return raw.image
  if (typeof raw.thumbnail === "string" && raw.thumbnail) return raw.thumbnail
  return undefined
}

function getBadge(raw: ApiRaw): Product["badge"] | undefined {
  const b = raw.badge ?? raw.tag
  if (b === "New" || b === "Sale" || b === "Exclusive") return b as Product["badge"]
  if (raw.is_new || raw.new) return "New"
  if (raw.on_sale) return "Sale"
  return undefined
}

function getSaleInfo(raw: ApiRaw): { price: string; originalPrice?: string } {
  if (
    raw.sale_price != null &&
    raw.sale_price !== "" &&
    (raw.regular_price != null || raw.compare_at_price != null)
  ) {
    return {
      price:         formatPrice(raw.sale_price),
      originalPrice: formatPrice(raw.regular_price ?? raw.compare_at_price),
    }
  }
  return { price: formatPrice(raw.price ?? raw.regular_price ?? raw.sale_price ?? 0) }
}

function unwrap(data: unknown): ApiRaw[] {
  if (Array.isArray(data)) return data as ApiRaw[]
  if (data && typeof data === "object") {
    const d = data as ApiRaw
    for (const key of ["results", "data", "products", "collections", "items"]) {
      if (Array.isArray(d[key])) return d[key] as ApiRaw[]
    }
  }
  return []
}

function normalizeProduct(raw: ApiRaw): Product {
  const { name: category, slug: categorySlug } = getCategory(raw)
  const src = getImageSrc(raw)
  const { price, originalPrice } = getSaleInfo(raw)
  return {
    id:            String(raw.id ?? ""),
    slug:          String(raw.slug ?? raw.handle ?? raw.id ?? ""),
    name:          String(raw.name ?? raw.title ?? ""),
    price,
    originalPrice,
    category,
    categorySlug,
    badge:         getBadge(raw),
    src,
    bg:            src ? undefined : "#F0EDE8",
  }
}

function normalizeProductDetail(raw: ApiRaw): ProductDetail {
  const base = normalizeProduct(raw)

  const rawImages = Array.isArray(raw.images) ? (raw.images as ApiRaw[]) : []
  const images =
    rawImages.length > 0
      ? rawImages.map((img) => ({
          src: String(img.src ?? img.url ?? ""),
          alt: String(img.alt ?? raw.name ?? ""),
          bg:  "#F0EDE8",
        }))
      : [{ src: "", alt: String(raw.name ?? ""), bg: "#F0EDE8" }]

  const attrs = Array.isArray(raw.attributes) ? (raw.attributes as ApiRaw[]) : []
  const colourAttr = attrs.find(
    (a) =>
      String(a.name).toLowerCase() === "color" ||
      String(a.name).toLowerCase() === "colour"
  )
  const colours = colourAttr && Array.isArray(colourAttr.options)
    ? (colourAttr.options as string[]).map((c) => ({ name: c, hex: "#000000" }))
    : [{ name: "Black", hex: "#111111" }, { name: "Ivory", hex: "#FAF8F5" }]

  return {
    ...base,
    description: String(raw.description ?? ""),
    sku:         String(raw.sku ?? `CVR-${String(raw.id).padStart(3, "0")}`),
    images,
    sizes:       Array.isArray(raw.sizes) ? (raw.sizes as string[]) : ["XS", "S", "M", "L", "XL"],
    colours,
    details:     Array.isArray(raw.details)
      ? (raw.details as string[])
      : ["Premium quality fabric", "Exceptional attention to detail"],
    materials: String(raw.materials ?? "Premium quality. Full composition on label."),
    care:      String(raw.care ?? "See care label for full instructions."),
    shipping:  String(
      raw.shipping ??
        "Complimentary standard delivery (3–5 days). Express delivery available at checkout. Free returns within 28 days."
    ),
  }
}

function normalizeCollection(raw: ApiRaw): Collection {
  const src = getImageSrc(raw)
  return {
    id:       String(raw.id ?? ""),
    slug:     String(raw.slug ?? raw.id ?? ""),
    name:     String(raw.name ?? raw.title ?? ""),
    subtitle: String(raw.subtitle ?? raw.excerpt ?? ""),
    season:   raw.season != null ? String(raw.season) : undefined,
    src,
    bg:       src ? undefined : "#1a1214",
  }
}

// ─── Public fetch helpers ─────────────────────────────────────────────────────

export async function fetchProducts(params: { limit?: number; sort?: string } = {}): Promise<Product[]> {
  const qs = new URLSearchParams()
  if (params.limit) qs.set("limit", String(params.limit))
  if (params.sort)  qs.set("sort",  params.sort)
  const query = qs.toString()
  try {
    const data = await apiFetch(`/products${query ? `?${query}` : ""}`)
    return unwrap(data).map(normalizeProduct)
  } catch {
    return []
  }
}

export async function fetchNewIn(): Promise<Product[]> {
  try {
    const data = await apiFetch("/products?tag=new")
    return unwrap(data).map(normalizeProduct)
  } catch {
    return []
  }
}

export async function fetchAllProducts(): Promise<Product[]> {
  return fetchProducts({ limit: 200 })
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return []
  try {
    const data = await apiFetch(`/search?q=${encodeURIComponent(query)}`)
    return unwrap(data).map(normalizeProduct)
  } catch {
    return []
  }
}

export async function fetchProduct(slug: string): Promise<ProductDetail | null> {
  try {
    const data: ApiRaw = await apiFetch(`/products/${slug}`)
    return normalizeProductDetail(data)
  } catch {
    return null
  }
}

export async function fetchCategory(slug: string): Promise<Product[]> {
  try {
    const data = await apiFetch(`/categories/${slug}`)
    return unwrap(data).map(normalizeProduct)
  } catch {
    return []
  }
}

export async function fetchCollections(params: { limit?: number } = {}): Promise<Collection[]> {
  const qs = params.limit ? `?limit=${params.limit}` : ""
  try {
    const data = await apiFetch(`/collections${qs}`)
    return unwrap(data).map(normalizeCollection)
  } catch {
    return []
  }
}

export async function fetchCollection(slug: string): Promise<Collection | null> {
  try {
    const data: ApiRaw = await apiFetch(`/collections/${slug}`)
    return normalizeCollection(data)
  } catch {
    return null
  }
}
