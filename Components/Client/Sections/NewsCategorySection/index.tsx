import dynamic from "next/dynamic";
import { GetLastNewsMainPageCacheService } from "@/Caches/News.CacheService";
const NewsCategorySectionItem = dynamic(
  () => import("./NewsCategorySectionItem"),
);

export default async function NewsCategorySection() {
  const result = await GetLastNewsMainPageCacheService();
  if (!result.success) {
    return <div>err</div>;
  }

  const sorted =
    Array.isArray(result.data) &&
    result.data?.sort((a: any, b: any) => {
      const dateA = new Date(a.Newses[0]?.createdAt ?? 0);
      const dateB = new Date(b.Newses[0]?.createdAt ?? 0);
      return dateB.getTime() - dateA.getTime();
    });
  return (
    <div className="container">
      {sorted &&
        sorted.map((item: any, key: number) => (
          <NewsCategorySectionItem
            item={item}
            k1={"Newses"}
            k2="categoryName"
            key={key}
          />
        ))}
    </div>
  );
}
