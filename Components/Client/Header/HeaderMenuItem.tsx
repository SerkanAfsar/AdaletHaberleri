"use client";
import { ChevronDown } from "lucide-react";

import { useEffect, useState } from "react";
import HeaderMenuItemNewsList from "./HeaderMenuItemNewsList";
import { usePathname } from "next/navigation";

export default function HeaderMenuItem<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
>({ item, k1, k2 }: { item: T; k1: K1; k2: K2 }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const pathName = usePathname();

  const categoryName = item[k1];
  const list = [...(item[k2] as any[])].map((item) => ({
    ...item,
    categoryName,
  }));

  useEffect(() => {
    setIsHovered(false);
  }, [pathName]);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group z-10 cursor-pointer gap-[2px]"
    >
      <div className="flexCenter relative !justify-between gap-2 py-6 text-lg">
        <div className="bg-primary absolute top-0 left-0 hidden h-1 w-[83%] group-hover:block"></div>
        <>{categoryName}</>
        <ChevronDown
          size={18}
          className="font-light transition-all group-hover:-rotate-180"
        />
      </div>

      <HeaderMenuItemNewsList isHovered={isHovered} list={list as any[]} />
    </div>
  );
}
