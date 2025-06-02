import { CategoryNewsListSingleItemType } from "@/Types/Client.types";
import { dateFormat, GetImageUrlCdn, slugUrl } from "@/Utils";
import Link from "next/link";
import Image from "next/image";

export default function LastNewsSingleItem({
  item,
}: {
  item: CategoryNewsListSingleItemType;
}) {
  const imgUrl = GetImageUrlCdn(item.imageId!);
  return (
    <Link
      href={`/haberler/${slugUrl(item.categoryName)}/${slugUrl(item.title)}/${item.id}`}
      className="relative mb-4 flex h-full w-full shrink-0 grow-0 flex-col gap-2 overflow-hidden"
    >
      <div className="block w-full overflow-hidden border border-gray-200">
        <Image
          src={imgUrl.medium}
          width={290}
          height={160}
          style={{
            width: "100%",
          }}
          alt={item.title || "Haber"}
          className="hover object-cover object-center transition-all hover:scale-105"
        />
      </div>

      <h4 className="text-primary text-sm capitalize">
        {item.categoryName}{" "}
        <span className="text-xs text-gray-500">
          {"-"}&nbsp;&nbsp;
          {dateFormat(item.createdAt)}
        </span>
      </h4>
      <h5
        className="line-clamp-2 text-sm font-bold uppercase"
        dangerouslySetInnerHTML={{
          __html: item.title,
        }}
      ></h5>
    </Link>
  );
}
