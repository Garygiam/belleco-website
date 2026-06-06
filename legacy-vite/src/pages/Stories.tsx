import { useMemo, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Chip from "@/components/Chip";
import StoryCard from "@/components/StoryCard";
import Button from "@/components/Button";
import { stories } from "@/data/stories";
import { concerns, type SkinConcern } from "@/data/treatments";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Stories() {
  const [filter, setFilter] = useState<SkinConcern | "All">("All");

  const filtered = useMemo(() => {
    if (filter === "All") return stories;
    return stories.filter((s) => s.concern === filter);
  }, [filter]);

  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Stories"
            title={
              <>
                Transformation is a{" "}
                <span className="text-accent">process</span>, not a one-off.
              </>
            }
            description="Real people, steady progress, and a focus on barrier-friendly consistency."
          />

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Chip selected={filter === "All"} onClick={() => setFilter("All")} type="button">
              All
            </Chip>
            {concerns.map((c) => (
              <Chip
                key={c.key}
                selected={filter === c.key}
                onClick={() => setFilter(c.key)}
                type="button"
              >
                {c.key}
              </Chip>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {filtered.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <SectionHeader
            eyebrow="Education"
            title="The calm science behind the glow."
            description="Small shifts in barrier health and consistency usually beat harsh, high-risk routines."
          />
          <div className="grid gap-4">
            <div className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
              <div className="text-xs font-semibold tracking-[0.16em] text-muted">WHY DIAGNOSIS MATTERS</div>
              <div className="mt-3 text-sm leading-relaxed text-muted">
                Many people treat “acne” or “pigmentation” like a single problem. We look for your pattern: triggers,
                barrier strength, and what your skin can tolerate consistently.
              </div>
            </div>
            <div className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
              <div className="text-xs font-semibold tracking-[0.16em] text-muted">BARRIER FIRST</div>
              <div className="mt-3 text-sm leading-relaxed text-muted">
                A stronger barrier often means less reactivity, steadier hydration, and better results from actives.
                Comfort is not “weak” — it’s sustainable.
              </div>
            </div>
            <div className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
              <div className="text-xs font-semibold tracking-[0.16em] text-muted">CONSISTENCY WINS</div>
              <div className="mt-3 text-sm leading-relaxed text-muted">
                Skin changes slowly. We build a repeatable rhythm: sessions, homecare, and maintenance that fits real
                schedules.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="rounded-3xl bg-surface p-10 ring-1 ring-ink/10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="font-serif text-4xl font-semibold tracking-tight text-ink">
                Want your own plan?
              </div>
              <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Share your main concern and preferred time. We’ll respond with suitable starting sessions and the next
                available slots.
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-end">
              <Link to="/treatments">
                <Button variant="secondary" size="lg">
                  View treatments
                </Button>
              </Link>
              <Link to="/book">
                <Button variant="primary" size="lg">
                  Book now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}

