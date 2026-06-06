import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import Container from "@/components/Container";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="font-serif text-2xl font-semibold tracking-tight">{brand.name}</div>
          <div className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{brand.subTagline}</div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={brand.links.facebook} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                Facebook <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={brand.links.youtube} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                YouTube <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-[0.16em] text-muted">CONTACT</div>
          <a
            className="flex items-start gap-3 rounded-2xl bg-surface p-4 ring-1 ring-ink/10 transition hover:bg-bg"
            href={`tel:${brand.contact.phoneE164}`}
          >
            <Phone className="mt-0.5 h-5 w-5 text-accent" />
            <div>
              <div className="text-sm font-semibold text-ink">{brand.contact.phoneDisplay}</div>
              <div className="text-xs text-muted">Tap to call</div>
            </div>
          </a>
          <a
            className="flex items-start gap-3 rounded-2xl bg-surface p-4 ring-1 ring-ink/10 transition hover:bg-bg"
            href={`mailto:${brand.contact.email}`}
          >
            <Mail className="mt-0.5 h-5 w-5 text-accent" />
            <div>
              <div className="text-sm font-semibold text-ink">{brand.contact.email}</div>
              <div className="text-xs text-muted">Email us anytime</div>
            </div>
          </a>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-[0.16em] text-muted">LOCATION</div>
          <a
            className="flex items-start gap-3 rounded-2xl bg-surface p-4 ring-1 ring-ink/10 transition hover:bg-bg"
            href={brand.links.maps}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin className="mt-0.5 h-5 w-5 text-accent" />
            <div>
              <div className="text-sm font-semibold text-ink">{brand.contact.addressLines[0]}</div>
              <div className="text-xs text-muted">{brand.contact.addressLines[1]}</div>
            </div>
          </a>
          <div className="rounded-2xl bg-surface p-4 ring-1 ring-ink/10">
            <div className="text-xs font-semibold tracking-[0.16em] text-muted">HOURS</div>
            <div className="mt-3 grid gap-2 text-sm text-ink">
              {brand.contact.hours.map((h) => (
                <div key={h.label} className="flex items-center justify-between gap-6">
                  <span className="text-muted">{h.label}</span>
                  <span className="font-medium">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-ink/10 py-6">
        <Container className="flex flex-col items-start justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
          <div className="text-muted/80">For information and booking enquiries. Not medical advice.</div>
        </Container>
      </div>
    </footer>
  );
}

