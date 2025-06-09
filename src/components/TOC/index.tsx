import type { MarkdownHeading } from "astro";

import "./index.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "lodash-es";
import { useMedia } from "@/src/libs/hooks";
import { AlignLeftIcon } from "lucide-react";

interface Props {
  toc: MarkdownHeading[];
}
interface TocItemProps {
  item: MarkdownHeading;
  isActive: boolean;
}

interface LinkInfo {
  top: number;
  height: number;
  href: string;
  index: number;
}

type OffsetTarget = Window | Document | HTMLElement;

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

export function TOC(props: Props) {
  const { toc } = props;
  const collectedLinkHrefs = toc.map((t) => t.slug);

  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<LinkInfo | null>(null);
  const tocListRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const isMobile = useMedia("(max-width:960px)");

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function updateActiveHref(href: string): void {
    const linkEl = document.getElementById(href);
    if (!linkEl) {
      return;
    }
    setActiveHref(href);
    linkEl.scrollIntoView();
    handleScroll();
  }

  function doHandleScroll() {
    const links: LinkInfo[] = [];
    const offsetTarget = document;
    collectedLinkHrefs.forEach((href, index) => {
      const linkEl = document.getElementById(href);
      if (linkEl && offsetTarget) {
        const { top, height } = getOffset(linkEl, offsetTarget);
        links.push({
          top,
          height,
          href,
          index,
        });
      }
    });

    links.sort((a, b) => {
      // ascend top
      if (a.top > b.top) {
        return 1;
        // descend height
      } else if (a.top === b.top && a.height < b.height) {
        return -1;
      }
      return -1;
    });
    const bound = 12;
    const activeLink = links.reduce((prevLink: LinkInfo | null, link) => {
      if (link.top + link.height < 0) {
        return prevLink;
      }
      if (link.top <= bound) {
        if (prevLink === null) {
          return link;
        } else if (link.top === prevLink.top) {
          if (link.href === activeHref) {
            return link;
          } else {
            return prevLink;
          }
        } else if (link.top > prevLink.top) {
          return link;
        } else {
          return prevLink;
        }
      }
      return prevLink;
    }, null);

    activeLink?.href && updateActiveHref(activeLink.href);
    setActiveLink(activeLink);
  }
  const handleScroll = throttle(doHandleScroll, 128);
  useEffect(() => {
    updateActiveHref(window.location.hash.replaceAll("#", ""));
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocBarTop = useMemo(() => {
    return (14 + 12) * (activeLink?.index ?? 0);
  }, [activeLink]);

  return (
    <div className="toc">
      {isMobile ? (
        <AlignLeftIcon onClick={toggleOpen} width={20} height={20} />
      ) : null}
      {open ? <div className="toc-mask" onClick={toggleOpen} /> : null}
      <div
        className={`toc-wrapper ${isMobile ? (open ? "open" : "close") : ""}`}
      >
        <div className="toc-title">
          <AlignLeftIcon />
          <span>On this page</span>
        </div>
        <div className="toc-list-container">
          <div className="toc-rail">
            <div
              className={`toc-rail-bar ${activeLink ? "toc-rail-bar-active" : ""}`}
              style={{
                top: `${tocBarTop}px`,
              }}
            />
          </div>
          <ul className="toc-list" ref={tocListRef}>
            {toc.map((toc) => (
              <TOCItem
                item={toc}
                key={toc.slug}
                isActive={toc.slug === activeHref}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TOCItem(props: TocItemProps) {
  const { item, isActive } = props;
  return (
    <li className={`toc-item ${isActive ? "toc-item-active" : ""}`}>
      <a
        target="_self"
        title={item.text}
        href={`#${item.slug}`}
        style={{ paddingLeft: `${(item.depth - 2) * 16}px` }}
      >
        {item.text}
      </a>
    </li>
  );
}
