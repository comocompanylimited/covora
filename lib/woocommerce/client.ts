/**
 * WooCommerce REST API v3 client
 * Connects Next.js frontend to a headless WordPress/WooCommerce backend.
 *
 * Configure these environment variables:
 *   NEXT_PUBLIC_WC_URL       = https://your-wordpress-site.com
 *   WC_CONSUMER_KEY          = ck_xxxxx
 *   WC_CONSUMER_SECRET       = cs_xxxxx
 */

const WC_BASE_URL = process.env.NEXT_PUBLIC_WC_URL ?? "http://localhost:8080";
const WC_KEY = process.env.WC_CONSUMER_KEY ?? "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET ?? "";

function buildUrl(endpoint: string, params: Record<string, string | number | boolean> = {}): string {
  const url = new URL(`${WC_BASE_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set("consumer_key", WC_KEY);
  url.searchParams.set("consumer_secret", WC_SECRET);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function wcFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options: RequestInit = {}
): Promise<T> {
  const url = buildUrl(endpoint, params);

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`WooCommerce API error [${res.status}]: ${error}`);
  }

  return res.json() as Promise<T>;
}

/** Returns total count from response headers */
export async function wcFetchWithMeta<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<{ data: T; total: number; totalPages: number }> {
  const url = buildUrl(endpoint, params);

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`WooCommerce API error [${res.status}]: ${error}`);
  }

  const data = (await res.json()) as T;
  const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);

  return { data, total, totalPages };
}
