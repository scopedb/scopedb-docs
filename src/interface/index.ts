import type {MarkdownHeading} from "astro";

export interface TreeTocNode extends MarkdownHeading {
    children: TreeTocNode[];
}

export interface NavItemProps{
    text: string;
    link: string;
}

export type NavItemsProps = NavItemProps[];