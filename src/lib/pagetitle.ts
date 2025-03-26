import type { MarkdownHeading } from "astro";

export function resolvePageTitle(title: string | null | undefined, headings: MarkdownHeading[]) {
    if (title) {
        return title;
    }

    for (const heading of headings) {
        if (heading.depth === 1) {
            return heading.text;
        }
    }

    throw new Error("No title found in the page");
}
