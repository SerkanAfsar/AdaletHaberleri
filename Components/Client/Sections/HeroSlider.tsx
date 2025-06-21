import { GetLastFiveNewsCacheService } from "@/Caches/News.CacheService";
import HeroSliderContent from "./HeroSliderContent";
import { NewsDetailPickType } from "@/Services";

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
