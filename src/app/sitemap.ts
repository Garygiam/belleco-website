import type { MetadataRoute } from "next";
import { defaultLocale, locales, serviceSlugs, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo/urls";

const lastModified = "2026-06-12";

function buildAlternates(pathBuilder: (locale: Locale) => string) {
  return {
    languages: {
      en: absoluteUrl(pathBuilder("en")),
      zh: absoluteUrl(pathBuilder("zh")),
      ms: absoluteUrl(pathBuilder("ms")),
      "x-default": absoluteUrl(pathBuilder(defaultLocale)),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routeGroups = [
    {
      pathBuilder: (locale: Locale) => `/${locale}`,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      pathBuilder: (locale: Locale) => `/${locale}/book`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...serviceSlugs.map((slug) => ({
      pathBuilder: (locale: Locale) => `/${locale}/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return routeGroups.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(route.pathBuilder(locale)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: buildAlternates(route.pathBuilder),
    })),
  );
}
