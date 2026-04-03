import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Covora",
  description: "The House of Covora. Our story, our craft, our values.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--black)] pt-[72px]">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a14 60%, #0a0a0a 100%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[rgba(10,10,10,0.4)] to-transparent" />
        <div className="relative z-10 px-6 lg:px-24 pb-20">
          <p className="label-caps text-[var(--gold)] mb-6">Our Story</p>
          <h1
            className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light leading-none"
            style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            The House
            <br />
            <span className="italic text-[var(--gold)]">of Covora.</span>
          </h1>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-24 max-w-[900px]">
        <p className="label-caps text-[var(--gold)] mb-8">Manifesto</p>
        <blockquote
          className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light italic leading-relaxed"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "0.02em" }}
        >
          "Covora was born from a singular obsession with refinement. Not luxury
          as a status symbol — but luxury as a feeling. The weight of perfect
          fabric. The silence of flawless construction. The quiet power of
          wearing something extraordinary."
        </blockquote>
      </section>

      <div className="divider-gold mx-6 lg:mx-24" />

      {/* ── Story ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="label-caps text-[var(--gold)] mb-6">Our Beginning</p>
            <h2 className="heading-lg text-[var(--ivory)] mb-8">
              Crafted with intention.<br />
              <span className="italic">Built to endure.</span>
            </h2>
            <div className="space-y-5 text-[var(--warm-grey)] text-sm leading-relaxed">
              <p>
                Covora was founded on a simple premise: that the modern wardrobe
                deserves better. Better materials. Better construction. Better
                design that doesn't shout, but commands attention.
              </p>
              <p>
                Every piece in the Covora collection is conceived with the same
                meticulous attention to detail — from the sourcing of raw
                materials to the final stitch. We work with heritage craftspeople
                and modern artisans who share our uncompromising vision.
              </p>
              <p>
                This is not fast fashion. This is fashion that lasts. Covora is
                built for the individual who understands that true luxury is
                found not in the label, but in the craft.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { number: "01", title: "Material Excellence", body: "We source only the finest natural fibres — cashmere from Mongolia, silk from Como, wool from Merino's finest stations. Every fabric is chosen for its exceptional hand and longevity." },
              { number: "02", title: "Precision Craft", body: "Our collections are produced in limited quantities by skilled artisans who bring decades of experience to every piece. Nothing is rushed. Nothing is compromised." },
              { number: "03", title: "Timeless Design", body: "We design for longevity — not for seasons. Every Covora piece is conceived to be worn for years, not discarded after a trend cycle. We believe that true style is always in season." },
            ].map((item) => (
              <div key={item.number} className="border-l border-[var(--border-gold)] pl-6">
                <p className="label-caps text-[var(--gold)] mb-2">{item.number}</p>
                <h3 className="font-[var(--font-cormorant)] text-[var(--ivory)] text-xl font-light mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--warm-grey)] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 border-t border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="label-caps text-[var(--gold)] mb-2">Discover Covora</p>
            <h2 className="heading-md text-[var(--ivory)]">Explore the new collection.</h2>
          </div>
          <div className="flex gap-4">
            <Link href="/mens" className="btn btn-outline">Mens</Link>
            <Link href="/womens" className="btn btn-primary">Womens</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
