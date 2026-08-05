import type { Metadata } from "next";
import { categories, type SidebarItem } from "@/sidebars";

export const SITE_URL = new URL("https://docs.scopedb.io");
export const SITE_NAME = "ScopeDB Docs";
export const SITE_DESCRIPTION =
    "Learn how to load, query, model, and retain event data with ScopeDB Cloud, the serverless database for event analytics. Explore ScopeQL, SDKs, and APIs.";

export type ContentCategory = keyof typeof categories;

const SOCIAL_IMAGE = {
    url: new URL("/opengraph-image", SITE_URL).toString(),
    width: 1200,
    height: 630,
    alt: "ScopeDB Docs — serverless database for event analytics",
};

const functionGroups: Record<string, string> = {
    aggregate: "Aggregate",
    "conditional-expression": "Conditional expression",
    "date-and-time": "Date and time",
    numeric: "Numeric",
    string: "String",
    "semi-structured-data": "Semi-structured",
    system: "System",
    window: "Window",
};

function slugSegments(slug: string | string[] | null | undefined): string[] {
    const segments = Array.isArray(slug) ? slug : slug ? [slug] : [];
    return segments.at(-1) === "index" ? segments.slice(0, -1) : segments;
}

export function getContentPath(
    category: string,
    slug: string | string[] | null | undefined,
): string {
    return `/${[category, ...slugSegments(slug)].join("/")}`;
}

export function getContentSeoTitle(
    category: string,
    slug: string | string[] | null | undefined,
    title: string,
    seoTitle?: string,
): string {
    if (seoTitle) {
        return seoTitle;
    }

    const segments = slugSegments(slug);
    if (category !== "reference") {
        return title;
    }

    if (segments[0] === "functions" && segments.length >= 3) {
        const group = functionGroups[segments[1]];
        if (group) {
            return `${title} — ${group} function`;
        }
    }

    if (segments[0] === "commands" && segments[1] === "statements" && segments.length >= 3) {
        return `${title} — ScopeQL statement`;
    }

    if (segments[0] === "commands" && segments[1] === "query-operators" && segments.length >= 3) {
        return `${title} — ScopeQL operators`;
    }

    return title;
}

export function createPageMetadata({
    title,
    description,
    pathname,
    absoluteTitle = false,
    type = "article",
}: {
    title: string;
    description: string;
    pathname: string;
    absoluteTitle?: boolean;
    type?: "article" | "website";
}): Metadata {
    const titleAlreadyIncludesBrand = /\bScopeDB\b/i.test(title);
    const useAbsoluteTitle = absoluteTitle || titleAlreadyIncludesBrand;
    const socialTitle = useAbsoluteTitle ? title : `${title} | ${SITE_NAME}`;

    return {
        title: useAbsoluteTitle ? { absolute: title } : title,
        description,
        alternates: {
            canonical: pathname,
        },
        openGraph: {
            type,
            locale: "en_US",
            siteName: SITE_NAME,
            title: socialTitle,
            description,
            url: pathname,
            images: [SOCIAL_IMAGE],
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
            images: [SOCIAL_IMAGE.url],
        },
    };
}

export interface BreadcrumbItem {
    name: string;
    pathname: string;
}

function findSidebarTrail(
    items: SidebarItem[],
    pathname: string,
    parents: SidebarItem[] = [],
): SidebarItem[] | undefined {
    for (const item of items) {
        if (item.link === pathname) {
            return [...parents, item];
        }

        if (item.items) {
            const trail = findSidebarTrail(item.items, pathname, [...parents, item]);
            if (trail) {
                return trail;
            }
        }
    }

    return undefined;
}

function sidebarItemPath(item: SidebarItem): string | undefined {
    if (item.link) {
        return item.link;
    }

    return item.items?.find((child) => child.label === "Overview" && child.link)?.link;
}

export function getBreadcrumbs(
    category: ContentCategory,
    pathname: string,
    title: string,
): BreadcrumbItem[] {
    const categoryConfig = categories[category];
    const trail = findSidebarTrail(categoryConfig.sidebar, pathname) ?? [];
    const breadcrumbs: BreadcrumbItem[] = [{ name: "Docs", pathname: "/" }];

    if (pathname !== categoryConfig.link) {
        breadcrumbs.push({ name: categoryConfig.label, pathname: categoryConfig.link });
    }

    for (const item of trail.slice(0, -1)) {
        const itemPath = sidebarItemPath(item);
        if (!itemPath || itemPath === categoryConfig.link || itemPath === pathname) {
            continue;
        }

        if (!breadcrumbs.some((breadcrumb) => breadcrumb.pathname === itemPath)) {
            breadcrumbs.push({ name: item.label, pathname: itemPath });
        }
    }

    breadcrumbs.push({ name: title, pathname });
    return breadcrumbs;
}

export function absoluteUrl(pathname: string): string {
    return new URL(pathname, SITE_URL).toString();
}
