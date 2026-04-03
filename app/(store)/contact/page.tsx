"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Info */}
          <div>
            <p className="label-caps text-[var(--gold)] mb-6">Contact</p>
            <h1 className="heading-xl text-[var(--ivory)] mb-8">
              Get in<br />
              <span className="italic">touch.</span>
            </h1>
            <p className="text-[var(--warm-grey)] text-sm leading-relaxed mb-12 max-w-sm">
              Our client services team is available Monday–Friday, 9am–6pm GMT.
              We aim to respond to all enquiries within 24 hours.
            </p>

            <div className="space-y-8">
              {[
                { label: "Client Services", value: "hello@covora.com" },
                { label: "Press & Partnerships", value: "press@covora.com" },
                { label: "Customer Care", value: "+44 (0) 20 0000 0000" },
              ].map((item) => (
                <div key={item.label} className="border-l border-[var(--border-gold)] pl-6">
                  <p className="label-caps text-[var(--gold)] mb-1">{item.label}</p>
                  <p className="font-[var(--font-cormorant)] text-[var(--ivory)] text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {status === "success" ? (
              <div className="py-20 text-center">
                <p className="label-caps text-[var(--gold)] mb-4">Thank You</p>
                <h2 className="heading-md text-[var(--ivory)] mb-4">Message received.</h2>
                <p className="text-[var(--warm-grey)] text-sm">
                  A member of our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="label-caps text-[var(--warm-grey)] block mb-2">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="input-luxury"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-[var(--warm-grey)] block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="input-luxury"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="label-caps text-[var(--warm-grey)] block mb-2">Subject</label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="input-luxury"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="label-caps text-[var(--warm-grey)] block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="input-luxury resize-none"
                    placeholder="Your message…"
                  />
                </div>
                <Button type="submit" variant="primary" loading={status === "loading"}>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
