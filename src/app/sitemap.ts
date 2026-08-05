import { categories, SidebarItem } from '@/sidebars'
import { SITE_URL } from '@/utils/seo'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const urls = new Set<string>()
    for (const category of Object.values(categories)) {
        collectSidebarItems(category.sidebar, urls)
    }

    return [
        {
            url: SITE_URL.toString(),
        },
        ...Array.from(urls, (url) => ({ url }))
    ]
}

function collectSidebarItems(items: SidebarItem[], urls: Set<string>) {
    for (const item of items) {
        if (item.link) {
            urls.add(new URL(item.link, SITE_URL).toString())
        }

        if (item.items && item.items.length > 0) {
            collectSidebarItems(item.items, urls)
        }
    }
}
