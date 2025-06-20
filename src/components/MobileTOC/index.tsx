import React from "react";
import type { MarkdownHeading } from "astro";
import { useRef, useCallback } from "react";

import { AlignLeftIcon } from "lucide-react";
import RelatedContent, { type RelatedContentItem } from "@/src/components/RelatedContent";

import styles from "./index.module.css";

interface MobileTOCProps {
  toc: MarkdownHeading[];
  relatedContents?: RelatedContentItem[];
}

interface TocItemProps {
  item: MarkdownHeading;
  onClick: (slug: string) => void;
}

function useMobileTOCState() {
  const tocListRef = useRef<HTMLUListElement>(null);

  return {
    tocListRef,
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
  const { tocListRef } = useMobileTOCState();

  const handleClickTocItem = useCallback((slug: string) => {
    const linkEl = document.getElementById(slug);
    if (linkEl) {
      linkEl.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.mobileToc}>
      <RelatedContent relatedContents={relatedContents} />
      <div className={styles.tocTitle}>
        <AlignLeftIcon width={16} height={16} />
        <span>On this page</span>
      </div>
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
    </div>
  );
}
