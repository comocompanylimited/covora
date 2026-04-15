export default function ProductLoading() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) var(--container-padding)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Image skeleton */}
        <div
          style={{
            aspectRatio: "3/4",
            background: "linear-gradient(90deg, #ece9e4 25%, #f5f3ef 50%, #ece9e4 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />

        {/* Info skeleton */}
        <div style={{ paddingTop: "1rem" }}>
          <div style={{ height: "14px", width: "80px", background: "#E8E4DF", marginBottom: "1.5rem" }} />
          <div style={{ height: "52px", width: "75%", background: "#E8E4DF", marginBottom: "1rem" }} />
          <div style={{ height: "28px", width: "100px", background: "#E8E4DF", marginBottom: "2rem" }} />
          <div style={{ height: "1px", background: "#E8E4DF", marginBottom: "2rem" }} />
          <div style={{ height: "14px", width: "100%", background: "#E8E4DF", marginBottom: "0.75rem" }} />
          <div style={{ height: "14px", width: "88%", background: "#E8E4DF", marginBottom: "0.75rem" }} />
          <div style={{ height: "14px", width: "92%", background: "#E8E4DF", marginBottom: "2.5rem" }} />
          <div style={{ height: "54px", width: "100%", background: "#E8E4DF" }} />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
