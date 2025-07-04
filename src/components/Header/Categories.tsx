"use client"

import { usePathname } from "next/navigation";
import { Category } from ".";
import clsx from "clsx";

export default function Categories() {
    const pathname = usePathname();

    const categories = []
    for (const c of Object.values(Category)) {
        categories.push({
            label: c.charAt(0).toUpperCase() + c.slice(1),
            link: `/${c}`,
            isCurrent: pathname?.startsWith(`/${c}`),
        });
    }

    return (<ul className="flex gap-[32px] text-[14px] leading-[30px] pt-[12px] text-[var(--text-secondary)] text-center">
        {categories.map((c) => (
            <li key={c.label}>
                <a
                    href={c.link}
                    className={clsx([
                        "inline-block transition-all duration-300 hover:text-[var(--text-primary)]",
                        "border-b-2 pb-[12px] transition-colors",
                        c.isCurrent
                            ? "font-medium text-[var(--text-primary)] border-current"
                            : "border-transparent hover:border-[rgba(0,0,0,0.1)]",
                    ])}
                >
                    <div>{c.label}</div>
                </a>
            </li>
        ))}
    </ul>)
}
