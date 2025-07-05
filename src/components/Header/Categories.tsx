"use client"

import { usePathname } from "next/navigation"
import clsx from "clsx";
import { categories } from "@/sidebars";

export default function Categories() {
    const pathname = usePathname();

    const cs = []
    for (const c of Object.values(categories)) {
        cs.push({
            label: c.label,
            link: c.link,
            isCurrent: pathname?.startsWith(c.link),
        });
    }

    return (<ul className="flex gap-[32px] text-[14px] leading-[30px] pt-[12px] text-[var(--text-secondary)] text-center">
        {cs.map((c) => (
            <li key={c.label}>
                <a
                    href={c.link}
                    className={clsx([
                        "inline-block hover:text-[var(--text-primary)]",
                        "border-b-2 pb-[12px]",
                        c.isCurrent
                            ? "font-medium text-[var(--text-primary)] border-current"
                            : "border-transparent hover:border-[rgba(0,0,0,0.1)]",
                    ])}
                >
                    {c.label}
                </a>
            </li>
        ))}
    </ul>)
}
