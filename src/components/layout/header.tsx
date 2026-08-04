"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="size-6"
      >
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-6"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [treatsActive, setTreatsActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setTreatsActive(false);
      return;
    }

    const updateActiveNav = () => {
      const section = document.getElementById("our-best-seller");
      if (!section) {
        setTreatsActive(false);
        return;
      }

      // Match scroll-mt-24 so the underline flips when the section meets the header.
      const headerOffset = 96;
      setTreatsActive(section.getBoundingClientRect().top <= headerOffset);
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("hashchange", updateActiveNav);
    window.addEventListener("resize", updateActiveNav);
    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("hashchange", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, [pathname]);

  const homeActive = pathname === "/" && !treatsActive;
  const treatsHref = "/#our-best-seller";
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-ad-primary-bg/95 shadow-[0_4px_20px_rgba(62,41,36,0.08)] backdrop-blur-md"
          : "bg-transparent shadow-none backdrop-blur-none"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-6 px-5 py-3.5 md:gap-20 md:px-8">
        <nav className="hidden items-center gap-20 md:flex">
          <Link
            href="/"
            className={`border-b-2 px-2.5 py-2.5 font-montserrat text-base font-semibold transition-colors ${
              homeActive
                ? "border-ad-primary-text text-ad-primary-text"
                : "border-transparent text-ad-button hover:text-ad-primary-text"
            }`}
          >
            Home
          </Link>
          <Link
            href={treatsHref}
            className={`border-b-2 px-2.5 py-2.5 font-montserrat text-base font-semibold transition-colors ${
              treatsActive
                ? "border-ad-primary-text text-ad-primary-text"
                : "border-transparent text-ad-button hover:text-ad-primary-text"
            }`}
          >
            Our Treats
          </Link>
          <Button
            href="/contact"
            icon={
              <Image
                src="/icons/icon-basket.svg"
                alt=""
                width={15}
                height={15}
                className="size-[15px]"
              />
            }
          >
            Order Now
          </Button>
        </nav>

        <div
          className={`flex w-full items-center md:hidden ${
            scrolled || open ? "justify-between" : "justify-end"
          }`}
        >
          {scrolled || open ? (
            <Link
              href="/"
              onClick={closeMenu}
              aria-label="AhDelights home"
              className="relative h-11 w-11 shrink-0"
            >
              <Image
                src="/logo.png"
                alt="AhDelights"
                fill
                priority
                className="object-contain"
                sizes="44px"
              />
            </Link>
          ) : null}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-11 items-center justify-center rounded-lg text-ad-primary-text transition-colors hover:bg-ad-primary-text/5"
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-ad-primary-text/10 bg-ad-primary-bg px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className={`font-montserrat text-base font-semibold ${
                homeActive ? "text-ad-primary-text" : "text-ad-button"
              }`}
            >
              Home
            </Link>
            <Link
              href={treatsHref}
              onClick={closeMenu}
              className={`font-montserrat text-base font-semibold ${
                treatsActive ? "text-ad-primary-text" : "text-ad-button"
              }`}
            >
              Our Treats
            </Link>
            <Button href="/contact" className="w-full" onClick={closeMenu}>
              Order Now
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
