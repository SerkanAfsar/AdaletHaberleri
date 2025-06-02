import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [matched, setMatched] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window == undefined) return;
    const handler = () => {
      const media = window.matchMedia(query);
      setMatched(media.matches);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [query]);

  return { matched };
}
