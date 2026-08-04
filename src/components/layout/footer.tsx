import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-ad-primary-bg px-5 py-4 md:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 font-body text-base leading-[25px] text-ad-primary-text sm:flex-row sm:items-center">
        <div className="flex items-center gap-1.5">
          <Image
            src="/icons/icon-copyright.svg"
            alt=""
            width={15}
            height={15}
            className="size-[15px]"
          />
          <p>2026 AhDelights. All rights reserved.</p>
        </div>
        <p>Designed & Developed by BizSolutions LLC.</p>
      </div>
    </footer>
  );
}
