"use client"

// Smart redirect hub — /account
// If authenticated  → /account/dashboard
// If not           → /account/login

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"

export default function AccountPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated) {
      router.replace("/account/dashboard")
    } else {
      router.replace("/account/login")
    }
  }, [isAuthenticated, isLoading, router])

  // Brief loading state while auth hydrates
  return (
    <div
      className="bg-[var(--black)] min-h-screen flex items-center justify-center"
      style={{ paddingTop: "72px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "1px solid rgba(201,169,110,0.25)",
            borderTopColor: "var(--gold)",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span
          className="label-caps"
          style={{ fontSize: "0.4rem", letterSpacing: "0.3em", color: "var(--warm-grey-dark)" }}
        >
          Loading
        </span>
      </div>
    </div>
  )
}
