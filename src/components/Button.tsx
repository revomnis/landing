import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Base = {
  variant?: "primary" | "ghost" | "secondary";
  size?: "sm" | "lg";
  className?: string;
  children: ReactNode;
};

export type ButtonProps = Base &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

export function Button({
  variant = "primary",
  size = "sm",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "btn",
    variant === "primary" && "btn--primary",
    variant === "ghost" && "btn--ghost",
    variant === "secondary" && "btn--secondary",
    size === "sm" && "btn--sm",
    size === "lg" && "btn--lg",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
