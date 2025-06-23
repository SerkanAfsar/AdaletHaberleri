import dynamic from "next/dynamic";
import { Category } from "@prisma/client";
import { GetHeaderBottomCategoryCacheService } from "@/CachingServices/Category.CacheService";

const OtherCategories = dynamic(() => import("./OtherCategories"));
const MainCategories = dynamic(() => import("./MainCategories"));

export default async function HeaderBottomSection() {
  const result = await GetHeaderBottomCategoryCacheService();
  if (result.error) {
    return <div className="text-red-500">{result.message} Hata</div>;
  }
  const data = result.data as Category[];

  return (
    <section className="bg-primary hidden w-full text-sm text-white uppercase lg:block">
      <div className="relative container mx-auto flex items-center justify-between">
        <MainCategories data={data.slice(0, 7)} />
        <OtherCategories data={data.slice(7, data.length)} />
      </div>
    </section>
  );
}
