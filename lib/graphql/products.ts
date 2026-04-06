// ─── WordPress GraphQL fetch helpers ─────────────────────────────────────────

const GQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL as string

interface GqlProductNode {
  id: string
  databaseId: number
  name: string
  slug: string
  image: { sourceUrl: string } | null
  price?: string | null
  regularPrice?: string | null
  salePrice?: string | null
}

interface GqlResponse {
  data: {
    products: {
      nodes: GqlProductNode[]
    }
  }
  errors?: { message: string }[]
}

export async function fetchWomensProducts(): Promise<GqlProductNode[]> {
  return fetchProducts()
}

export async function fetchMensProducts(): Promise<GqlProductNode[]> {
  return fetchProducts()
}

async function fetchProducts(): Promise<GqlProductNode[]> {
  if (!GQL_URL) {
    console.warn("NEXT_PUBLIC_WP_GRAPHQL_URL is not set")
    return []
  }

  let res: Response
  try {
    res = await fetch(GQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          products(first: 12) {
            nodes {
              id
              databaseId
              name
              slug
              image {
                sourceUrl
              }
              ... on SimpleProduct {
                price
                regularPrice
                salePrice
              }
            }
          }
        }`,
      }),
      next: { revalidate: 60 },
    })
  } catch (err) {
    console.error("GraphQL network error:", err)
    return []
  }

  if (!res.ok) {
    console.error("GraphQL fetch failed:", res.status)
    return []
  }

  let json: GqlResponse
  try {
    json = await res.json()
  } catch (err) {
    console.error("GraphQL JSON parse error:", err)
    return []
  }

  if (json.errors?.length) {
    console.error("GraphQL errors:", json.errors)
    return []
  }

  return json.data?.products?.nodes ?? []
}
