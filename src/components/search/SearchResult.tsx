import type {SearchResult} from '../../../types/search';
import {useEffect, useState, memo} from 'react';
import MiniSearch from 'minisearch';

interface Props {
  query: string;
}

export const SearchResults = memo((props: Props) => {
  const {query} = props;
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
  }, [miniSearch, query]);

  if (query === '') {
    return null;
  }

  return (
    <div>
      {results.length > 0
        ? (
          <ul className="search-results">
            {results.map((result, index) => (
              <li key={index} className="search-result-item">
                <a href={result.url} className="search-result-link">
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        )
        : <div>No results for "{query}"</div>}
    </div>
  );
});

SearchResults.displayName = 'SearchResults';
