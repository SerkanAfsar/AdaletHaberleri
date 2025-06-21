import Link from "next/link";

import HeaderAsideRightSection from "./HeaderMiddleRightSection";
import { HeaderMiddleNavSection } from "./HeaderMiddleNavSection";

export default async function HeaderMiddleSection() {
  return (
    <section className="block w-full bg-white">
      <div className="relative container mx-auto flex items-center justify-between py-3 xl:py-0">
        <Link href={"/"} className="text-primary block text-lg font-bold">
          ADALET HABERLERİ
        </Link>
        <HeaderMiddleNavSection />
        <HeaderAsideRightSection />
      </div>
    </section>
  );
}
