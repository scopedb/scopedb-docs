import { RelatedContent } from "@/types/frontmatter";
import { MarkdownHeading } from "@astrojs/markdown-remark";
import { LuAlignLeft, LuLink } from "react-icons/lu";
import { Collapse, ConfigProvider } from "antd";

export default function MobileTableOfContents({
    headings: originalHeadings,
    relatedContents,
}: Readonly<{
    headings: MarkdownHeading[],
    relatedContents?: RelatedContent[],
}>) {
    const headings = originalHeadings.filter((heading) => heading.depth === 2).map((heading) => ({
        key: heading.slug,
        href: `#${heading.slug}`,
        title: heading.text,
    }))

    return (
        <div className="lg:hidden mb-[32px]">
            {headings.length > 0 && (<ConfigProvider theme={{
                components: {
                    Collapse: {
                        headerBg: '#ffffff',
                    },
                },
            }}>
                <Collapse
                    expandIconPosition={'end'}
                    items={[{
                        key: "mobile-headings",
                        label: <div className="flex gap-[12px] items-center">
                            <LuAlignLeft width={16} height={16} />
                            <span className="flex-1 text-left text-[14px] text-[var(--text-primary)] font-semibold">
                                On this page
                            </span>
                        </div>,
                        children: <ul>{headings.map((item) => (
                            <li key={item.key}>
                                <a href={item.href}>
                                    <span className="text-[14px] text-[var(--text-secondary)]">{item.title}</span>
                                </a>
                            </li>
                        ))}</ul>,
                    }]}
                />
            </ConfigProvider>)}

            <div className="my-[8px]" />

            {relatedContents && relatedContents.length > 0 && (<ConfigProvider theme={{
                components: {
                    Collapse: {
                        headerBg: '#ffffff',
                    },
                },
            }}>
                <Collapse
                    expandIconPosition={'end'}
                    items={[{
                        key: "mobile-headings",
                        label: <div className="flex gap-[12px] items-center">
                            <LuLink width={16} height={16} />
                            <span className="flex-1 text-left text-[14px] text-[var(--text-primary)] font-semibold">
                                Related contents
                            </span>
                        </div>,
                        children: <ul>{relatedContents.map((item) => (
                            <li key={item.title}>
                                <a href={item.url}>
                                    <span className="text-[14px] text-[var(--text-secondary)]">{item.title}</span>
                                </a>
                            </li>
                        ))}</ul>,
                    }]}
                />
            </ConfigProvider>)}
        </div >
    );
}
