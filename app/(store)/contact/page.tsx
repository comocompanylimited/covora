"use client";

import { useState } from "react";

const INPUT: React.CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.14)",
  borderRadius: 0,
  padding: "0.75rem 0.9rem",
  fontFamily: "var(--font-inter)",
  fontSize: "0.78rem",
  color: "#111111",
  outline: "none",
  boxSizing: "border-box" as const,
};

const LABEL: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-inter)",
  fontSize: "0.5rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#888888",
  marginBottom: "0.4rem",
};

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Header */}
      <div style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 4vw, 4rem)",
      }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.52rem",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
            marginBottom: "1rem",
          }}>Get in Touch</p>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            fontWeight: 300,
            color: "#111111",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
          }}>Contact</h1>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: "var(--container-wide)",
        margin: "0 auto",
        padding: "clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: "clamp(3rem, 6vw, 7rem)",
        alignItems: "start",
      }} className="contact-grid">

        {/* Form */}
        <div>
          {status === "success" ? (
            <div style={{
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "3.5rem 2.5rem",
              textAlign: "center",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                border: "1px solid rgba(201,169,110,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.8rem", fontWeight: 300, color: "#111111", marginBottom: "0.85rem",
              }}>Message sent.</h2>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#888888", lineHeight: 1.85 }}>
                Thank you for reaching out. Our team will respond within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={LABEL}>First Name</label>
                  <input type="text" className="ci" style={INPUT} placeholder="Jane" required />
                </div>
                <div>
                  <label style={LABEL}>Last Name</label>
                  <input type="text" className="ci" style={INPUT} placeholder="Smith" />
                </div>
              </div>
              <div>
                <label style={LABEL}>Email Address</label>
                <input type="email" className="ci" style={INPUT} placeholder="jane@example.com" required />
              </div>
              <div>
                <label style={LABEL}>Subject</label>
                <select className="ci" style={{
                  ...INPUT,
                  appearance: "none" as const,
                  cursor: "pointer",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.9rem center",
                  paddingRight: "2.25rem",
                }}>
                  <option value="">Select a topic</option>
                  <option>Order enquiry</option>
                  <option>Returns & exchanges</option>
                  <option>Product question</option>
                  <option>Styling advice</option>
                  <option>Press & partnerships</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={LABEL}>Message</label>
                <textarea
                  className="ci"
                  style={{ ...INPUT, resize: "vertical" as const, minHeight: "140px", lineHeight: 1.7 }}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem", fontWeight: 600,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#FFFFFF",
                    background: status === "loading" ? "#888888" : "#111111",
                    border: "none", padding: "1rem 2.5rem",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "background 0.25s ease",
                  }}
                  onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = "#333333"; }}
                  onMouseLeave={(e) => { if (status !== "loading") e.currentTarget.style.background = "#111111"; }}
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[
            { label: "Client Services", lines: ["Monday – Friday, 9am – 6pm GMT", "orders@covora.co.uk"] },
            { label: "Press & Partnerships", lines: ["press@covora.co.uk"] },
            { label: "Head Office", lines: ["Covora", "London, United Kingdom"] },
          ].map((block) => (
            <div key={block.label}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.5rem", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gold-dark)", marginBottom: "0.6rem",
              }}>{block.label}</p>
              {block.lines.map((line, i) => (
                <p key={i} style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#666666", lineHeight: 1.75 }}>{line}</p>
              ))}
            </div>
          ))}

          <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />

          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#CCCCCC", marginBottom: "0.6rem",
            }}>Follow Us</p>
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <a key={s} href="#" style={{
                display: "block", fontFamily: "var(--font-inter)",
                fontSize: "0.72rem", color: "#888888",
                textDecoration: "none", lineHeight: 1.9,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888888")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }
        .ci:focus { border-color: var(--gold) !important; outline: none; }
        .ci:hover { border-color: rgba(0,0,0,0.28) !important; }
        .ci::placeholder { color: #CCCCCC; }
      `}</style>
    </div>
  );
}
