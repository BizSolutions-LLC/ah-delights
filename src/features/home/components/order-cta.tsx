import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function OrderCta() {
  return (
    <section className="bg-ad-primary-bg px-5 py-12 md:px-20 md:py-16">
      <div className="mx-auto flex max-w-[1060px] flex-col items-center gap-8">
        <SectionHeading title="Ready to Place an Order?" />
        <p className="text-pretty text-center font-montserrat text-base text-ad-primary-text md:text-lg">
          Send us a message for product inquiries{"\u00A0"}and{"\u00A0"}orders.
        </p>
        <Button href="/contact">Contact Us</Button>
      </div>
    </section>
  );
}
