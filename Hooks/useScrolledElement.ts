import React, { useEffect, useState } from "react";

export default function useScrolledElement(
  ref: React.RefObject<HTMLElement | null>,
) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      if (ref?.current) {
        setIsScrolled(window.scrollY >= ref.current.clientHeight);
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [ref]);

  return { isScrolled };
}
