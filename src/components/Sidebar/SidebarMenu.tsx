import type { SidebarItem } from "@/src/libs/sidebar";
import styles from "./index.module.css";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useMedia, useScrollLock } from "@/src/libs/hooks";
import { ChevronDown, ChevronRight, ListMinusIcon } from "lucide-react";

interface Props {
  sidebar: SidebarItem[];
}

interface SidebarItemProps {
  item: SidebarItem;
  depth: number;
  currentPath: string;
  collapsedStates: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  onToggleCollapsed: (key: string) => void;
  closeSidebarMenu?: () => void;
}

interface SidebarGroupProps {
  items: SidebarItem[];
  classNames: string;
  currentPath: string;
  collapsedStates: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  onToggleCollapsed: (key: string) => void;
  closeSidebarMenu?: () => void;
}

function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);
    document.addEventListener("astro:page-load", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      document.removeEventListener("astro:page-load", handleRouteChange);
    };
  }, []);

  return currentPath;
}

function useCollapsedStates(initialItems: SidebarItem[]) {
  const [collapsedStates, setCollapsedStates] = useState<
    Record<string, boolean>
  >(() => {
    const initialState: Record<string, boolean> = {};
    const processItems = (items: SidebarItem[], depth = 0) => {
      items.forEach((item) => {
        const key = item.link || item.label || `item-${depth}`;
        if (item.collapsed !== undefined) {
          initialState[key] = item.collapsed;
        }
        if (item.items?.length) {
          processItems(item.items, depth + 1);
        }
      });
    };
    processItems(initialItems);
    return initialState;
  });

  const toggleCollapsed = useCallback((key: string) => {
    setCollapsedStates((prev) => {
      const newState = { ...prev };
      newState[key] = !prev[key];
      return newState;
    });
  }, []);

  return { collapsedStates, toggleCollapsed };
}

const normalizePath = (path: string) =>
  path.split("/").filter(Boolean).join("/");

const isActive = (item: SidebarItem, pathname: string) => {
  const currentPath = normalizePath(pathname);
  const itemPath = item.link ? normalizePath(item.link) : "";

  if (item.items?.length) {
    return item.items.some((child) => {
      if (child.link) {
        return normalizePath(child.link) === currentPath;
      }
      if (child.items) {
        return child.items.some(
          (grandChild) =>
            grandChild.link && normalizePath(grandChild.link) === currentPath,
        );
      }
      return false;
    });
  }

  return itemPath === currentPath;
};

const SidebarMenuItem = React.memo(function SidebarMenuItem({
  item,
  depth,
  currentPath,
  collapsedStates,
  onToggleCollapsed,
  closeSidebarMenu,
}: SidebarItemProps) {
  const isGroup = Boolean(item.items?.length);
  const itemKey = item.link || item.label || `item-${depth}`;
  const collapsed = collapsedStates[itemKey] ?? item.collapsed ?? false;
  const isItemActive = isActive(item, currentPath);
  const paddingLeft = 16 + depth * 16;

  if (isGroup) {
    return (
      <div>
        <button
          type="button"
          className={`${styles.groupItem} ${isItemActive ? styles.active : ""}`}
          style={{ paddingLeft }}
          onClick={() => onToggleCollapsed(itemKey)}
          aria-expanded={!collapsed}
        >
          <span className={styles.groupLabel}>{item.label}</span>
          <span className={styles.groupArrow}>
            {collapsed ? (
              <ChevronRight width={16} height={16} />
            ) : (
              <ChevronDown width={16} height={16} />
            )}
          </span>
        </button>
        {!collapsed && item.items && item.items.length > 0 && (
          <div>
            {item.items.map((child, idx) => (
              <SidebarMenuItem
                key={child.link || child.label || idx}
                item={child}
                depth={depth + 1}
                currentPath={currentPath}
                collapsedStates={collapsedStates}
                onToggleCollapsed={onToggleCollapsed}
                closeSidebarMenu={closeSidebarMenu}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.link}
      className={`${styles.singleItem} ${isItemActive ? styles.active : ""} is-leaf`}
      style={{ paddingLeft }}
      data-astro-prefetch
      onClick={closeSidebarMenu}
    >
      {item.label}
    </a>
  );
});

const SidebarGroup = React.memo(function SidebarGroup({
  items,
  classNames,
  currentPath,
  collapsedStates,
  onToggleCollapsed,
  closeSidebarMenu,
}: SidebarGroupProps) {
  return (
    <aside className={classNames}>
      <nav>
        {items.map((item, index) => (
          <SidebarMenuItem
            key={`${item.link}${index}`}
            item={item}
            depth={0}
            currentPath={currentPath}
            collapsedStates={collapsedStates}
            onToggleCollapsed={onToggleCollapsed}
            closeSidebarMenu={closeSidebarMenu}
          />
        ))}
      </nav>
    </aside>
  );
});

function Breadcrumbs() {
  const currentPath = useCurrentPath();

  const crumbs = useMemo(() => {
    const getVisibleSegments = (segments: string[], count: number) => {
      const startIndex = Math.max(0, segments.length - count);
      return {
        startIndex,
        segments: segments.slice(startIndex),
      };
    };

    const buildPaths = (segments: string[]) => {
      const paths: string[] = [];
      let currentPath = "";

      for (const segment of segments) {
        currentPath = currentPath ? `${currentPath}/${segment}` : `/${segment}`;
        paths.push(currentPath);
      }

      return paths;
    };

    const pathSegments = currentPath.split("/").filter(Boolean);

    const { startIndex, segments: visibleSegments } = getVisibleSegments(
      pathSegments,
      2,
    );

    const allPaths = buildPaths(pathSegments);

    const visiblePaths = allPaths.slice(startIndex);

    return visibleSegments.map((segment, index) => ({
      text: segment,
      link: visiblePaths[index],
    }));
  }, [currentPath]);

  return (
    <span className={styles.breadcrumbs}>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.link}>
          {index > 0 && <span className={styles.breadcrumb}>/</span>}
          <a href={crumb.link} className={styles.breadcrumb}>
            {crumb.text}
          </a>
        </React.Fragment>
      ))}
    </span>
  );
}

export function SidebarMenu({ sidebar: items }: Props) {
  const isMobile = useMedia("(max-width: 480px)");
  const [open, setOpen] = useState(false);
  const currentPath = useCurrentPath();
  const { collapsedStates, toggleCollapsed } = useCollapsedStates(items);

  useScrollLock(open);

  const mobileClassName = useMemo(() => {
    if (!isMobile) return "";
    return open ? styles.visible : styles.hidden;
  }, [isMobile, open]);

  function closeSidebarMenu() {
    setOpen(false);
  }

  return (
    <div>
      {open && <div className={styles.mask} onClick={() => setOpen(false)} />}
      {isMobile && (
        <div className={styles.menuActions}>
          <ListMinusIcon onClick={() => setOpen(true)} width={16} height={16} />
          <Breadcrumbs />
        </div>
      )}
      <SidebarGroup
        items={items}
        classNames={`${styles.sidebar} ${mobileClassName}`}
        currentPath={currentPath}
        collapsedStates={collapsedStates}
        onToggleCollapsed={toggleCollapsed}
        closeSidebarMenu={closeSidebarMenu}
      />
    </div>
  );
}
