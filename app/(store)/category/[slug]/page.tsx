import type { Metadata } from "next";
import { fetchCategory } from "@/lib/api";
import { ShopClient } from "@/components/shop/ShopClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// Friendly display names for known slugs
const CATEGORY_LABELS: Record<string, { title: string; eyebrow: string }> = {
  dresses:    { title: "Dresses",           eyebrow: "Women's Collection" },
  tops:       { title: "Tops & Blouses",    eyebrow: "Women's Collection" },
  bottoms:    { title: "Bottoms",           eyebrow: "Women's Collection" },
  knitwear:   { title: "Knitwear",          eyebrow: "Women's Collection" },
  outerwear:  { title: "Outerwear",         eyebrow: "Women's Collection" },
  "co-ords":  { title: "Co-ords",           eyebrow: "Women's Collection" },
  swimwear:   { title: "Swimwear",          eyebrow: "Women's Collection" },
  accessories:{ title: "Accessories",       eyebrow: "Curated Pieces" },
  jewellery:  { title: "Jewellery",         eyebrow: "Accessories" },
  scarves:    { title: "Scarves",           eyebrow: "Accessories" },
  bags:       { title: "Bags",              eyebrow: "Accessories" },
  totes:      { title: "Tote Bags",         eyebrow: "Bags" },
  clutches:   { title: "Clutches",          eyebrow: "Bags" },
  crossbody:  { title: "Crossbody Bags",    eyebrow: "Bags" },
  "mini-bags":{ title: "Mini Bags",         eyebrow: "Bags" },
  heels:      { title: "Heels",             eyebrow: "Shoes" },
  flats:      { title: "Flats",             eyebrow: "Shoes" },
  boots:      { title: "Boots",             eyebrow: "Shoes" },
  sandals:    { title: "Sandals",           eyebrow: "Shoes" },
  sneakers:   { title: "Sneakers",          eyebrow: "Shoes" },
  mules:      { title: "Mules",             eyebrow: "Shoes" },
  denim:      { title: "Denim",             eyebrow: "Women's Collection" },
  loungewear: { title: "Loungewear",        eyebrow: "Women's Collection" },
  activewear: { title: "Activewear",        eyebrow: "Women's Collection" },
  lingerie:   { title: "Lingerie & Sleep",  eyebrow: "Women's Collection" },
  clothing:   { title: "Clothing",          eyebrow: "Women's Collection" },
  "shoes-bags":{ title: "Shoes & Bags",     eyebrow: "Curated Pieces" },
};

function getLabel(slug: string): { title: string; eyebrow: string } {
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { title, eyebrow: "Women's Collection" };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title } = getLabel(slug);
  return {
    title:       `${title} — Covora`,
    description: `Shop ${title} at Covora. Refined luxury women's fashion.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { title, eyebrow } = getLabel(slug);
  const products = await fetchCategory(slug);

  return (
    <ShopClient
      products={products}
      title={title}
      eyebrow={eyebrow}
      breadcrumbs={[
        { label: "Home",     href: "/home" },
        { label: "Shop All", href: "/shop" },
        { label: title },
      ]}
      hideCategories
    />
  );
}

export const dynamic = "force-dynamic";
