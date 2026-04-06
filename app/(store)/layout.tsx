import Header from "@/components/layout/Header";
import FooterWrapper from "@/components/layout/FooterWrapper";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <FooterWrapper />
    </>
  );
}
