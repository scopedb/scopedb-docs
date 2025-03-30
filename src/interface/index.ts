import type {MarkdownHeading} from "astro";

export interface TreeTocNode extends MarkdownHeading {
    children: TreeTocNode[];
}