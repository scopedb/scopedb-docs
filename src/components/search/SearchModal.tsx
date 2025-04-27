import {useState, useDeferredValue, Suspense} from 'react';
import type {FormEvent, KeyboardEvent, ChangeEvent} from 'react';
import {createPortal} from 'react-dom';
import './SearchModal.css';
import {SearchResults} from './SearchResult';
interface Props {
  onClose: () => void;
}

function SearchBox(props: Props) {
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  function handleClose(){
    props.onClose();
  }
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }
  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  return (
    <div className="search-container">
      <div className='search-mask' onClick={handleClose}/>
      <form onSubmit={handleSearch} className="search-form">
        <input
          autoFocus
          id="search-input"
          className="search-input"
          type="search"
          placeholder="Search Docs..."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={64}
          onKeyDown={handleKeyDown}
          value={query}
          onChange={handleQueryChange}
        />
      </form>
      <Suspense fallback={<h2>Searching...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear',
          }}
        >
          <SearchResults query={deferredQuery} />
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
