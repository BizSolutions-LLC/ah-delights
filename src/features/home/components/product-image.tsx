import Image from "next/image";

export type ProductFrameVariant =
  | "pastry"
  | "pastryOnPink"
  | "cookie"
  | "ube"
  | "france";

export type ProductImageFocus = {
  /**
   * Framing focus as `"x% y%"` (center = `"50% 50%"`).
   * Lower y% biases toward the top of the photo; lower x% toward the left.
   */
  position?: string;
  /**
   * Zoom factor inside the blob (1 = cover the mask exactly).
   * Slightly above 1 matches Figma’s tight image fills.
   */
  scale?: number;
  /** Extra photo rotation in degrees (clockwise positive) */
  rotate?: number;
};

/** Parse `"50% 40%"` → pan from center for transform translate (screen space). */
function focusPan(position: string | undefined): { x: number; y: number } {
  const parts = (position ?? "50% 50%").trim().split(/\s+/);
  const rawX = Number.parseFloat(parts[0] ?? "50");
  const rawY = Number.parseFloat(parts[1] ?? parts[0] ?? "50");
  const x = Number.isFinite(rawX) ? rawX : 50;
  const y = Number.isFinite(rawY) ? rawY : 50;
  // Match object-position intuition: 40% y → shift image down to favor the top.
  return { x: 50 - x, y: 50 - y };
}

type ProductImageProps = {
  src: string;
  alt: string;
  variant?: ProductFrameVariant;
  /** Flip frame (Figma: Cheesy Coconut Macaroons) */
  flip?: boolean;
  /**
   * Rotate the blob frame 180° (Figma: Double Choco Cupcake).
   * Photo is counter-rotated so the product stays upright — unless
   * `frameLockedPhoto` is set (photo rotates with the frame, like Figma fills).
   */
  invertFrame?: boolean;
  /**
   * Keep the photo locked to the blob (no counter-rotate). Use for
   * pre-masked Figma fills that already match the artboard orientation.
   */
  frameLockedPhoto?: boolean;
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
    // Figma Crinkles frame: 350×310.615 shell (see FranceBlobArtboard)
    shell: "relative mx-auto aspect-[350/310.615] w-full max-w-[350px]",
    artboard: "absolute inset-0",
    photoClass: "",
    outerRotate: "",
    innerRotate: "",
  },
};

/**
 * Figma Flavors of France frame (node Crinkles / Double Decendent Cups):
 * shell 350×310.615 with three independently rotated copies of the same
 * 268.35×314.864 vector — photo 90°, outer 98.22°, inner 83.76°.
 * Unlike cookies, there is no parent rotate-90 wrapping the whole artboard.
 */
