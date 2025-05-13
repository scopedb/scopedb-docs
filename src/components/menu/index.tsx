import type {SidebarItem} from '@/interface/sidebar';
import './index.css';
import {ArrowDownIcon, ArrowLeftIcon} from '@/icons';
import {useState} from 'react';

interface Props {
  sidebar: SidebarItem[];
}
// FIXME: correct the active logic
// TODO: mobile view sidebar
const currentPath = window.location.pathname;
const isActive = (link: string, hasChildren = false) => {
  if (link === '#') {
    return false;
  }

  // 处理父级菜单的高亮逻辑
  if (hasChildren) {
    // 如果当前路径完全匹配，直接返回true
    if (currentPath === link) {
      return true;
    }
    // 提取前缀进行比较
    const urlParts = link.split('/').filter(Boolean);
    const currentParts = currentPath.split('/').filter(Boolean);

    // 如果href有前缀部分，检查当前路径是否匹配这个前缀
    if (urlParts.length > 0 && currentParts.length > 0) {
      return urlParts[0] === currentParts[0];
    }
    // 检查是否是子路径
    return currentPath.includes(link + '/');
  }

  // 子菜单项也使用前缀匹配
  const urlParts = link.split('/').filter(Boolean);
  const currentParts = currentPath.split('/').filter(Boolean);

  if (urlParts.length > 0 && currentParts.length > 0) {
    return urlParts[0] === currentParts[0];
  }

  return currentPath === link;
};

export function SideBarMenu(props: Props) {
  const {sidebar: items} = props;

  console.log('sidebar', items);

  return <SideBarGroup items={items} />;
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
          <div className="group-item item-hover" onClick={handleToggleCollapsed}>
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
            className={`single-item item-hover ${`single-item item-hover ${collapsed ? 'collapsed' : ''}`}`}
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
}

function SideBarGroup(props: SideBarGroupProps) {
  const {items} = props;
  return (
    <aside>
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
