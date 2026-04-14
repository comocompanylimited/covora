import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Size Guide — Covora",
  description: "Find your perfect fit with the Covora size guide.",
}

const WOMENS_TOPS = [
  { size: "XS", uk: "6–8",   eu: "34–36", us: "2–4",   bust: "81–84cm",  waist: "63–66cm", hips: "87–90cm"  },
  { size: "S",  uk: "8–10",  eu: "36–38", us: "4–6",   bust: "84–88cm",  waist: "66–70cm", hips: "90–94cm"  },
  { size: "M",  uk: "10–12", eu: "38–40", us: "6–8",   bust: "88–92cm",  waist: "70–74cm", hips: "94–98cm"  },
  { size: "L",  uk: "12–14", eu: "40–42", us: "8–10",  bust: "92–97cm",  waist: "74–80cm", hips: "98–103cm" },
  { size: "XL", uk: "14–16", eu: "42–44", us: "10–12", bust: "97–103cm", waist: "80–86cm", hips: "103–110cm"},
]

const WOMENS_BOTTOMS = [
  { size: "XS", uk: "6–8",   waist: "63–66cm", hips: "87–90cm",  inseam: "76cm" },
  { size: "S",  uk: "8–10",  waist: "66–70cm", hips: "90–94cm",  inseam: "77cm" },
  { size: "M",  uk: "10–12", waist: "70–74cm", hips: "94–98cm",  inseam: "78cm" },
  { size: "L",  uk: "12–14", waist: "74–80cm", hips: "98–103cm", inseam: "79cm" },
  { size: "XL", uk: "14–16", waist: "80–86cm", hips: "103–110cm",inseam: "80cm" },
]

const MEASURES = [
  { label: "Bust / Chest", desc: "Measure around the fullest part of your chest, keeping the tape horizontal." },
  { label: "Waist", desc: "Measure around your natural waist — the narrowest point, typically above the navel." },
  { label: "Hips", desc: "Measure around the fullest part of your hips and seat, keeping the tape horizontal." },
  { label: "Inseam", desc: "Measure from the crotch to the ankle bone along the inside of the leg." },
]

const TH: React.CSSProperties = {
  textAlign: "left",
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-inter)",
  fontSize: "0.48rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--gold-dark)",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
  background: "#F5F3F0",
  whiteSpace: "nowrap" as const,
}

export default function SizeGuidePage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Header */}
      <div style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 4vw, 4rem)",
      }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <Link href="/home" style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", color: "#BBBBBB", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#CCCCCC" }}>›</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", color: "var(--gold-dark)" }}>Size Guide</span>
          </nav>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.52rem", fontWeight: 600,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--gold-dark)", marginBottom: "1rem",
          }}>Fit Guide</p>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 300, color: "#111111",
            lineHeight: 0.95, letterSpacing: "-0.01em",
          }}>Size Guide</h1>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.72rem", color: "#888888",
            lineHeight: 1.8, maxWidth: "560px", marginTop: "1.25rem",
          }}>
            All measurements below are body measurements, not garment measurements. We recommend measuring yourself and comparing to the chart for your best fit.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>

        {/* Womens Tops */}
        <SizeSection title="Women's Tops &amp; Dresses" note="All measurements in centimetres unless stated.">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px" }}>
              <thead>
                <tr>
                  {["Size", "UK", "EU", "US", "Bust", "Waist", "Hips"].map((h) => (
                    <th key={h} style={TH}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WOMENS_TOPS.map((row, i) => (
                  <tr key={row.size} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#FAFAF8" }}>
                    <td style={{ ...TD, fontWeight: 600, color: "var(--gold-dark)" }}>{row.size}</td>
                    <td style={TD}>{row.uk}</td>
                    <td style={TD}>{row.eu}</td>
                    <td style={TD}>{row.us}</td>
                    <td style={TD}>{row.bust}</td>
                    <td style={TD}>{row.waist}</td>
                    <td style={TD}>{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SizeSection>

        <div style={{ height: "3rem" }} />

        {/* Womens Bottoms */}
        <SizeSection title="Women's Trousers &amp; Skirts" note="">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "420px" }}>
              <thead>
                <tr>
                  {["Size", "UK", "Waist", "Hips", "Inseam"].map((h) => (
                    <th key={h} style={TH}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WOMENS_BOTTOMS.map((row, i) => (
                  <tr key={row.size} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#FAFAF8" }}>
                    <td style={{ ...TD, fontWeight: 600, color: "var(--gold-dark)" }}>{row.size}</td>
                    <td style={TD}>{row.uk}</td>
                    <td style={TD}>{row.waist}</td>
                    <td style={TD}>{row.hips}</td>
                    <td style={TD}>{row.inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SizeSection>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "3.5rem 0" }} />

        {/* How to measure */}
        <div>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.52rem", fontWeight: 600,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--gold-dark)", marginBottom: "2rem",
          }}>How to Measure</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }} className="measure-grid">
            {MEASURES.map((m) => (
              <div key={m.label} style={{
                padding: "1.5rem",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                borderLeft: "2px solid rgba(201,169,110,0.4)",
              }}>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.56rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#333333", marginBottom: "0.6rem",
                }}>{m.label}</p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem", color: "#777777", lineHeight: 1.8,
                }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "3.5rem 0" }} />

        {/* Still unsure */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.07)",
          padding: "2rem 2.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.25rem", fontWeight: 300, color: "#111111", marginBottom: "0.4rem",
            }}>Still unsure of your size?</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#888888" }}>
              Our styling team is happy to help. Contact us and we&apos;ll advise on fit.
            </p>
          </div>
          <Link href="/contact" style={{
            display: "inline-block",
            fontFamily: "var(--font-inter)",
            fontSize: "0.54rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#FFFFFF", background: "#111111",
            padding: "0.85rem 2rem", textDecoration: "none",
            whiteSpace: "nowrap" as const,
          }}>
            Contact Us
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) { .measure-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

const TD: React.CSSProperties = {
  padding: "0.85rem 1rem",
  fontFamily: "var(--font-cormorant)",
  fontSize: "0.9rem",
  fontWeight: 300,
  color: "#444444",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
}

function SizeSection({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.52rem", fontWeight: 600,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#888888", marginBottom: "0.3rem",
        }} dangerouslySetInnerHTML={{ __html: title }} />
        {note && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#BBBBBB" }}>{note}</p>}
      </div>
      <div style={{ border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  )
}
