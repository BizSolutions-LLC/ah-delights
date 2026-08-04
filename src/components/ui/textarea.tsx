import type { ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
};

export function Textarea({
  label,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <label
        htmlFor={inputId}
        className="font-montserrat text-lg text-ad-charcoal"
      >
        {label} <span className="text-[#ed272e]">*</span>
      </label>
      <textarea
        id={inputId}
        className={`min-h-[120px] w-full resize-y rounded-[5px] border border-ad-gray bg-white px-3 py-2 font-body text-base text-ad-charcoal outline-none transition focus:border-ad-button ${className}`}
        {...props}
      />
    </div>
  );
}
