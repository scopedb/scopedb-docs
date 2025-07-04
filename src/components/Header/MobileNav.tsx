"use client"

import { getSidebar, SidebarItem } from "@/sidebars";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Category } from ".";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function MobileNav() {
    const currentPath = usePathname()

    const categories: { label: string; link: string; isCurrent: boolean }[] = []
    for (const c of Object.values(Category)) {
        categories.push({
            label: c.charAt(0).toUpperCase() + c.slice(1),
            link: `/${c}`,
            isCurrent: currentPath?.startsWith(`/${c}`),
        });
    }

    const sidebar = getSidebar(currentPath);
    const [isOpen, setIsOpen] = useState(false);

    // Generate breadcrumb path
    const generateBreadcrumb = () => {
        const breadcrumbs: string[] = [];

        // Add current category
        const currentCategory = categories.find((c) => c.isCurrent);
        if (currentCategory) {
            breadcrumbs.push(currentCategory.label);
        }

        // Add sub-paths based on sidebar structure
        if (sidebar && sidebar.length > 0) {
            // Normalize current path for comparison
            const normalizeUrl = (url: string) => {
                return url.replace(/\/+$/, "") || "/"; // Remove trailing slashes
            };

            const normalizedCurrentPath = normalizeUrl(currentPath);

            const findCurrentPath = (
                items: SidebarItem[],
                currentBreadcrumb: string[] = [],
            ): string[] => {
                for (const item of items) {
                    if (item.link) {
                        const normalizedItemLink = normalizeUrl(item.link);

                        // Check for exact match first
                        if (normalizedCurrentPath === normalizedItemLink) {
                            return [...currentBreadcrumb, item.label || ""];
                        }

                        // If current item has sub-items, continue searching recursively
                        if (item.items && item.items.length > 0) {
                            const childPath = findCurrentPath(item.items, [
                                ...currentBreadcrumb,
                                item.label || "",
                            ]);
                            if (childPath.length > 0) {
                                return childPath;
                            }
                        }
                    } else if (item.items && item.items.length > 0) {
                        // If current item has no link but has sub-items, search recursively
                        const childPath = findCurrentPath(item.items, [
                            ...currentBreadcrumb,
                            item.label || "",
                        ]);
                        if (childPath.length > 0) {
                            return childPath;
                        }
                    }
                }
                return [];
            };

            const sidebarPath = findCurrentPath(sidebar);
            // Filter out empty strings and duplicate category names
            const filteredPath = sidebarPath.filter(
                (path) => path && !breadcrumbs.includes(path),
            );
            breadcrumbs.push(...filteredPath);
        }

        return breadcrumbs.filter(Boolean);
    };

    const breadcrumbs = generateBreadcrumb();

    // Prevent background scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Keyboard event handling
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile breadcrumb button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 py-[18px] px-0 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors w-full"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
            >
                <LuMenu height={4} width={4} />
                <span className="truncate text-left flex-1">
                    {breadcrumbs.length > 0 ? breadcrumbs.join(" > ") : "Navigation"}
                </span>
            </button>

            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-40"
                    onClick={() => setIsOpen(false)}
                    role="button"
                    tabIndex={-1}
                    aria-label="Close navigation menu"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setIsOpen(false);
                        }
                    }}
                />
            )}

            {/* Side drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-nav-logo"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-[12px] py-[14px] border-b border-[rgba(0,0,0,0.06)] bg-[#fff]">
                        <div id="mobile-nav-logo" className="flex items-center gap-3">
                            <Image src="/logo-banner.svg" alt="ScopeDB Logo" height={36} width={128} />
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                            aria-label="Close navigation menu"
                        >
                            <LuX height={4} width={4} />
                        </button>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Categories */}
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                                Categories
                            </h3>
                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <a key={category.link} href={category.link} onClick={() => setIsOpen(false)} className={
                                        clsx(
                                            "flex items-center py-2.5 px-3 text-sm rounded-lg transition-colors duration-200",
                                            category.isCurrent
                                                ? "bg-[rgba(0,0,0,0.04)] text-[var(--text-primary)] font-medium"
                                                : "text-[var(--text-secondary)] hover:bg-[rgba(0,0,0,0.02)] hover:text-[var(--text-primary)]"
                                        )}
                                    >
                                        <span className="flex-1">{category.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        {sidebar && sidebar.length > 0 && (
                            <div className="p-4">
                                <h3 className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                                    Content
                                </h3>
                                <div className="space-y-1">
                                    {sidebar && <Sidebar prefix="nav" />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
