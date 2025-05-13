import type {SidebarItem} from '@/interface/sidebar';
import './index.css';
import {ArrowDownIcon, ArrowLeftIcon} from '@/icons';
import {useMemo, useState} from 'react';
import {useMedia, useScrollLock} from 'huse';
import {ListMinusIcon} from '@/icons/ListMinus';

interface Props {
  sidebar: SidebarItem[];
}
const isActive = (item: SidebarItem) => {
  const pathname = window.location.pathname;
  const normalize = (path: string) => path.split('/').filter(Boolean).join('/');

  if (item.items && item.items.length > 0) {
    return normalize(pathname).includes(normalize(item.base || ''));
  }
  else {
    return pathname === item.link;
  }
};

export function SideBarMenu(props: Props) {
  const {sidebar: items} = props;
  const isMobile = useMedia('(max-width: 480px)');
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  function toggleOpen() {
    setOpen(prev => !prev);
  }

  const mobileClassName = useMemo(() => {
    if (!isMobile) {
      return '';
    }
    return open ? 'visible' : 'hidden';
  }, [isMobile, open]);

  return (
    <div>
      {open ? <div className="mask" onClick={toggleOpen} /> : null}
      {isMobile ? <ListMinusIcon onClick={toggleOpen} /> : null}
      <SideBarGroup items={items} classNames={`sidebar ${mobileClassName}`} />
    </div>
  );
}

interface SidebarItemProps {
  item: SidebarItem;
  depth: number;
}
function SidebarMenuItem(props: SidebarItemProps) {
  const {item, depth} = props;

  const isGroup = item?.items && item?.items?.length >= 0;
  const groupItems = isGroup ? item.items : [];

  const [collapsed, setCollapsed] = useState(item.collapsed ?? false);
  function handleToggleCollapsed() {
    setCollapsed(prev => !prev);
  }

  return (
    <div>
      {isGroup
        ? (
          <div className={`group-item item-hover ${isActive(item) ? 'active' : ''}`} onClick={handleToggleCollapsed}>
            <div>{item.text}</div>
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
            style={{
              paddingLeft: 6 * (depth + 1),
            }}
            className={`single-item item-hover ${collapsed ? 'collapsed' : ''} ${isActive(item) ? 'active' : ''} ${
              item.items === undefined ? 'is-leaf' : ''
            }`}
          >
            <SidebarMenuItem
              item={item}
              depth={depth + 1}
            />
          </div>
        )))
        : (
          <a
            href={item.link}
            style={{
              paddingLeft: 6 * (depth + 1),
            }}
          >
            {item.text}
          </a>
        )}
    </div>
  );
}

interface SideBarGroupProps {
  items: SidebarItem[];
  classNames: string;
}

function SideBarGroup(props: SideBarGroupProps) {
  const {items, classNames} = props;
  return (
    <aside className={classNames}>
      <nav>
        {items.map((item, index) => (
          <SidebarMenuItem
            key={`${item.base ?? item.link}${index}`}
            item={item}
            depth={0}
          />
        ))}
      </nav>
    </aside>
  );
}
