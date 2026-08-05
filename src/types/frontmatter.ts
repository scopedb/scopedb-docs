export interface FrontmatterProps {
    title: string;
    seoTitle?: string;
    description?: string;
    relatedContents?: RelatedContent[];
}

export interface RelatedContent {
    title: string;
    url: string;
}
