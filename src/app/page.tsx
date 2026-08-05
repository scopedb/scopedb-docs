import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createPageMetadata, SITE_DESCRIPTION, SITE_NAME } from "@/utils/seo";
import Link from "next/link";

const HOME_TITLE = "ScopeDB Docs — Serverless Event Analytics Database";

export const metadata = createPageMetadata({
  title: HOME_TITLE,
  description: SITE_DESCRIPTION,
  pathname: "/",
  absoluteTitle: true,
  type: "website",
});

function FeaturedItems() {
  interface FeaturedItem {
    category: string;
    title: string;
    description: string;
    link: string;
  }

  const featured: FeaturedItem[] = [
    {
      category: "Get started",
      title: "Quickstart",
      description: "Create a table and run your first ScopeQL queries in the Console.",
      link: "/guides/quickstart",
    },
    {
      category: "Get started",
      title: "Connect an application",
      description: "Copy the ScopeDB API address, create an API key, and test a client.",
      link: "/guides/connect-to-scopedb",
    },
    {
      category: "Work with data",
      title: "Query event data",
      description: "Filter, search, aggregate, and join event data with ScopeQL.",
      link: "/guides/query-events",
    },
    {
      category: "Work with data",
      title: "Guides",
      description: "Follow task-focused workflows for querying, data modeling, retention, and indexes.",
      link: "/guides",
    },
    {
      category: "Build",
      title: "Developer resources",
      description: "Use the HTTP API, SDKs, or ScopeQL CLI from your application.",
      link: "/developer",
    },
    {
      category: "Reference",
      title: "ScopeQL reference",
      description: "Look up language syntax, data types, statements, and functions.",
      link: "/reference",
    },
  ];

  return (
    <>
      <h2 className="text-[var(--text-secondary)] text-[16px] font-normal pt-[60px]">
        Featured Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {
          featured.map((item) => (
            <Link
              key={`${item.category}-${item.title}`}
              className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[16px] p-[16px] flex flex-col gap-[4px] no-underline transition-all duration-300  hover:shadow-lg"
              href={item.link}
            >
              <div className="text-[var(--text-tertiary)] text-[12px] font-normal uppercase tracking-wider">
                {item.category}
              </div>
              <h3 className="text-[var(--text-primary)] font-semibold text-[20px] leading-tight m-0">
                {item.title}
              </h3>
              <div className="text-[var(--text-tertiary)]  text-[14px] leading-relaxed">
                {item.description}
              </div>
            </Link>
          ))
        }
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${absoluteUrl("/")}#website`,
          name: SITE_NAME,
          alternateName: "ScopeDB Documentation",
          url: absoluteUrl("/"),
          description: SITE_DESCRIPTION,
        }}
      />
      <div className="py-[16px] px-[12px] md:px-[24px] mt-[60px] min-h-[calc(100vh-220px)]">
        <h1 className="text-[var(--text-primary)] leading-tight text-[50px] font-medium m-0 max-w-[760px]">
          Build event analytics<br />with ScopeDB Cloud
        </h1>
        <div className="text-[var(--text-secondary)] max-w-[660px] text-[20px] font-normal pt-[16px]">
          ScopeDB Cloud is a serverless database for event analytics. Learn to
          load, query, model, and retain data with ScopeQL, APIs, and SDKs.
        </div>

        <FeaturedItems />

        <div className="sticky top-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
