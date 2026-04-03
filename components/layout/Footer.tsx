import Link from "next/link";
import Logo from "@/components/common/Logo";

const SHOP_LINKS = [
  { label: "Mens", href: "/mens" },
  { label: "Womens", href: "/womens" },
  { label: "Beauty", href: "/beauty" },
  { label: "Accessories", href: "/accessories" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections", href: "/collections" },
];

const INFO_LINKS = [
  { label: "About Covora", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/about#careers" },
];

const CARE_LINKS = [
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Care Instructions", href: "/care" },
  { label: "FAQs", href: "/faq" },
];

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] border-t border-[var(--border-dark)]">
      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo size="lg" className="mb-6" />
            <p className="text-[var(--warm-grey)] text-xs leading-relaxed max-w-[200px]">
              A luxury fashion and beauty house crafting refined pieces for the
              modern individual.
            </p>
            <div className="flex gap-5 mt-8">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="label-caps text-[var(--warm-grey)] hover:text-[var(--gold)] transition-colors duration-300"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={SHOP_LINKS} />

          {/* House of Covora */}
          <FooterColumn title="The House" links={INFO_LINKS} />

          {/* Customer Care */}
          <FooterColumn title="Customer Care" links={CARE_LINKS} />

          {/* Policies */}
          <FooterColumn title="Policies" links={POLICY_LINKS} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-dark)] px-6 lg:px-12 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-caps text-[var(--warm-grey)]">
            © {new Date().getFullYear()} Covora. All rights reserved.
          </p>
          <p className="label-caps text-[var(--warm-grey)]">
            Crafted for modern luxury.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="label-caps text-[var(--gold)] mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[var(--warm-grey)] text-xs hover:text-[var(--off-white)] transition-colors duration-300 leading-relaxed"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
