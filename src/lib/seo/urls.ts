export function getSiteUrl(): string {
  return "https://belleco.co";
}

export function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const path = value.startsWith("/") ? value : `/${value}`;
  return new URL(path, getSiteUrl()).toString();
}
