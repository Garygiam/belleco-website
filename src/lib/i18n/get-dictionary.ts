import type { Locale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
