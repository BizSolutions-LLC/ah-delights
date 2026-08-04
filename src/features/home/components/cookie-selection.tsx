"use client";

import { useState, type ReactNode } from "react";
import { ProductImage } from "@/features/home/components/product-image";
import { classicCookies } from "@/features/home/products";

function productHoverClass(index: number, className = "") {
  const direction =
    index % 2 === 0 ? "creation-product-left" : "creation-product-right";
  return `group creation-product ${direction} ${className}`.trim();
}

const captionTitleClass =
  "font-montserrat text-lg font-semibold text-ad-primary-text transition-transform duration-700 ease-out md:text-xl md:group-hover:-translate-y-0.5";

const captionBodyClass =
  "font-montserrat text-sm text-ad-primary-text transition-transform duration-700 ease-out md:text-lg md:group-hover:-translate-y-0.5";

export function CookieSelection({ children }: { children?: ReactNode }) {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? classicCookies[selected] : null;

  return (
    <>
      {/* Mobile: cookies in one row; spacing grows when details open */}
      <div
        className={`flex w-full flex-col items-center transition-[gap] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          selected !== null ? "gap-6" : "gap-4"
        }`}
      >
        <div
          className="relative w-full overflow-x-clip pt-[8px]"
          role="tablist"
          aria-label="Cookie selection"
          // Height tracks cookie aspect (328×375) at ~32% width, plus zoom room.
          style={{ paddingBottom: "calc(32% * 375 / 328 + 20px)" }}
        >
          {classicCookies.map((item, index) => {
            const isActive = index === selected;
            const dimmed = selected !== null && !isActive;

            // Visual + hit-target slot (0 left, 1 center, 2 right).
            // Selected always takes center; the other two take the sides.
            let slot = index;
            if (selected !== null) {
              if (isActive) {
                slot = 1;
              } else {
                const sides = [0, 1, 2].filter((i) => i !== selected);
                slot = sides[0] === index ? 0 : 2;
              }
            }

            const scale = isActive ? 1.42 : dimmed ? 0.82 : 1;
            const lift = isActive ? -6 : 0;
            // Idle nest toward center; selected layout uses true slots only.
            const nestX =
              selected === null
                ? index === 0
                  ? 10
                  : index === 2
                    ? -10
                    : 0
                : 0;

            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="cookie-selection-panel"
                id={`cookie-tab-${index}`}
                onClick={() =>
                  setSelected((current) => (current === index ? null : index))
                }
                style={{
                  left: `${slot * 34}%`,
                  transform: `translate(${nestX}%, ${lift}px) scale(${scale})`,
                }}
                className={`group creation-product absolute top-2 w-[32%] origin-center transition-[left,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[left,transform] ${
                  index % 2 === 0
                    ? "creation-product-left"
                    : "creation-product-right"
                } ${
                  isActive
                    ? "z-20"
                    : dimmed
                      ? "z-0 opacity-40"
                      : "z-[1] opacity-100"
                }`}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  variant="cookie"
                  focus={item.imageFocus}
                />
                <span className="sr-only">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div
          id="cookie-selection-panel"
          role="tabpanel"
          aria-labelledby={
            selected !== null ? `cookie-tab-${selected}` : undefined
          }
          aria-live="polite"
          className="w-full px-2 text-center"
        >
          <div
            key={selected === null ? "prompt" : `cookie-${selected}`}
            className={`animate-fade-up flex w-full flex-col ${
              selected !== null ? "gap-3" : "gap-0"
            }`}
          >
            {active ? (
              <>
                <p className="font-montserrat text-lg font-semibold text-ad-primary-text">
                  {active.name}
                </p>
                {active.description ? (
                  <p className="font-montserrat text-sm text-ad-primary-text">
                    {active.description}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="font-montserrat text-base font-semibold tracking-wide text-ad-primary-text/70">
                Select a cookie!
              </p>
            )}
          </div>
        </div>

        {/* Cupcakes / brownies; margin opens when cookie copy appears */}
        <div
          className={`flex w-full flex-col items-center transition-[margin-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            selected !== null ? "mt-6" : "mt-4"
          }`}
        >
          {children}
        </div>
      </div>

      {/* Desktop: all cookies with captions */}
      <div className="hidden w-full flex-col items-center gap-[50px] md:flex">
        <div className="flex w-full max-w-[1033px] items-stretch justify-between gap-4">
          {classicCookies.map((item, index) => (
            <figure
              key={item.name}
              className={productHoverClass(
                index,
                "flex flex-1 flex-col items-center gap-2.5 text-center",
              )}
            >
              <ProductImage
                src={item.image}
                alt={item.name}
                variant="cookie"
                focus={item.imageFocus}
              />
              <figcaption className="flex flex-col gap-5 px-5">
                <p className={captionTitleClass}>{item.name}</p>
                <p className={captionBodyClass}>{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {children}
      </div>
    </>
  );
}
