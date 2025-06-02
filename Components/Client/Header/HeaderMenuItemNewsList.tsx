import { cn } from "@/Utils";
import NewsMenuItem from "../Content/NewsMenuItem";
import { CategoryNewsListSingleItemType } from "@/Types/Client.types";

export default function HeaderMenuItemNewsList({
  list,
  isHovered,
}: {
  list: CategoryNewsListSingleItemType[];
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
          {list.map((news, index) => (
            <NewsMenuItem item={news} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
