import { NewsLinkType } from "@/Types/Client.types";
import { GetImageUrlCdn, slugUrl } from "@/Utils";
import Image from "next/image";
import Link from "next/link";

export default function NewsMenuItem({ item }: { item: NewsLinkType }) {
  const imgUrl = GetImageUrlCdn(item.imageId!);

  return (
    <Link
      href={`/haberler/${slugUrl(item.categoryName!)}/${slugUrl(item.title!)}/${item.id}`}
      className="flex w-full flex-col justify-items-start gap-1"
    >
      <div className="relative h-[130px] w-full">
        <Image
          src={imgUrl.small}
          className="object-cover object-center"
          alt={item.title!}
          fill
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
