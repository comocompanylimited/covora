export interface PostAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls: Record<string, string>;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  featured_image_url?: string;
  author: number;
  author_name?: string;
  categories: number[];
  category_names?: string[];
  acf?: {
    reading_time?: string;
    subtitle?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    author?: PostAuthor[];
    "wp:term"?: PostCategory[][];
  };
}
