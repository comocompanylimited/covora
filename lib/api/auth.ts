// ─── Auth API ─────────────────────────────────────────────────────────────────

import type { LoginPayload, SignUpPayload, User } from "@/types/account"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://covorabackend.zeabur.app"

const TOKEN_KEY = "covora-auth-token"

function saveToken(token: string): void {
  try {
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token)
  } catch { /* noop */ }
}

interface ApiAuthResponse {
  token?:        string
  access?:       string
  access_token?: string
  user?: {
    id?:         number | string
    email?:      string
    first_name?: string
    last_name?:  string
    firstName?:  string
    lastName?:   string
    phone?:      string
  }
  // flat fields (some APIs return user fields at root level)
  id?:         number | string
  email?:      string
  first_name?: string
  last_name?:  string
  firstName?:  string
  lastName?:   string
}

function normalizeUser(data: ApiAuthResponse, email: string): User {
  const u = data.user ?? data
  return {
    id:        String(u.id ?? `u_${Date.now()}`),
    email:     u.email ?? email,
    firstName: u.firstName ?? u.first_name ?? "",
    lastName:  u.lastName  ?? u.last_name  ?? "",
    phone:     (u as { phone?: string }).phone,
    createdAt: new Date().toISOString(),
  }
}

async function authFetch(
  path: string,
  body: Record<string, string>
): Promise<ApiAuthResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
    cache:   "no-store",
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    let message = `Login failed (${res.status})`
    try {
      const json = JSON.parse(text)
      message =
        json.detail ??
        json.message ??
        json.error ??
        json.non_field_errors?.[0] ??
        message
    } catch { /* use default */ }
    throw new Error(message)
  }

  return res.json() as Promise<ApiAuthResponse>
}

export async function apiLogin(payload: LoginPayload): Promise<User> {
  const data = await authFetch("/api/auth/login/", {
    email:    payload.email,
    password: payload.password,
  })
  const token = data.token ?? data.access ?? data.access_token
  if (token) saveToken(token)
  return normalizeUser(data, payload.email)
}

export async function apiSignUp(payload: SignUpPayload): Promise<User> {
  const data = await authFetch("/api/auth/register/", {
    email:      payload.email,
    password:   payload.password,
    first_name: payload.firstName,
    last_name:  payload.lastName,
    firstName:  payload.firstName,
    lastName:   payload.lastName,
  })
  const token = data.token ?? data.access ?? data.access_token
  if (token) saveToken(token)
  return normalizeUser(data, payload.email)
}
