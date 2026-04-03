"use client"

// ─── Auth Store ───────────────────────────────────────────────────────────────
// Scaffold implementation using localStorage for session persistence.
//
// TO CONNECT REAL AUTH:
//   1. Replace `mockLogin` / `mockSignUp` with real API calls
//      e.g. NextAuth signIn(), Supabase auth.signInWithPassword(), WooCommerce JWT, etc.
//   2. Replace localStorage reads/writes with server session handling
//   3. Keep all exported types and the useAuth() hook signature unchanged —
//      consumer components will not need to change.
//
// Data stored:
//   covora-user      → serialised User object (session)
//   covora-addresses → Address[] for logged-in user
//   covora-saved     → SavedItem[] for logged-in user

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type {
  User,
  AuthState,
  LoginPayload,
  SignUpPayload,
  Address,
  SavedItem,
} from "@/types/account"

// ─── Storage keys ─────────────────────────────────────────────────────────────

const USER_KEY      = "covora-user"
const ADDR_KEY      = "covora-addresses"
const SAVED_KEY     = "covora-saved"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch { return null }
}

function writeStorage<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* noop */ }
}

function clearStorage(...keys: string[]): void {
  try { keys.forEach((k) => localStorage.removeItem(k)) } catch { /* noop */ }
}

// ─── Mock API calls ───────────────────────────────────────────────────────────
// Replace these with real network requests when backend is ready.

async function mockLogin(payload: LoginPayload): Promise<User> {
  await new Promise((r) => setTimeout(r, 800)) // simulate latency

  // SCAFFOLD: in production, POST /api/auth/login and validate server-side
  const existing = readStorage<User>(USER_KEY)
  if (existing && existing.email === payload.email) return existing

  // Create a minimal user from email for demo purposes
  const [localPart] = payload.email.split("@")
  const user: User = {
    id: `u_${Date.now()}`,
    email: payload.email,
    firstName: localPart.charAt(0).toUpperCase() + localPart.slice(1),
    lastName: "",
    createdAt: new Date().toISOString(),
  }
  return user
}

async function mockSignUp(payload: SignUpPayload): Promise<User> {
  await new Promise((r) => setTimeout(r, 900)) // simulate latency

  // SCAFFOLD: in production, POST /api/auth/register
  const user: User = {
    id: `u_${Date.now()}`,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    createdAt: new Date().toISOString(),
  }
  return user
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login:          (payload: LoginPayload)  => Promise<void>
  signUp:         (payload: SignUpPayload) => Promise<void>
  logout:         () => void
  updateProfile:  (patch: Partial<Pick<User, "firstName" | "lastName" | "phone">>) => void
  // Addresses
  addresses:      Address[]
  addAddress:     (addr: Omit<Address, "id">) => void
  updateAddress:  (id: string, patch: Partial<Address>) => void
  removeAddress:  (id: string) => void
  setDefaultAddress: (id: string) => void
  // Saved items
  savedItems:     SavedItem[]
  saveItem:       (item: SavedItem) => void
  unsaveItem:     (productId: number) => void
  isItemSaved:    (productId: number) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,       setUser]       = useState<User | null>(null)
  const [isLoading,  setIsLoading]  = useState(true)
  const [addresses,  setAddresses]  = useState<Address[]>([])
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])

  // Hydrate from storage on mount
  useEffect(() => {
    const storedUser  = readStorage<User>(USER_KEY)
    const storedAddrs = readStorage<Address[]>(ADDR_KEY) ?? []
    const storedSaved = readStorage<SavedItem[]>(SAVED_KEY) ?? []
    setUser(storedUser)
    setAddresses(storedAddrs)
    setSavedItems(storedSaved)
    setIsLoading(false)
  }, [])

  // ── Auth actions ───────────────────────────────────────────────────────────

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true)
    const loggedIn = await mockLogin(payload)
    writeStorage(USER_KEY, loggedIn)
    setUser(loggedIn)
    setIsLoading(false)
  }, [])

  const signUp = useCallback(async (payload: SignUpPayload) => {
    setIsLoading(true)
    const created = await mockSignUp(payload)
    writeStorage(USER_KEY, created)
    setUser(created)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    clearStorage(USER_KEY)
    setUser(null)
    setAddresses([])
    setSavedItems([])
  }, [])

  const updateProfile = useCallback(
    (patch: Partial<Pick<User, "firstName" | "lastName" | "phone">>) => {
      setUser((prev) => {
        if (!prev) return prev
        const updated = { ...prev, ...patch }
        writeStorage(USER_KEY, updated)
        return updated
      })
    },
    []
  )

  // ── Address actions ────────────────────────────────────────────────────────

  const addAddress = useCallback((addr: Omit<Address, "id">) => {
    setAddresses((prev) => {
      const id = `addr_${Date.now()}`
      const isFirst = prev.length === 0
      const next = [...prev, { ...addr, id, isDefault: isFirst || addr.isDefault }]
      writeStorage(ADDR_KEY, next)
      return next
    })
  }, [])

  const updateAddress = useCallback((id: string, patch: Partial<Address>) => {
    setAddresses((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
      writeStorage(ADDR_KEY, next)
      return next
    })
  }, [])

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id)
      writeStorage(ADDR_KEY, next)
      return next
    })
  }, [])

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.map((a) => ({ ...a, isDefault: a.id === id }))
      writeStorage(ADDR_KEY, next)
      return next
    })
  }, [])

  // ── Saved item actions ─────────────────────────────────────────────────────

  const saveItem = useCallback((item: SavedItem) => {
    setSavedItems((prev) => {
      if (prev.some((s) => s.productId === item.productId)) return prev
      const next = [item, ...prev]
      writeStorage(SAVED_KEY, next)
      return next
    })
  }, [])

  const unsaveItem = useCallback((productId: number) => {
    setSavedItems((prev) => {
      const next = prev.filter((s) => s.productId !== productId)
      writeStorage(SAVED_KEY, next)
      return next
    })
  }, [])

  const isItemSaved = useCallback(
    (productId: number) => savedItems.some((s) => s.productId === productId),
    [savedItems]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signUp,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
        savedItems,
        saveItem,
        unsaveItem,
        isItemSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
