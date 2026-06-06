import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("container px-5 sm:px-7 lg:px-10", className)}>{children}</div>
  );
}

