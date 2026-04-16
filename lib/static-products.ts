// Static product catalogue — mirrors comodo-backend-api PRODUCTS array.
// Used as fallback when the live API is unavailable or returns empty.

import type { Product } from "@/lib/api";

export const STATIC_PRODUCTS: Product[] = [
  { id: "1",  slug: "silk-midi-dress",        name: "The Silk Midi Dress",        price: "£485", category: "Dresses",       categorySlug: "dresses",       badge: "New",  bg: "#F0EDE8" },
  { id: "2",  slug: "cashmere-knit-top",       name: "Cashmere Knit Top",          price: "£320", category: "Knitwear",      categorySlug: "knitwear",      bg: "#EDE9E3" },
  { id: "3",  slug: "wide-leg-trousers",       name: "Wide-Leg Trousers",          price: "£295", category: "Bottoms",       categorySlug: "bottoms",       bg: "#E8E4DF" },
  { id: "4",  slug: "leather-tote",            name: "Leather Tote",               price: "£680", category: "Bags",          categorySlug: "bags",          badge: "Exclusive", bg: "#EAE0D5" },
  { id: "5",  slug: "tailored-blazer",         name: "Tailored Blazer",            price: "£540", category: "Outerwear",     categorySlug: "outerwear",     bg: "#E5E2DD" },
  { id: "6",  slug: "slip-dress",              name: "The Slip Dress",             price: "£395", category: "Dresses",       categorySlug: "dresses",       badge: "New",  bg: "#F2EDE8" },
  { id: "7",  slug: "heeled-mules",            name: "Suede Heeled Mules",         price: "£420", category: "Shoes",         categorySlug: "shoes",         bg: "#EBE6E0" },
  { id: "8",  slug: "linen-co-ord",            name: "Linen Co-ord Set",           price: "£360", category: "Co-ords",       categorySlug: "co-ords",       badge: "New",  bg: "#EDF0E8" },
  { id: "9",  slug: "silk-shirt",              name: "Silk Button Shirt",          price: "£265", category: "Tops",          categorySlug: "tops",          bg: "#EDE9E3" },
  { id: "10", slug: "flare-trousers",          name: "Flare Leg Trousers",         price: "£310", originalPrice: "£390",     category: "Bottoms", categorySlug: "bottoms", badge: "Sale", bg: "#E8E4DF" },
  { id: "11", slug: "wrap-midi-skirt",         name: "Wrap Midi Skirt",            price: "£245", category: "Bottoms",       categorySlug: "bottoms",       bg: "#EFE9E2" },
  { id: "12", slug: "crossbody-bag",           name: "Croc-Effect Crossbody",      price: "£520", category: "Bags",          categorySlug: "bags",          bg: "#EAE0D5" },
  { id: "13", slug: "evening-gown",            name: "The Evening Gown",           price: "£1200",category: "Occasion Wear", categorySlug: "occasion-wear", badge: "New",  bg: "#1a1214" },
  { id: "14", slug: "merino-cardigan",         name: "Merino Cardigan",            price: "£285", category: "Knitwear",      categorySlug: "knitwear",      bg: "#EDE9E3" },
  { id: "15", slug: "silk-scarf",              name: "Silk Twill Scarf",           price: "£185", category: "Accessories",   categorySlug: "accessories",   bg: "#F2EDE8" },
  { id: "16", slug: "maxi-pleated-skirt",      name: "Maxi Pleated Skirt",         price: "£330", category: "Bottoms",       categorySlug: "bottoms",       bg: "#E8E4DF" },
  { id: "17", slug: "knit-mini-dress",         name: "Knit Mini Dress",            price: "£445", category: "Dresses",       categorySlug: "dresses",       badge: "New",  bg: "#F0EDE8" },
  { id: "18", slug: "satin-cami",              name: "Satin Cami Top",             price: "£195", category: "Tops",          categorySlug: "tops",          bg: "#EDE9E3" },
  { id: "19", slug: "chain-handle-bag",        name: "Chain Handle Bag",           price: "£595", category: "Bags",          categorySlug: "bags",          badge: "Exclusive", bg: "#EAE0D5" },
  { id: "20", slug: "wide-brim-hat",           name: "Wide Brim Fedora",           price: "£155", category: "Accessories",   categorySlug: "accessories",   bg: "#F2EDE8" },
];
