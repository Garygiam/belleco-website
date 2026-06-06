import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full resize-y rounded-2xl bg-surface px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg",
        className,
      )}
    />
  );
}

