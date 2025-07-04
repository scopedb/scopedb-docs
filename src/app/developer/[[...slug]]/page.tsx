import { loadContent } from "@/utils/loader";
import { loadContentMetadata } from "@/utils/metadata";
import Document from "@/components/Document";

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string }>
}): Promise<{ title: string }> {
    const { slug } = await params
    return await loadContentMetadata("developer", slug, { title: "Developer" })
}

export default async function Developer({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const { Content, frontmatter, headings } = await loadContent("developer", slug)
    return (
        <Document headings={headings} relatedContents={frontmatter.relatedContents}>
            <h1>{frontmatter.title}</h1>
            <Content />
        </Document>
    );
}
