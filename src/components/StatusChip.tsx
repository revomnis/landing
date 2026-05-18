import { cn } from "../lib/cn";

type StatusChipProps = {
  label: string;
  color?: "blue" | "green" | "amber" | "gray";
  className?: string;
};

const colorClass: Record<NonNullable<StatusChipProps["color"]>, string> = {
  blue: "chip--blue",
  green: "chip--green",
  amber: "chip--amber",
  gray: "chip--gray",
};

export function StatusChip({ label, color = "gray", className }: StatusChipProps) {
  return (
    <span className={cn("chip", colorClass[color], className)}>
      {label}
    </span>
  );
}
