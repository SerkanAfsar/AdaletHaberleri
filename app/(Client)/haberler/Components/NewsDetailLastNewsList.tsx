import SingleNewsItem from "@/Components/Client/Common/SingleNewsItem";
import { Deneme } from "@/Services";
import { cn } from "@/Utils";

type OtherNews = Deneme["Category"];

export default async function NewsDetailLastNewsList({
  list,
  className,
}: {
  list: OtherNews;
  className: string;
}) {
  return (
    <aside
      className={cn(
        "bg-customGray sticky top-32 z-0 mb-14 flex h-auto flex-col rounded-md p-6 xl:mt-10 [&>article]:last:mb-0",
        className,
      )}
    >
      <h2 className="mb-3 w-full text-lg font-bold text-black">
        {list?.categoryName} EN SON HABERLER
      </h2>
      {list?.Newses.map((item, index) => (
        <SingleNewsItem
          item={{
            categoryName: list.categoryName,
            createdAt: item.createdAt,
            id: item.id,
            imageId: item.imageId,
            subDescription: item.subDescription,
            title: item.title,
          }}
          key={index}
        />
      ))}
    </aside>
  );
}
