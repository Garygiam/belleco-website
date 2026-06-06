import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import Chip from "@/components/Chip";
import TreatmentCard from "@/components/TreatmentCard";
import { brand } from "@/config/brand";
import { concerns, treatments, type SkinConcern } from "@/data/treatments";
import { testimonials } from "@/data/testimonials";
import { useMemo, useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<SkinConcern>("Acne");

  const selectedBlurb = useMemo(
    () => concerns.find((c) => c.key === selected)?.blurb ?? "",
    [selected],
  );

  const matchedTreatments = useMemo(
    () => treatments.filter((t) => t.concerns.includes(selected)).slice(0, 2),
    [selected],
  );

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-28 top-[-80px] h-[520px] w-[520px] rounded-full bg-accent-2/20 blur-3xl" />
          <div className="absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-accent/18 blur-3xl" />
        </div>
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-semibold text-muted ring-1 ring-ink/10">
                <Sparkles className="h-4 w-4 text-accent-2" />
                <span>{brand.tagline}</span>
              </div>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.96] tracking-tight text-ink sm:text-6xl">
                Calm, clear, radiant skin — built on{" "}
                <span className="text-accent">diagnosis-first</span> care.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {brand.subTagline} We don’t chase trends. We build a plan your skin can follow.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/book">
                  <Button variant="primary" size="lg">
                    Book a consultation <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/treatments">
                  <Button variant="secondary" size="lg">
                    Explore treatments
                  </Button>
                </Link>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4 ring-1 ring-ink/10">
                  <div className="font-semibold text-ink">Custom plan</div>
                  <div className="mt-1">Built around your barrier & lifestyle.</div>
                </div>
                <div className="rounded-2xl bg-surface p-4 ring-1 ring-ink/10">
                  <div className="font-semibold text-ink">Clinic protocol</div>
                  <div className="mt-1">Comfort-first, results-focused sessions.</div>
                </div>
                <div className="rounded-2xl bg-surface p-4 ring-1 ring-ink/10">
                  <div className="font-semibold text-ink">Realistic pace</div>
                  <div className="mt-1">Consistency over harsh shortcuts.</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[36px] bg-surface p-6 ring-1 ring-ink/10 shadow-glow">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold tracking-[0.16em] text-muted">CONCERN NAVIGATOR</div>
                  <div className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink">
                    Pick what matters today
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {concerns.map((c) => (
                    <Chip
                      key={c.key}
                      selected={c.key === selected}
                      onClick={() => setSelected(c.key)}
                      type="button"
                    >
                      {c.key}
                    </Chip>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl bg-bg p-5 ring-1 ring-ink/10">
                  <div className="text-sm font-semibold text-ink">What we’ll look for</div>
                  <div className="mt-2 text-sm leading-relaxed text-muted">{selectedBlurb}</div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="text-xs text-muted">Personalised plan after assessment.</div>
                    <Link to="/book" className="text-xs font-semibold text-accent hover:underline">
                      Book assessment
                    </Link>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {matchedTreatments.map((t) => (
                    <TreatmentCard key={t.id} treatment={t} compact />
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-7 -left-6 hidden h-24 w-24 rounded-full bg-accent-2/25 blur-2xl lg:block" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Proof"
            title={
              <>
                A plan your skin can <span className="text-accent">trust</span>.
              </>
            }
            description="We pair calm, precise sessions with education that keeps you consistent between visits."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
                <div className="text-xs font-semibold tracking-[0.16em] text-muted">{t.highlight}</div>
                <div className="mt-3 font-serif text-xl leading-snug text-ink">
                  “{t.line}”
                </div>
                <div className="mt-4 text-sm font-semibold text-muted">{t.name}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Visit"
            title={
              <>
                Find us in <span className="text-accent">Kuala Lumpur</span>.
              </>
            }
            description="Message, call, or request an appointment — we’ll guide you to the right starting point."
          />

          <div className="grid gap-3">
            <a
              href={brand.links.maps}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-3xl bg-surface p-6 ring-1 ring-ink/10 transition hover:bg-bg"
            >
              <MapPin className="mt-1 h-5 w-5 text-accent" />
              <div>
                <div className="text-sm font-semibold text-ink">{brand.contact.addressLines[0]}</div>
                <div className="mt-1 text-sm text-muted">{brand.contact.addressLines[1]}</div>
              </div>
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${brand.contact.phoneE164}`}
                className="flex items-start gap-3 rounded-3xl bg-surface p-6 ring-1 ring-ink/10 transition hover:bg-bg"
              >
                <Phone className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm font-semibold text-ink">{brand.contact.phoneDisplay}</div>
                  <div className="mt-1 text-sm text-muted">Call for quick questions</div>
                </div>
              </a>
              <a
                href={`mailto:${brand.contact.email}`}
                className="flex items-start gap-3 rounded-3xl bg-surface p-6 ring-1 ring-ink/10 transition hover:bg-bg"
              >
                <Mail className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm font-semibold text-ink">{brand.contact.email}</div>
                  <div className="mt-1 text-sm text-muted">Email for details</div>
                </div>
              </a>
            </div>
            <div className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
              <div className="text-xs font-semibold tracking-[0.16em] text-muted">OPENING HOURS</div>
              <div className="mt-4 grid gap-2 text-sm">
                {brand.contact.hours.map((h) => (
                  <div key={h.label} className="flex items-center justify-between gap-6">
                    <span className="text-muted">{h.label}</span>
                    <span className="font-semibold text-ink">{h.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/book">
                  <Button variant="primary" size="md">
                    Request an appointment <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
