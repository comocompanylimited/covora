// ─── WooGraphQL cart utilities ────────────────────────────────────────────────
// Uses the WooCommerce GraphQL session flow:
//   1. First request returns "woocommerce-session" header → store in localStorage
//   2. All subsequent requests send "woocommerce-session: Session <token>"
//   3. WooCommerce keeps the server-side cart alive via this token
//
// Run client-side only — uses localStorage and browser fetch.

const SESSION_KEY = "covora-wc-session"

function getSession(): string | null {
  try {
    return typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null
  } catch { return null }
}

function saveSession(token: string): void {
  try {
    if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, token)
  } catch { /* noop */ }
}

async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const url = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL
  if (!url) throw new Error("NEXT_PUBLIC_WP_GRAPHQL_URL is not set")

  const session = getSession()
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (session) headers["woocommerce-session"] = `Session ${session}`

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  })

  // Persist the (possibly refreshed) session token
  const returnedSession = res.headers.get("woocommerce-session")
  if (returnedSession) saveSession(returnedSession)

  const json: { data?: T; errors?: { message: string }[] } = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  if (!json.data) throw new Error("GraphQL returned no data")
  return json.data
}

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface WcCartItemProduct {
  name: string
  databaseId: number
  slug: string
  image: { sourceUrl: string } | null
  price?: string | null        // SimpleProduct only
}

export interface WcCartItem {
  key: string
  quantity: number
  total: string               // formatted, e.g. "£95.00"
  product: { node: WcCartItemProduct }
}

export interface WcCart {
  subtotal: string
  total: string
  contents: { nodes: WcCartItem[] }
}

// ─── Shared cart fragment ─────────────────────────────────────────────────────

const CART_FRAGMENT = `
  subtotal
  total
  contents {
    nodes {
      key
      quantity
      total
      product {
        node {
          name
          databaseId
          slug
          image { sourceUrl }
          ... on SimpleProduct { price }
        }
      }
    }
  }
`

// ─── Mutations & queries ──────────────────────────────────────────────────────

export async function wcAddToCart(
  productId: number,
  quantity = 1
): Promise<WcCart | null> {
  try {
    const data = await gqlFetch<{ addToCart: { cart: WcCart } }>(
      `mutation AddToCart($productId: Int!, $quantity: Int!) {
        addToCart(input: { productId: $productId, quantity: $quantity }) {
          cart { ${CART_FRAGMENT} }
        }
      }`,
      { productId, quantity }
    )
    return data.addToCart.cart
  } catch (err) {
    console.error("[WooCart] addToCart failed:", err)
    return null
  }
}

export async function wcGetCart(): Promise<WcCart | null> {
  try {
    const data = await gqlFetch<{ cart: WcCart }>(
      `query GetCart { cart { ${CART_FRAGMENT} } }`
    )
    return data.cart
  } catch (err) {
    console.error("[WooCart] getCart failed:", err)
    return null
  }
}

export async function wcRemoveFromCart(key: string): Promise<WcCart | null> {
  try {
    const data = await gqlFetch<{ removeItemsFromCart: { cart: WcCart } }>(
      `mutation RemoveItem($keys: [ID!]!) {
        removeItemsFromCart(input: { keys: $keys }) {
          cart { ${CART_FRAGMENT} }
        }
      }`,
      { keys: [key] }
    )
    return data.removeItemsFromCart.cart
  } catch (err) {
    console.error("[WooCart] removeFromCart failed:", err)
    return null
  }
}

export async function wcUpdateCartItem(
  key: string,
  quantity: number
): Promise<WcCart | null> {
  try {
    const data = await gqlFetch<{ updateItemQuantities: { cart: WcCart } }>(
      `mutation UpdateItem($items: [CartItemQuantityInput]!) {
        updateItemQuantities(input: { items: $items }) {
          cart { ${CART_FRAGMENT} }
        }
      }`,
      { items: [{ key, quantity }] }
    )
    return data.updateItemQuantities.cart
  } catch (err) {
    console.error("[WooCart] updateCartItem failed:", err)
    return null
  }
}
