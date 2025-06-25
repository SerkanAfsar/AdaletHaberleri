"use client";
import useScrolledElement from "@/Hooks/useScrolledElement";
import { useRef } from "react";

export default function HeaderTop({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);
  const { isScrolled } = useScrolledElement(ref);
  return (
    <section
      ref={ref}
      className="hidden w-full border-b border-gray-300 bg-white text-sm transition-all delay-300 lg:block"
      style={
        isScrolled
          ? {
              marginTop: `-${ref.current?.clientHeight}px`,
            }
          : {}
      }
    >
      {children}
    </section>
  );
}
