import type {MarkdownHeading} from 'astro';
import {AlignLeftIcon} from '@/icons/AlignLeft';

import './index.css';
import {useState} from 'react';

interface Props {
  toc: MarkdownHeading[];
}
interface TocItemProps {
  item: MarkdownHeading;
}
// TODO: update active logic and toc-rail-bar
// TODO: mobile toc view
export function Toc(props: Props) {
  const {toc} = props;
  const [active, setActive] = useState(true);

  return (
    <div className="toc-wrapper">
      <div className="toc-title">
        <AlignLeftIcon />
        <span>On this page</span>
      </div>
      <div className="toc-list-container">
        <div className="toc-rail">
          <div className={`toc-rail-bar ${active ? 'toc-rail-bar-active' : ''}`}></div>
        </div>
        <ul className="toc-list">
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
        id={item.slug}
        href={`#${item.slug}`}
        style={{paddingLeft: `${(item.depth - 2) * 16}px`}}
      >
        {item.text}
      </a>
    </li>
  );
}
