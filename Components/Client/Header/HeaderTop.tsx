"use client";
import useScrolledElement from "@/Hooks/useScrolledElement";
import { CircleUserRound, Scroll, Sun } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HeaderTop() {
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
      <div className="flex-co container flex items-center justify-between">
        <ul className="flexCenter gap-3 font-semibold text-gray-600">
          <li>Storm - 10° C</li>
          <li>
            <Link href={"/"} className="block py-3">
              Anasayfa
            </Link>
          </li>
          <li>
            <Link href={"/"} className="block py-3">
              Hakkımızda
            </Link>
          </li>
        </ul>
        <ul className="flexCenter gap-3 font-bold">
          <li className="flexCenter gap-3">
            <Scroll size={20} />
            <span>Son Haberler</span>
          </li>
          <li className="flexCenter gap-3">
            <CircleUserRound size={20} />
            <span>Admin Panel</span>
          </li>
          <li className="flexCenter rounded-full border border-gray-500 p-1">
            <Sun size={20} />
          </li>
        </ul>
      </div>
    </section>
  );
}
