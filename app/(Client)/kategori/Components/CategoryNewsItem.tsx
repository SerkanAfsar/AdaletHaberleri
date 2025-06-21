import { CategoryWithNewsType } from "@/Types/Client.types";
import { generateNewsUrl, GetImageUrlCdn } from "@/Utils";
import Image, from "next/image";
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
    const newsImageSrc = GetImageUrlCdn(item.imageId);

    const imgSource =
      "large" in newsImageSrc ? newsImageSrc.large : newsImageSrc;

    return (
      <article className="relative flex w-full flex-col gap-3">
        <figure className="group relative block w-full overflow-hidden rounded-xl">
          <Image
            alt={item?.title || "Haber"}
            src={imgSource}
            width={400}
            height={220}
            className="block h-auto w-full object-cover object-center transition-all group-hover:scale-110"
          />
          <figcaption className="hidden">{item?.title}</figcaption>

          <Link
            className="absolute inset-0 indent-[-9999px]"
            href={generateNewsUrl(categoryName, item.title, item.id)}
          >
            {item?.title}
          </Link>
        </figure>
        <header>
          <h2
            className="line-clamp-2 block w-full text-left text-[15px] font-semibold uppercase"
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
