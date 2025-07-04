import { loadContent } from "./loader"

export interface ContentMetadata {
    title: string
}

export async function loadContentMetadata(category: string, slug: string | string[] | null | undefined, fallback: ContentMetadata) {
    const { frontmatter } = await loadContent(category, slug)
    if (!frontmatter.title) {
        console.warn(`No title found for ${category} slug: ${slug}.`)
    }
    return {
        title: frontmatter.title || fallback.title,
    }
}
