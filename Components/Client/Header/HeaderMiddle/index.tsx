import dynamic from "next/dynamic";
import Link from "next/link";

const HeaderAsideRightSection = dynamic(
  () => import("./HeaderMiddleRightSection"),
);
const HeaderMiddleNavSection = dynamic(
  () => import("./HeaderMiddleNavSection"),
);

export default function HeaderMiddleSection() {
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
