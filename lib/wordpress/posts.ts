import { wpFetch } from "./client";
import type { Post } from "@/types/post";

export async function getPosts(params: Record<string, string | number> = {}): Promise<Post[]> {
  return wpFetch<Post[]>("posts", {
    per_page: 12,
    status: "publish",
    _embed: true,
    ...params,
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await wpFetch<Post[]>("posts", { slug, _embed: true });
  return posts[0] ?? null;
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  return wpFetch<Post[]>("posts", {
    per_page: limit,
    status: "publish",
    orderby: "date",
    order: "desc",
    _embed: true,
  });
}

export function getPostFeaturedImage(post: Post): string {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "/images/placeholder.jpg"
  );
}

export function getPostAuthorName(post: Post): string {
  return post._embedded?.author?.[0]?.name ?? "Covora";
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
