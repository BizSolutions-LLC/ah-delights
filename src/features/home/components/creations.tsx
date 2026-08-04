import { SectionHeading } from "@/components/ui/section-heading";
import { CookieSelection } from "@/features/home/components/cookie-selection";
import { ProductCarousel } from "@/features/home/components/product-carousel";
import { ProductImage } from "@/features/home/components/product-image";
import {
  classicOthers,
  flavorsOfFrance,
  homeMadePastries,
  ubeTreats,
} from "@/features/home/products";
import { preventOrphan } from "@/lib/typography";

function productHoverClass(index: number, className = "") {
  const direction =
    index % 2 === 0 ? "creation-product-left" : "creation-product-right";
  return `group creation-product ${direction} ${className}`.trim();
}

/**
 * Keep resting copy fully readable — only a soft lift on hover.
 * Avoid dimming, tracking shifts, or staggered delays (those feel busy).
 */
const captionTitleClass =
  "text-pretty font-montserrat text-lg font-semibold text-ad-primary-text transition-transform duration-700 ease-out md:text-xl md:group-hover:-translate-y-0.5";

const captionTitleBoldClass =
  "text-pretty font-montserrat text-lg font-bold text-ad-primary-text transition-transform duration-700 ease-out md:group-hover:-translate-y-0.5";

const captionBodyClass =
  "text-pretty font-montserrat text-sm text-ad-primary-text transition-transform duration-700 ease-out md:text-lg md:group-hover:-translate-y-0.5";

/**
 * Em-spaced rows match Figma density on desktop. Tall mobile sections need
 * many more rows (small vw type + stacked content) — overflow clips extras.
 */
const WATERMARK_FILL_ROWS = 40;

