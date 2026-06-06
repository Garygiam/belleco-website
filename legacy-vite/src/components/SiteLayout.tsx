import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--ink)_/_0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--ink)_/_0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}
