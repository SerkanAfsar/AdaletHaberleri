import dynamic from "next/dynamic";
import { NewsLinkType } from "@/Types/Client.types";
import { slugUrl } from "@/Utils";
import Link from "next/link";
const CustomImage = dynamic(() => import("../Common/CustomImage"));

export default function NewsMenuItem({ item }: { item: NewsLinkType }) {
  return (
    <Link
      href={`/haberler/${slugUrl(item.categoryName!)}/${slugUrl(item.title!)}/${item.id}`}
      className="flex w-full flex-col justify-items-start gap-1"
    >
      <div className="relative h-[130px] w-full">
        <CustomImage
          imageId={item.imageId}
          className="object-cover object-center"
          title={item.title || "Haber"}
          fill
          keyField="small"
        />
      </div>
      <span className="text-primary block text-left text-sm">
        {item?.categoryName}
      </span>
      <h3
        className="-mt-1 line-clamp-2 text-sm"
        dangerouslySetInnerHTML={{ __html: item.title! }}
      ></h3>
    </Link>
  );
}
