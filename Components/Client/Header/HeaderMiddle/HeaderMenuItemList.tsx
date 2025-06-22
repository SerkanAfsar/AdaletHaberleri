import dynamic from "next/dynamic";
import { cn } from "@/Utils";
import NewsMenuItem from "../../Common/NewsMenuItem";
import {
  CategoryLinkType,
  HeaderMiddleLinkType,
  NewsLinkType,
} from "@/Types/Client.types";

const CategoryMenuItem = dynamic(() => import("../../Common/CategoryMenuItem"));

export default function HeaderMenuItemList({
  item,
  isHovered,
}: {
  item: HeaderMiddleLinkType;
  isHovered: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-[100%] left-0 z-20 hidden w-full transition-all",
        isHovered && "animate-fromTop block",
      )}
    >
      <div className="container mx-auto">
        <div className="border-t-none grid grid-cols-5 gap-3 rounded-md rounded-tl-none rounded-tr-none border border-gray-300 bg-white p-6 text-black">
          {item.Data.map((newsItem, index) => {
            return item.type == "News" ? (
              <NewsMenuItem key={index} item={newsItem as NewsLinkType} />
            ) : (
              <CategoryMenuItem
                key={index}
                item={newsItem as CategoryLinkType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
