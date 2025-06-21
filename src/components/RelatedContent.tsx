import { useState, useCallback } from "react";

export interface RelatedContentItem {
  title: string;
  url: string;
}

export interface RelatedContentProps {
  relatedContents?: RelatedContentItem[];
  couldCollapse?: boolean;
}

export default function RelatedContent({
  relatedContents,
  couldCollapse = false,
}: RelatedContentProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  if (!relatedContents || relatedContents.length === 0) {
    return null;
  }

  const titleContent = (
    <>
      <span className="pr-[12px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-link-icon lucide-link"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </span>
      <span className="font-medium" style={{ fontSize: "14px" }}>
        Related content
      </span>
      {couldCollapse && (
        <span className="ml-auto">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </span>
      )}
    </>
  );

  return (
    <div className="related-docs">
      {couldCollapse ? (
        <h2 className="flex items-center" onClick={toggleCollapsed} style={{ cursor: 'pointer' }}>
          {titleContent}
        </h2>
      ) : (
        <h2 className="flex items-center">
          {titleContent}
        </h2>
      )}
      {(!couldCollapse || !isCollapsed) && (
        <ul>
          {relatedContents.map((item) => (
            <li key={item.url} className="mt-[12px]">
              <a href={item.url} style={{ fontSize: "14px" }}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
