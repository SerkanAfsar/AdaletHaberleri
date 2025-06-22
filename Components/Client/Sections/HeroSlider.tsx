import dynamic from "next/dynamic";
import { GetLastFiveNewsCacheService } from "@/Caches/News.CacheService";
import { NewsDetailPickType } from "@/Services";

const HeroSliderContent = dynamic(() => import("./HeroSliderContent"));

export default async function HeroSlider() {
  const result = await GetLastFiveNewsCacheService();
  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return (
    <section className="h-[450px] w-full">
      <HeroSliderContent items={(result.data as NewsDetailPickType[]) ?? []} />
    </section>
  );
}
