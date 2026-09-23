import Image from "next/image";
import clsx from "clsx";
import scopedbMark from "@/assets/scopedb-mark.svg";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-[9px] leading-none", className)}>
      <Image
        src={scopedbMark}
        alt=""
        width={22}
        height={22}
        priority
        unoptimized
        className="block"
      />
      <span className="font-sans text-[18px] font-[680] tracking-[-0.03em] leading-none text-black">
        ScopeDB
      </span>
    </span>
  );
}
