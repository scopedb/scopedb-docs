export type Sidebar = SidebarItem[] | SidebarMulti;

export interface SidebarMulti {
  [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string };
}

export type SidebarItem = {
  label?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
};

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
      groups.push({ items: [] });
    }

    groups[lastGroupIndex]!.items!.push(item);
  }

  return groups;
}
