"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Connect to your mailing list endpoint (Klaviyo, Mailchimp, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-28 px-6 bg-[var(--charcoal-mid)]">
      <div className="max-w-xl mx-auto text-center">
        <p className="label-caps text-[var(--gold)] mb-6">The House of Covora</p>
        <h2 className="heading-lg text-[var(--ivory)] mb-4">
          Enter the inner circle.
        </h2>
        <p className="text-[var(--warm-grey)] text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          Be the first to discover new collections, exclusive events, and private
          editorials.
        </p>

        {status === "success" ? (
          <p className="label-caps text-[var(--gold)] tracking-[0.2em]">
            Thank you — you are now part of Covora.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="input-luxury-box flex-1 text-xs"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={status === "loading"}
              className="shrink-0"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
