type Props = {
  items: Array<unknown>;
};

export function JsonLdScripts({ items }: Props) {
  return items.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}
