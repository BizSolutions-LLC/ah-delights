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

/** Ignore sub-pixel / animation-induced scroll noise */
const SCROLL_JITTER_PX = 4;

function closestSlideIndex(scroller: HTMLDivElement) {
  const center = scroller.scrollLeft + scroller.clientWidth / 2;
  let closest = 0;
  let minDist = Number.POSITIVE_INFINITY;
  Array.from(scroller.children).forEach((child, index) => {
    const node = child as HTMLElement;
    const mid = node.offsetLeft + node.clientWidth / 2;
    const dist = Math.abs(mid - center);
    if (dist < minDist) {
      minDist = dist;
      closest = index;
    }
  });
  return closest;
}

export function ProductCarousel({
  label,
  children,
  slideClassName = "w-[min(82vw,360px)]",
  className = "",
}: ProductCarouselProps) {
  const slides = Children.toArray(children);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const settledLeftRef = useRef(0);
  const [active, setActive] = useState(0);
  /** Blob fluid only after snap settles — not mid-swipe / sticky touch hover */
  const [fluidIndex, setFluidIndex] = useState(0);

  const settleFluid = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || slides.length === 0) return;
    const closest = closestSlideIndex(el);
    settledLeftRef.current = el.scrollLeft;
    setActive(closest);
    setFluidIndex(closest);
  }, [slides.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    settleFluid();

    let settleTimer = 0;
    const onScroll = () => {
      const closest = closestSlideIndex(el);
      setActive(closest);

      // Blob scale/translate can nudge scrollable overflow; ignore that jitter
      // so we don't pause/restart fluid and fight snap.
      if (Math.abs(el.scrollLeft - settledLeftRef.current) < SCROLL_JITTER_PX) {
        return;
      }

      setFluidIndex((current) => (current === -1 ? current : -1));
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleFluid, 140);
    };
    const onScrollEnd = () => {
      window.clearTimeout(settleTimer);
      settleFluid();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", settleFluid);
    return () => {
      window.clearTimeout(settleTimer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", settleFluid);
    };
  }, [settleFluid]);

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
            className={`shrink-0 snap-center overflow-clip ${slideClassName} ${
              index === fluidIndex ? "is-blob-fluid" : ""
            }`}
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
