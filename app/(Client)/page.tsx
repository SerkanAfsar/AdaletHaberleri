import dynamic from "next/dynamic";
const LastNewsSection = dynamic(
  () => import("../../Components/Client/Content/LastNewsSection"),
);
const NewsCategorySectionWrapper = dynamic(
  () => import("../../Components/Client/Content/NewsCategorySectionWrapper"),
);
const HeroSlider = dynamic(
  () => import("../../Components/Client/Sections/HeroSlider"),
);

export default async function Page() {
  return (
    <div className="container mx-auto pt-10">
      <HeroSlider />
      <NewsCategorySectionWrapper />
      <LastNewsSection />
    </div>
  );
}
