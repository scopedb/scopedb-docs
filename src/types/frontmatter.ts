export interface RelatedContent {
    title: string;
    url: string;
}

export interface FrontmatterProps {
    title: string;
    relatedContents?: RelatedContent[];
}
