import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo/urls";

const pageSeoCopy = {
  en: {
    home: {
      title: "Belléco Skin Beauté | Skin Transformation Centre in Kuala Lumpur",
      description:
        "Skin diagnostics and premium aesthetic treatments in Kuchai Lama, Kuala Lumpur for acne, anti-aging, and radiant skin goals.",
    },
    book: {
      title: "Book Your Skin Consultation | Belléco Skin Beauté",
      description:
        "Book a Belléco Skin Beauté consultation, choose your preferred reply method, and arrange your visit in Kuchai Lama, Kuala Lumpur.",
    },
  },
  zh: {
    home: {
      title: "Belléco Skin Beauté | 吉隆坡肌肤焕变中心",
      description:
        "位于吉隆坡 Kuchai Lama 的肌肤诊断与高端护理中心，专注痘痘、抗老与焕亮疗程。",
    },
    book: {
      title: "预约肌肤咨询 | Belléco Skin Beauté",
      description:
        "预约 Belléco Skin Beauté 肌肤咨询，选择适合你的回复方式，并安排吉隆坡 Kuchai Lama 的面诊时间。",
    },
  },
  ms: {
    home: {
      title: "Belléco Skin Beauté | Pusat Transformasi Kulit di Kuala Lumpur",
      description:
        "Diagnosis kulit dan rawatan estetik premium di Kuchai Lama, Kuala Lumpur untuk jerawat, anti-penuaan, dan kulit lebih berseri.",
    },
    book: {
      title: "Tempah Konsultasi Kulit Anda | Belléco Skin Beauté",
      description:
        "Tempah konsultasi Belléco Skin Beauté, pilih cara balasan pilihan anda, dan atur lawatan ke Kuchai Lama, Kuala Lumpur.",
    },
  },
} as const satisfies Record<Locale, Record<"home" | "book", { title: string; description: string }>>;

function buildLanguageAlternates(pathBuilder: (locale: Locale) => string) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(pathBuilder(locale))])),
    "x-default": absoluteUrl(pathBuilder(defaultLocale)),
  };
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const canonicalPath = `/${locale}`;
  const copy = pageSeoCopy[locale].home;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: buildLanguageAlternates((lang) => `/${lang}`),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(canonicalPath),
    },
  };
}

export function buildBookingMetadata(locale: Locale): Metadata {
  const canonicalPath = `/${locale}/book`;
  const copy = pageSeoCopy[locale].book;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: buildLanguageAlternates((lang) => `/${lang}/book`),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(canonicalPath),
    },
  };
}
