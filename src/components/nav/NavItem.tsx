import type {
  NavItemProps,
} from '../../interface';

interface Props extends NavItemProps {}
export function NavItem(props: Props) {
  const {link, text} = props;
  const currentPath = window.location.pathname;

  // 检查路径前缀是否匹配
  function isPathActive(currentPath: string, link: string) {
    if (currentPath === link) {
      return true;
    }

    const currentParts = currentPath.split('/').filter(Boolean);
    const linkParts = link.split('/').filter(Boolean);

    return currentParts.length > 0
      && linkParts.length > 0
      && currentParts[0] === linkParts[0];
  }

  const isActive = isPathActive(currentPath, link);

  return (
    <a
      href={link}
      className={`${[
        'px-4 py-2 rounded-md transition-colors',
        isActive
          ? 'bg-primary-600 text-gray-800 bold'
          : 'hover:bg-gray-100 text-gray-400',
      ]}`}
    >
      {text}
    </a>
  );
}
