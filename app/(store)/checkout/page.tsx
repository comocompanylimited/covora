"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

type Step = "contact" | "shipping" | "payment" | "review";

const STEPS: { id: Step; label: string }[] = [
  { id: "contact",  label: "Contact" },
  { id: "shipping", label: "Shipping" },
  { id: "payment",  label: "Payment" },
  { id: "review",   label: "Review" },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const INPUT_BASE: React.CSSProperties = {
  width: "100%", background: "#FFFFFF", borderRadius: 0,
  padding: "0.75rem 0.85rem", fontFamily: "var(--font-inter)",
  fontSize: "0.78rem", color: "#111111", outline: "none", boxSizing: "border-box",
};
const LABEL: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-inter)", fontSize: "0.52rem",
  fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const,
  color: "#888888", marginBottom: "0.45rem",
};
const SELECT_STYLE: React.CSSProperties = {
  ...INPUT_BASE, border: "1px solid rgba(0,0,0,0.14)",
  appearance: "none" as const, cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888888' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 0.85rem center", paddingRight: "2.25rem",
};

function inputStyle(hasErr: boolean): React.CSSProperties {
  return { ...INPUT_BASE, border: `1px solid ${hasErr ? "#C0392B" : "rgba(0,0,0,0.14)"}` };
}
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#C0392B", marginTop: "0.3rem", display: "block" }}>{msg}</span>;
}
function FG({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>;
}

// ─── Shared form state types ──────────────────────────────────────────────────

interface ContactData { firstName: string; lastName: string; email: string; phone: string; }
interface ShippingData { address: string; address2: string; city: string; postcode: string; country: string; }

// ─── Checkout ─────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState<Step>("contact");
  const currentIndex = STEPS.findIndex((s) => s.id === step);

  // Lifted state so ReviewStep can read it for the POST
  const [contactData, setContactData] = useState<ContactData>({ firstName: "", lastName: "", email: "", phone: "" });
  const [shippingData, setShippingData] = useState<ShippingData>({ address: "", address2: "", city: "", postcode: "", country: "United Kingdom" });

  if (items.length === 0) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ width: "40px", height: "1px", background: "rgba(201,169,110,0.5)", margin: "0 auto 2.5rem" }} />
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#111111", marginBottom: "1rem" }}>Your bag is empty</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#888888", marginBottom: "2rem" }}>Add some pieces before proceeding to checkout.</p>
          <Link href="/shop" style={{ display: "inline-block", fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", padding: "0.9rem 2.5rem", textDecoration: "none" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>
      <div className="checkout-layout" style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,4rem)", display: "grid", gridTemplateColumns: "1fr 360px", gap: "clamp(3rem,5vw,6rem)", alignItems: "start" }}>

        {/* Left: form */}
        <div>
          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "2.5rem" }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? "1" : "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: i <= currentIndex ? "pointer" : "default" }} onClick={() => { if (i <= currentIndex) setStep(s.id); }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0, border: `1px solid ${i <= currentIndex ? "var(--gold)" : "rgba(0,0,0,0.18)"}`, background: i < currentIndex ? "var(--gold)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i < currentIndex
                      ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#111111" strokeWidth="1.5"><path d="M1.5 5L4 7.5L8.5 2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", fontWeight: 600, color: i === currentIndex ? "var(--gold)" : "#BBBBBB" }}>{i + 1}</span>}
                  </div>
                  <span className="checkout-stepper-label" style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: i === currentIndex ? "var(--gold-dark)" : i < currentIndex ? "#555555" : "#AAAAAA" }}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: "1px", background: i < currentIndex ? "var(--gold)" : "rgba(0,0,0,0.1)", margin: "0 0.75rem" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", padding: "clamp(1.5rem,3vw,2.5rem)" }}>
            {step === "contact" && (
              <ContactStep
                initial={contactData}
                onNext={(data) => { setContactData(data); setStep("shipping"); }}
              />
            )}
            {step === "shipping" && (
              <ShippingStep
                initial={shippingData}
                onNext={(data) => { setShippingData(data); setStep("payment"); }}
              />
            )}
            {step === "payment" && <PaymentStep onNext={() => setStep("review")} />}
            {step === "review" && (
              <ReviewStep
                contact={contactData}
                shipping={shippingData}
                items={items}
                subtotal={subtotal}
              />
            )}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="checkout-summary" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", padding: "2rem", position: "sticky", top: "calc(var(--header-height) + 2rem)" }}>
          <div style={{ height: "2px", background: "var(--gold)", marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888888", marginBottom: "1.5rem" }}>Order Summary</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#333333", lineHeight: 1.4 }}>
                    {item.name}{item.quantity > 1 && <span style={{ color: "#AAAAAA", marginLeft: "0.4rem" }}>×{item.quantity}</span>}
                  </p>
                  {Object.keys(item.selectedAttributes).length > 0 && (
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#AAAAAA" }}>
                      {Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                    </p>
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "#333333", flexShrink: 0 }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "1.25rem" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#888888" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "#333333" }}>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#888888" }}>Shipping</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "var(--gold-dark)" }}>Calculated next step</span>
            </div>
          </div>
          <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "1.25rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#111111" }}>Total</span>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#111111" }}>{formatPrice(subtotal)}</span>
          </div>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#CCCCCC" }}>Taxes calculated at checkout.</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
          .checkout-summary { position: static !important; order: -1; }
        }
        .checkout-input:focus { border-color: var(--gold) !important; }
        @media (max-width: 480px) {
          .checkout-stepper-label { display: none; }
        }
      `}</style>
    </div>
  );
}

// ─── Contact step ─────────────────────────────────────────────────────────────

function ContactStep({ initial, onNext }: { initial: ContactData; onNext: (d: ContactData) => void }) {
  const [f, setF] = useState(initial);
  const [e, setE] = useState<Record<string, string>>({});

  function set(k: keyof ContactData, v: string) {
    setF((p) => ({ ...p, [k]: v }));
    if (e[k]) setE((p) => ({ ...p, [k]: "" }));
  }

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!f.firstName.trim()) errs.firstName = "First name is required";
    if (!f.lastName.trim())  errs.lastName  = "Last name is required";
    if (!f.email.trim())     errs.email     = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = "Enter a valid email address";
    if (Object.keys(errs).length) { setE(errs); return; }
    onNext(f);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#111111" }}>Contact Information</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <FG>
          <label style={LABEL}>First Name <span style={{ color: "#C0392B" }}>*</span></label>
          <input className="checkout-input" style={inputStyle(!!e.firstName)} placeholder="Jane" value={f.firstName} onChange={(ev) => set("firstName", ev.target.value)} />
          <FieldError msg={e.firstName} />
        </FG>
        <FG>
          <label style={LABEL}>Last Name <span style={{ color: "#C0392B" }}>*</span></label>
          <input className="checkout-input" style={inputStyle(!!e.lastName)} placeholder="Smith" value={f.lastName} onChange={(ev) => set("lastName", ev.target.value)} />
          <FieldError msg={e.lastName} />
        </FG>
      </div>
      <FG>
        <label style={LABEL}>Email Address <span style={{ color: "#C0392B" }}>*</span></label>
        <input type="email" className="checkout-input" style={inputStyle(!!e.email)} placeholder="jane@example.com" value={f.email} onChange={(ev) => set("email", ev.target.value)} />
        <FieldError msg={e.email} />
      </FG>
      <FG>
        <label style={LABEL}>Phone (optional)</label>
        <input type="tel" className="checkout-input" style={inputStyle(false)} placeholder="+44 7700 000000" value={f.phone} onChange={(ev) => set("phone", ev.target.value)} />
      </FG>
      <div style={{ paddingTop: "0.5rem" }}>
        <ProceedButton onClick={handleNext} label="Continue to Shipping" />
      </div>
    </div>
  );
}

// ─── Shipping step ────────────────────────────────────────────────────────────

function ShippingStep({ initial, onNext }: { initial: ShippingData; onNext: (d: ShippingData) => void }) {
  const [f, setF] = useState(initial);
  const [e, setE] = useState<Record<string, string>>({});

  function set(k: keyof ShippingData, v: string) {
    setF((p) => ({ ...p, [k]: v }));
    if (e[k]) setE((p) => ({ ...p, [k]: "" }));
  }

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!f.address.trim())  errs.address  = "Address is required";
    if (!f.city.trim())     errs.city     = "City is required";
    if (!f.postcode.trim()) errs.postcode = "Postcode is required";
    if (Object.keys(errs).length) { setE(errs); return; }
    onNext(f);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#111111" }}>Shipping Address</h2>
      <FG>
        <label style={LABEL}>Address <span style={{ color: "#C0392B" }}>*</span></label>
        <input className="checkout-input" style={inputStyle(!!e.address)} placeholder="123 Mayfair Street" value={f.address} onChange={(ev) => set("address", ev.target.value)} />
        <FieldError msg={e.address} />
      </FG>
      <FG>
        <label style={LABEL}>Address Line 2 (optional)</label>
        <input className="checkout-input" style={inputStyle(false)} placeholder="Apartment, floor, etc." value={f.address2} onChange={(ev) => set("address2", ev.target.value)} />
      </FG>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <FG>
          <label style={LABEL}>City <span style={{ color: "#C0392B" }}>*</span></label>
          <input className="checkout-input" style={inputStyle(!!e.city)} placeholder="London" value={f.city} onChange={(ev) => set("city", ev.target.value)} />
          <FieldError msg={e.city} />
        </FG>
        <FG>
          <label style={LABEL}>Postcode <span style={{ color: "#C0392B" }}>*</span></label>
          <input className="checkout-input" style={inputStyle(!!e.postcode)} placeholder="W1K 1AA" value={f.postcode} onChange={(ev) => set("postcode", ev.target.value)} />
          <FieldError msg={e.postcode} />
        </FG>
      </div>
      <FG>
        <label style={LABEL}>Country <span style={{ color: "#C0392B" }}>*</span></label>
        <select className="checkout-input" style={SELECT_STYLE} value={f.country} onChange={(ev) => set("country", ev.target.value)}>
          {["United Kingdom","United States","France","Germany","Australia","Canada","UAE","Singapore"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </FG>
      <div style={{ paddingTop: "0.25rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "0.85rem" }}>Shipping Method</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {[
            { label: "Standard Delivery", time: "3–5 business days", price: "£4.95" },
            { label: "Express Delivery",  time: "1–2 business days", price: "£12.95" },
            { label: "Next Day Delivery", time: "Order by 2pm",      price: "£19.95" },
          ].map((m, i) => (
            <label key={m.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem", border: `1px solid ${i === 0 ? "var(--gold)" : "rgba(0,0,0,0.1)"}`, background: i === 0 ? "rgba(201,169,110,0.04)" : "transparent", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "14px", height: "14px", border: `1px solid ${i === 0 ? "var(--gold)" : "rgba(0,0,0,0.2)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {i === 0 && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)" }} />}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#111111" }}>{m.label}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#999999" }}>{m.time}</p>
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "#333333" }}>{m.price}</span>
            </label>
          ))}
        </div>
      </div>
      <div style={{ paddingTop: "0.5rem" }}>
        <ProceedButton onClick={handleNext} label="Proceed to Payment" />
      </div>
    </div>
  );
}

