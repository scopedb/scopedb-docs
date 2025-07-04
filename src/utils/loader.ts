import { cache } from 'react'
import { notFound } from "next/navigation";
import { MarkdownHeading } from '@astrojs/markdown-remark';
import { FrontmatterProps } from '@/types/frontmatter';

export const loadContent = cache(doLoadContent);

async function doLoadContent(category: string, slug: string | string[] | null | undefined) {
    const candidates = []

    if (Array.isArray(slug)) {
        const base = slug.join('/');
        candidates.push(`${base}.md`);
        candidates.push(`${base}.mdx`);
        candidates.push(`${base}/index.md`);
        candidates.push(`${base}/index.mdx`);
    } else if (slug) {
        candidates.push(`${slug}.md`);
        candidates.push(`${slug}.mdx`);
        candidates.push(`${slug}/index.md`);
        candidates.push(`${slug}/index.mdx`);
    } else {
        candidates.push('index.md');
        candidates.push('index.mdx');
    }

    for (const candidate of candidates) {
        try {
            const { default: Content, frontmatter, headings } = await import(`@/content/${category}/${candidate}`);
            return {
                Content,
                frontmatter: frontmatter as FrontmatterProps,
                headings: headings as MarkdownHeading[],
            }
        } catch (error) {
            // try other candidates
            if (error instanceof Error && error.message.includes('Cannot find module')) {
                continue;
            }
            console.warn(`Failed to load content for ${category}/${candidate}:`, error);
        }
    }

    notFound();
}
