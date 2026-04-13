"use client";

interface EmailSignupProps {
  placeholder?: string;
  buttonLabel?: string;
  style?:       React.CSSProperties;
}

export default function EmailSignup({
  placeholder = "Your email address",
  buttonLabel = "Notify Me",
  style,
}: EmailSignupProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Will wire to real API in a later phase
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display:       "flex",
        gap:           "0",
        maxWidth:      "380px",
        margin:        "0 auto",
        borderBottom:  "1px solid var(--border-mid)",
        ...style,
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        style={{
          flex:        1,
          background:  "transparent",
          border:      "none",
          outline:     "none",
          fontFamily:  "var(--font-inter)",
          fontSize:    "0.78rem",
          color:       "var(--text-primary)",
          padding:     "0.75rem 0",
          letterSpacing:"0.03em",
        }}
      />
      <button
        type="submit"
        className="btn btn-ghost btn-sm"
        style={{ color: "var(--gold)", paddingRight: 0, paddingLeft: "0.75rem" }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
