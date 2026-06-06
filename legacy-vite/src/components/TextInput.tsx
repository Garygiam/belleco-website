import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-2xl bg-surface px-4 text-sm text-ink ring-1 ring-ink/10 transition placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg",
        className,
      )}
    />
  );
}

