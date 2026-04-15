import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div
      style={{
        background: "#FAFAF8",
        minHeight: "100vh",
        paddingTop: "var(--header-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem var(--container-padding)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "var(--gold)",
            margin: "0 auto 2rem",
          }}
        />
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#111111",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            marginBottom: "1.25rem",
          }}
        >
          Product Not Found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.82rem",
            color: "#888888",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}
        >
          The piece you are looking for may have sold out or been removed.
        </p>
        <Link
          href="/shop"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter)",
            fontSize: "0.58rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FAFAF8",
            background: "#111111",
            padding: "1rem 2.5rem",
            textDecoration: "none",
          }}
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
