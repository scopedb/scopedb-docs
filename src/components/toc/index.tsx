import type {MarkdownHeading} from 'astro';
import {AlignLeftIcon} from '@/icons/AlignLeft';

import './index.css';
import {useEffect, useMemo, useRef, useState} from 'react';
import {throttle} from 'lodash-es';

interface Props {
  toc: MarkdownHeading[];
}
interface TocItemProps {
  item: MarkdownHeading;
}

interface LinkInfo {
  top: number;
  height: number;
  href: string;
  index: number;
}

export type OffsetTarget = Window | Document | HTMLElement;

export function getOffset(el: HTMLElement, scrollTarget: OffsetTarget): {
  top: number;
  height: number;
} {
  const {top: elTop, height} = el.getBoundingClientRect();
  const scrollTargetTop = scrollTarget instanceof HTMLElement
    ? scrollTarget.getBoundingClientRect().top
    : 0;
  return {
    top: elTop - scrollTargetTop,
    height,
  };
}

// TODO: mobile toc view
export function Toc(props: Props) {
  const {toc} = props;
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<LinkInfo | null>(null);
  const tocListRef = useRef<HTMLUListElement>(null);
  const collectedLinkHrefs = toc.map(t => t.slug);

  function updateActiveHref(href: string): void {
    const linkEl = document.getElementById(href);
    if (!linkEl) {
      return;
    }
    setActiveHref(href);
    linkEl.scrollIntoView();
    handleScroll();
  }

  function _handleScroll() {
    const links: LinkInfo[] = [];
    const offsetTarget = document;
    collectedLinkHrefs.forEach((href, index) => {
      const linkEl = document.getElementById(href);
      if (linkEl && offsetTarget) {
        const {top, height} = getOffset(linkEl, offsetTarget);
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
      }
      else if (a.top === b.top && a.height < b.height) {
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
        }
        else if (link.top === prevLink.top) {
          if (link.href === activeHref) {
            return link;
          }
          else {
            return prevLink;
          }
        }
        else if (link.top > prevLink.top) {
          return link;
        }
        else {
          return prevLink;
        }
      }
      return prevLink;
    }, null);

    activeLink?.href && updateActiveHref(activeLink.href);
    setActiveLink(activeLink);
  }
  const handleScroll = throttle(_handleScroll, 128);
  useEffect(() => {
    updateActiveHref(window.location.hash.replaceAll('#', ''));
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocBarTop = useMemo(() => {
    return (14 + 12) * (activeLink?.index ?? 0);
  }, [activeLink]);

  return (
    <div className="toc-wrapper">
      <div className="toc-title">
        <AlignLeftIcon />
        <span>On this page</span>
      </div>
      <div className="toc-list-container">
        <div
          className="toc-rail"
          style={{
            height: tocListRef?.current?.offsetHeight,
          }}
        >
          <div
            className={`toc-rail-bar ${activeLink ? 'toc-rail-bar-active' : ''}`}
            style={{
              top: `${tocBarTop}px`,
            }}
          />
        </div>
        <ul className="toc-list" ref={tocListRef}>
          {toc.map(toc => <TocItem item={toc} key={toc.slug} />)}
        </ul>
      </div>
    </div>
  );
}

export function TocItem(props: TocItemProps) {
  const {item} = props;
  return (
    <li className="toc-item">
      <a
        target="_self"
        title={item.text}
        href={`#${item.slug}`}
        style={{paddingLeft: `${(item.depth - 2) * 16}px`}}
      >
        {item.text}
      </a>
    </li>
  );
}
