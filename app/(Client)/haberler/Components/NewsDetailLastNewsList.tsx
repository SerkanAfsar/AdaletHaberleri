import SingleNewsItem from "@/Components/Client/Content/SingleNewsItem";
import { GetNewsDetailLastNewsListService } from "@/Services";
import { cn } from "@/Utils";

export type NewsDetailLastNewsListProps = {
  categoryId: number;
  className?: string;
};
export default async function NewsDetailLastNewsList({
  categoryId,
  className,
}: NewsDetailLastNewsListProps) {
  const result = await GetNewsDetailLastNewsListService({ categoryId });
  if (!result.success) {
    return <div>{result.error}</div>;
  }

  const data = (result.data as any[]).map((item) => ({
    ...item,
    categoryName: item.Category.categoryName,
  }));

  return (
    <aside
      className={cn(
        "bg-customGray sticky top-32 z-0 mb-14 flex h-auto flex-col rounded-md p-6 xl:mt-10 [&>article]:last:mb-0",
        className,
      )}
    >
      <h2 className="mb-3 w-full text-xl font-bold text-black">
        EN SON HABERLER
      </h2>
      {data.map((item, index) => (
        <SingleNewsItem item={item} key={index} />
      ))}
    </aside>
  );
}
