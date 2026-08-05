import type { Metadata } from "next"
import { loadContent } from "./loader"
import {
    createPageMetadata,
    getContentPath,
    getContentSeoTitle,
    SITE_DESCRIPTION,
} from "./seo"

export interface ContentMetadata {
    title: string
    description?: string
}

export async function loadContentMetadata(
    category: string,
    slug: string | string[] | null | undefined,
    fallback: ContentMetadata
): Promise<Metadata> {
    const { frontmatter } = await loadContent(category, slug)
    const title = getContentSeoTitle(
        category,
        slug,
        frontmatter.title || fallback.title,
        frontmatter.seoTitle,
    )

    return createPageMetadata({
        title,
        description: frontmatter.description || fallback.description || SITE_DESCRIPTION,
        pathname: getContentPath(category, slug),
    })
}
