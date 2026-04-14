import type { Metadata } from "next";
import { fetchCollection, fetchCategory } from "@/lib/api";
import { ShopClient } from "@/components/shop/ShopClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = await fetchCollection(slug);
  const name = col?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title:       `${name} — Covora`,
    description: col?.subtitle ?? `Discover the ${name} collection at Covora.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const [col, products] = await Promise.all([
    fetchCollection(slug),
    fetchCategory(slug),
  ]);
  const name = col?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <ShopClient
      products={products}
      title={name}
      eyebrow={col?.season ?? "Collection"}
      breadcrumbs={[
        { label: "Home",        href: "/home"        },
        { label: "Collections", href: "/collections" },
        { label: name },
      ]}
    />
  );
}
