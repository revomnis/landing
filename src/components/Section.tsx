import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

export const Section = forwardRef<ElementRef<"section">, ComponentPropsWithoutRef<"section">>(
  function Section({ className, ...props }, ref) {
    return <section ref={ref} className={className} {...props} />;
  }
);
