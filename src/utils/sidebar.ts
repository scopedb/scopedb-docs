import type {Sidebar, SidebarItem} from '@/interface/sidebar';

export function getSidebar(sidebarConfig: Sidebar | undefined, path: string = ''): SidebarItem[] {
  if (Array.isArray(sidebarConfig)) {
    return addBase(sidebarConfig, path);
  }
  if (sidebarConfig === undefined || sidebarConfig === null) {
    return [];
  }

  const dir = Object
    .keys(sidebarConfig)
    .sort((a, b) => b.split('/').length - a.split('/').length)
    .find(dir => {
      return ensureStartWithSlash(path) === ensureStartWithSlash(dir);
    });
  const sidebar = dir ? sidebarConfig[dir] : [];

  return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}

export function getSidebarGroups(sidebar: SidebarItem[]): SidebarItem[] {
  const groups: SidebarItem[] = [];

  let lastGroupIndex: number = 0;

  for (const index in sidebar) {
    const item = sidebar[index];

    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }

    if (!groups[lastGroupIndex]) {
      groups.push({items: []});
    }

    groups[lastGroupIndex]!.items!.push(item);
  }

  return groups;
}

function addBase(items: SidebarItem[], _base?: string): SidebarItem[] {
  return [...items].map(_item => {
    const item = {..._item};
    const base = item.base || _base;
    if (base && item.link) {
      item.link = base + item.link;
    }
    if (item.items) {
      item.items = addBase(item.items, base);
    }
    return item;
  });
}

export function ensureStartWithSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}