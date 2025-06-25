import { GetLastFiveNewsCacheService } from "@/CachingServices/News.CacheService";
import { NewsDetailPickType } from "@/Services";
import { generateNewsUrl } from "@/Utils";

import Link from "next/link";
import Marquee from "react-fast-marquee";

export default async function HeaderTopWrapper() {
  const result = await GetLastFiveNewsCacheService();
  if (!result.success) {
    return <div>Err</div>;
  }
  const data = result.data as NewsDetailPickType[];
  return (
    <div className="container flex flex-col items-center justify-between md:flex-row">
      <ul className="flexCenter gap-3 font-semibold text-gray-600">
        <li>
          <Link title="Adalet Haberleri" href={"/"} className="block py-3">
            Anasayfa
          </Link>
        </li>
        <li>
          <Link title="Adalet Haberleri" href={"/"} className="block py-3">
            Hakkımızda
          </Link>
        </li>
        <li>
          <Link href={"/"} title="Adalet Haberleri" className="block py-3">
            İletişim
          </Link>
        </li>
      </ul>
      <ul className="flex max-w-lg gap-6 font-semibold uppercase">
        <Marquee autoFill pauseOnHover={true}>
          {data.map((item, index) => (
            <li className="mr-6" key={index}>
              <Link
                className="underline underline-offset-2"
                href={generateNewsUrl(
                  item!.Category!.categoryName!,
                  item!.title!,
                  item!.id!,
                )}
                title={item?.title}
              >
                {item?.title.replace("#39", "")}
              </Link>
            </li>
          ))}
        </Marquee>
      </ul>
    </div>
  );
}
