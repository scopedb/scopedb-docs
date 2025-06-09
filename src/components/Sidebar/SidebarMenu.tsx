import type { SidebarItem } from '@/src/libs/sidebar';
import './index.module.css';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useMedia, useScrollLock } from '@/src/libs/hooks';
import { ArrowDownIcon, ArrowLeftIcon, ListMinusIcon } from 'lucide-react';

interface Props {
  sidebar: SidebarItem[];
}

const isActive = (item: SidebarItem, pathname: string) => {
  const normalize = (path: string) => path.split('/').filter(Boolean).join('/');

  if (item.items && item.items.length > 0) {
    return normalize(pathname).includes(normalize(''));
  } else {
    return pathname === item.link;
  }
};

export function SidebarMenu(props: Props) {
  const { sidebar: items } = props;
  const isMobile = useMedia('(max-width: 480px)');
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useScrollLock(open);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    document.addEventListener('astro:page-load', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('astro:page-load', handleRouteChange);
    };
  }, []);

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const mobileClassName = useMemo(() => {
    if (!isMobile) {
      return '';
    }
    return open ? 'visible' : 'hidden';
  }, [isMobile, open]);

  return (
    <div>
      {open ? <div className="mask" onClick={toggleOpen} /> : null}
      {isMobile
        ? (
          <div className="menu-actions">
            <ListMinusIcon onClick={toggleOpen} />
            <Crumbs />
          </div>
        )
        : null}
      <SidebarGroup items={items} classNames={`sidebar ${mobileClassName}`} currentPath={currentPath} />
    </div>
  );
}

function Crumbs() {
  function getCrumbs(path: string) {
    const segments = path.split('/').filter(Boolean);
    const crumbs = [];
    let currentPath = '';

    for (const segment of segments) {
      currentPath += `/${segment}`;
      crumbs.push({ text: segment, link: currentPath });
    }
    return crumbs;
  }

  const crumbs = getCrumbs(window.location.pathname);
  return (
    <span className="breadcrumbs">
      {crumbs.map(b => (
        <a key={b.link} href={b.link} className="crumb">
          {b.text}
        </a>
      ))}
    </span>
  );
}

interface SidebarItemProps {
  item: SidebarItem;
  depth: number;
  currentPath: string;
}

const SidebarMenuItem = React.memo(function SidebarMenuItem(props: SidebarItemProps) {
  const { item, depth, currentPath } = props;

  const isGroup = useMemo(() => item?.items && item?.items?.length >= 0, [item]);
  const groupItems = useMemo(() => isGroup ? item.items : [], [isGroup, item]);

  const [collapsed, setCollapsed] = useState(item.collapsed ?? false);

  const handleToggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const itemStyle = useMemo(() => ({
    paddingLeft: 6 * (depth + 1),
  }), [depth]);

  const isItemActive = useMemo(() => isActive(item, currentPath), [item, currentPath]);

  return (
    <div>
      {isGroup
        ? (
          <div
            className={`group-item item-hover ${isItemActive ? 'active' : ''}`}
            onClick={handleToggleCollapsed}
          >
            <div>{item.label}</div>
            {collapsed
              ? <ArrowLeftIcon />
              : <ArrowDownIcon width={'16px'} height={'16px'} />}
          </div>
        )
        : null}

      {groupItems?.length
        ? (groupItems.map((item, index) => (
          <div
            key={`${item?.link ?? index}-${depth + 1}`}
            style={itemStyle}
            className={`single-item item-hover ${collapsed ? 'collapsed' : ''} ${isActive(item, currentPath) ? 'active' : ''
              } ${item.items === undefined ? 'is-leaf' : ''}`}
          >
            <SidebarMenuItem
              item={item}
              depth={depth + 1}
              currentPath={currentPath}
            />
          </div>
        )))
        : (
          <a
            href={item.link}
            style={itemStyle}
            data-astro-prefetch
          >
            {item.label}
          </a>
        )}
    </div>
  );
});

interface SidebarGroupProps {
  items: SidebarItem[];
  classNames: string;
  currentPath: string;
}

const SidebarGroup = React.memo(function SidebarGroup(props: SidebarGroupProps) {
  const { items, classNames, currentPath } = props;
  return (
    <aside className={classNames}>
      <nav>
        {items.map((item, index) => (
          <SidebarMenuItem
            key={`${item.link}${index}`}
            item={item}
            depth={0}
            currentPath={currentPath}
          />
        ))}
      </nav>
    </aside>
  );
});
