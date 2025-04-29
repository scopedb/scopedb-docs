import {useState, useDeferredValue, Suspense, useRef, useCallback} from 'react';
import type {FormEvent, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {createPortal} from 'react-dom';
import './SearchModal.css';
import {SearchResults} from './SearchResult';

interface Props {
  onClose: () => void;
}

function SearchBox(props: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [disableMouseOver, setDisableMouseOver] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  function handleEnterKeyDown() {
    if (selectedIndex < 0) return;

    const resultsList = document.querySelector('ul.search-results');
    if (!resultsList) {
      console.error('SearchModal: Could not find results list (ul.search-results)');
      return;
    }

    const listItems = resultsList.querySelectorAll('li.search-result-item');
    if (selectedIndex >= listItems.length) {
      console.error(`SearchModal: selectedIndex ${selectedIndex} out of bounds (${listItems.length} items)`);
      return;
    }

    const selectedItemElement = listItems[selectedIndex];
    const linkElement = selectedItemElement?.querySelector('a.search-result-link');
    const url = linkElement?.getAttribute('href');

    if (url) {
      window.location.href = url;
      handleClose();
    } else {
      console.error('SearchModal: Could not find href on selected item link.');
    }
  }

  function handleClose() {
    props.onClose();
    setDisableMouseOver(false);
  }
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  const focusSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [searchInputRef]);
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex >= resultsCount ? 0 : nextIndex;
      });
      setDisableMouseOver(true);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const nextIndex = prev - 1;
        return nextIndex < 0 ? resultsCount - 1 : nextIndex;
      });
      setDisableMouseOver(true);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterKeyDown();
    }
  }
  function handleMouseOver(e: MouseEvent<HTMLUListElement>) {
    if (!disableMouseOver) {
      return;
    }
    const el = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('.search-result');
    const index = Number.parseInt(el?.dataset.index!);
    if (index >= 0 && index !== selectedIndex) {
      setSelectedIndex(index);
    }
    setDisableMouseOver(false);
  }
  return (
    <div className="search-container">
      <div className="search-mask" onClick={handleClose} />
      <form onSubmit={handleSearch} className="search-form">
        <input
          autoFocus
          ref={searchInputRef}
          id="search-input"
          className="search-input"
          type="search"
          placeholder="Search Docs..."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-activedescendant={selectedIndex > -1 ? ('search-result-item' + selectedIndex) : undefined}
          maxLength={64}
          value={query}
          onChange={handleQueryChange}
          onFocus={focusSearchInput}
          onKeyDown={handleKeyDown}
        />
      </form>
      <Suspense
        fallback={<h2 className="search-result search-result-empty">Searching...</h2>}
      >
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear',
          }}
        >
          <SearchResults
            query={deferredQuery}
            disableMouseOver={disableMouseOver}
            onClose={handleClose}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            onResultsCountChange={setResultsCount}
            onMouseMove={handleMouseOver}
          />
        </div>
      </Suspense>
    </div>
  );
}

export function SearchModal(props: Props) {
  return createPortal(
    <SearchBox {...props} />,
    document.body
  );
}
