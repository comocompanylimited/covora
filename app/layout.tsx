import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/cart"
import { AuthProvider } from "@/store/auth";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Covora — Women's Luxury Fashion",
    template: "%s | Covora",
  },
  description:
    "Covora is a women's luxury fashion house. Shop refined clothing, shoes, bags and beauty for the modern woman.",
  keywords: [
    "luxury women's fashion", "covora", "women's clothing", "luxury dresses",
    "designer bags", "luxury beauty", "women's shoes", "luxury fashion uk",
  ],
  openGraph: {
    type:     "website",
    locale:   "en_GB",
    siteName: "Covora",
    title:    "Covora — Women's Luxury Fashion",
    description:
      "A women's luxury fashion house. Refined clothing, shoes, bags and beauty for the modern woman.",
  },
  twitter: {
    card:  "summary_large_image",
    title: "Covora — Women's Luxury Fashion",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
