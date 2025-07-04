import Search from "@/components/Search";
import Categories from "./Categories";
import Link from "next/link";
import MobileNav from "./MobileNav";
import Image from "next/image";

export enum Category {
  Guides = "guides",
  Developer = "developer",
  Reference = "reference",
}

export default function Header() {
  return <>
    <div className="fixed top-0 left-0 right-0 z-50 bg-white min-h-[56px] lg:min-h-[98px]">
      <div className="mx-auto pt-[14px]">
        <div className="flex pb-[14px] px-[14px] items-center justify-between border-b border-[rgba(0,0,0,0.05)]">
          <div className="title-wrapper flex items-center gap-[24px] px-[12px] md:px-[24px]" >
            <Link href="/" className="flex items-center gap-[12px]">
              <Image src="/logo-banner.svg" alt="ScopeDB Logo" className="h-[36px] w-[128px]" />
              <span className="ml-[14px] text-[12px] font-extrabold tracking-[.72px] text-primary">
                DOCUMENTATION
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:block text-[14px]">
              <Link href="https://www.scopedb.io/contact">Book a demo</Link>
            </div>

            <div className="h-[36px] ml-[16px]">
              <Search />
            </div>
          </div>
        </div>

        <div className="px-[12px] md:px-[24px] border-b border-[rgba(0,0,0,0.05)]">
          <div className="hidden lg:block">
            <Categories />
          </div>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  </>
}
