import Link from "next/link";
import type { BreadcrumbItem } from "@/utils/seo";

export default function Breadcrumbs({ items }: Readonly<{ items: BreadcrumbItem[] }>) {
    return (
        <nav aria-label="Breadcrumb" className="mb-[16px] text-[13px] text-[var(--text-tertiary)]">
            <ol className="flex flex-wrap items-center gap-x-[8px] gap-y-[4px] list-none m-0 p-0">
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1;
                    return (
                        <li key={item.pathname} className="flex items-center gap-[8px]">
                            {isCurrent ? (
                                <span aria-current="page">{item.name}</span>
                            ) : (
                                <Link
                                    href={item.pathname}
                                    className="text-inherit no-underline hover:text-[var(--text-primary)] hover:underline"
                                >
                                    {item.name}
                                </Link>
                            )}
                            {!isCurrent && <span aria-hidden="true">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
