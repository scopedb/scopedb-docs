import { loadContent } from "@/utils/loader";
import { loadContentMetadata } from "@/utils/metadata";
import { getContentPath } from "@/utils/seo";
import Document from "@/components/Document";
import { permanentRedirect } from "next/navigation";

export async function generateMetadata({ params }: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug } = await params
    return await loadContentMetadata("reference", slug, { title: "Reference" })
}

export default async function Reference({ params }: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug } = await params
    if (slug?.at(-1) === "index") {
        permanentRedirect(getContentPath("reference", slug))
    }

    const { Content, frontmatter, headings } = await loadContent("reference", slug)
    return (
        <Document
            headings={headings}
            relatedContents={frontmatter.relatedContents}
            title={frontmatter.title}
            description={frontmatter.description}
            category="reference"
            slug={slug}
        >
            <Content />
        </Document>
    );
}
