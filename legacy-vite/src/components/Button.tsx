import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        variant === "primary" &&
          "bg-accent text-bg shadow-lift ring-1 ring-accent-2/18 hover:shadow-glow hover:ring-accent-2/32 active:brightness-[0.98]",
        variant === "secondary" &&
          "bg-surface text-ink shadow-lift ring-1 ring-ink/10 hover:bg-bg hover:ring-ink/16 active:bg-surface",
        variant === "ghost" && "bg-transparent text-ink hover:bg-ink/5 active:bg-ink/8",
        className,
      )}
    >
      {variant === "primary" ? (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-white/18 opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-sheen" />
        </span>
      ) : null}
      <span className={cn("relative", variant === "primary" && "drop-shadow-sm")}>{children}</span>
    </button>
  );
}
