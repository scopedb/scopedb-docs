import { useCallback, useSyncExternalStore } from "react";

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
  const subscribe = useCallback((onChange: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
