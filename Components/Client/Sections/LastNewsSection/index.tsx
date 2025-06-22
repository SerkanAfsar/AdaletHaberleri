import dynamic from "next/dynamic";
import { GetMainPageLastNewsService } from "@/Services/MainPageService";
const LastNewsSingleItem = dynamic(() => import("./LastNewsSingleItem"));

export default async function LastNewsSection() {
  const newsResponseResult = await GetMainPageLastNewsService();
  if (!newsResponseResult.success) {
    return <div>{newsResponseResult.error}</div>;
  }
  const result = newsResponseResult.data.map((item: any) => ({
    ...item,
    categoryName: item.Category?.categoryName,
  }));
  return (
    <section className="container block w-full border-t border-gray-300 pt-10">
      <h2 className="categoryTitle mb-4">Son Haberler</h2>
      <div className="grid w-full gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {result.map((item: any) => (
          <LastNewsSingleItem
            item={{ type: "small", ...item } as any}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
}
