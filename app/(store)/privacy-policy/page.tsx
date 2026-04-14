import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Covora",
  description: "How Covora collects, uses, and protects your personal data.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: `We collect information you provide directly to us when you create an account, place an order, or contact us. This includes your name, email address, postal address, phone number, and payment information. We also collect information automatically when you use our website, such as your IP address, browser type, and pages visited.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your information to process and fulfil your orders, send you order confirmations and shipping updates, communicate with you about your account, personalise your shopping experience, improve our products and services, and send you marketing communications where you have consented to receive them.`,
  },
  {
    title: "Sharing Your Information",
    body: `We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services — for example, sharing your address with our delivery partners to fulfil your order. We may also disclose your information where required by law.`,
  },
  {
    title: "Cookies",
    body: `We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. Some cookies are essential for the website to function properly, while others help us understand how you use our site.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal information for as long as necessary to provide our services, comply with our legal obligations, resolve disputes, and enforce our agreements. Account information is retained for the duration of your account and for a period thereafter as required by law.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data, and where processing is based on consent, you have the right to withdraw consent at any time. To exercise any of these rights, please contact us at privacy@covora.co.uk.`,
  },
  {
    title: "Security",
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All payment information is encrypted using SSL technology and we do not store full card details on our servers.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or by posting a prominent notice on our website. Your continued use of our services after any changes constitutes your acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link href="/home" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#777777", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#777777", fontSize: "0.7rem" }}>›</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "var(--gold)" }}>Privacy Policy</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 0.95 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#777777", marginTop: "1.25rem" }}>
            Last updated: April 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#777777", lineHeight: 1.9, marginBottom: "3rem" }}>
          At Covora, we are committed to protecting your privacy and handling your personal data with care and transparency. This policy explains how we collect, use, and safeguard your information when you use our website and services.
        </p>

        {SECTIONS.map((section, i) => (
          <div key={i} style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: i < SECTIONS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 300, color: "#111111", marginBottom: "0.85rem", letterSpacing: "0.01em" }}>
              {i + 1}. {section.title}
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#777777", lineHeight: 1.9 }}>
              {section.body}
            </p>
          </div>
        ))}

        {/* Contact */}
        <div style={{ padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", background: "#F5F3F0", marginTop: "2rem" }}>
          <p className="label-caps" style={{ fontSize: "0.52rem", color: "var(--gold)", marginBottom: "0.75rem" }}>
            Contact Us
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#777777", lineHeight: 1.8 }}>
            If you have questions about this Privacy Policy or how we handle your data,
            please contact our Privacy team at{" "}
            <a href="mailto:privacy@covora.co.uk" style={{ color: "var(--gold)", textDecoration: "none" }}>
              privacy@covora.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
