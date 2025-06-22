"use client";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderMiddleLinkType } from "@/Types/Client.types";

const HeaderMenuItemNewsList = dynamic(() => import("./HeaderMenuItemList"));

export default function HeaderMenuItemSingle({
  item,
}: {
  item: HeaderMiddleLinkType;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const pathName = usePathname();

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
        <>{item.categoryName}</>
        <ChevronDown
          size={18}
          className="font-light transition-all group-hover:-rotate-180"
        />
      </div>
      <HeaderMenuItemNewsList isHovered={isHovered} item={item} />
    </div>
  );
}
