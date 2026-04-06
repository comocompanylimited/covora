import type { Metadata } from "next"
import Link from "next/link"
import LuxuryFooter from "@/components/shared/LuxuryFooter"

export const metadata: Metadata = {
  title: "Size Guide — Covora Lumière",
  description: "Size guide for Covora Lumière garments.",
}

const WOMENS_TOPS = [
  { size: "XS", uk: "6–8",  eu: "34–36", us: "2–4",  bust: "81–84cm", waist: "63–66cm" },
  { size: "S",  uk: "8–10", eu: "36–38", us: "4–6",  bust: "84–88cm", waist: "66–70cm" },
  { size: "M",  uk: "10–12",eu: "38–40", us: "6–8",  bust: "88–92cm", waist: "70–74cm" },
  { size: "L",  uk: "12–14",eu: "40–42", us: "8–10", bust: "92–97cm", waist: "74–80cm" },
  { size: "XL", uk: "14–16",eu: "42–44", us: "10–12",bust: "97–103cm",waist: "80–86cm" },
]

const MENS_TOPS = [
  { size: "XS", chest: "84–88cm", waist: "71–75cm", collar: "37cm" },
  { size: "S",  chest: "88–93cm", waist: "75–80cm", collar: "38cm" },
  { size: "M",  chest: "93–99cm", waist: "80–86cm", collar: "39–40cm" },
  { size: "L",  chest: "99–105cm",waist: "86–92cm", collar: "41–42cm" },
  { size: "XL", chest: "105–112cm",waist:"92–99cm", collar: "43–44cm" },
]

export default function SizeGuidePage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PageHeader />

      {/* Hero */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.42em", color: "rgba(201,169,110,0.65)", display: "block", marginBottom: "1.2rem" }}>Fit Guide</span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "0.04em", color: "var(--ivory)", lineHeight: 1.05 }}>
            Size{" "}
            <span style={{ fontStyle: "italic", color: "rgba(201,169,110,0.85)" }}>Guide</span>
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.9rem, 1.1vw, 1rem)", fontStyle: "italic", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "560px", marginTop: "1rem" }}>
            All measurements are body measurements, not garment measurements. We recommend measuring yourself and comparing to the size chart for the most accurate fit.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>

        {/* Womens */}
        <SizeTable title="Womens Tops & Dresses" headers={["Size", "UK", "EU", "US", "Bust", "Waist"]}>
          {WOMENS_TOPS.map((row) => (
            <SizeRow key={row.size} cells={[row.size, row.uk, row.eu, row.us, row.bust, row.waist]} highlight={row.size} />
          ))}
        </SizeTable>

        <div style={{ height: "3rem" }} />

        {/* Mens */}
        <SizeTable title="Mens Tops & Shirts" headers={["Size", "Chest", "Waist", "Collar"]}>
          {MENS_TOPS.map((row) => (
            <SizeRow key={row.size} cells={[row.size, row.chest, row.waist, row.collar]} highlight={row.size} />
          ))}
        </SizeTable>

        {/* Measuring guide */}
        <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.7)", marginBottom: "2rem" }}>How to Measure</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
            {[
              { label: "Chest / Bust", desc: "Measure around the fullest part of your chest, keeping the tape parallel to the ground." },
              { label: "Waist", desc: "Measure around your natural waist — the narrowest point of your torso, typically above the navel." },
              { label: "Hips", desc: "Measure around the fullest part of your hips and seat, keeping the tape parallel to the ground." },
              { label: "Inseam", desc: "Measure from the crotch to the bottom of the ankle bone along the inside of the leg." },
            ].map((m) => (
              <div key={m.label}>
                <p className="label-caps" style={{ fontSize: "0.38rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>{m.label}</p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.92rem", fontStyle: "italic", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  )
}

function SizeTable({ title, headers, children }: { title: string; headers: string[]; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-caps" style={{ fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.7)", marginBottom: "1.5rem" }}>{title}</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              {headers.map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "0.7rem 1rem", fontFamily: "var(--font-inter)", fontSize: "0.38rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  )
}

function SizeRow({ cells, highlight }: { cells: string[]; highlight: string }) {
  return (
    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      {cells.map((cell, i) => (
        <td key={i} style={{ padding: "0.9rem 1rem", fontFamily: i === 0 ? "var(--font-inter)" : "var(--font-cormorant)", fontSize: i === 0 ? "0.62rem" : "0.92rem", fontWeight: i === 0 ? 500 : 300, letterSpacing: i === 0 ? "0.1em" : "0.03em", color: i === 0 ? "var(--gold)" : "rgba(255,255,255,0.5)" }}>
          {cell}
        </td>
      ))}
    </tr>
  )
}

function PageHeader() {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.44em", textTransform: "uppercase", color: "var(--gold)", paddingRight: "0.44em" }}>Covora</span>
        </Link>
        <Link href="/womens" style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
          className="hover:text-[rgba(255,255,255,0.8)]">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}
