import { ResponseResult } from "@/Types";
import { FooterLinkItemType } from "@/Types/Client.types";
import { cn } from "@/Utils";
import Link from "next/link";

export type FooterMenuSectionType = {
  title: string;
  className?: string;
  service: Promise<ResponseResult<any>>;
  direction?: "col" | "row";
  textClass?: "text-sm" | "text-lg";
};
export default async function FooterMenuSection({
  title,
  className,
  service,
  direction = "row",
  textClass = "text-sm",
}: FooterMenuSectionType) {
  const result = await service;
  if (!result.success) {
    return <div>{result.error}</div>;
  }
  const data: FooterLinkItemType[] = result.data;

  return (
    <section className={cn("flex flex-col gap-3", className && className)}>
      <h6 className="text-base text-white/50 uppercase">{title}</h6>
      <ul
        className={cn(
          "flex w-full flex-wrap gap-3 text-sm text-white",
          direction == "col" && "flex-col",
        )}
      >
        {data.map((item, index) => (
          <li key={index}>
            <Link
              className={cn(textClass == "text-lg" && "uppercase", textClass)}
              href={item.url}
              title={item.linkTitle}
              dangerouslySetInnerHTML={{
                __html: item.linkTitle,
              }}
            ></Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
