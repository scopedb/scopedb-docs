import '@/styles/global.css';
import {NavItems} from './NavItems';
import {navItems} from '../../config';
import {SearchButton} from '../search/SearchButton';
import {SearchModal} from '../search/SearchModal';
import {useState} from 'react';

export function Navbar() {
  const [showSearchBox, setShowSearchBox] = useState(false);

  function toggleSearchBox() {
    setShowSearchBox(prev => !prev);
  }

  return (
    <nav className="flex flex-col gap-6">
      <div className="flex flex-row">
        <a href="/">
          Scope DB
        </a>
        <div className="grow pl-8 font-semibold">DOCUMENTATION</div>
        <div className="size-1/6">
          <SearchButton onClick={toggleSearchBox} />
        </div>
        {showSearchBox ? <SearchModal onClose={toggleSearchBox} /> : null}
      </div>
      <NavItems navItems={navItems} />
    </nav>
  );
}
