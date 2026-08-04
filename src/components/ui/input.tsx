import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  hint?: string;
  optional?: boolean;
};

export function Input({
  label,
  hint,
  optional,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <label
        htmlFor={inputId}
        className="font-montserrat text-lg text-ad-charcoal"
      >
        {label}{" "}
        {optional ? (
          <span className="text-ad-gray">(optional)</span>
        ) : (
          <span className="text-[#ed272e]">*</span>
        )}
      </label>
      <input
        id={inputId}
        className={`h-10 w-full rounded-[5px] border border-ad-gray bg-white px-3 font-body text-base text-ad-charcoal outline-none transition focus:border-ad-button ${className}`}
        {...props}
      />
      {hint ? (
        <p className="font-body text-xs italic text-ad-gray">{hint}</p>
      ) : null}
    </div>
  );
}
