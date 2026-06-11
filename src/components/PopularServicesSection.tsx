import Image from "next/image";
import Link from "next/link";

type PopularService = {
  label: string;
  href: string;
  descriptor: string;
  alt: string;
  imageSrc: string;
};

function buildImageSrc(prompt: string, imageSize: string) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;
}

const popularServices: PopularService[] = [
  {
    label: "Acne Treatment",
    href: "/services/acne-treatment-kuala-lumpur",
    descriptor: "Texture",
    alt: "Skin close-up visual for acne treatment and clearer texture",
    imageSrc: buildImageSrc(
      "ultra realistic skincare close-up showing clearer acne-prone skin texture, premium beauty editorial photography, soft cinematic lighting, elegant dark neutral background, high detail skin close-up",
      "landscape_4_3",
    ),
  },
  {
    label: "HIFU",
    href: "/services/hifu-kuala-lumpur",
    descriptor: "Lift",
    alt: "Jawline contour close-up visual for HIFU lifting treatment",
    imageSrc: buildImageSrc(
      "ultra realistic jawline and lower-face contour close-up, subtle lifting effect, luxury skincare editorial photography, soft premium light, elegant dark background, skin detail focus",
      "landscape_4_3",
    ),
  },
  {
    label: "RF Microneedling",
    href: "/services/rf-microneedling-kuala-lumpur",
    descriptor: "Refine",
    alt: "Refined pore and skin-texture close-up visual for RF microneedling treatment",
    imageSrc: buildImageSrc(
      "ultra realistic skin-texture close-up with refined pores and smooth surface, premium clinical skincare editorial image, soft directional light, dark elegant palette, high detail",
      "landscape_4_3",
    ),
  },
  {
    label: "Facial",
    href: "/services/facial-kuchai-lama",
    descriptor: "Glow",
    alt: "Hydrated glow skin close-up visual for facial treatment",
    imageSrc: buildImageSrc(
      "ultra realistic hydrated glowing skin close-up, luminous complexion, premium facial skincare editorial photography, soft light, elegant dark neutral palette, high detail beauty image",
      "landscape_4_3",
    ),
  },
];

export function PopularServicesSection() {
  return (
    <section aria-label="Popular services" className="bg-page">
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 md:px-8 md:pb-16">
        <div className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Popular Services
            </p>
            <p className="text-base leading-7 text-muted md:text-lg md:leading-8">
              Explore the treatments clients ask for most.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {popularServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                aria-label={`${service.label} ${service.descriptor} Explore`}
                className="group relative isolate block overflow-hidden rounded-[1.6rem] border border-border/80 bg-surface/70 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageSrc}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.04)_0%,rgba(7,10,16,0.14)_48%,rgba(7,10,16,0.56)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-3 md:p-4">
                    <div className="flex w-full items-end justify-between gap-3 rounded-[1.1rem] border border-white/10 bg-[color:color-mix(in_srgb,var(--surface)_66%,transparent)] p-3 backdrop-blur-md">
                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                          {service.descriptor}
                        </p>
                        <h2 className="text-base font-semibold tracking-tight text-white md:text-lg">
                          {service.label}
                        </h2>
                      </div>
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
