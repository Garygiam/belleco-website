import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function FormField({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-semibold text-ink">{label}</label>
        {error ? <span className="text-xs font-semibold text-red-700">{error}</span> : null}
      </div>
      {children}
      {hint ? <div className="text-xs leading-relaxed text-muted">{hint}</div> : null}
    </div>
  );
}

