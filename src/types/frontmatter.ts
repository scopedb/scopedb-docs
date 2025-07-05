export interface FrontmatterProps {
    title: string;
    relatedContents?: RelatedContent[];
}

export interface RelatedContent {
    title: string;
    url: string;
}
