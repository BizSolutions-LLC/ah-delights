import Image from "next/image";

export type ProductFrameVariant =
  | "pastry"
  | "pastryOnPink"
  | "cookie"
  | "ube"
  | "france";

export type ProductImageFocus = {
  /** CSS object-position, e.g. "50% 40%" */
  position?: string;
  /**
   * Zoom factor inside the blob (1 = cover the mask exactly).
   * Slightly above 1 matches Figma’s tight image fills.
   */
  scale?: number;
  /** Extra photo rotation in degrees (clockwise positive) */
  rotate?: number;
};

type ProductImageProps = {
  src: string;
  alt: string;
  variant?: ProductFrameVariant;
  /** Flip frame (Figma: Cheesy Coconut Macaroons) */
  flip?: boolean;
  /**
   * Rotate the blob frame 180° (Figma: Double Choco Cupcake).
   * Photo is counter-rotated so the product stays upright.
   */
  invertFrame?: boolean;
  /** Match Figma crop / avoid looking zoomed out */
  focus?: ProductImageFocus;
  className?: string;
};

type FrameConfig = {
  mask: string;
  outer: string;
  inner: string;
  /** Outer shell size on the page */
  shell: string;
  /**
   * When set, the blob artboard is built in its native orientation then
   * rotated (cookies / France in Figma).
   */
  rotateShell?: string;
  artboard: string;
  photoClass: string;
  /** Position/size of the outer outline (defaults to near-full shell) */
  outerClass?: string;
  /** Position/size of the inner outline (defaults to inset shell) */
  innerClass?: string;
  /** Size of the inner outline SVG within its wrapper */
  innerImgClass?: string;
  outerRotate: string;
  innerRotate: string;
};

const FRAME: Record<ProductFrameVariant, FrameConfig> = {
  pastry: {
    mask: "/icons/mask-blob-pastry.svg",
    outer: "/icons/blob-frame-outer.svg",
    inner: "/icons/blob-frame-inner.svg",
    shell: "aspect-[520/461] w-full max-w-[520px]",
    artboard: "absolute inset-0",
    photoClass: "absolute left-[4.7%] top-[3%] h-[90%] w-[92.5%]",
    outerRotate: "-rotate-[5.77deg]",
    innerRotate: "-rotate-[0.33deg]",
  },
  pastryOnPink: {
    mask: "/icons/mask-blob-pastry.svg",
    outer: "/icons/blob-frame-pastry-on-pink-outer.svg",
    inner: "/icons/blob-frame-pastry-on-pink-inner.svg",
    shell: "aspect-[520/461] w-full max-w-[520px]",
    artboard: "absolute inset-0",
    photoClass: "absolute left-[4.7%] top-[3%] h-[90%] w-[92.5%]",
    outerRotate: "-rotate-[5.77deg]",
    innerRotate: "-rotate-[0.33deg]",
  },
  cookie: {
    mask: "/icons/mask-blob-cookie.svg",
    outer: "/icons/blob-frame-cookie-outer.svg",
    inner: "/icons/blob-frame-cookie-inner.svg",
    shell: "relative mx-auto aspect-[328/375] w-full max-w-[328px]",
    rotateShell: "rotate-90",
    artboard:
      "absolute left-1/2 top-1/2 aspect-[339/284] w-[114%] -translate-x-1/2 -translate-y-1/2",
    photoClass: "absolute inset-[1.5%]",
    outerRotate: "rotate-[5.74deg] scale-[1.04]",
    innerRotate: "-rotate-[1.29deg] scale-[0.98]",
  },
  ube: {
    mask: "/icons/mask-blob-ube.svg",
    outer: "/icons/blob-frame-ube-outer.svg",
    inner: "/icons/blob-frame-ube-inner.svg",
    shell: "aspect-[520/511] w-full max-w-[520px]",
    artboard: "absolute inset-0",
    // Figma: photo 467.88×457.71 at (26.06, 26.71) in 520×511 shell
    photoClass: "absolute left-[5.01%] top-[5.23%] h-[89.55%] w-[89.98%]",
    // Outer outline matches photo size, rotated in the full shell
    outerClass: "absolute left-[5.01%] top-[5.23%] h-[89.55%] w-[89.98%]",
    // Inner outline wrapper 491.68×482.07 at (14.16, 14.54)
    innerClass: "absolute left-[2.72%] top-[2.85%] h-[94.31%] w-[94.55%]",
    // Path 467.88×457.71 centered in that wrapper
    innerImgClass: "h-[94.95%] w-[95.16%] max-w-none",
    outerRotate: "-rotate-[6.97deg]",
    innerRotate: "rotate-[3.06deg]",
  },
  france: {
    mask: "/icons/mask-blob-france.svg",
    outer: "/icons/blob-frame-france-outer.svg",
    inner: "/icons/blob-frame-france-inner.svg",
    shell: "relative mx-auto aspect-[350/311] w-full max-w-[350px]",
    rotateShell: "rotate-90",
    artboard:
      "absolute left-1/2 top-1/2 aspect-[272/319] h-[112%] -translate-x-1/2 -translate-y-1/2",
    photoClass: "absolute inset-[2%]",
    outerRotate: "rotate-[8.22deg] scale-[1.03]",
    innerRotate: "-rotate-[6.24deg] scale-[0.97]",
  },
};

