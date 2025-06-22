import dynamic from "next/dynamic";
const LastNewsSection = dynamic(
  () => import("../../Components/Client/Sections/LastNewsSection"),
);
const NewsCategorySection = dynamic(
  () => import("../../Components/Client/Sections/NewsCategorySection"),
);
const HeroSlider = dynamic(
  () => import("../../Components/Client/Sections/HeroSliderSection"),
);

const MostReaded = dynamic(
  () => import("../../Components/Client/Sections/MostReadedSection"),
);

export default async function Page() {
  return (
    <>
      <HeroSlider />
      <NewsCategorySection />
      <MostReaded />
      <LastNewsSection />
    </>
  );
}
