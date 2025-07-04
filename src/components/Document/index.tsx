import Footer from "@/components/Footer";
import { RelatedContent } from "@/types/frontmatter";
import { MarkdownHeading } from "@astrojs/markdown-remark";
import DesktopTableOfContents from "./DesktopTableOfContents";
import MobileTableOfContents from "./MobileTableOfContents";
import Sidebar from "@/components/Sidebar";

export default function Document({
    headings,
    relatedContents,
    children,
}: Readonly<{
    headings: MarkdownHeading[],
    relatedContents?: RelatedContent[],
    children: React.ReactNode,
}>) {
    return (
        <div className="grid grid-cols-10 gap-[16px]">
            <div className="col-span-2 hidden lg:block">
                <div className="sticky top-[120px]">
                    <Sidebar prefix="doc" className="h-[calc(100vh-140px)] overflow-y-auto" />
                </div>
            </div>

            <div className="col-span-10 lg:col-span-6 my-[32px] px-[32px]">
                <MobileTableOfContents headings={headings} relatedContents={relatedContents} />
                <div className="
                    w-full max-w-none
                    text-[16px] text-[rgba(0,0,0,0.8)] leading-[1.4]
                    prose
                    prose-headings:font-medium
                    prose-headings:leading-tight
                    prose-headings:relative
                    prose-headings:scroll-mt-[80px]
                    prose-h1:text-[32px] prose-h1:mt-[48px] prose-h1:mb-[24px] [&_h1>code]:[font-size:inherit] [&_h1:first-of-type]:mt-0
                    prose-h2:text-[24px] prose-h2:mt-[40px] prose-h2:mb-[20px] [&_h2>code]:[font-size:inherit]
                    prose-h3:text-[20px] prose-h3:mt-[32px] prose-h3:mb-[16px] [&_h3>code]:[font-size:inherit]
                    prose-h4:text-[18px] prose-h4:mt-[24px] prose-h4:mb-[12px] [&_h4>code]:[font-size:inherit]
                    prose-h5:text-[16px] prose-h5:mt-[20px] prose-h5:mb-[8px] [&_h5>code]:[font-size:inherit]
                    prose-h6:text-[14px] prose-h6:mt-[16px] prose-h6:mb-[8px] [&_h6>code]:[font-size:inherit]
                    prose-h1:text-black
                    prose-h2:text-black
                    prose-h3:text-black
                    prose-h4:text-black
                    prose-h5:text-black
                    prose-h6:text-black
                    prose-p:my-[12px] prose-p:leading-[1.4]
                    prose-a:text-[#0879E0] prose-a:no-underline prose-a:hover:underline
                    prose-a:font-medium prose-a:transition-all
                    prose-strong:text-black
                    prose-strong:font-semibold
                    prose-em:italic prose-em:text-inherit
                    prose-blockquote:border-l- prose-blockquote:border-[rgba(0,0,0,0.1)]
                    prose-blockquote:pl-[20px] prose-blockquote:italic
                    prose-blockquote:my-[32px] prose-blockquote:text-[rgba(0,0,0,0.6)]
                    prose-blockquote:leading-[1.6]
                    prose-blockquote:text-[14px]
                    prose-blockquote:font-normal
                    prose-ul:my-[16px] prose-ul:pl-[24px]
                    prose-ol:my-[16px] prose-ol:pl-[24px]
                    prose-li:my-[8px] prose-li:leading-[1.4]
                    prose-code:py-[2px] prose-code:rounded-[4px]
                    prose-code:font-mono prose-code:text-[rgb(47,41,46)]
                    prose-code:text-[13px] prose-code:font-normal
                    prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-white prose-pre:p-[20px]
                    prose-pre:rounded-[12px] prose-pre:my-[24px]
                    prose-pre:text-[14px] prose-pre:leading-[1.4]
                    prose-pre:border prose-pre:border-[rgba(0,0,0,0.1)]
                    prose-pre:max-w-[calc(100vw-32px)]
                    [&_pre]:overflow-x-scroll [&_pre]:whitespace-pre
                    [&_pre]:scrollbar-thin [&_pre]:scrollbar-track-transparent
                    [&_pre]:scrollbar-thumb-gray-300
                    prose-img:rounded-[8px] prose-img:my-[32px] prose-img:shadow-lg
                    prose-img:w-full prose-img:h-auto
                    prose-table:my-[32px] prose-table:w-full prose-table:border-collapse
                    prose-th:border prose-th:border-[rgba(0,0,0,0.1)] prose-th:p-[12px]
                    prose-th:bg-[rgba(0,0,0,0.02)] prose-th:font-semibold prose-th:text-left
                    prose-td:border prose-td:border-[rgba(0,0,0,0.1)] prose-td:p-[12px]
                    prose-hr:my-[32px] prose-hr:border-t prose-hr:border-[rgba(0,0,0,0.1)]
                ">
                    {children}
                </div>
                <div className="sticky top-full">
                    <Footer />
                </div>
            </div>

            <DesktopTableOfContents headings={headings} relatedContents={relatedContents} />
        </div>
    )
}
