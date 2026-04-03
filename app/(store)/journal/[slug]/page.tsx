import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getLatestPosts, stripHtml } from "@/lib/wordpress/posts";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Journal — Covora" };
    return {
      title: `${post.title.rendered} — Covora Journal`,
      description: stripHtml(post.excerpt.rendered).slice(0, 160),
    };
  } catch {
    return { title: "Journal — Covora" };
  }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
    if (!post) notFound();
  } catch {
    // Placeholder for dev
    post = {
      id: 1,
      slug,
      status: "publish",
      title: { rendered: "The Art of Dressing Well" },
      content: { rendered: "<p>A quiet exploration of what it means to dress with intention, restraint, and an eye for the exceptional. Covora was built on the belief that luxury is not about noise — it is about substance.</p><p>The finest materials, the most considered construction, and the restraint to let quality speak for itself. This is the Covora philosophy.</p>" },
      excerpt: { rendered: "<p>A quiet exploration of what it means to dress with intention.</p>" },
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      featured_media: 0,
      author: 1,
      categories: [1],
    };
  }

  let relatedPosts: import("@/types/post").Post[] = [];
  try {
    relatedPosts = (await getLatestPosts(3)).filter((p) => p.slug !== slug);
  } catch {}

  return (
    <div className="bg-[var(--black)] min-h-screen pt-[72px]">

      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0d0d0a, #1a1a14)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-24 pb-16 max-w-[900px]">
          <p className="label-caps text-[var(--gold)] mb-4">{formatDate(post.date)}</p>
          <h1
            className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-24 max-w-[780px] mx-auto">
        <div
          className="prose prose-lg prose-invert max-w-none text-[var(--warm-grey)] leading-relaxed [&>p]:mb-6 [&>p]:text-sm [&>h2]:font-[var(--font-cormorant)] [&>h2]:text-[var(--ivory)] [&>h2]:text-2xl [&>h2]:font-light [&>h2]:mt-12 [&>h2]:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </section>

      {/* Back */}
      <div className="px-6 lg:px-24 pb-12">
        <Link href="/journal" className="label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors">
          ← Back to Journal
        </Link>
      </div>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-12 border-t border-[var(--border-dark)] max-w-[1400px] mx-auto">
          <p className="label-caps text-[var(--gold)] mb-8">More from the Journal</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedPosts.slice(0, 3).map((rp) => (
              <Link key={rp.id} href={`/journal/${rp.slug}`} className="group">
                <div className="aspect-[4/3] bg-[var(--charcoal-mid)] mb-4 overflow-hidden">
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]" style={{ background: "linear-gradient(135deg, #1a1a14, #0a0a0a)" }} />
                </div>
                <p className="label-caps text-[var(--warm-grey)] mb-2">{formatDate(rp.date)}</p>
                <h3 className="font-[var(--font-cormorant)] text-[var(--ivory)] font-light group-hover:text-[var(--gold)] transition-colors"
                  dangerouslySetInnerHTML={{ __html: rp.title.rendered }}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
