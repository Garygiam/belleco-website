import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n/ui-copy";

type PopularService = {
  id: "acne" | "hifu" | "rf" | "facial";
  label: string;
  href: string;
  descriptor: string;
  alt: string;
  imageSrc: string;
};

const popularServices: PopularService[] = [
  {
    id: "acne",
    label: "Acne Treatment",
    href: "/services/acne-treatment-kuala-lumpur",
    descriptor: "Texture",
    alt: "Luxury beauty portrait with clear skin texture for acne treatment",
    imageSrc: "/Ance.jpg",
  },
  {
    id: "hifu",
    label: "HIFU",
    href: "/services/hifu-kuala-lumpur",
    descriptor: "Lift",
    alt: "Luxury portrait emphasizing lifted jawline contour for HIFU",
    imageSrc: "/hifu.jpg",
  },
  {
    id: "rf",
    label: "RF Microneedling",
    href: "/services/rf-microneedling-kuala-lumpur",
    descriptor: "Refine",
    alt: "Luxury skin-detail portrait showing refined pores for RF microneedling",
    imageSrc: "/Microneedling.png",
  },
  {
    id: "facial",
    label: "Facial",
    href: "/services/facial-kuchai-lama",
    descriptor: "Glow",
    alt: "Luxury portrait with luminous hydrated glow for facial treatment",
    imageSrc: "/facial.png",
  },
];

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function PopularServicesSection({ locale }: Props) {
  const copy = uiCopy[locale].popularServices;
  return (
    <section id="popular-services" aria-label="Popular services" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 md:px-8 md:pb-16">
        <div className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {copy.eyebrow}
            </p>
            <h2 className="text-base leading-7 text-muted md:text-lg md:leading-8">
              {copy.description}
            </h2>
          </div>

          <div className="popular-services-mobile-rail -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
            {popularServices.map((service) => {
              const localized = copy.services[service.id];
              return (
              <Link
                key={service.href}
                href={`/${locale}${service.href}`}
                aria-label={`${localized.label} ${localized.descriptor} ${copy.serviceAriaSuffix}`}
                className="group relative isolate block w-[84vw] shrink-0 snap-start overflow-hidden rounded-[1.6rem] border border-border/80 bg-surface/70 focus:outline-none focus:ring-2 focus:ring-ring sm:w-auto"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageSrc}
                    alt={localized.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.04)_0%,rgba(7,10,16,0.14)_48%,rgba(7,10,16,0.56)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-3 md:p-4">
                    <div className="popular-services-card-content flex w-full flex-col items-start gap-4 rounded-[1.1rem] border border-white/10 bg-[color:color-mix(in_srgb,var(--surface)_58%,transparent)] p-4 backdrop-blur-md">
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                          {localized.descriptor}
                        </p>
                        <h3 className="text-base font-semibold tracking-tight text-white md:text-lg">
                          {localized.label}
                        </h3>
                      </div>
                      <div className="popular-services-cta-row w-full">
                        <span className="popular-services-cta inline-flex h-10 items-center rounded-full border border-white/15 bg-white/10 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/95 shadow-sm backdrop-blur-md transition group-hover:bg-white/14">
                          {copy.cta} <span aria-hidden="true" className="ml-2">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
