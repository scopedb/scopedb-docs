import '@/styles/global.css';
import {NavItems} from './NavItems';
import {SearchButton} from '../search/SearchButton';
import {SearchModal} from '../search/SearchModal';
import {useState} from 'react';
import './nav.css';
import {useMedia, useScrollLock} from 'huse';
import {CloseIcon, MenuIcon} from '@/icons';
import {docOrHomeNavItems, otherNavItems, type NavbarProps} from '@/config';

export function Navbar({pathname}: NavbarProps) {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = useMedia('(max-width: 768px)');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  useScrollLock(isMobileMenuOpen);

  function toggleSearchBox() {
    setShowSearchBox(prev => !prev);
  }

  const isDocsOrHome = pathname === '/' || pathname.startsWith('/docs/');
  const layoutClass = isDocsOrHome ? 'nav-layout--stacked' : 'nav-layout--inline';
  const currentNavItems = isDocsOrHome ? docOrHomeNavItems : otherNavItems;

  return (
    <nav className={`nav-container ${layoutClass}`}>
      <div
        className="nav-row"
        style={{
          width: isDocsOrHome ? '100%' : 'auto',
        }}
      >
        <a href="/" className="nav-logo">
          ScopeDB
        </a>
        <div
          className="nav-actions"
          style={{
            justifyContent: isDocsOrHome && isMobile ? 'space-between' : 'flex-end',
          }}
        >
          {!isMobile && isDocsOrHome ? <a href="/book-demo">book a demo</a> : null}
          {isDocsOrHome ? <SearchButton onClick={toggleSearchBox} isMobile={isMobile} /> : null}
          <button
            className="nav-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Toggle navigation menu'}
          >
            {isMobileMenuOpen
              ? <MenuIcon width={20} height={20} />
              : <CloseIcon width={20} height={20} />}
          </button>
        </div>
      </div>
      <div
        className={`nav-items-wrapper${isMobileMenuOpen ? ' is-mobile-open' : ''}`}
        style={{
          justifyContent: isDocsOrHome && !isMobile ? 'flex-start' : 'center',
        }}
      >
        <NavItems navItems={currentNavItems} onItemClick={() => setIsMobileMenuOpen(false)} />
      </div>
      {showSearchBox && <SearchModal onClose={toggleSearchBox} />}
    </nav>
  );
}
