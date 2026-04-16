import Header from "@/components/layout/Header";
import FooterWrapper from "@/components/layout/FooterWrapper";
import FloatingActions from "@/components/layout/FloatingActions";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <FooterWrapper />
      <FloatingActions />
    </>
  );
}
