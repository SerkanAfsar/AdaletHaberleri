import dynamic from "next/dynamic";
import { GetHeaderBottomCategoryCacheService } from "@/Caches/Category.CacheService";
import { Category } from "@prisma/client";

const OtherCategories = dynamic(() => import("./OtherCategories"));
const MainCategories = dynamic(() => import("./MainCategories"));

export default async function HeaderBottomSection() {
  const result = await GetHeaderBottomCategoryCacheService();
  if (result.error) {
    return <div>{result.message}</div>;
  }
  const data = result.data as Category[];

  return (
    <section className="bg-primary hidden w-full text-sm text-white uppercase lg:block">
      <div className="relative container mx-auto flex items-center justify-between">
        <MainCategories data={data.slice(0, 8)} />
        <OtherCategories data={data.slice(8, data.length)} />
      </div>
    </section>
  );
}
