import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  variant?: "default" | "muted" | "cool" | "dark";
  compact?: boolean;
};

const variantClass: Record<NonNullable<SectionProps["variant"]>, string | false> = {
  default: false,
  muted: "section--muted",
  cool: "section--cool",
  dark: "section--dark",
};

export const Section = forwardRef<ElementRef<"section">, SectionProps>(
  function Section({ className, variant = "default", compact, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn(
          "section",
          compact && "section--compact",
          variantClass[variant],
          className,
        )}
        {...props}
      />
    );
  }
);
