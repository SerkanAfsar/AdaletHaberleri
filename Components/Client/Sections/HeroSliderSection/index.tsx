import dynamic from "next/dynamic";

import { GetLastFiveNewsService, NewsDetailPickType } from "@/Services";

const HeroSliderContent = dynamic(() => import("./HeroSliderContent"));

export default async function HeroSliderSection() {
  const result = await GetLastFiveNewsService();
  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return (
    <section
      data-spacing="true"
      className="container h-[300px] w-full xl:h-[450px]"
    >
      <HeroSliderContent items={(result.data as NewsDetailPickType[]) ?? []} />
    </section>
  );
}
