import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  href:          string;
  name:          string;
  price:         string;
  originalPrice?: string;
  image:         string;
  hoverImage?:   string;
  badge?:        "New" | "Sale" | "Exclusive" | string;
  className?:    string;
}

export function ProductCard({
  href,
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  badge,
  className,
}: ProductCardProps) {
  return (
    <Link href={href} className={cn("product-card group block", className)}>
      {/* Image */}
      <div className="card-image">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        {hoverImage && (
          <div className="card-image-hover">
            <Image
              src={hoverImage}
              alt={`${name} — alternate`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        )}
        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 left-3 z-10 badge"
            style={{
              background: badge === "Sale" ? "rgba(180,80,80,0.15)" : badge === "New" ? "var(--gold)" : "rgba(201,169,110,0.12)",
              color:      badge === "Sale" ? "#D4948A" : badge === "New" ? "var(--black)" : "var(--gold)",
              border:     badge === "Sale" ? "1px solid rgba(180,80,80,0.3)" : badge === "New" ? "none" : "1px solid rgba(201,169,110,0.25)",
            }}
          >
            {badge}
          </span>
        )}
        {/* Quick add overlay */}
        <div className="card-quick-add">
          <span className="label-caps text-[var(--gold)]" style={{ fontSize: "0.52rem", letterSpacing: "0.2em" }}>
            Quick Add
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p
          className="label-caps text-[var(--text-muted)] mb-1 truncate"
          style={{ fontSize: "0.55rem" }}
        >
          {name}
        </p>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.95rem",
              fontWeight: 400,
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
            }}
          >
            {price}
          </span>
          {originalPrice && (
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                textDecoration: "line-through",
              }}
            >
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── EditorialCard ────────────────────────────────────────────────────────────

interface EditorialCardProps {
  href:       string;
  title:      string;
  subtitle?:  string;
  image:      string;
  eyebrow?:   string;
  layout?:    "portrait" | "landscape" | "square";
  className?: string;
}

export function EditorialCard({
  href,
  title,
  subtitle,
  image,
  eyebrow,
  layout = "portrait",
  className,
}: EditorialCardProps) {
  const aspectRatio = layout === "portrait" ? "2/3" : layout === "landscape" ? "3/2" : "1/1";

  return (
    <Link href={href} className={cn("editorial-card group block", className)}>
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)",
          }}
        />
        {/* Overlaid text */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {eyebrow && (
            <p className="label-caps text-[var(--gold)] mb-2" style={{ fontSize: "0.55rem" }}>
              {eyebrow}
            </p>
          )}
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.4rem, 2vw, 2rem)",
              fontWeight: 300,
              color: "var(--ivory)",
              lineHeight: 1.1,
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="body-sm mt-2" style={{ color: "rgba(244,239,230,0.7)" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── CollectionCard ───────────────────────────────────────────────────────────

interface CollectionCardProps {
  href:       string;
  title:      string;
  label?:     string;
  image:      string;
  className?: string;
}

export function CollectionCard({
  href,
  title,
  label,
  image,
  className,
}: CollectionCardProps) {
  return (
    <Link href={href} className={cn("group relative block overflow-hidden", className)}>
      {/* Full-bleed image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        {/* Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.1) 60%, transparent 100%)",
          }}
        />
        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-7">
          {label && (
            <p className="label-caps text-[var(--gold)] mb-3" style={{ fontSize: "0.54rem" }}>
              {label}
            </p>
          )}
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)",
              fontWeight: 300,
              color: "var(--ivory)",
              lineHeight: 1.0,
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </h3>
          {/* Hover underline */}
          <div
            className="mt-4"
            style={{
              height: "1px",
              background: "var(--gold)",
              transformOrigin: "left",
              transform: "scaleX(0)",
              transition: "transform 0.45s var(--ease-luxury)",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

// ─── JournalCard ─────────────────────────────────────────────────────────────

interface JournalCardProps {
  href:        string;
  title:       string;
  excerpt?:    string;
  image:       string;
  category?:   string;
  date?:       string;
  className?:  string;
}

export function JournalCard({
  href,
  title,
  excerpt,
  image,
  category,
  date,
  className,
}: JournalCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      {/* Image */}
      <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/2" }}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[0.9s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        {category && (
          <span className="label-caps text-[var(--gold)]" style={{ fontSize: "0.54rem" }}>
            {category}
          </span>
        )}
        {category && date && (
          <span style={{ width: "1px", height: "10px", background: "var(--border-default)", display: "inline-block" }} />
        )}
        {date && (
          <span className="label-caps text-[var(--text-muted)]" style={{ fontSize: "0.54rem" }}>
            {date}
          </span>
        )}
      </div>
      {/* Title */}
      <h3
        className="gold-underline inline"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
          fontWeight: 300,
          color: "var(--text-primary)",
          lineHeight: 1.2,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      {excerpt && (
        <p className="body-sm mt-2 line-clamp-2">{excerpt}</p>
      )}
    </Link>
  );
}
