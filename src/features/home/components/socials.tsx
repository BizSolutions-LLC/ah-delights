import Image from "next/image";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

export function Socials({
  title = "Connect With Us",
  description,
}: {
  title?: string;
  description?: ReactNode;
}) {
  return (
    <section className="bg-ad-primary-bg px-5 pb-20 pt-12 md:px-20">
      <div className="mx-auto flex max-w-[1060px] flex-col items-center gap-8">
        <SectionHeading title={title} />
        <p className="max-w-3xl text-center font-montserrat text-base text-ad-primary-text md:text-lg">
          {description ?? (
            <>
              Follow <strong className="font-bold">AhDelights</strong> for
              product updates, featured pastries, and the latest from our
              kitchen.
            </>
          )}
        </p>
        <div className="flex items-center justify-center gap-12 md:gap-24">
          <a
            href={siteConfig.social.facebook.href}
            target="_blank"
            rel="noreferrer"
            aria-label="AhDelights on Facebook"
            className="transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/icons/icon-facebook-lg.svg"
              alt=""
              width={100}
              height={100}
              className="size-[72px] md:size-[100px]"
            />
          </a>
          <a
            href={siteConfig.social.instagram.href}
            target="_blank"
            rel="noreferrer"
            aria-label="AhDelights on Instagram"
            className="transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/icons/icon-instagram-lg.svg"
              alt=""
              width={98}
              height={98}
              className="size-[70px] md:size-[98px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
