import React from "react";
import type { MarkdownHeading } from "astro";
import { useRef, useCallback, useState } from "react";

import IconAlignLeft from "icons:react/lucide/align-left";
import RelatedContent, { type RelatedContentItem } from "@/src/components/RelatedContent";

import styles from "./index.module.css";

interface MobileTOCProps {
  toc: MarkdownHeading[];
  relatedContents?: RelatedContentItem[];
}

interface TocItemProps {
  item: MarkdownHeading;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick: (slug: string) => void;
}

function useMobileTOCState() {
  const tocListRef = useRef<HTMLUListElement>(null);
  const [isTocCollapsed, setIsTocCollapsed] = useState(true);

  const toggleTocCollapsed = useCallback(() => {
    setIsTocCollapsed(prev => !prev);
  }, []);

  return {
    tocListRef,
    isTocCollapsed,
    toggleTocCollapsed,
  };
}

const MobileTOCItem = React.memo(function MobileTOCItem({
  item,
  onClick,
}: TocItemProps) {
  const handleClick = useCallback(() => {
    onClick(item.slug);
  }, [item.slug, onClick]);

  return (
    <li className={styles.tocItem}>
      <a
        target="_self"
        title={item.text}
        href={`#${item.slug}`}
        onClick={handleClick}
        style={{ marginLeft: `${(item.depth - 2) * 16}px` }}
      >
        {item.text}
      </a>
    </li>
  );
});

export function MobileTOC({ toc, relatedContents }: MobileTOCProps) {
  const {
    tocListRef,
    isTocCollapsed,
    toggleTocCollapsed,
  } = useMobileTOCState();

  const handleClickTocItem = useCallback((slug: string) => {
    const linkEl = document.getElementById(slug);
    if (linkEl) {
      linkEl.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.mobileToc}>
      <div className={styles.tocSection}>
        <div className={styles.tocTitle} onClick={toggleTocCollapsed} style={{ cursor: 'pointer' }}>
          <IconAlignLeft width={16} height={16} />
          <span>On this page</span>
          <span className="ml-auto">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isTocCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </span>
        </div>
        {!isTocCollapsed && (
          <div className={styles.tocListContainer}>
            <ul className={styles.tocList} ref={tocListRef}>
              {toc.map((item) => (
                <MobileTOCItem
                  key={item.slug}
                  item={item}
                  onClick={handleClickTocItem}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {relatedContents && relatedContents.length > 0 && (
        <div className={styles.relatedSection}>
          <RelatedContent relatedContents={relatedContents} couldCollapse={true} />
        </div>
      )}
    </div>
  );
}