function Watermark({
  text,
  tone = "soft",
  rows = 8,
}: {
  text: string;
  tone?: "soft" | "strong";
  /** Base row count from Figma; mobile fill uses at least WATERMARK_FILL_ROWS */
  rows?: number;
}) {
  const count = Math.max(rows, WATERMARK_FILL_ROWS);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Figma: Montserrat Black ~311px, staggered rows ~301px apart */}
      <div
        className={`absolute inset-x-0 -top-[8%] bottom-[-40%] font-montserrat text-[clamp(3.75rem,18vw,19.436rem)] font-black leading-none md:bottom-[-15%] md:text-[clamp(4.5rem,21.6vw,19.436rem)] ${
          tone === "strong"
            ? "text-[rgba(247,231,168,0.5)]"
            : "text-[rgba(247,231,168,0.3)]"
        }`}
      >
        {Array.from({ length: count }, (_, i) => {
          // Strict alternate per row — never two neighbors moving the same way.
          // Left product: even → right, odd → left. Right product flips that.
          const even = i % 2 === 0;
          const onLeftHover = even
            ? "md:group-has-[.creation-product-left:hover]/creations:translate-x-3"
            : "md:group-has-[.creation-product-left:hover]/creations:-translate-x-3";
          const onRightHover = even
            ? "md:group-has-[.creation-product-right:hover]/creations:-translate-x-3"
            : "md:group-has-[.creation-product-right:hover]/creations:translate-x-3";

          return (
            <p
              key={`${text}-${i}`}
              className={`absolute whitespace-nowrap transition-transform duration-800 ease-out will-change-transform ${onLeftHover} ${onRightHover}`}
              style={{
                top: `${i * 0.97}em`,
                left: even ? "-20%" : "-42%",
                transitionDelay: `${i * 20}ms`,
              }}
            >
              <span className="inline-block pr-[0.35em]">{text}</span>
              <span className="inline-block">{text}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

function CategoryTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full max-w-[1060px] flex-col items-center gap-[25px] text-center text-ad-primary-text">
      <h3 className="w-full font-montserrat text-3xl font-semibold md:text-[40px]">
        {title}
      </h3>
      <p className="w-full text-pretty font-montserrat text-base md:text-lg">
        {preventOrphan(description)}
      </p>
    </div>
  );
}

export function Creations() {
  return (
    <>
      {/* Intro — drip seam lives on Best Sellers so it isn’t clipped on mobile */}
      <section className="relative overflow-x-clip bg-ad-primary-bg px-5 pb-16 pt-28 md:px-[190px] md:pb-[100px] md:pt-[160px]">
        <div className="relative z-0 mx-auto flex max-w-[1060px] flex-col items-center gap-8 md:gap-[50px]">
          <SectionHeading title="Our Creations" />
          <p className="w-full text-pretty text-center font-montserrat text-base text-ad-primary-text md:text-lg">
            {preventOrphan(
              "Explore our collection of handmade cakes, cookies, cupcakes, and specialty pastries, crafted with premium ingredients and presented with care.",
            )}
          </p>
        </div>
      </section>

      <section className="group/creations relative overflow-hidden bg-ad-primary-bg px-5 py-16 md:px-[190px] md:py-[100px]">
        <Watermark text="HOME MADE PASTRIES" rows={7} />
        <div className="relative z-10 mx-auto flex w-full max-w-[1065px] flex-col items-center gap-[50px]">
          <CategoryTitle
            title="Home Made Pastries"
            description="Our pastries offer the perfect blend of warmth and indulgence. Whether enjoyed at home, shared with loved ones, or served at special gatherings, every bite delivers the simple joy of pastries made with care, tradition, and heart."
          />
          <ProductCarousel
            label="Home made pastries"
            className="md:hidden"
            slideClassName="w-[min(85vw,400px)]"
          >
            {homeMadePastries.map((item, index) => (
              <figure
                key={item.name}
                className={productHoverClass(
                  index,
                  "flex w-full flex-col items-center gap-2.5",
                )}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  variant="pastry"
                  focus={item.imageFocus}
                />
                <figcaption className={`text-center ${captionTitleClass}`}>
                  {preventOrphan(item.name)}
                </figcaption>
              </figure>
            ))}
          </ProductCarousel>

          <div className="hidden w-full flex-col gap-[25px] md:flex">
            {[0, 2].map((start) => (
              <div
                key={start}
                className="flex flex-row items-start justify-center gap-[25px]"
              >
                {homeMadePastries
                  .slice(start, start + 2)
                  .map((item, offset) => (
                    <figure
                      key={item.name}
                      className={productHoverClass(
                        start + offset,
                        "flex w-full max-w-[520px] flex-col items-center gap-2.5",
                      )}
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        variant="pastry"
                        focus={item.imageFocus}
                      />
                      <figcaption className={captionTitleClass}>
                        {preventOrphan(item.name)}
                      </figcaption>
                    </figure>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="group/creations relative overflow-hidden bg-ad-secondary-bg px-5 py-16 md:px-[190px] md:py-[100px]">
        <Watermark text="CLASSIC FAVORITES" tone="strong" rows={9} />
        <div className="relative z-10 mx-auto flex w-full max-w-[1090px] flex-col items-center gap-[50px]">
          <CategoryTitle
            title="CLASSIC FAVORITES"
            description="Our classic cookies and cupcakes bring that nostalgic, homemade charm everyone loves. These timeless treats never fail to delight and always feel just right."
          />

          <p className="font-montserrat text-lg font-semibold text-ad-primary-text md:text-xl">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-ad-primary-text"
              />
              COOKIE SELECTION
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-ad-primary-text"
              />
            </span>
          </p>

          <CookieSelection>
            <ProductCarousel
              label="Classic cupcakes and brownies"
              className="md:hidden"
              slideClassName="w-[min(85vw,400px)]"
            >
              {classicOthers.map((item, index) => (
                <figure
                  key={item.name}
                  className={productHoverClass(
                    index,
                    "flex w-full flex-col items-center gap-2.5 text-center",
                  )}
                >
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    variant="pastryOnPink"
                    focus={item.imageFocus}
                  />
                  <figcaption className="flex w-full flex-col gap-5 px-2">
                    <p className={captionTitleClass}>
                      {preventOrphan(item.name)}
                    </p>
                    {item.description ? (
                      <p className={captionBodyClass}>
                        {preventOrphan(item.description)}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </ProductCarousel>

            <div className="hidden w-full max-w-[1090px] items-start justify-between gap-[25px] md:flex md:flex-row">
              {classicOthers.map((item, index) => (
                <figure
                  key={item.name}
                  className={productHoverClass(
                    index,
                    "flex w-full max-w-[520px] flex-col items-center gap-2.5 text-center",
                  )}
                >
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    variant="pastryOnPink"
                    focus={item.imageFocus}
                  />
                  <figcaption className="flex w-full flex-col gap-5 px-5">
                    <p className={captionTitleClass}>
                      {preventOrphan(item.name)}
                    </p>
                    {item.description ? (
                      <p className={captionBodyClass}>
                        {preventOrphan(item.description)}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          </CookieSelection>
        </div>
      </section>

      <section className="group/creations relative overflow-hidden bg-ad-primary-bg px-5 py-16 md:px-[190px] md:py-[100px]">
        <Watermark text="TREATS WITH UBE" rows={6} />
        <div className="relative z-10 mx-auto flex w-full max-w-[1065px] flex-col items-center gap-[25px]">
          <CategoryTitle
            title="Treats with Ube"
            description="Inspired by Filipino heritage, our Ube creations bring the vibrant essence of Southeast Asia to your table."
          />
          {/* Figma: 1065 row, two 520 shells, justify-between (~25px gap) */}
          <ProductCarousel
            label="Treats with ube"
            className="md:hidden"
            slideClassName="w-[min(85vw,400px)]"
          >
            {ubeTreats.map((item, index) => (
              <figure
                key={item.name}
                className={productHoverClass(
                  index,
                  "flex w-full flex-col items-center gap-2.5",
                )}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  variant="ube"
                  flip={index === 1}
                  focus={item.imageFocus}
                />
                <figcaption className={`text-center ${captionTitleClass}`}>
                  {preventOrphan(item.name)}
                </figcaption>
              </figure>
            ))}
          </ProductCarousel>

          <div className="hidden w-full items-start justify-between gap-6 md:flex md:flex-row">
            {ubeTreats.map((item, index) => (
              <figure
                key={item.name}
                className={productHoverClass(
                  index,
                  "flex w-full max-w-[520px] flex-col items-center gap-2.5",
                )}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  variant="ube"
                  flip={index === 1}
                  focus={item.imageFocus}
                />
                <figcaption className={`text-center ${captionTitleClass}`}>
                  {preventOrphan(item.name)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="group/creations relative overflow-hidden bg-ad-secondary-bg px-5 py-16 md:px-[190px] md:py-[100px]">
        <Watermark text="FLAVORS OF FRANCE" tone="strong" rows={6} />
        <div className="relative z-10 mx-auto flex w-full max-w-[1065px] flex-col items-center gap-[25px]">
          <div className="flex w-full flex-col items-center gap-[50px] text-center text-ad-primary-text">
            <h3 className="font-montserrat text-3xl font-semibold md:text-[40px]">
              Flavors of France
            </h3>
            <p className="w-full text-pretty font-montserrat text-base md:text-lg">
              {preventOrphan(
                "For chocolate pastries, we source top-tier imported cocoa powder, delivering rich, premium cacao depth.",
              )}
            </p>
          </div>
          <ProductCarousel
            label="Flavors of France"
            className="md:hidden"
            slideClassName="w-[min(80vw,340px)]"
          >
            {flavorsOfFrance.map((item, index) => (
              <figure
                key={item.name}
                className={productHoverClass(
                  index,
                  "flex w-full flex-col items-center gap-8 text-center",
                )}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  variant="france"
                  invertFrame={index === 1}
                  frameLockedPhoto={index === 1}
                  focus={item.imageFocus}
                />
                <figcaption className="px-2">
                  <p className={`mb-2 ${captionTitleBoldClass}`}>
                    {preventOrphan(item.name)}
                  </p>
                  <p className={captionBodyClass}>
                    {preventOrphan(item.description ?? "")}
                  </p>
                </figcaption>
              </figure>
            ))}
          </ProductCarousel>

          <div className="hidden w-full max-w-[1064px] items-start justify-between gap-4 md:flex md:flex-row">
            {flavorsOfFrance.map((item, index) => (
              <figure
                key={item.name}
                className={productHoverClass(
                  index,
                  "flex w-full max-w-[350px] flex-col items-center gap-[41px] text-center",
                )}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  variant="france"
                  invertFrame={index === 1}
                  frameLockedPhoto={index === 1}
                  focus={item.imageFocus}
                />
                <figcaption className="px-4">
                  <p className={`mb-2 ${captionTitleBoldClass}`}>
                    {preventOrphan(item.name)}
                  </p>
                  <p className={captionBodyClass}>
                    {preventOrphan(item.description ?? "")}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
