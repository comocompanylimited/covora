import type { Metadata } from "next";
import Link from "next/link";
import { getLatestPosts, getPostFeaturedImage, getPostAuthorName, stripHtml } from "@/lib/wordpress/posts";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";

export const metadata: Metadata = {
  title: "Journal — Covora",
  description: "Editorials, stories, and perspectives from the House of Covora.",
};

const PLACEHOLDER_POSTS: Post[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  slug: `journal-post-${i + 1}`,
  status: "publish",
  title: { rendered: ["The Art of Dressing Well", "A Study in Luxury Materials", "Inside the Atelier", "The Covora Aesthetic", "On Craftsmanship", "The New Season"][i] },
  content: { rendered: "<p>Full article content here.</p>" },
  excerpt: { rendered: "<p>A quiet exploration of what it means to dress with intention, restraint, and an eye for the exceptional.</p>" },
  date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
  modified: new Date().toISOString(),
  featured_media: 0,
  author: 1,
  categories: [1],
}));

async function getPosts() {
  try {
    const posts = await getLatestPosts(9);
    return posts.length > 0 ? posts : PLACEHOLDER_POSTS;
  } catch {
    return PLACEHOLDER_POSTS;
  }
}

export default async function JournalPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="bg-[var(--black)] pt-[72px]">

      {/* ── Header ── */}
      <section className="py-20 px-6 lg:px-12 border-b border-[var(--border-dark)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-caps text-[var(--gold)] mb-4">Covora</p>
          <h1 className="heading-xl text-[var(--ivory)]">The Journal</h1>
          <p className="text-[var(--warm-grey)] text-sm mt-4 max-w-md">
            Editorials, stories, and perspectives from the House of Covora.
          </p>
        </div>
      </section>

      {/* ── Featured Post ── */}
      {featured && (
        <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-[var(--charcoal-mid)] overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #1a1a14, #0a0a0a)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="label-caps text-[var(--black)] bg-[var(--gold)] px-3 py-1 text-[0.55rem]">
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <p className="label-caps text-[var(--gold)] mb-4">{formatDate(featured.date)}</p>
              <h2 className="heading-lg text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors duration-400 mb-5">
                {featured.title.rendered}
              </h2>
              <p className="text-[var(--warm-grey)] text-sm leading-relaxed mb-8 max-w-md">
                {stripHtml(featured.excerpt.rendered).slice(0, 160)}…
              </p>
              <span className="label-caps text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
                Read the Story →
              </span>
            </div>
          </Link>
        </section>
      )}

      <div className="divider-gold mx-6 lg:mx-12" />

      {/* ── Grid ── */}
      <section className="py-16 px-6 lg:px-12 pb-28 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="group">
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] bg-[var(--charcoal-mid)] overflow-hidden mb-5">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg, #1a1a14, #0a0a0a)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <p className="label-caps text-[var(--warm-grey)] mb-3">{formatDate(post.date)}</p>
              <h3 className="font-[var(--font-cormorant)] text-[var(--ivory)] text-xl font-light leading-snug group-hover:text-[var(--gold)] transition-colors duration-300 mb-3">
                {post.title.rendered}
              </h3>
              <p className="text-[var(--warm-grey)] text-xs leading-relaxed line-clamp-2">
                {stripHtml(post.excerpt.rendered)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
