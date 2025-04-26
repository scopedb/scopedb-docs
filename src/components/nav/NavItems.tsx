import type {
  NavItemsProps,
  NavItemProps,
} from '../../interface';
import {NavItem} from './NavItem';

interface Props {
  navItems: NavItemsProps;
}

export function NavItems(props: Props) {
  const {navItems} = props;
  const currentPath = window.location.pathname;

  const isActive = (link: string) => {
    if (link === '/') {
      return currentPath === link;
    }

    // 获取当前路径和链接的第一段
    const currentSegment = currentPath.split('/')[1];
    const linkSegment = link.split('/')[1];

    // 比较第一段是否相同
    return currentSegment === linkSegment;
  };
  return (
    <nav className="flex flex-row gap-2">
      {navItems.map((item: NavItemProps) => <NavItem {...item} isActive={isActive(item.link)} key={item.link} />)}
    </nav>
  );
}
