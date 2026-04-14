import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Covora",
  description: "Terms and conditions governing your use of Covora and your purchases.",
};

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the Covora website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time, and your continued use constitutes acceptance of any changes.`,
  },
  {
    title: "Eligibility",
    body: `You must be at least 18 years of age to make a purchase on Covora. By placing an order, you confirm that you are of legal age and that all information provided is accurate and complete. We reserve the right to refuse orders from anyone we believe may not meet these criteria.`,
  },
  {
    title: "Product Information",
    body: `We make every effort to display the colours, textures, and details of our products as accurately as possible. However, we cannot guarantee that your device's display accurately reflects the true colour of any product. All product descriptions are subject to change without notice and do not constitute a contractual offer.`,
  },
  {
    title: "Pricing and Payment",
    body: `All prices are displayed in British Pounds Sterling (GBP) and are inclusive of VAT where applicable. Prices are subject to change without notice. Payment must be made in full at the time of purchase. We accept major credit and debit cards and selected digital payment methods. We reserve the right to cancel any order where we suspect fraudulent activity.`,
  },
  {
    title: "Order Acceptance",
    body: `Receipt of an order confirmation does not constitute acceptance of your order. We reserve the right to cancel or refuse any order at our discretion, including where a product is out of stock, where we are unable to obtain authorisation for payment, or where pricing or product errors are identified. In such cases, we will contact you promptly and issue a full refund.`,
  },
  {
    title: "Shipping and Delivery",
    body: `Delivery timeframes are estimates only and are not guaranteed. Covora is not responsible for delays caused by customs, postal services, or other circumstances beyond our control. Risk of loss and title for items pass to you upon delivery. Please refer to our Shipping & Returns page for full details on delivery options and costs.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on the Covora website — including text, images, graphics, logos, and software — is the property of Covora or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, Covora shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability to you shall not exceed the amount paid for the relevant order. Nothing in these terms limits our liability for death, personal injury, or fraud caused by our negligence.`,
  },
  {
    title: "Governing Law",
    body: `These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh", paddingTop: "var(--header-height)" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link href="/home" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "#777777", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#777777", fontSize: "0.7rem" }}>›</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "var(--gold)" }}>Terms & Conditions</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 0.95 }}>
            Terms & Conditions
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#777777", marginTop: "1.25rem" }}>
            Last updated: April 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#777777", lineHeight: 1.9, marginBottom: "3rem" }}>
          Please read these Terms and Conditions carefully before using the Covora website or placing an order. These terms set out the basis on which you may use our services and make purchases from us.
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
            Questions?
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#777777", lineHeight: 1.8 }}>
            If you have any questions about these Terms and Conditions, please contact us at{" "}
            <a href="mailto:legal@covora.co.uk" style={{ color: "var(--gold)", textDecoration: "none" }}>
              legal@covora.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
