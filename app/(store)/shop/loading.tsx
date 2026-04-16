export default function ShopLoading() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Page header skeleton */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingTop: "clamp(2.5rem,5vw,4rem)", paddingBottom: "clamp(1.75rem,3vw,2.5rem)", paddingLeft: "var(--container-padding)", paddingRight: "var(--container-padding)" }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <div style={{ height: "10px", width: "140px", background: "#EAE7E2", marginBottom: "1.25rem", animation: "shpulse 1.5s infinite" }} />
          <div style={{ height: "52px", width: "280px", background: "#EAE7E2", animation: "shpulse 1.5s infinite" }} />
        </div>
      </div>

      {/* Body skeleton */}
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", paddingLeft: "var(--container-padding)", paddingRight: "var(--container-padding)", paddingTop: "clamp(2.5rem,4vw,3.5rem)", display: "grid", gridTemplateColumns: "220px 1fr", gap: "clamp(3rem,5vw,5rem)" }} className="sl-layout">

        {/* Sidebar skeleton */}
        <div className="sl-sidebar" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[100, 80, 90, 70, 85].map((w, i) => (
            <div key={i} style={{ height: "12px", width: `${w}%`, background: "#EAE7E2", animation: "shpulse 1.5s infinite" }} />
          ))}
        </div>

        {/* Grid skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(0.85rem,1.8vw,1.5rem)" }} className="sl-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div style={{ aspectRatio: "4/5", background: "#EAE7E2", animation: "shpulse 1.5s infinite", marginBottom: "1rem" }} />
              <div style={{ height: "10px", width: "75%", background: "#EAE7E2", animation: "shpulse 1.5s infinite", marginBottom: "0.6rem" }} />
              <div style={{ height: "18px", width: "45%", background: "#EAE7E2", animation: "shpulse 1.5s infinite" }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shpulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @media (max-width: 960px) {
          .sl-layout { grid-template-columns: 1fr !important; }
          .sl-sidebar { display: none !important; }
          .sl-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
