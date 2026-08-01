import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ScopeDB Documentation",
  description: "Learn how to connect, ingest, query, and build with ScopeDB Cloud",
}

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
      title: "ScopeDB Cloud concepts",
      description: "Understand workspaces, API addresses, and how the Console fits together.",
      link: "/guides/cloud-concepts",
    },
    {
      category: "Get started",
      title: "Connect to ScopeDB",
      description: "Copy your workspace address, create an API key, and test the connection.",
      link: "/guides/connect-to-scopedb",
    },
    {
      category: "Use ScopeDB",
      title: "Quickstart",
      description: "Create a table, add sample data, and run your first ScopeQL query.",
      link: "/guides/quickstart",
    },
    {
      category: "Use ScopeDB",
      title: "Guides",
      description: "Follow task-focused workflows for ingest, queries, data modeling, and indexes.",
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
      link: "/reference/commands/stmt-query",
    },
  ];

  return (
    <>
      <div className="text-[var(--text-secondary)] text-[16px] font-normal pt-[60px]">
        Featured Resources
      </div>
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
              <div className="text-[var(--text-primary)] font-semibold text-[20px] leading-tight">
                {item.title}
              </div>
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
      <div className="py-[16px] px-[12px] md:px-[24px] mt-[60px] min-h-[calc(100vh-220px)]">
        <div className="text-[var(--text-primary)] leading-tight text-[50px] font-medium">
          ScopeDB<br />Documentation
        </div>
        <div className="text-[var(--text-secondary)] max-w-[500px] text-[20px] font-normal pt-[16px]">
          Connect to ScopeDB Cloud, work with your data, and build applications
          with ScopeQL, APIs, and SDKs.
        </div>

        <FeaturedItems />

        <div className="sticky top-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
