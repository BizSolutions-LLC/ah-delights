import Image from "next/image";
import { Button } from "@/components/ui/button";
import { preventOrphan } from "@/lib/typography";

/**
 * Positions are percentages of the Figma 1440×880 hero frame so vectors
 * scale correctly with the aspect-ratio container.
 */
const FIGMA = {
  frame: { w: 1440, h: 880 },
  vector3: { x: 599, y: 103, w: 950.965, h: 783 },
  vector2: { x: 598.535, y: 124, w: 950.965, h: 783 },
  vector4: { x: -86, y: -50, w: 539.5, h: 511 },
  // Wrapper around rotated Vector 5 from Figma export
  vector5: { x: -104, y: -45, w: 566.87, h: 539.986, rotate: 3.16 },
} as const;

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export function Hero() {
  const { frame, vector2, vector3, vector4, vector5 } = FIGMA;

  return (
    <section className="relative w-full overflow-hidden bg-ad-primary-bg max-md:-mb-px">
      <div className="relative flex min-h-[100svh] w-full flex-col md:min-h-0 md:aspect-[1440/880]">
        <div className="absolute inset-0 bg-ad-primary-bg" aria-hidden />

        {/* Mobile pink waves — behind copy only */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[60%] overflow-hidden md:hidden">
          <img
            src="/decor/hero-vector-4.svg"
            alt=""
            aria-hidden
            className="absolute -left-[18%] -top-[6%] w-[78%] max-w-none"
          />
          <img
            src="/decor/hero-vector-5.svg"
            alt=""
            aria-hidden
            className="absolute -left-[20%] -top-[4%] w-[82%] max-w-none origin-center rotate-[3.16deg]"
          />
        </div>

        {/* Desktop pink waves — Figma % */}
        <img
          src="/decor/hero-vector-4.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-[1] hidden max-w-none md:block"
          style={{
            left: pct(vector4.x, frame.w),
            top: pct(vector4.y, frame.h),
            width: pct(vector4.w, frame.w),
            height: pct(vector4.h, frame.h),
          }}
        />
        <div
          className="pointer-events-none absolute z-[1] hidden items-center justify-center md:flex"
          style={{
            left: pct(vector5.x, frame.w),
            top: pct(vector5.y, frame.h),
            width: pct(vector5.w, frame.w),
            height: pct(vector5.h, frame.h),
          }}
        >
          <img
            src="/decor/hero-vector-5.svg"
            alt=""
            aria-hidden
            className="h-[94.6%] w-[95.2%] max-w-none origin-center"
            style={{ transform: `rotate(${vector5.rotate}deg)` }}
          />
        </div>

        {/* Desktop pastry — Figma blob mask + outline beside copy */}
        <div className="pointer-events-none absolute inset-0 z-[2] hidden md:block">
          <img
            src="/decor/hero-vector-3.svg"
            alt=""
            aria-hidden
            className="absolute max-w-none"
            style={{
              left: pct(vector3.x, frame.w),
              top: pct(vector3.y, frame.h),
              width: pct(vector3.w, frame.w),
              height: pct(vector3.h, frame.h),
            }}
          />
          <div
            className="absolute overflow-hidden"
            style={{
              left: pct(vector2.x, frame.w),
              top: pct(vector2.y, frame.h),
              width: pct(vector2.w, frame.w),
              height: pct(vector2.h, frame.h),
              WebkitMaskImage: "url(/icons/mask-blob-hero.svg)",
              maskImage: "url(/icons/mask-blob-hero.svg)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              // Luminance masks treat white as visible
              WebkitMaskMode: "luminance",
              maskMode: "luminance",
            }}
          >
            <Image
              src="/products/hero-pastry.jpg"
              alt="AhDelights chocolate cake tray with a plated slice"
              fill
              priority
              // Bias slightly left so the foil pan stays in frame with the plate + plant
              className="object-cover object-[46%_48%]"
              sizes="66vw"
            />
          </div>
        </div>

        {/* Copy + CTAs — above the cake on mobile so buttons stay clear */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-5 pt-20 md:absolute md:inset-0 md:items-center md:px-20 md:py-[100px] md:pb-[100px] md:pt-[100px]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-5 md:gap-[50px]">
            <div className="flex w-full justify-center">
              <div className="relative h-[110px] w-[107px] animate-fade-up md:h-[231px] md:w-[225px]">
                <Image
                  src="/logo.png"
                  alt="AhDelights"
                  fill
                  priority
                  className="object-contain"
                  sizes="225px"
                />
              </div>
            </div>

            <div className="flex w-full max-w-[736px] flex-col items-start gap-5 md:gap-[50px]">
              <div className="flex w-full flex-col items-start gap-3 md:gap-[25px]">
                <h1 className="animate-fade-up w-full text-pretty text-left font-display text-[1.65rem] font-bold leading-snug text-ad-primary-text sm:text-4xl md:text-[52px] md:leading-normal">
                  {preventOrphan(
                    "Handcrafted Indulgence made with premium ingredients.",
                  )}
                </h1>
                <p className="animate-fade-up-delay w-full text-pretty text-left font-montserrat text-sm font-semibold leading-snug text-ad-primary-text md:text-[28px] md:leading-normal">
                  {preventOrphan(
                    "Discover delicious home‑made pastries crafted from scratch using quality ingredients, thoughtfully baked to bring warmth and comfort straight to your table.",
                  )}
                </p>
              </div>

              <div className="animate-fade-up-delay-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-start">
                <Button
                  href="/#our-best-seller"
                  variant="secondary"
                  className="w-full bg-ad-primary-bg shadow-[0_6px_18px_rgba(62,41,36,0.12)] sm:w-auto md:bg-transparent md:shadow-none"
                >
                  Explore Our Treats
                </Button>
                <Button
                  href="/contact"
                  className="w-full shadow-[0_6px_18px_rgba(62,41,36,0.14)] sm:w-auto md:shadow-none"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile cake — full-bleed below CTAs, not behind buttons */}
        <div className="relative z-[2] h-[min(46svh,380px)] w-full shrink-0 md:hidden">
          <Image
            src="/products/hero-pastry.jpg"
            alt="AhDelights chocolate cake tray with a plated slice"
            fill
            priority
            // Favor plated slice + plant in the tall mobile crop
            className="object-cover object-[72%_40%]"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-ad-primary-bg to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-[rgb(244_214_216/0.45)] to-[#f4d6d8]"
          />
        </div>
      </div>
    </section>
  );
}
