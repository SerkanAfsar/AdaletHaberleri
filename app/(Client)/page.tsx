import LastNewsSection from "@/Components/Client/Content/LastNewsSection";
import NewsCategorySectionWrapper from "@/Components/Client/Content/NewsCategorySectionWrapper";
import HeroSlider from "@/Components/Client/Sections/HeroSlider";

export default async function Page() {
  return (
    <div className="container mx-auto pt-10">
      <HeroSlider />
      <NewsCategorySectionWrapper />
      <LastNewsSection />
    </div>
  );
}
