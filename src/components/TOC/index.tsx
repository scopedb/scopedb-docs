import React from "react";
import type { MarkdownHeading } from "astro";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { throttle } from "lodash-es";
import { useMedia } from "@/src/libs/hooks";
import { AlignLeftIcon } from "lucide-react";

import "./index.module.css";

interface TOCProps {
  toc: MarkdownHeading[];
}

interface TocItemProps {
  item: MarkdownHeading;
  isActive: boolean;
  onClick: (href: string) => void;
}

interface LinkInfo {
  top: number;
  height: number;
  href: string;
  index: number;
}

type OffsetTarget = Window | Document | HTMLElement;

const SCROLL_THROTTLE_MS = 128;
const TOP_BOUND = 12;
const ITEM_HEIGHT = 14;
const ITEM_MARGIN = 12;

function getOffset(
  el: HTMLElement,
  scrollTarget: OffsetTarget,
): {
  top: number;
  height: number;
} {
  const { top: elTop, height } = el.getBoundingClientRect();
  const scrollTargetTop =
    scrollTarget instanceof HTMLElement
      ? scrollTarget.getBoundingClientRect().top
      : 0;
  return {
    top: elTop - scrollTargetTop,
    height,
  };
}

function useTOCState(toc: MarkdownHeading[]) {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<LinkInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width:960px)");
  const tocListRef = useRef<HTMLUListElement>(null);

  const collectedLinkHrefs = useMemo(() => toc.map((t) => t.slug), [toc]);

  return {
    activeHref,
    setActiveHref,
    activeLink,
    setActiveLink,
    isOpen,
    setIsOpen,
    isMobile,
    tocListRef,
    collectedLinkHrefs,
  };
}

function useTOCScroll(
  collectedLinkHrefs: string[],
  activeHref: string | null,
  setActiveHref: (href: string) => void,
  setActiveLink: (link: LinkInfo | null) => void,
) {
  const handleScroll = useCallback(() => {
    const links: LinkInfo[] = [];
    const offsetTarget = document;

    collectedLinkHrefs.forEach((href, index) => {
      const linkEl = document.getElementById(href);
      if (linkEl && offsetTarget) {
        const { top, height } = getOffset(linkEl, offsetTarget);
        links.push({ top, height, href, index });
      }
    });

    links.sort((a, b) => a.top - b.top);

    const activeLink = links.reduce((prevLink: LinkInfo | null, link) => {
      if (link.top + link.height < 0) {
        return prevLink;
      }

      if (link.top <= TOP_BOUND) {
        if (!prevLink) return link;
        if (link.top > prevLink.top) return link;
        if (link.top === prevLink.top && link.href === activeHref) return link;
        return prevLink;
      }

      if (!prevLink) return link;
      if (link.top < prevLink.top) return link;
      return prevLink;
    }, null);

    if (activeLink?.href) {
      setActiveHref(activeLink.href);
      setActiveLink(activeLink);
    }
  }, [collectedLinkHrefs, activeHref, setActiveHref, setActiveLink]);

  const throttledHandleScroll = useMemo(
    () => throttle(handleScroll, SCROLL_THROTTLE_MS),
    [handleScroll],
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [throttledHandleScroll]);

  return throttledHandleScroll;
}

function useTOCInitialization(
  toc: MarkdownHeading[],
  collectedLinkHrefs: string[],
  activeHref: string | null,
  setActiveHref: (href: string) => void,
  setActiveLink: (link: LinkInfo | null) => void,
) {
  useEffect(() => {
    if (toc.length > 0 && !activeHref) {
      const firstHref = toc[0].slug;
      setActiveHref(firstHref);
      const firstLink = document.getElementById(firstHref);
      if (firstLink) {
        const { top, height } = getOffset(firstLink, document);
        setActiveLink({
          top,
          height,
          href: firstHref,
          index: 0,
        });
      }
    }

    const hash = window.location.hash.replaceAll("#", "");
    if (hash && collectedLinkHrefs.includes(hash)) {
      setActiveHref(hash);
    }
  }, [toc, collectedLinkHrefs, activeHref, setActiveHref, setActiveLink]);
}

export function TOCItem({ item, isActive, onClick }: TocItemProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick(item.slug);
    },
    [item.slug, onClick],
  );

  return (
    <li className={`toc-item ${isActive ? "toc-item-active" : ""}`}>
      <a
        target="_self"
        title={item.text}
        href={`#${item.slug}`}
        onClick={handleClick}
        style={{ paddingLeft: `${(item.depth - 2) * 16}px` }}
      >
        {item.text}
      </a>
    </li>
  );
}

export function TOC({ toc }: TOCProps) {
  const {
    activeHref,
    setActiveHref,
    activeLink,
    setActiveLink,
    isOpen,
    setIsOpen,
    isMobile,
    tocListRef,
    collectedLinkHrefs,
  } = useTOCState(toc);

  useTOCInitialization(
    toc,
    collectedLinkHrefs,
    activeHref,
    setActiveHref,
    setActiveLink,
  );

  useTOCScroll(collectedLinkHrefs, activeHref, setActiveHref, setActiveLink);

  const updateActiveHref = useCallback(
    (href: string, shouldScroll = false) => {
      const linkEl = document.getElementById(href);
      if (!linkEl) return;

      setActiveHref(href);
      if (shouldScroll) {
        linkEl.scrollIntoView({ behavior: "smooth" });
      }
    },
    [setActiveHref],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const tocBarTop = useMemo(
    () => (ITEM_HEIGHT + ITEM_MARGIN) * (activeLink?.index ?? 0),
    [activeLink],
  );

  return (
    <div className="toc">
      {isMobile && (
        <AlignLeftIcon onClick={toggleOpen} width={16} height={16} />
      )}
      {isOpen && <div className="toc-mask" onClick={toggleOpen} />}
      <div
        className={`toc-wrapper ${isMobile ? (isOpen ? "open" : "close") : ""}`}
      >
        <div className="toc-title">
          <AlignLeftIcon width={16} height={16} />
          <span>On this page</span>
        </div>
        <div className="toc-list-container">
          <div className="toc-rail">
            <div
              className={`toc-rail-bar ${activeLink ? "toc-rail-bar-active" : ""}`}
              style={{ top: `${tocBarTop}px` }}
            />
          </div>
          <ul className="toc-list" ref={tocListRef}>
            {toc.map((item) => (
              <TOCItem
                key={item.slug}
                item={item}
                isActive={item.slug === activeHref}
                onClick={(href) => updateActiveHref(href, true)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
