type SectionHeadingProps = {
  title: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex w-full min-w-0 items-center gap-3 overflow-hidden md:gap-6 ${className}`}
    >
      <div className="h-px min-w-4 flex-1 bg-ad-primary-text/40" />
      <Tag className="min-w-0 max-w-[calc(100%-3.5rem)] text-center font-display text-[1.75rem] font-semibold leading-tight break-words text-ad-primary-text sm:text-3xl md:max-w-none md:shrink-0 md:text-[40px] md:leading-normal md:break-normal">
        {title}
      </Tag>
      <div className="h-px min-w-4 flex-1 bg-ad-primary-text/40" />
    </div>
  );
}
