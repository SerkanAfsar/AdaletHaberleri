import { Search } from "lucide-react";
import HeaderMenuItem from "./HeaderMenuItem";
import Link from "next/link";
import { GetMenuListService } from "@/Services/MainPageService";

export default async function HeaderMiddleSection() {
  const result = await GetMenuListService();

  return (
    <section className="block w-full bg-white">
      <div className="relative container mx-auto flex items-center justify-between py-3 xl:py-0">
        <Link href={"/"} className="text-primary block text-lg font-bold">
          ADALET HABERLERİ
        </Link>
        <nav className="hidden flex-auto xl:block">
          <ul className="flexCenter gap-3 font-semibold">
            {result.success ? (
              result.data.map((item: any, index: number) => (
                <li key={index}>
                  <HeaderMenuItem item={item} k1={"categoryName"} k2="Newses" />
                </li>
              ))
            ) : (
              <div>{result.error}</div>
            )}
          </ul>
        </nav>
        <div className="ml-auto">
          <Search size={25} />
        </div>
      </div>
    </section>
  );
}
