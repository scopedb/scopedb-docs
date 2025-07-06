import { loadContent } from "./loader"

export interface ContentMetadata {
    title: string
}

export async function loadContentMetadata(
    category: string,
    slug: string | string[] | null | undefined,
    fallback: ContentMetadata
): Promise<ContentMetadata> {
    const { frontmatter } = await loadContent(category, slug)
    return {
        title: frontmatter.title || fallback.title,
    }
}
