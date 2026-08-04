import { BestSellers } from "@/features/home/components/best-sellers";
import { Creations } from "@/features/home/components/creations";
import { Hero } from "@/features/home/components/hero";
import { OrderCta } from "@/features/home/components/order-cta";
import { Socials } from "@/features/home/components/socials";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <Creations />
      <OrderCta />
      <Socials />
    </>
  );
}
