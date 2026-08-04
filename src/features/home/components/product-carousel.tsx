"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ProductCarouselProps = {
  label: string;
  children: ReactNode;
  /** Slide width on mobile (Tailwind width class) */
  slideClassName?: string;
  className?: string;
};

export function ProductCarousel({
  label,
  children,
  slideClassName = "w-[min(82vw,360px)]",
  className = "",
}: ProductCarouselProps) {
  const slides = Children.toArray(children);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || slides.length === 0) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Number.POSITIVE_INFINITY;
    Array.from(el.children).forEach((child, index) => {
      const node = child as HTMLElement;
      const mid = node.offsetLeft + node.clientWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < minDist) {
        minDist = dist;
        closest = index;
      }
    });
    setActive(closest);
  }, [slides.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      el.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    const slide = el?.children[index] as HTMLElement | undefined;
    if (!el || !slide) return;
    const left =
      slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  };

  if (slides.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className={`shrink-0 snap-center ${slideClassName}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={`${label} slides`}
        >
          {slides.map((_, index) => {
            const isActive = index === active;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-out ${
                  isActive
                    ? "w-6 bg-ad-button"
                    : "w-2 bg-ad-primary-text/25 hover:bg-ad-primary-text/40"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
