"use client";
import dynamic from "next/dynamic";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { CategoryNewsListSingleItemType } from "@/Types/Client.types";
import { cn, dateFormat, generateNewsUrl } from "@/Utils";
import Link from "next/link";
const CustomImage = dynamic(() => import("./CustomImage"));

export default function SingleNewsItem({
  item,
}: {
  item: CategoryNewsListSingleItemType;
}) {
  const { matched } = useMediaQuery("(max-width:768px)");
  const elem: typeof item.type = matched ? "big" : item.type;

  const imgContent = () => {
    if (elem == "big") {
      return (
        <Link
          title={item.title}
          href={generateNewsUrl(item.categoryName, item.title, item.id)}
          className="relative h-full w-full overflow-hidden border border-gray-400"
        >
          <CustomImage
            width={800}
            height={300}
            title={item.title}
            imageId={item.imageId}
            keyField="large"
            className={
              "hover object-cover object-center transition-all hover:scale-105"
            }
          />
        </Link>
      );
    }

    return (
      <Link
        title={item.title}
        href={generateNewsUrl(item.categoryName, item.title, item.id)}
        className="relative block shrink-0 grow-0 overflow-hidden border border-gray-400"
      >
        <CustomImage
          width={150}
          height={85}
          title={item.title}
          imageId={item.imageId}
          keyField="medium"
          className={
            "hover h-full object-cover object-center transition-all hover:scale-105"
          }
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
          title={item.title}
          href={generateNewsUrl(item.categoryName, item.title, item.id)}
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
