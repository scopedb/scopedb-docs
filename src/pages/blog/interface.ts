export interface BlogData {
  title: string;
  link: string;
  description: string;
  date: string;
  cover?: ImageMetadata;
  readTime: string;
}

export interface RankedBlogData extends BlogData {
  rank: number;
}