function FranceBlobArtboard({
  src,
  alt,
  frame,
  invertPhoto = false,
  frameLockedPhoto = false,
  focus,
}: {
  src: string;
  alt: string;
  frame: FrameConfig;
  invertPhoto?: boolean;
  frameLockedPhoto?: boolean;
  focus?: ProductImageFocus;
}) {
  const position = focus?.position ?? "50% 50%";
  const scale = focus?.scale ?? 1.12;
  // Quarter-turned France photos sit in a square cover box; landscape assets
  // (e.g. cupcakes) only crop on X, so object-position Y is a no-op. Pan via
  // translate instead — net orientation is identity, so x/y match the page.
  const pan = focusPan(position);

  // Photo stays upright unless it's a pre-masked Figma fill (cupcake).
  const photoRotateDeg = frameLockedPhoto
    ? 0
    : (invertPhoto ? 180 : 0) - 90;
  const quarterTurn = Math.abs(photoRotateDeg) % 180 === 90;
  const fit = frameLockedPhoto ? "object-contain" : "object-cover";

  // Native 268.35×314.864 vector, sized as % of each Figma AABB parent.
  const photoNativeStyle = {
    width: `${(268.35 / 314.864) * 100}%`,
    aspectRatio: "268.35 / 314.864",
  } as const;
  const outerNativeStyle = {
    width: `${(268.35 / 350) * 100}%`,
    aspectRatio: "268.35 / 314.864",
  } as const;
  const innerNativeStyle = {
    width: `${(268.35 / 342.176) * 100}%`,
    aspectRatio: "268.35 / 314.864",
  } as const;

  const photoTransform = quarterTurn
    ? `scale(${scale}) translate(${pan.x}%, ${pan.y}%)${
        focus?.rotate ? ` rotate(${focus.rotate}deg)` : ""
      }`
    : `scale(${scale})${focus?.rotate ? ` rotate(${focus.rotate}deg)` : ""}`;

  return (
    <div className="absolute inset-0">
      {/* Photo — AABB 314.864×268.35 at (14.97, 21.44), content rotate 90° */}
      <div className="absolute left-[4.277%] top-[6.902%] flex h-[86.393%] w-[89.961%] items-center justify-center">
        <div className="flex-none rotate-90" style={photoNativeStyle}>
          <div
            className="blob-fluid-mask relative size-full overflow-hidden"
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
              <div
                className={
                  quarterTurn
                    ? "absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
                    : frameLockedPhoto
                      ? "absolute inset-[-6%]"
                      : "absolute inset-[-10%]"
                }
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
                  className={fit}
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{
                    objectPosition: quarterTurn ? "50% 50%" : position,
                    transform: photoTransform,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outer stroke — AABB 350×310.615 at (0,0), content rotate 98.22° */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="blob-fluid-outer relative flex-none rotate-[98.22deg]"
          style={outerNativeStyle}
        >
          {/* Figma: absolute inset-[-0.64%_-0.75%] around stroke SVG */}
          <div className="absolute inset-[-0.64%_-0.75%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.outer} alt="" className="block size-full max-w-none" />
          </div>
        </div>
      </div>

      {/* Inner stroke — AABB 342.176×300.996 at (3.91, 4.81), content rotate 83.76° */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[1.117%] top-[1.548%] flex h-[96.903%] w-[97.765%] items-center justify-center"
      >
        <div
          className="blob-fluid-inner relative flex-none rotate-[83.76deg]"
          style={innerNativeStyle}
        >
          {/* Figma: absolute inset-[-0.32%_-0.37%] around stroke SVG */}
          <div className="absolute inset-[-0.32%_-0.37%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.inner} alt="" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlobArtboard({
  src,
  alt,
  frame,
  invertPhoto = false,
  frameLockedPhoto = false,
  focus,
}: {
  src: string;
  alt: string;
  frame: FrameConfig;
  invertPhoto?: boolean;
  frameLockedPhoto?: boolean;
  focus?: ProductImageFocus;
}) {
  const position = focus?.position ?? "50% 50%";
  // Tight Figma-like fill; tiny oversize left for hover reveal only
  const scale = focus?.scale ?? 1.12;

  // Keep the product upright when invertFrame rotates the outer shell 180°.
  // frameLockedPhoto: Figma image-fill rotates with the blob — no counter-rotate.
  const photoRotateDeg = frameLockedPhoto ? 0 : invertPhoto ? 180 : 0;
  const fit = frameLockedPhoto ? "object-contain" : "object-cover";

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
            Extra bleed so the blob aperture can drift without revealing
            photo edges.
          */}
          <div
            className={
              frameLockedPhoto
                ? "absolute inset-[-6%]"
                : "absolute inset-[-10%]"
            }
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
              className={fit}
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
  frameLockedPhoto = false,
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

  const Artboard = variant === "france" ? FranceBlobArtboard : BlobArtboard;

  // Hover driven by parent `group` (figure) so caption hover plays the same motion.
  return (
    <div
      className={`relative ${frame.shell} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${orientation} ${className}`}
    >
      <Artboard
        src={src}
        alt={alt}
        frame={frame}
        invertPhoto={invertFrame}
        frameLockedPhoto={frameLockedPhoto}
        focus={focus}
      />
    </div>
  );
}
