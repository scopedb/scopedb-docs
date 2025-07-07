import Search from "@/components/Search";
import Categories from "./Categories";
import Link from "next/link";
import MobileNav from "./MobileNav";
import Image from "next/image";

export default function Header() {
  return <>
    <div className="fixed top-0 left-0 right-0 z-50 bg-white min-h-[56px] lg:min-h-[98px] border-b border-[rgba(0,0,0,0.03)]">
      <div className="max-w-[1440px] mx-auto pt-[14px] px-[12px] md:px-[24px]">
        <div className="flex pb-[14px] items-center justify-between border-b border-[rgba(0,0,0,0.03)]">
          <div className="title-wrapper flex items-center gap-[24px]" >
            <Link href="/" className="flex items-center gap-[12px]">
              <Image src="/scopedb-logo.png" alt="ScopeDB Logo" height={35} width={120} />
              <span className="ml-[14px] text-[16px] font-bold tracking-[.72px] text-primary">
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

        <div className=" ">
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
