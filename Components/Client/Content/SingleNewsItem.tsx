"use client";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { CategoryNewsListSingleItemType } from "@/Types/Client.types";
import { cn, dateFormat, GetImageUrlCdn, slugUrl } from "@/Utils";

import Image from "next/image";
import Link from "next/link";

export default function SingleNewsItem({
  item,
}: {
  item: CategoryNewsListSingleItemType;
}) {
  const { matched } = useMediaQuery("(max-width:768px)");
  const elem: typeof item.type = matched ? "big" : item.type;

  const imgUrl = GetImageUrlCdn(item.imageId);

  const imgContent = () => {
    if (elem == "big") {
      const imgPath = "large" in imgUrl ? imgUrl.large : imgUrl;
      return (
        <Link
          href={`/haberler/${slugUrl(item.categoryName)}/${slugUrl(item.title)}/${item.id}`}
          className="relative h-full w-full overflow-hidden border border-gray-400"
        >
          <Image
            src={imgPath}
            width={800}
            height={300}
            alt={item.title || "Haber"}
            className="hover object-cover object-center transition-all hover:scale-105"
          />
        </Link>
      );
    }
    const imgPath = "medium" in imgUrl ? imgUrl.medium : imgUrl;
    return (
      <Link
        href={`/haberler/${slugUrl(item.categoryName)}/${slugUrl(item.title)}/${item.id}`}
        className="relative block shrink-0 grow-0 overflow-hidden border border-gray-400"
      >
        <Image
          src={imgPath}
          width={150}
          height={85}
          alt={item.title || "Haber"}
          className="hover h-full object-cover object-center transition-all hover:scale-105"
        />
      </Link>
    );
  };

  return (
    <article
      className={cn(
        "items-star flex w-full justify-start gap-3",
        elem == "big"
          ? "flex-col"
          : "mb-3 flex-row border-b border-gray-300 pb-3 last:border-0",
      )}
    >
      {imgContent()}
      <div className={cn("flex flex-col", elem == "big" ? "gap-3" : "")}>
        <h4 className="text-primary text-sm capitalize">
          {item.categoryName}{" "}
          <span className="text-xs text-gray-500">
            {"-"}&nbsp;&nbsp;
            {dateFormat(item.createdAt)}
          </span>
        </h4>
        <Link
          href={`/haberler/${slugUrl(item.categoryName)}/${slugUrl(item.title)}/${item.id}`}
          className={cn(
            "line-clamp-3 font-semibold",
            elem == "big" ? "uppercase xl:text-lg" : "text-sm capitalize",
          )}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></Link>
        {elem == "big" && (
          <p
            className="text-sm leading-6 text-gray-600"
            dangerouslySetInnerHTML={{ __html: item.subDescription ?? "" }}
          ></p>
        )}
      </div>
    </article>
  );
}
