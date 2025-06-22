import dynamic from "next/dynamic";
import { CategoryNewsListSingleItemType } from "@/Types/Client.types";
import { cn, dateFormat, slugUrl } from "@/Utils";
import Link from "next/link";
const CustomImage = dynamic(() => import("../../Common/CustomImage"));

export default function LastNewsSingleItem({
  item,
  hasBorder = true,
}: {
  item: CategoryNewsListSingleItemType;
  hasBorder?: boolean;
}) {
  return (
    <Link
      href={`/haberler/${slugUrl(item.categoryName)}/${slugUrl(item.title)}/${item.id}`}
      className="relative mb-4 flex h-full w-full shrink-0 grow-0 flex-col gap-2 overflow-hidden"
    >
      <div
        className={cn(
          "block w-full overflow-hidden",
          hasBorder && "border border-gray-200",
        )}
      >
        <CustomImage
          imageId={item.imageId}
          width={290}
          height={160}
          style={{ width: "100%" }}
          title={item.title}
          keyField="medium"
          className="hover object-cover object-center transition-all hover:scale-105"
        />
      </div>

      <h4 className="text-primary text-sm font-semibold capitalize">
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
