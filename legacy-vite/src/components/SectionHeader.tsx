import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold tracking-wide text-muted ring-1 ring-ink/10">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

