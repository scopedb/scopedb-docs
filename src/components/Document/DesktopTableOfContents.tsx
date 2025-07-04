import { RelatedContent } from "@/types/frontmatter";
import { MarkdownHeading } from "@astrojs/markdown-remark";
import clsx from "clsx";
import { LuAlignLeft, LuLink } from "react-icons/lu";
import { Anchor } from "antd";

export default function DesktopTableOfContents({
    headings,
    relatedContents,
}: Readonly<{
    headings: MarkdownHeading[],
    relatedContents?: RelatedContent[],
}>) {
    const items = headings.filter((heading) => heading.depth === 2).map((heading) => ({
        key: heading.slug,
        href: `#${heading.slug}`,
        title: heading.text,
    }))

    return (<div className="col-span-2 hidden lg:block">
        <div className="sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto">
            {headings.length > 0 && (
                <div className="mb-[8px]">
                    <div className="flex gap-[12px] items-center mb-[16px]">
                        <LuAlignLeft width={16} height={16} />
                        <span className="text-[14px] text-[var(--text-primary)] font-semibold">
                            On this page
                        </span>
                    </div>
                    <Anchor items={items} offsetTop={128} />
                </div>
            )}

            {relatedContents && relatedContents.length > 0 && (
                <div className="mt-[36px]">
                    <div className="flex gap-[12px] items-center mb-[8px]">
                        <LuLink width={16} height={16} />
                        <span className="text-[14px] text-[var(--text-primary)] font-semibold">
                            Related contents
                        </span>
                    </div>
                    <ul className="list-none pl-[16px]">
                        {relatedContents.map((content) => (
                            <li key={content.url} className="my-[2px]">
                                <a
                                    href={content.url}
                                    className={clsx(
                                        "text-[14px] text-[var(--text-primary)]",
                                        "hover:text-[var(--text-brand)]",
                                    )}
                                >
                                    {content.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>)
}
