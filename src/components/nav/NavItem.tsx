import {useMedia} from 'huse';
import type {NavItemProps} from '../../interface';
import './nav.css';

interface Props extends NavItemProps {
  onItemClick?: () => void;
}

export function NavItem(props: Props) {
  const {link, text, onItemClick} = props;
  const isMobile = useMedia('(max-width: 768px)');

  let currentPath = '';
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
  }

  function isPathActive(current: string, target: string): boolean {
    if (!current || !target) {
      return false;
    }
    if (target === '/') {
      return current === '/';
    }
    return current === target || current.startsWith(target + '/');
  }

  const isActive = isPathActive(currentPath, link);

  const itemClasses = `nav-item${isActive ? ' nav-item--active' : ''}`;

  function handleClick() {
    if (isMobile) {
      onItemClick?.();
    }
  }

  return (
    <span className={itemClasses}>
      <a href={link} onClick={handleClick}>
        {text}
      </a>
    </span>
  );
}
