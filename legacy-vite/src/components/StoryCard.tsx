import type { Story } from "@/data/stories";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-ink/10 transition hover:bg-bg hover:shadow-glow">
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-10 top-8 h-44 w-44 rounded-full bg-accent-2/16 blur-2xl" />
        <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-accent/10 blur-2xl" />
      </div>
      <div className="relative">
        <div className="text-xs font-semibold tracking-[0.16em] text-muted">{story.concern}</div>
        <div className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-tight text-ink">
          {story.title}
        </div>
        <div className="mt-4 rounded-2xl bg-bg p-4 ring-1 ring-ink/10">
          <div className="text-xs font-semibold tracking-[0.16em] text-muted">TIMELINE</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {story.timeline.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-sm leading-relaxed text-ink">
          <span className="font-serif text-xl leading-none text-accent-2">“</span>
          <span className="text-muted">{story.quote}</span>
          <span className="font-serif text-xl leading-none text-accent-2">”</span>
        </div>
        <div className="mt-4 text-xs leading-relaxed text-muted">{story.note}</div>
      </div>
    </div>
  );
}
