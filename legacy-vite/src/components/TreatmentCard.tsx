import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Treatment } from "@/data/treatments";
import { cn } from "@/lib/utils";

export default function TreatmentCard({ treatment, compact }: { treatment: Treatment; compact?: boolean }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-ink/10 transition hover:bg-bg hover:shadow-glow",
        compact && "p-5",
      )}
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-12 top-6 h-40 w-40 rounded-full bg-accent-2/18 blur-2xl" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-accent/12 blur-2xl" />
      </div>
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-[0.16em] text-muted">{treatment.intensity}</div>
            <div className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-tight text-ink">
              {treatment.name}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-ink/5 px-3 py-2 text-xs font-semibold text-ink">
            <Clock3 className="h-4 w-4 text-accent" />
            <span>{treatment.duration}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {treatment.concerns.map((c) => (
            <span
              key={c}
              className="rounded-full bg-bg px-3 py-1 text-xs font-semibold text-muted ring-1 ring-ink/10"
            >
              {c}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
          {treatment.outcomes.slice(0, compact ? 2 : 3).map((o) => (
            <li key={o} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
              <span>{o}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-xs text-muted">Results vary. Comfort-first approach.</div>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg transition hover:brightness-[1.06]"
          >
            Book <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
