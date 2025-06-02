import { NewsDetailPickType } from "@/Services";
import { cn, GetImageUrlCdn } from "@/Utils";
import Image from "next/image";

export default function NewsDetailSection({
  data,
  className,
}: {
  data: NewsDetailPickType;
  className: string;
}) {
  if (!data) {
    return null;
  }
  const imgUrl = GetImageUrlCdn(data.imageId!);
  return (
    <article className={cn("flex flex-col gap-3", className)}>
      <header className="flex flex-col gap-3">
        <h1
          className="text-xl font-bold uppercase"
          dangerouslySetInnerHTML={{ __html: data.title }}
        ></h1>
        <figure className="block w-full">
          <Image
            src={imgUrl.large}
            width={500}
            height={100}
            className="object-fit-cover w-full rounded-md border object-center"
            alt={data.title}
          />
          <figcaption
            className="hidden"
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></figcaption>
        </figure>
      </header>
      <div className="block w-full">
        <h2
          className="text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: data.subDescription || "" }}
        ></h2>
      </div>
      <div
        className="prose block w-full max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content || "" }}
      ></div>
    </article>
  );
}
