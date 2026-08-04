import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Prefooter } from "@/components/layout/prefooter";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <Prefooter />
      <Footer />
      <ScrollToTop />
    </>
  );
}
