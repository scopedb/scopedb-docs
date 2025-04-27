export interface SearchResult {
  id: string;
  title?: string;
  content?: string;
  url: string;
  collection: string;
}

export interface SearchIndex {
  search: (query: string) => SearchResult[];
}
