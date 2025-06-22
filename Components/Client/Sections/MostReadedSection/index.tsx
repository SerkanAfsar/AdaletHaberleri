import { GetMostReadedCacheService } from "@/Caches/News.CacheService";
import MostReadedSlider from "./MostReadedSlider";
import { NewsDetailPickType } from "@/Services";

export default async function MoesReadedSection() {
  const result = await GetMostReadedCacheService();
  if (!result.success) {
    return <div>{result.error}</div>;
  }

  const data =
    Array.isArray(result.data) &&
    result.data?.map((item: any) => ({
      ...item,
      categoryName: item.Category?.categoryName,
    }));

  return (
    <section className="block w-full bg-black py-5 text-white">
      <div className="container">
        <h3 className="mb-5 block w-full text-xl font-bold lg:text-3xl">
          EN ÇOK OKUNAN HABERLER
        </h3>
        <MostReadedSlider items={(data as NewsDetailPickType[]) ?? []} />
      </div>
    </section>
  );
}
