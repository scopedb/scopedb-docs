import type { MarkdownHeading } from "astro";

export function resolveTitle(
  title: string | null | undefined,
  headings: MarkdownHeading[],
) {
  if (title) {
    return title;
  }

  for (const heading of headings) {
    if (heading.depth === 1) {
      return heading.text;
    }
  }

  throw new Error("title not found");
}
