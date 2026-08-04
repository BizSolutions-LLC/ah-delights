import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/features/contact/components/contact-form";
import { Socials } from "@/features/home/components/socials";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Have a question about our pastries or would like to place an order? Send AhDelights a message.",
  path: "/contact",
});

function ContactWave({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/decor/contact-wave-fill.svg"
        alt=""
        className="h-auto w-full max-w-none"
      />
      {/* Offset stroke — same doodle as hero Vector 5; CSS rotate keeps the path smooth */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/decor/contact-wave-stroke.svg"
        alt=""
        className="absolute left-[-3.3%] top-[-1%] h-[105.7%] w-[105.2%] max-w-none origin-center rotate-[3.16deg]"
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ad-secondary-bg px-5 pb-20 pt-32 md:px-20 md:pb-[100px] md:pt-[180px]">
        <ContactWave className="hidden -left-[6%] -top-[8%] w-[42%] max-w-[540px] md:block" />
        <ContactWave className="hidden -right-[6%] top-[4%] w-[42%] max-w-[540px] rotate-180 md:block" />

        <div className="relative mx-auto flex max-w-[736px] flex-col items-center gap-10 text-center md:gap-[50px]">
          <h1 className="font-display text-4xl font-bold tracking-wide text-ad-primary-text md:text-[52px] md:tracking-[0.04em]">
            <span className="inline-block">Contact</span>
            <span className="inline-block pl-[0.35em] text-ad-button md:pl-[0.5em]">
              AhDelights
            </span>
          </h1>
          <p className="font-montserrat text-lg font-semibold leading-relaxed text-ad-primary-text md:text-xl md:leading-relaxed">
            Have a question about our pastries or would like to place an order?
            <br />
            <br />
            Send us a message through email, Facebook, or Instagram. We’ll be
            happy to assist you.
          </p>
        </div>
      </section>

      <section className="bg-ad-primary-bg px-5 py-12 md:px-20 md:py-16">
        <div className="mx-auto flex max-w-[846px] flex-col items-center gap-8">
          <SectionHeading title="Send Us a Message" />
          <p className="text-pretty text-center font-montserrat text-base text-ad-primary-text md:text-lg">
            Complete the form below with your inquiry, and we’ll be happy to
            {"\u00A0"}assist{"\u00A0"}you.
          </p>
          <ContactForm />
        </div>
      </section>

      <Socials
        description={
          <>
            You can also connect with{" "}
            <strong className="font-bold">AhDelights</strong> through our social
            media pages for product inquiries, updates, and more
            {"\u00A0"}information.
          </>
        }
      />

      <section className="bg-ad-primary-bg px-5 pb-20 md:px-20">
        <div className="mx-auto flex max-w-[1060px] flex-col items-center gap-6">
          <div className="h-px w-full bg-ad-primary-text/40" />
          <p className="text-center font-display text-2xl font-semibold text-ad-primary-text md:text-[40px] md:leading-snug">
            Thank you for reaching out to{" "}
            <span className="text-ad-button">AhDelights</span>. We’ll review
            your message and respond as soon as we can.
          </p>
          <div className="h-px w-full bg-ad-primary-text/40" />
        </div>
      </section>
    </>
  );
}
