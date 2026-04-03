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
    default: "Covora — Modern Luxury",
    template: "%s | Covora",
  },
  description:
    "Covora is a luxury fashion and beauty house crafting refined pieces for the modern individual.",
  keywords: ["luxury fashion", "covora", "mens fashion", "womens fashion", "luxury beauty"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Covora",
    title: "Covora — Modern Luxury",
    description:
      "A luxury fashion and beauty house crafting refined pieces for the modern individual.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Covora — Modern Luxury",
  },
  robots: {
    index: true,
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
