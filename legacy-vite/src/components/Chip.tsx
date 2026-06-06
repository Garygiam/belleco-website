import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Chip({
  selected,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        selected
          ? "bg-accent text-bg shadow-lift ring-1 ring-accent-2/22"
          : "bg-surface text-ink shadow-lift ring-1 ring-ink/10 hover:bg-bg",
        className,
      )}
    />
  );
}
