import '@/styles/global.css';
import {NavItems} from './NavItems';
import {SearchButton} from '../search/SearchButton';
import {SearchModal} from '../search/SearchModal';
import {useState} from 'react';
import './nav.css';

interface NavItem {
  text: string;
  link: string;
}

interface NavbarProps {
  pathname: string;
}

const docOrHomeNavItems: NavItem[] = [
  {text: 'Developer', link: '/developer'},
  {text: 'Reference', link: '/reference'},
  {text: 'Releases', link: '/releases'},
  {text: 'Tutorials', link: '/tutorials'},
  {text: 'Developer', link: '/developer-duplicate?'},
  {text: 'Open Catalog', link: '/open-catalog'},
];

const otherNavItems: NavItem[] = [
  {text: 'Products', link: '/products'},
  {text: 'Reference', link: '/reference'},
  {text: 'Blog', link: '/blog'},
  {text: 'Contact', link: '/contact'},
  {text: 'Changelog', link: '/changelog'},
];
// TODO: 需要给移动端实现一套布局 然后响应式显示
export function Navbar({pathname}: NavbarProps) {
  const [showSearchBox, setShowSearchBox] = useState(false);

  function toggleSearchBox() {
    setShowSearchBox(prev => !prev);
  }

  const isDocsOrHome = pathname === '/' || pathname.startsWith('/docs/');
  const layoutClass = isDocsOrHome ? 'nav-layout--stacked' : 'nav-layout--inline';
  const currentNavItems = isDocsOrHome ? docOrHomeNavItems : otherNavItems;

  return (
    <nav className={`nav-container ${layoutClass}`}>
      {isDocsOrHome && (
        <>
          <div className="nav-row">
            <a href="/" className="nav-logo">
              ScopeDB
            </a>
            <div className="nav-title">
              DOCUMENTATION
            </div>
            <a href="/book-demo" className="nav-book-demo">
              Book a demo
            </a>
            <div className="nav-search-container">
              <SearchButton onClick={toggleSearchBox} />
            </div>
            {showSearchBox && <SearchModal onClose={toggleSearchBox} />}
          </div>
          <div className="w-full">
            <NavItems navItems={currentNavItems} />
          </div>
        </>
      )}
      {!isDocsOrHome && (
        <>
          <a href="/" className="nav-logo">
            ScopeDB
          </a>
          <div className="nav-items-wrapper--inline">
            <NavItems navItems={currentNavItems} />
          </div>
        </>
      )}
    </nav>
  );
}
