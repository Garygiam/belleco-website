import SiteLayout from "@/components/SiteLayout";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import TreatmentCard from "@/components/TreatmentCard";
import Button from "@/components/Button";
import { treatments } from "@/data/treatments";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Do I need a consultation first?",
    a: "Recommended. We assess your skin pattern, sensitivities, and routine so sessions feel comfortable and consistent.",
  },
  {
    q: "How many sessions do people usually do?",
    a: "It depends on your concern and timeline. Many clients start with a short plan (3–6 sessions) and then maintain every 4–6 weeks.",
  },
  {
    q: "Is there downtime?",
    a: "Most sessions are designed to be low-downtime. If anything might be more active, we’ll set expectations before you commit.",
  },
  {
    q: "Can I come if my skin is sensitive?",
    a: "Yes. We prioritise barrier health and adjust intensity based on your skin’s response.",
  },
];

export default function Treatments() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Treatments"
            title={
              <>
                Sessions designed for{" "}
                <span className="text-accent">comfort</span> and long-term results.
              </>
            }
            description="We start with diagnosis, then build a plan that balances barrier health, clarity, and tone."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {treatments.map((t) => (
              <TreatmentCard key={t.id} treatment={t} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Your Journey"
            title={
              <>
                What happens after you{" "}
                <span className="text-accent">start</span>.
              </>
            }
            description="A simple, repeatable process so you always know what to expect."
          />

          <div className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
            <ol className="space-y-4 text-sm leading-relaxed text-muted">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-bg text-xs font-semibold">
                  1
                </span>
                <span>
                  <span className="font-semibold text-ink">Diagnosis</span>: we check your barrier, hydration, triggers, and routine.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-bg text-xs font-semibold">
                  2
                </span>
                <span>
                  <span className="font-semibold text-ink">Plan</span>: a session map (next 3–6 visits) + homecare direction.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-bg text-xs font-semibold">
                  3
                </span>
                <span>
                  <span className="font-semibold text-ink">Sessions</span>: comfort-first intensity with a focus on clarity and resilience.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-bg text-xs font-semibold">
                  4
                </span>
                <span>
                  <span className="font-semibold text-ink">Maintenance</span>: keep results steady with an easy rhythm.
                </span>
              </li>
            </ol>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/book">
                <Button variant="primary" size="md">
                  Book consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/stories">
                <Button variant="secondary" size="md">
                  Read stories
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="FAQ"
            title="Quick answers before you book."
            description="If you have a unique situation, message us and we’ll guide you."
          />

          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl bg-surface p-6 ring-1 ring-ink/10 open:bg-bg"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink outline-none">
                  <div className="flex items-center justify-between gap-6">
                    <span>{f.q}</span>
                    <span className="text-xs font-semibold text-muted group-open:text-accent">Toggle</span>
                  </div>
                </summary>
                <div className="mt-4 text-sm leading-relaxed text-muted">{f.a}</div>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-surface p-8 ring-1 ring-ink/10">
            <div className="font-serif text-3xl font-semibold tracking-tight text-ink">
              Ready for a personalised plan?
            </div>
            <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Submit a quick appointment request. We’ll reply with the next available slots and the best starting session.
            </div>
            <div className="mt-6">
              <Link to="/book">
                <Button variant="primary" size="lg">
                  Go to booking <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}

