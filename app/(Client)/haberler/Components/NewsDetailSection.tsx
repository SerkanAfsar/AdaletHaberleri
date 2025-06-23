import CustomImage from "@/Components/Client/Common/CustomImage";
import { Deneme, IncreaseReadedCountService } from "@/Services";
import { cn } from "@/Utils";

export default async function NewsDetailSection({
  data,
  className,
}: {
  data: Deneme;
  className: string;
}) {
  if (!data) {
    return null;
  }
  await IncreaseReadedCountService({ id: data.id });

  const readableDate = new Date(data.createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return (
    <article className={cn("flex flex-col gap-3", className)}>
      <header className="flex flex-col gap-3">
        <h1
          className="text-xl font-bold uppercase"
          dangerouslySetInnerHTML={{ __html: data.title }}
        ></h1>
        <figure className="block w-full">
          <CustomImage
            width={835}
            height={470}
            className="object-fit-cover h-auto w-full rounded-md border object-center"
            imageId={data.imageId}
            keyField="large"
            title={data.title}
          />
          <figcaption
            className="hidden"
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></figcaption>
        </figure>
        <div className="flex items-center justify-between text-sm">
          <time className="font-bold" dateTime={readableDate}>
            {readableDate}
          </time>
          <b className="flex gap-1">{data.readedCount} Okunma</b>
        </div>
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
      <div className="flex items-start gap-1 text-sm font-bold">
        <b>Kaynak</b>
        <span>:</span>
        <span>{data.sourceUrlLink}</span>
      </div>
    </article>
  );
}