function BlobArtboard({
  src,
  alt,
  frame,
  invertPhoto = false,
  focus,
}: {
  src: string;
  alt: string;
  frame: FrameConfig;
  invertPhoto?: boolean;
  focus?: ProductImageFocus;
}) {
  const position = focus?.position ?? "50% 50%";
  // Tight Figma-like fill; tiny oversize left for hover reveal only
  const scale = focus?.scale ?? 1.12;

  // Keep the product upright on the page:
  // - invertFrame → 180° on the outer shell, so counter with 180°
  // - France artboard is built sideways (rotateShell 90°) — counter the photo
  // Combine into one rotate — Tailwind rotate-* utilities conflict on `transform`
  // (Double Choco uses both, and only one would win → sideways photo).
  const isFranceShell = frame.mask.includes("france");
  const photoRotateDeg =
    (invertPhoto ? 180 : 0) + (isFranceShell ? -90 : 0);

  return (
    <div className={`${frame.artboard} ${frame.rotateShell ?? ""}`}>
      {/*
        Moving blob aperture over a world-locked photo:
        mask animates; counter layer cancels that transform so the image
        stays put while previously cropped edges come into view.
      */}
      <div
        className={`blob-fluid-mask overflow-hidden ${frame.photoClass}`}
        style={{
          WebkitMaskImage: `url(${frame.mask})`,
          maskImage: `url(${frame.mask})`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      >
        <div className="blob-fluid-mask-counter absolute inset-0">
          {/*
            Small bleed (-4%) for reveal; scale zooms in so rest framing
            stays tight like Figma instead of looking zoomed out.
          */}
          <div
            className="absolute inset-[-4%]"
            // Use CSS `rotate` (not `transform`) so it composes with
            // Tailwind v4 individual transform properties on parent shells.
            style={
              photoRotateDeg
                ? { rotate: `${photoRotateDeg}deg` }
                : undefined
            }
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
              style={{
                objectPosition: position,
                // Keep scale/nudge on `transform` — separate from orientation.
                transform: `scale(${scale})${
                  focus?.rotate ? ` rotate(${focus.rotate}deg)` : ""
                }`,
              }}
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none flex items-center justify-center ${
          frame.outerClass ?? "absolute inset-[1%]"
        } ${frame.outerRotate}`}
      >
        <div className="blob-fluid-outer size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={frame.outer} alt="" className="size-full max-w-none" />
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none flex items-center justify-center ${
          frame.innerClass ?? "absolute inset-[4%]"
        } ${frame.innerRotate}`}
      >
        <div className="blob-fluid-inner flex size-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frame.inner}
            alt=""
            className={frame.innerImgClass ?? "size-full max-w-none"}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  variant = "pastry",
  flip = false,
  invertFrame = false,
  focus,
  className = "",
}: ProductImageProps) {
  const frame = FRAME[variant];

  // Hover motion is desktop-only — sticky :hover on touch makes carousel swipes animate.
  const orientation = flip
    ? "-scale-y-100 rotate-180 md:group-hover:translate-y-1.5 md:group-hover:scale-x-[1.015] md:group-hover:scale-y-[-1.015]"
    : invertFrame
      ? "rotate-180 md:group-hover:translate-y-1.5 md:group-hover:scale-[1.015]"
      : "md:group-hover:-translate-y-1.5 md:group-hover:scale-[1.015] md:group-hover:rotate-[-0.6deg]";

  // Hover driven by parent `group` (figure) so caption hover plays the same motion.
  return (
    <div
      className={`relative ${frame.shell} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${orientation} ${className}`}
    >
      <BlobArtboard
        src={src}
        alt={alt}
        frame={frame}
        invertPhoto={invertFrame}
        focus={focus}
      />
    </div>
  );
}
