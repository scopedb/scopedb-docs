import { useEffect, useState } from "react";

/* See also https://tailwindcss.com/docs/responsive-design */

export function useIsSmMedia(): boolean {
  return useMedia("(min-width: 640px)");
}

export function useIsMdMedia(): boolean {
  return useMedia("(min-width: 768px)");
}

export function useIsLgMedia(): boolean {
  return useMedia("(min-width: 1024px)");
}

export function useIsXlMedia(): boolean {
  return useMedia("(min-width: 1280px)");
}

export function useIs2XlMedia(): boolean {
  return useMedia("(min-width: 1536px)");
}

function useMedia(query: string): boolean {
  const [matched, setMatched] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      setMatched(event.matches);
    };

    mediaQueryList.addEventListener("change", onChange);

    // Set initial value in case it changed before effect runs
    setMatched(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", onChange);
    };
  }, [query]);

  return matched ?? false;
}
