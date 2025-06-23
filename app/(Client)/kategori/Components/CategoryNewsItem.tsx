import CustomImage from "@/Components/Client/Common/CustomImage";
import { CategoryWithNewsType } from "@/Types/Client.types";
import { generateNewsUrl } from "@/Utils";

import Link from "next/link";

type CategoryNewsItemType = CategoryWithNewsType["Newses"][0];
export default function CategoryNewsItem({
  item,
  categoryName,
}: {
  item: CategoryNewsItemType;
  categoryName: string;
}) {
  if (item) {
    return (
      <article className="relative flex w-full flex-col gap-3">
        <figure className="group block w-full overflow-hidden rounded-xl">
          <CustomImage
            title={item.title}
            imageId={item.imageId}
            className="block h-auto w-full object-cover object-center transition-all group-hover:scale-110"
            width={400}
            height={200}
            keyField="large"
          />
          <figcaption className="hidden">{item?.title}</figcaption>

          <Link
            className="absolute inset-0 indent-[-9999px] before:absolute before:inset-0 before:content-['']"
            href={generateNewsUrl(categoryName, item.title, item.id)}
          >
            {item?.title}
          </Link>
        </figure>
        <header>
          <h2
            className="line-clamp-2 block w-full text-left text-sm font-semibold uppercase"
            dangerouslySetInnerHTML={{ __html: item?.title || "Haber" }}
          ></h2>
          <h3 className="text-primary absolute top-4 left-4 rounded-md bg-white px-2 py-1 text-xs font-semibold uppercase shadow">
            {categoryName}
          </h3>
        </header>
      </article>
    );
  }
  return null;
}
