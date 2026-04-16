"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  order_id: string;
  status: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "https://covorabackend.zeabur.app") + "/api/v1";

function formatPrice(n: number) {
  return `£${n % 1 === 0 ? n : n.toFixed(2)}`;
}

function Skeleton() {
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,2.5rem)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#EAE7E2", animation: "ocpulse 1.5s infinite" }} />
        <div style={{ height: "14px", width: "160px", background: "#EAE7E2", animation: "ocpulse 1.5s infinite" }} />
        <div style={{ height: "44px", width: "320px", background: "#EAE7E2", animation: "ocpulse 1.5s infinite" }} />
        <div style={{ height: "12px", width: "260px", background: "#EAE7E2", animation: "ocpulse 1.5s infinite" }} />
        <div style={{ height: "1px", width: "100%", background: "#EAE7E2", margin: "0.5rem 0" }} />
        {[1,2,3,4].map((i) => (
          <div key={i} style={{ height: "68px", width: "100%", background: "#EAE7E2", animation: "ocpulse 1.5s infinite" }} />
        ))}
      </div>
      <style>{`@keyframes ocpulse { 0%,100%{opacity:1} 50%{opacity:0.45} }`}</style>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,2.5rem)", textAlign: "center" }}>
      <div style={{ width: "40px", height: "1px", background: "rgba(192,57,43,0.4)", margin: "0 auto 2rem" }} />
      <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 300, color: "#111111", marginBottom: "1rem" }}>
        Something went wrong
      </h1>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#888888", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        {message}
      </p>
      <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/checkout" className="oc-btn-outline">Back to Checkout</Link>
        <Link href="/shop" className="oc-btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#AAAAAA", minWidth: "100px", flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#333333", lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  );
}

function OrderConfirmationInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [order, setOrder]     = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found. If you completed payment, check your email for confirmation.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/orders/confirm?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { detail?: string }).detail ?? "Could not retrieve order details.");
        }
        return res.json() as Promise<Order>;
      })
      .then((data) => { setOrder(data); setLoading(false); })
      .catch((err: Error) => { setError(err.message); setLoading(false); });
  }, [sessionId]);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {loading && <Skeleton />}

      {!loading && error && <ErrorState message={error} />}

      {!loading && order && (
        <div style={{ maxWidth: "640px", width: "100%", margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,2.5rem)", textAlign: "center" }}>

          {/* Icon */}
          <div style={{ width: "56px", height: "56px", border: "1px solid rgba(201,169,110,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold-dark)", marginBottom: "1rem" }}>
            Order Confirmed
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: "#111111", letterSpacing: "0.01em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Thank you, {order.customer_name.split(" ")[0]}.
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#777777", lineHeight: 1.9, marginBottom: "2.5rem" }}>
            A confirmation has been sent to <strong style={{ color: "#444" }}>{order.customer_email}</strong>.
            We&apos;ll notify you when your order ships.
          </p>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "2rem" }} />

          {/* Order details */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", padding: "1.75rem", textAlign: "left", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ height: "2px", background: "var(--gold)", marginBottom: "0.25rem" }} />
            <Row label="Order ID" value={`#${order.order_id}`} />
            <Row label="Status"   value={order.status} />
            <Row label="Name"     value={order.customer_name} />
            <Row label="Email"    value={order.customer_email} />
            <Row label="Shipping" value={order.shipping_address} />
          </div>

          {/* Items */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", padding: "1.75rem", textAlign: "left", marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888888", marginBottom: "1.25rem" }}>
              Items Ordered
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: "0.85rem", borderBottom: i < order.items.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#333333" }}>{item.name}</p>
                    {item.quantity > 1 && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", color: "#AAAAAA" }}>Qty: {item.quantity}</p>}
                  </div>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "#111111", flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "1.25rem 0 1rem" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.65rem" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#888888" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "#333333" }}>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 600, color: "#111111" }}>Total</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#111111" }}>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/account/orders" className="oc-btn-outline">View Orders</Link>
            <Link href="/shop" className="oc-btn-primary">Continue Shopping</Link>
          </div>
        </div>
      )}

      <style>{`
        .oc-btn-outline {
          display: inline-block; font-family: var(--font-inter); font-size: 0.56rem;
          font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          color: #555555; background: transparent; border: 1px solid rgba(0,0,0,0.18);
          padding: 0.85rem 2rem; text-decoration: none; transition: all 0.2s ease;
        }
        .oc-btn-outline:hover { border-color: rgba(0,0,0,0.35); color: #111111; }
        .oc-btn-primary {
          display: inline-block; font-family: var(--font-inter); font-size: 0.56rem;
          font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          color: #FFFFFF; background: #111111; padding: 0.85rem 2rem;
          text-decoration: none; transition: background 0.25s ease;
        }
        .oc-btn-primary:hover { background: #333333; }
      `}</style>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <OrderConfirmationInner />
    </Suspense>
  );
}
