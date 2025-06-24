import { CategoryLastNewsCacheResult } from "@/CachingServices/Category.CacheService";
import SingleNewsItem from "@/Components/Client/Common/SingleNewsItem";
import { CategoryDetailWithNewsType } from "@/Services";
import { ResponseResult } from "@/Types";

import { cn } from "@/Utils";

export default async function NewsDetailLastNewsList({
  className,
  categoryId,
}: {
  className: string;
  categoryId: number;
}) {
  const result: ResponseResult<CategoryDetailWithNewsType> =
    await CategoryLastNewsCacheResult({ id: categoryId });

  if (!result.success) {
    return <div>{result.error}</div>;
  }
  const data = result.data as CategoryDetailWithNewsType;

  return (
    <aside
      className={cn(
        "bg-customGray sticky top-32 z-0 mb-14 flex h-auto flex-col rounded-md p-6 xl:mt-10 [&>article]:last:mb-0",
        className,
      )}
    >
      <h2 className="mb-3 w-full text-lg font-bold text-black uppercase">
        {data.categoryName} EN SON HABERLER
      </h2>
      {data?.Newses?.map((item, index) => (
        <SingleNewsItem
          item={{
            categoryName: data.categoryName,
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
