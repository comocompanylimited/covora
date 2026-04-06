"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

// Suppress the shared Footer on pages that render their own LuxuryFooter.
export default function FooterWrapper() {
  const pathname = usePathname()
  if (pathname === "/mens" || pathname === "/womens") return null
  return <Footer />
}
