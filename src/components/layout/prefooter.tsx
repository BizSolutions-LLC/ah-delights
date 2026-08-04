import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Prefooter() {
  return (
    <section className="w-full bg-ad-footer px-5 py-12 text-ad-soft-white md:px-20 md:py-[50px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[449px] flex-col gap-2.5">
          <div className="relative h-[120px] w-[116px] md:h-[154px] md:w-[150px]">
            <Image
              src="/logo.png"
              alt="AhDelights logo"
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
          <p className="font-display text-4xl font-bold text-ad-button md:text-[52px]">
            {siteConfig.name}
          </p>
          <p className="font-montserrat text-base md:text-lg">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <h3 className="font-montserrat text-xl font-semibold text-ad-button">
              Contact Details
            </h3>
            <div className="flex flex-col gap-2.5 text-base md:text-lg">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/icons/icon-location.svg"
                  alt=""
                  width={15}
                  height={30}
                  className="h-[30px] w-[15px]"
                />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Image
                  src="/icons/icon-email.svg"
                  alt=""
                  width={15}
                  height={11}
                  className="h-[11px] w-[15px]"
                />
                <a
                  href={`mailto:${siteConfig.displayEmail}`}
                  className="hover:underline"
                >
                  {siteConfig.displayEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Image
                  src="/icons/icon-clock.svg"
                  alt=""
                  width={15}
                  height={15}
                  className="size-[15px]"
                />
                <span>{siteConfig.hours}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-montserrat text-xl font-semibold text-ad-button">
              Social Media Links
            </h3>
            <div className="flex flex-col gap-2.5 text-base md:text-lg">
              <a
                href={siteConfig.social.facebook.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:underline"
              >
                <Image
                  src="/icons/icon-facebook-sm.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
                {siteConfig.social.facebook.label}
              </a>
              <a
                href={siteConfig.social.instagram.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:underline"
              >
                <Image
                  src="/icons/icon-instagram-sm.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
                {siteConfig.social.instagram.label}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-montserrat text-xl font-semibold text-ad-button">
            Navigation Links
          </h3>
          <div className="flex flex-col gap-2.5 font-montserrat text-base md:text-lg">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
