import type { NavItemProps } from '../../interface';
import './nav.css';

interface Props extends NavItemProps {}

export function NavItem(props: Props) {
  const { link, text } = props;

  let currentPath = '';
  if (typeof window !== 'undefined') {
      currentPath = window.location.pathname;
  }

  // Function to check if the path is active
  function isPathActive(current: string, target: string): boolean {
    if (!current || !target) return false;
    if (target === '/') {
      return current === '/';
    }
    return current === target || current.startsWith(target + '/');
  }

  const isActive = isPathActive(currentPath, link);

  
  const itemClasses = `nav-item${isActive ? ' nav-item--active' : ''}`;

  return (
    <span className={itemClasses}>
      <a href={link}>
        {text}
      </a>
    </span>
  );
}
