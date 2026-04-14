/**
 * WordPress REST API client
 * Used for pages, journal posts, and CMS content.
 *
 * Configure:
 *   NEXT_PUBLIC_WP_URL = https://your-wordpress-site.com
 */

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_URL ?? "https://comodo-backend.zeabur.app";

export async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(`${WP_BASE_URL}/wp-json/wp/v2/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`WordPress API error [${res.status}]: ${error}`);
  }

  return res.json() as Promise<T>;
}
