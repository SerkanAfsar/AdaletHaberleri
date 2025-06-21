"use client";

import { useMobileMenuContext } from "@/Contexts/MobileMenuContext";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { cn, generateCategoryUrl } from "@/Utils";
import { Category } from "@prisma/client";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useLayoutEffect } from "react";

export default function MobileMenuWrapper({ list }: { list: Category[] }) {
  const pathName = usePathname();
  const { isOpened, setIsOpened } = useMobileMenuContext();
  const { matched } = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    if (matched || pathName) {
      setIsOpened(false);
    }
  }, [matched, setIsOpened, pathName]);

  useLayoutEffect(() => {
    if (isOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpened]);

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 left-0 flex h-full w-[300px] flex-col bg-white shadow transition-all",
        isOpened
          ? "z-20 ml-0 before:fixed before:inset-0 before:z-10 before:bg-black/20 before:transition-all before:content-['']"
          : "-ml-[300px]",
      )}
    >
      <div className="bg-primary sticky inset-0 z-20 flex w-full items-center justify-between p-4 text-white">
        <h3 className="font-semibold">ADALET HABERLERİ</h3>
        <X
          size={25}
          className="cursor-pointer"
          onClick={() => setIsOpened(false)}
        />
      </div>
      <nav className="z-20 block w-full flex-auto overflow-auto overscroll-contain bg-white p-4">
        <ul className="flex flex-col gap-2">
          <li className="block w-full">
            <Link
              title="Anasayfa"
              href={"/"}
              className="block w-full py-1 font-semibold uppercase"
            >
              Anasayfa
            </Link>
          </li>
          {list.map((category) => (
            <li key={category.id} className="block w-full">
              <Link
                className="block w-full py-1 font-semibold uppercase"
                title={category.categoryName}
                href={generateCategoryUrl(category.categoryName, category.id)}
              >
                {category.categoryName}
              </Link>
            </li>
          ))}
          <li className="block w-full">
            <Link
              title="İletişim"
              href={"/"}
              className="block w-full py-1 font-semibold uppercase"
            >
              İletişim
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