// ─── Payment step ─────────────────────────────────────────────────────────────

function PaymentStep({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#111111" }}>Payment</h2>

      {/* Stripe notice */}
      <div style={{ padding: "1.75rem", border: "1px solid rgba(201,169,110,0.22)", background: "rgba(201,169,110,0.03)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ flexShrink: 0, width: "40px", height: "40px", border: "1px solid rgba(201,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dark)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", color: "#111111", marginBottom: "0.4rem" }}>
              Secure Payment via Stripe
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#777777", lineHeight: 1.75 }}>
              Your payment details are handled securely by Stripe. After reviewing your order, you&rsquo;ll be redirected to Stripe&rsquo;s encrypted checkout to complete your purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Accepted methods */}
      <div>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#BBBBBB", marginBottom: "0.85rem" }}>
          Accepted Methods
        </p>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"].map((m) => (
            <span key={m} style={{
              fontFamily: "var(--font-inter)", fontSize: "0.56rem", letterSpacing: "0.06em",
              color: "#777777", border: "1px solid rgba(0,0,0,0.1)",
              padding: "0.28rem 0.65rem", background: "#FFFFFF",
            }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.25rem" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "#BBBBBB", letterSpacing: "0.04em" }}>
          256-bit SSL · PCI DSS compliant · No card data stored
        </span>
      </div>

      <div style={{ paddingTop: "0.25rem" }}>
        <ProceedButton onClick={onNext} label="Review Order" />
      </div>
    </div>
  );
}

// ─── Review step (Stripe redirect) ────────────────────────────────────────────

interface ReviewProps {
  contact: ContactData;
  shipping: ShippingData;
  items: { id: string; name: string; slug: string; price: number; quantity: number; sku: string; selectedAttributes: Record<string, string> }[];
  subtotal: number;
}

function ReviewStep({ contact, shipping, items, subtotal }: ReviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://covorabackend.zeabur.app";

  async function handlePlaceOrder() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/v1/checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name:  `${contact.firstName} ${contact.lastName}`.trim(),
            email: contact.email,
            phone: contact.phone,
          },
          shipping: {
            address:  shipping.address,
            address2: shipping.address2,
            city:     shipping.city,
            postcode: shipping.postcode,
            country:  shipping.country,
          },
          items: items.map((item) => ({
            id:         item.id,
            name:       item.name,
            slug:       item.slug,
            sku:        item.sku,
            price:      item.price,
            quantity:   item.quantity,
            attributes: item.selectedAttributes,
          })),
          subtotal,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { detail?: string }).detail ?? "Payment session failed. Please try again.");
      }

      const data = await res.json() as { url: string };
      if (!data.url) throw new Error("Invalid response from payment server.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#111111" }}>Review &amp; Place Order</h2>

      {/* Summary rows */}
      <div style={{ border: "1px solid rgba(0,0,0,0.07)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <Row label="Name"     value={`${contact.firstName} ${contact.lastName}`} />
        <Row label="Email"    value={contact.email} />
        <Row label="Address"  value={[shipping.address, shipping.address2, shipping.city, shipping.postcode, shipping.country].filter(Boolean).join(", ")} />
        <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }} />
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#555555" }}>
              {item.name}{item.quantity > 1 && <span style={{ color: "#AAAAAA" }}> ×{item.quantity}</span>}
            </span>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", color: "#111111" }}>
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", fontWeight: 600, color: "#111111" }}>Total</span>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#111111" }}>{formatPrice(subtotal)}</span>
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#777777", lineHeight: 1.8 }}>
        By placing your order you agree to our{" "}
        <Link href="/terms" style={{ color: "var(--gold-dark)", textDecoration: "none" }}>Terms &amp; Conditions</Link>.
        You will be redirected to Stripe&rsquo;s secure payment page.
      </p>

      {/* Error message */}
      {error && (
        <div style={{ padding: "0.85rem 1rem", border: "1px solid #C0392B", background: "rgba(192,57,43,0.04)" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#C0392B", lineHeight: 1.6 }}>{error}</p>
        </div>
      )}

      {/* CTA */}
      <div style={{ paddingTop: "0.25rem" }}>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          style={{
            fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#FFFFFF", background: loading ? "#666666" : "#111111",
            border: "none", padding: "1rem 2.5rem", cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.25s ease", display: "flex", alignItems: "center", gap: "0.6rem",
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#333333"; }}
          onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#111111"; }}
        >
          {loading ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 0.8s linear infinite" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
              </svg>
              Redirecting to secure payment...
            </>
          ) : (
            "Place Order →"
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", minWidth: "70px", flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#333333" }}>{value}</span>
    </div>
  );
}

// ─── Shared button ────────────────────────────────────────────────────────────

function ProceedButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", border: "none", padding: "1rem 2.5rem", cursor: "pointer", transition: "background 0.25s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#333333")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
    >{label} →</button>
  );
}
