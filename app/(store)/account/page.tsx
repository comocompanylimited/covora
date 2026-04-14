"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth"

export default function AccountPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    router.replace(isAuthenticated ? "/account/dashboard" : "/account/login")
  }, [isAuthenticated, isLoading, router])

  return (
    <div style={{
      background: "#FAFAF8",
      minHeight: "100vh",
      paddingTop: "var(--header-height)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "32px",
        height: "32px",
        border: "1px solid rgba(201,169,110,0.25)",
        borderTopColor: "var(--gold)",
        borderRadius: "50%",
        animation: "spin 0.9s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
