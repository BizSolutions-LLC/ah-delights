import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const variants = {
  primary:
    "bg-ad-button text-ad-button-text border-2 border-ad-button hover:bg-ad-primary-text hover:border-ad-primary-text",
  secondary:
    "bg-transparent text-ad-button border-2 border-ad-button hover:bg-ad-button hover:text-ad-button-text",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  onClick?: ComponentProps<"button">["onClick"];
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "children" | "className" | "onClick"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  icon,
  onClick,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `inline-flex items-center justify-center gap-2.5 rounded-[20px] px-5 py-3.5 font-montserrat text-base font-semibold transition-colors duration-200 ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        onClick={onClick as ComponentProps<"a">["onClick"]}
      >
        {children}
        {icon}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} onClick={onClick} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}
