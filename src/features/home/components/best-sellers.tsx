import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCarousel } from "@/features/home/components/product-carousel";
import { bestSellers, type ProductItem } from "@/features/home/products";
import { preventOrphan } from "@/lib/typography";

/** Figma frame "Our Best Seller" — 1440×925 */
const FIGMA = {
  frame: { w: 1440, h: 925 },
  vector6: {
    x: -284,
    y: -140.96,
    w: 1173.693,
    h: 810.143,
    rotate: -18.69,
    innerW: 1072.455,
    innerH: 492.388,
  },
  vector7: {
    x: 727.48,
    y: -43.68,
    w: 959.411,
    h: 1090.396,
    rotate: 127.35,
    innerW: 1079.057,
    innerH: 383.396,
  },
} as const;

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function BestSellerCard({
  item,
  index,
}: {
  item: ProductItem;
  index: number;
}) {
  return (
    <article
      className={`${index === 0 ? "bestseller-card-0" : "bestseller-card-1"} group/card relative w-full max-w-[400px] shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:hover:-translate-y-3 md:hover:scale-[1.02] ${index === 0 ? "md:hover:rotate-[-1deg]" : "md:hover:rotate-[1deg]"}`}
    >
      {/* Offset double border (Figma Line Border, -3.17deg) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[10px] -top-[12px] z-0 hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:block md:group-hover/card:translate-x-1 md:group-hover/card:-translate-y-1"
      >
        <div className="mx-auto h-[550px] w-[402px] -rotate-[3.17deg] rounded-[20px] border-2 border-ad-button transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover/card:-rotate-[5deg]" />
      </div>

      <div className="relative z-10 flex h-auto min-h-[480px] flex-col overflow-hidden rounded-[20px] border-[3px] border-ad-button shadow-[0_0_0_rgba(104,69,54,0)] transition-[box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[550px] md:group-hover/card:shadow-[0_18px_40px_rgba(104,69,54,0.18)]">
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <img
            src={item.image}
            alt={item.name}
            className="absolute max-w-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover/card:scale-[1.06]"
            style={{
              left: item.imageCrop?.left ?? "0%",
              top: item.imageCrop?.top ?? "0%",
              width: item.imageCrop?.width ?? "100%",
              height: item.imageCrop?.height ?? "100%",
            }}
          />
        </div>

        <div
          className={`relative mt-auto flex flex-1 flex-col justify-end bg-gradient-to-b px-5 pb-5 pt-28 ${
            index === 0
              ? "from-transparent via-[rgba(204,199,189,0.3)] to-ad-primary-bg"
              : "from-[rgba(153,149,142,0)] from-[30%] via-[rgba(204,199,189,0.9)] via-[55%] to-ad-primary-bg"
          }`}
        >
          <div className="mb-2.5 flex items-center gap-1.5">
            <div className="h-px min-w-0 flex-1 bg-ad-primary-text/35" />
            <h3 className="shrink-0 text-pretty text-center font-montserrat text-lg font-semibold text-ad-primary-text md:text-xl">
              {preventOrphan(item.name)}
            </h3>
            <div className="h-px min-w-0 flex-1 bg-ad-primary-text/35" />
          </div>
          <p className="text-pretty font-montserrat text-sm text-ad-primary-text md:text-lg">
            {item.description ? preventOrphan(item.description) : null}
          </p>
        </div>
      </div>
    </article>
  );
}

export function BestSellers() {
  const { frame, vector6, vector7 } = FIGMA;

  return (
    <>
    <section
      id="our-best-seller"
      className="group/stage relative scroll-mt-24 overflow-hidden bg-[#f4d6d8] max-md:-mt-px"
    >
      {/*
        Mobile: edge-anchored doodles so left/right framing matches desktop.
        A shared Figma artboard either crops both sides away (tall/narrow) or
        shrinks into a tiny top band (width-locked) — neither reads like desktop.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
      >
        <img
          src="/decor/bestseller-vector-6.svg"
          alt=""
          className="absolute left-[-58%] top-[2%] w-[155%] max-w-none origin-center -rotate-[18.69deg]"
        />
        <img
          src="/decor/bestseller-vector-7.svg"
          alt=""
          className="absolute left-[18%] top-[-4%] w-[140%] max-w-none origin-center rotate-[127.35deg]"
        />
      </div>

      {/* Desktop: Figma 1440×925 artboard with exact % placement */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto hidden aspect-[1440/925] w-full max-w-[1440px] md:block">
        {/* Vector 6 — pale yellow doodle, left / behind cards */}
        <div
          className="absolute flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:group-has-[.bestseller-card-0:hover]/stage:translate-x-[-1.5%] md:group-has-[.bestseller-card-0:hover]/stage:translate-y-[-2%] md:group-has-[.bestseller-card-0:hover]/stage:scale-[1.06] md:group-has-[.bestseller-card-0:hover]/stage:rotate-[-2deg]"
          style={{
            left: pct(vector6.x, frame.w),
            top: pct(vector6.y, frame.h),
            width: pct(vector6.w, frame.w),
            height: pct(vector6.h, frame.h),
          }}
        >
          <img
            src="/decor/bestseller-vector-6.svg"
            alt=""
            aria-hidden
            className="max-w-none origin-center transition-opacity duration-700 ease-out md:group-has-[.bestseller-card-1:hover]/stage:opacity-60"
            style={{
              width: pct(vector6.innerW, vector6.w),
              height: pct(vector6.innerH, vector6.h),
              transform: `rotate(${vector6.rotate}deg)`,
            }}
          />
        </div>

        {/* Vector 7 — pale yellow doodle, right / behind cards */}
        <div
          className="absolute flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:group-has-[.bestseller-card-1:hover]/stage:translate-x-[1.5%] md:group-has-[.bestseller-card-1:hover]/stage:translate-y-[-2%] md:group-has-[.bestseller-card-1:hover]/stage:scale-[1.06] md:group-has-[.bestseller-card-1:hover]/stage:rotate-[2deg]"
          style={{
            left: pct(vector7.x, frame.w),
            top: pct(vector7.y, frame.h),
            width: pct(vector7.w, frame.w),
            height: pct(vector7.h, frame.h),
          }}
        >
          <img
            src="/decor/bestseller-vector-7.svg"
            alt=""
            aria-hidden
            className="max-w-none origin-center transition-opacity duration-700 ease-out md:group-has-[.bestseller-card-0:hover]/stage:opacity-60"
            style={{
              width: pct(vector7.innerW, vector7.w),
              height: pct(vector7.innerH, vector7.h),
              transform: `rotate(${vector7.rotate}deg)`,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] md:min-h-[925px]">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center gap-[50px] px-5 py-16 md:px-0 md:pb-[140px] md:pt-[100px]">
          <SectionHeading title="Our Best Seller" />

          <p className="w-full text-pretty text-center font-montserrat text-base text-ad-primary-text md:text-lg">
            Discover <strong className="font-bold">AhDelights&apos;</strong> most
            popular pastries featuring rich dark chocolate made from imported
            {"\u00A0"}cacao{"\u00A0"}powder.
          </p>

          <ProductCarousel
            label="Our best sellers"
            className="md:hidden"
            slideClassName="w-[min(88vw,400px)]"
          >
            {bestSellers.map((item, index) => (
              <BestSellerCard key={item.name} item={item} index={index} />
            ))}
          </ProductCarousel>

          <div className="hidden w-full max-w-[894px] items-start justify-between gap-6 md:flex md:flex-row">
            {bestSellers.map((item, index) => (
              <BestSellerCard key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed pink outside the 1440 artboard on ultrawide */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[#f4d6d8]"
      />
    </section>

      {/*
        Pink drip into Creations. Own band height so the wave shows, with
        overflow-hidden so the wider-than-viewport SVG can’t cause x-scroll.
      */}
      <div
        aria-hidden
        className="pointer-events-none relative z-20 h-[clamp(40px,10vw,126px)] w-full overflow-hidden"
      >
        <img
          src="/decor/drip.svg"
          alt=""
          className="absolute left-1/2 top-0 h-full w-[110.8%] max-w-none -translate-x-1/2"
        />
      </div>
    </>
  );
}
