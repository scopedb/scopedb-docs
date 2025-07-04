import sidebars, { SidebarItem } from '@/sidebars'
import type { MetadataRoute } from 'next'

interface SitemapItem {
    url: string;
    lastModified: Date;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const items: SitemapItem[] = []
    for (const sidebar of Object.values(sidebars)) {
        collectSidebarItems(sidebar, items)
    }

    return [
        {
            url: 'https://docs.scopedb.io',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        ...items
    ]
}

function collectSidebarItems(items: SidebarItem[], sitemapItems: SitemapItem[]) {
    for (const item of items) {
        if (item.link) {
            sitemapItems.push({
                url: `https://docs.scopedb.io${item.link}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }

        if (item.items && item.items.length > 0) {
            sitemapItems.push(...collectSidebarItems(item.items, sitemapItems))
        }
    }

    return sitemapItems
}
