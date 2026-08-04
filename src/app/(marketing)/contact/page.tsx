import Image from "next/image";
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

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ad-secondary-bg px-5 pb-16 pt-24 md:px-20 md:pb-24 md:pt-[120px]">
        <Image
          src="/decor/contact-wave-left.svg"
          alt=""
          width={567}
          height={545}
          className="pointer-events-none absolute -left-24 top-0 hidden w-[35%] max-w-[420px] opacity-80 md:block"
        />
        <Image
          src="/decor/contact-wave-right.svg"
          alt=""
          width={567}
          height={545}
          className="pointer-events-none absolute -right-24 top-16 hidden w-[35%] max-w-[420px] rotate-180 opacity-80 md:block"
        />
        <div className="relative mx-auto flex max-w-[736px] flex-col gap-6 text-center">
          <h1 className="font-display text-4xl font-bold text-ad-primary-text md:text-[52px]">
            Contact <span className="text-ad-button">AhDelights</span>
          </h1>
          <p className="font-montserrat text-lg font-semibold text-ad-primary-text md:text-xl">
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
          <p className="text-center font-montserrat text-base text-ad-primary-text md:text-lg">
            Complete the form below with your inquiry, and we’ll be happy to
            assist you.
          </p>
          <ContactForm />
        </div>
      </section>

      <Socials
        description={
          <>
            You can also connect with{" "}
            <strong className="font-bold">AhDelights</strong> through our social
            media pages for product inquiries, updates, and more information.
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
