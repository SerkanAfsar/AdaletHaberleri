import LastNewsSection from "@/Components/Client/Content/LastNewsSection";

import NewsCategorySectionWrapper from "@/Components/Client/Content/NewsCategorySectionWrapper";

export default async function Page() {
  return (
    <div className="container mx-auto pt-10">
      <NewsCategorySectionWrapper />
      <LastNewsSection />
    </div>
  );
}
