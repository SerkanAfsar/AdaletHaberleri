import dynamic from "next/dynamic";
import { HeaderMiddleLinkType } from "@/Types/Client.types";

import { GetMenuListCacheService } from "@/CachingServices/News.CacheService";
const HeaderMenuItem = dynamic(() => import("./HeaderMenuItemSingle"));

export default async function HeaderMiddleNavSection() {
  const result = await GetMenuListCacheService();

  if (!result.success) {
    return <div>{result.message}</div>;
  }
  const data = result.data as HeaderMiddleLinkType[];
  return (
    <nav className="hidden flex-auto xl:block">
      <ul className="flexCenter gap-3 font-semibold">
        {data.map((item: HeaderMiddleLinkType, index: number) => (
          <li key={index}>
            <HeaderMenuItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
