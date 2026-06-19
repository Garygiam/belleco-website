import Link from "next/link";
import { replaceLocaleInPath, type Locale } from "@/lib/i18n";

type Props = {
  currentLocale: Locale;
  currentPath: string;
  labels: {
    en: string;
    zh: string;
    ms: string;
    ariaLabel: string;
  };
};

const orderedLocales: Locale[] = ["en", "zh", "ms"];

export function LanguageSwitcher({ currentLocale, currentPath, labels }: Props) {
  return (
    <div
      role="navigation"
      aria-label={labels.ariaLabel}
      className="inline-flex items-center rounded-full border border-border bg-surface/70 p-1 backdrop-blur"
    >
      {orderedLocales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={replaceLocaleInPath(currentPath, locale)}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold transition",
              isActive ? "bg-accent text-accent-ink shadow-sm" : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
