import type { Metadata } from "next";
import Link from "next/link";
import Newsletter from "@/components/common/Newsletter";

export const metadata: Metadata = {
  title: "Collections — Covora",
  description: "Discover all Covora collections. Signature, seasonal, and exclusive edits.",
};

const COLLECTIONS = [
  { name: "The Signature Edit", slug: "signature", desc: "The definitive Covora wardrobe. Timeless pieces, exceptional materials.", gender: "both" },
  { name: "Mens Signature", slug: "signature-mens", desc: "Precision tailoring and refined sportswear for the modern man.", gender: "mens" },
  { name: "Womens Signature", slug: "signature-womens", desc: "Elegant power dressing and fluid silhouettes for the modern woman.", gender: "womens" },
  { name: "The Resort Edit", slug: "resort", desc: "Lightweight luxury for the warmer months and far-flung destinations.", gender: "both" },
  { name: "The Evening Collection", slug: "evening", desc: "Statement pieces crafted for extraordinary occasions.", gender: "both" },
  { name: "The Essentials", slug: "essentials", desc: "Investment pieces that anchor every wardrobe. Understated, exceptional.", gender: "both" },
];

export default function CollectionsPage() {
  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      <section className="py-20 px-6 lg:px-12 border-b border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-caps text-[var(--gold)] mb-4">Covora</p>
          <h1 className="heading-xl text-[var(--ivory)]">Collections</h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLECTIONS.map((col, i) => (
            <Link
              key={col.slug}
              href={`/collection/${col.slug}`}
              className="group relative overflow-hidden aspect-[3/4] bg-[var(--charcoal-mid)]"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                style={{
                  background: `linear-gradient(${135 + i * 15}deg, #0a0a0a, #1a1a14, #0d0d0a)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 z-10">
                <p className="label-caps text-[var(--gold)] mb-2">
                  {col.gender === "mens" ? "Mens" : col.gender === "womens" ? "Womens" : "All"}
                </p>
                <h2 className="font-[var(--font-cormorant)] text-[var(--ivory)] text-2xl font-light leading-tight mb-3 group-hover:text-[var(--gold)] transition-colors duration-300">
                  {col.name}
                </h2>
                <p className="text-[var(--warm-grey)] text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {col.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
