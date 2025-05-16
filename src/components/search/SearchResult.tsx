import type {SearchResult} from '@/types/search';
import {useEffect, useState, memo} from 'react';
import MiniSearch from 'minisearch';

interface Props {
  query: string;
  onClose: () => void;
  selectedIndex: number;
  disableMouseOver: boolean;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onResultsCountChange?: React.Dispatch<React.SetStateAction<number>>;
  onMouseMove?: (e: React.MouseEvent<HTMLUListElement>) => void;
}

export const SearchResults = memo((props: Props) => {
  const {query, selectedIndex, setSelectedIndex, disableMouseOver, onMouseMove} = props;
  const [results, setResults] = useState<SearchResult[]>([]);
  const [miniSearch, setMiniSearch] = useState<MiniSearch<SearchResult> | null>(null);
  useEffect(() => {
    fetch('/api/search-index.json')
      .then(res => res.json())
      .then((documents: SearchResult[]) => {
        const ms = new MiniSearch<SearchResult>({
          fields: ['title', 'content'],
          storeFields: ['title', 'url', 'collection', 'content'],
          searchOptions: {
            boost: {title: 2},
            fuzzy: 0.2,
            prefix: true,
          },
        });
        ms.addAll(documents);
        setMiniSearch(ms);
      });
  }, []);

  useEffect(() => {
    if (!miniSearch || !query) {
      setResults([]);
      props.onResultsCountChange?.(0);
      return;
    }
    const res = miniSearch.search(query).map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      url: r.url,
      collection: r.collection,
    }));
    setResults(res);
    props.onResultsCountChange?.(res.length);
  }, [miniSearch, query]);

  if (query === '') {
    return null;
  }
  return (
    <div>
      {results.length > 0
        ? (
          <ul className="search-results" role="list-box" onMouseMove={onMouseMove}>
            {results.map((result, index) => (
              <li
                aria-selected={selectedIndex === index ? 'true' : 'false'}
                key={index}
                role="option"
                className={`search-result search-result-item ${selectedIndex === index ? 'selected' : ''}`}
              >
                <a
                  href={result.url}
                  className="search-result-link"
                  onMouseEnter={() => !disableMouseOver && setSelectedIndex(index)}
                  onFocusCapture={() => setSelectedIndex(index)}
                  data-index={index}
                >
                  <div className="search-result-item-title">{result.title}</div>
                  <div className="search-result-item-content">
                    {highlightContent(result.content, query)}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )
        : <div className="search-result search-result-empty">No results for "{query}"</div>}
    </div>
  );
});

SearchResults.displayName = 'SearchResults';

function highlightContent(content?: string, query?: string) {
  if (!content || !query) {
    return null;
  }
  const idx = content.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) {
    return content;
  }
  const start = Math.max(0, idx - 30);
  const end = Math.min(content.length, idx + query.length + 30);
  const before = content.slice(start, idx);
  const match = content.slice(idx, idx + query.length);
  const after = content.slice(idx + query.length, end);
  return (
    <>
      {start > 0 && '...'}
      {before}
      <span className="highlight">{match}</span>
      {after}
      {end < content.length && '...'}
    </>
  );
}
