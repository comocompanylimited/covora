import type { Metadata } from "next";
import WomensProductCard from "@/components/womens/WomensProductCard";
import WomensCategoryNav from "@/components/womens/WomensCategoryNav";
import WomensHeader from "@/components/womens/WomensHeader";
import WomensEditorialSection from "@/components/womens/WomensEditorialSection";
import { fetchWomensProducts } from "@/lib/graphql/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Womens — Covora",
  description:
    "Discover the Covora Womens collection. Luxury fashion crafted for the modern woman.",
};

export default async function WomensPage() {
  const products = await fetchWomensProducts();

  return (
    <div className="bg-[var(--black)] min-h-screen">

      <WomensHeader />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: "82vh" }}>

        {/* Dark fallback — visible before video loads */}
        <div className="absolute inset-0 bg-[#060606]" aria-hidden />

        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://pub-98b9c2a87ab54dd9924de5af1f2e080e.r2.dev/womens.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 select-none flex flex-col items-center" style={{ marginTop: "6vh" }}>

          {/* Eyebrow rule */}
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: "28px", height: "1px", background: "rgba(201,169,110,0.45)" }} />
            <span
              className="label-caps"
              style={{ fontSize: "0.46rem", letterSpacing: "0.52em", color: "rgba(201,169,110,0.7)" }}
            >
              Crafted for Her
            </span>
            <div style={{ width: "28px", height: "1px", background: "rgba(201,169,110,0.45)" }} />
          </div>

          {/* Main title */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4.5rem, 11vw, 11.5rem)",
              fontWeight: 300,
              lineHeight: 0.88,
              letterSpacing: "0.08em",
              color: "var(--ivory)",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Covora
            <br />
            <span style={{ fontStyle: "italic", opacity: 0.9 }}>Femme</span>
          </h1>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
              marginBottom: "1.8rem",
            }}
          />

          {/* Sub-branding */}
          <div className="flex flex-col items-center gap-2">
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(0.95rem, 1.8vw, 1.55rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "0.28em",
                color: "rgba(201,169,110,0.72)",
              }}
            >
              Covora Lumière
            </span>
            <span
              className="label-caps"
              style={{ fontSize: "0.4rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.38)" }}
            >
              Maison de Luxe
            </span>
          </div>

        </div>

      </section>

      {/* ── Category Navigation ──────────────────────────────────── */}
      <WomensCategoryNav />

      {/* ── Editorial Light Section ──────────────────────────────── */}
      <WomensEditorialSection />

      {/* ── Products from WordPress GraphQL ──────────────────────── */}
      {products.length > 0 && (
        <div
          style={{
            background: "var(--black)",
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 3vw, 3rem)",
          }}
        >
          {/* Section label */}
          <div style={{ maxWidth: "1200px", margin: "0 auto 2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "24px", height: "1px", background: "rgba(201,169,110,0.4)" }} />
              <span
                className="label-caps"
                style={{ fontSize: "0.42rem", letterSpacing: "0.45em", color: "rgba(201,169,110,0.6)" }}
              >
                New In
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "var(--ivory)",
                lineHeight: 1.1,
              }}
            >
              The Edit
            </h2>
          </div>

          {/* Product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "clamp(1rem, 2vw, 1.5rem)",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {products.map((product) => (
              <WomensProductCard
                key={product.id}
                id={product.id}
                databaseId={product.databaseId}
                name={product.name}
                slug={product.slug}
                price={product.price}
                imageUrl={product.image?.sourceUrl}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
