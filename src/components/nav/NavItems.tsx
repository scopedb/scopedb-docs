import type {
  NavItemsProps,
  NavItemProps,
} from '../../interface';
import {NavItem} from './NavItem';
import './nav.css';

interface Props {
  navItems: NavItemsProps;
}

export function NavItems(props: Props) {
  const {navItems} = props;

  return (
    <nav className="nav-items-container">
      {navItems.map((item: NavItemProps) => <NavItem {...item} key={item.link} />)}
    </nav>
  );
}
