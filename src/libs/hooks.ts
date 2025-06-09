import { useEffect, useState, useRef } from "react";

const matchMedia = (query: string) => {
  const watcher = window.matchMedia(query);
  return {
    watcher,
    matches: watcher.matches,
  };
};

export function useMedia(query: string): boolean {
  const [matched, setMatched] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const { watcher } = matchMedia(query);
    const onChange = () => setMatched(!!watcher.matches);
    watcher.addEventListener("change", onChange);
    return () => watcher.removeEventListener("change", onChange);
  }, [query]);
  return matched;
}

export function useScrollLock(lock: boolean): void {
  const previousOverflowRef = useRef("");
  useEffect(() => {
    if (!lock) {
      return;
    }

    /* istanbul ignore next */
    if (typeof document === "undefined") {
      return;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Do not reset if other scripts modify style.
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = previousOverflowRef.current;
      }
    };
  }, [lock]);
}
