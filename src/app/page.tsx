import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScopeDB Documentation",
  description: "Get an overview of ScopeDB features, integrations, and how to use them",
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
      category: "Reference",
      title: "Data Types",
      description: "Learn about ScopeDB data types",
      link: "/reference/data-types",
    },
    {
      category: "Reference",
      title: "Functions",
      description: "Learn about ScopeDB functions",
      link: "/reference/functions",
    },
    {
      category: "Reference",
      title: "Query Syntax",
      description: "Learn about ScopeDB query syntax",
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
            <a
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
            </a>
          ))
        }
      </div>
    </>
  );
}

function BasicItems() {
  interface BasicItem {
    title: string;
    description: string;
    link: string;
  }

  const basics: BasicItem[] = [];

  return (
    <>
      {
        basics.length > 0 && (
          <div>
            <div className="text-[var(--text-primary)] text-[16px] font-normal pt-[16px]">
              ScopeDB basics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {basics.map((item) => (
                <a
                  key={item.title}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 rounded-xl p-6 flex flex-col gap-3 no-underline transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:from-slate-100 hover:to-slate-200 min-h-[140px]"
                  href={item.link}
                >
                  <div className="text-[var(--text-primary)] font-semibold text-[20px] eading-tight">
                    {item.title}
                  </div>
                  <div className="text-[var(--text-tertiary)]  text-[14px] leading-relaxed">
                    {item.description}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
      }
    </>
  )
}

export default function Home() {
  return (
    <>
      <div className="max-w-[1440px] mx-auto py-[16px] px-[12px] md:px-[24px] mt-[60px] min-h-[calc(100vh-220px)]">
        <div className="text-[var(--text-primary)] leading-tight text-[50px] font-medium">
          ScopeDB<br />Documentation
        </div>
        <div className="text-[var(--text-secondary)] max-w-[500px] text-[20px] font-normal pt-[16px]">
          Get an overview of ScopeDB features, integrations, and how to use them.
        </div>

        <FeaturedItems />
        <BasicItems />

        <div className="sticky top-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
