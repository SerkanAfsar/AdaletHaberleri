import dynamic from "next/dynamic";
import { slugUrl } from "@/Utils";
import Link from "next/link";
const SingleNewsItem = dynamic(() => import("./SingleNewsItem"));

type TestType = { id: number; [key: string]: any };

export default function NewsCategorySectionItem<
  T extends TestType,
  K1 extends keyof T,
  K2 extends keyof T,
>({ item, k1, k2 }: { item: T; k1: K1; k2: K2 }) {
  const list = [...(item[k1] as any[])].map((elem) => ({
    ...elem,
    [k2]: item[k2],
  }));
  const { id } = item;

  return (
    <section className="grid w-full grid-cols-5 gap-6 border-t border-gray-300 py-10 first:border-none">
      <h2 className="categoryTitle">
        <Link
          href={`/kategori/${slugUrl(`${list[0].categoryName} haberleri`)}/${id}`}
        >
          {list[0].categoryName}
        </Link>
      </h2>
      <div className="col-span-5 lg:col-span-3">
        <SingleNewsItem item={{ ...list[0], type: "big" } as any} />
      </div>
      <div className="col-span-5 flex grid-cols-2 flex-col gap-6 lg:col-span-2 lg:gap-0">
        {list.slice(1, list.length).map((item, index) => (
          <SingleNewsItem
            item={{ ...item, type: "small" } as any}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
