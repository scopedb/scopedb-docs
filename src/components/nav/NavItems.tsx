import type {
  NavItemsProps,
  NavItemProps,
} from '../../interface';
import {NavItem} from './NavItem';
import './nav.css';

interface Props {
  navItems: NavItemsProps;
  onItemClick?: () => void;
}

export function NavItems(props: Props) {
  const {navItems, onItemClick} = props;

  return (
    <nav className="nav-items-container">
      {navItems.map((item: NavItemProps) => <NavItem {...item} key={item.link} onItemClick={onItemClick} />)}
    </nav>
  );
}
