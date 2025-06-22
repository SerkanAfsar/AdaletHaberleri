import {
  GetNewsDetailByIdService,
  IncreaseReadedCountService,
  NewsDetailPickType,
} from "@/Services";

import { notFound } from "next/navigation";
import NewsDetailLastNewsList from "../Components/NewsDetailLastNewsList";
import NewsDetailSection from "../Components/NewsDetailSection";
import BreadCrumb from "@/Components/Client/Common/BreadCrumb";
import { generateCategoryUrl, generateNewsUrl } from "@/Utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const id = Number(slug[2]);

  if (isNaN(Number(id))) {
    return notFound();
  }

  const result = await GetNewsDetailByIdService({ id });
  if (result.error) {
    return <div>{result.error}</div>;
  }
  const data = result.data as NewsDetailPickType;
  if (!data) {
    return notFound();
  }

  await IncreaseReadedCountService({ id });

  return (
    <>
      <BreadCrumb
        items={[
          {
            title: data.Category!.categoryName,
            url: generateCategoryUrl(
              data.Category!.categoryName,
              data.categoryId!,
            ),
          },
          {
            title: data.title,
            url: generateNewsUrl(
              data.Category!.categoryName,
              data.title,
              data.id,
            ),
          },
        ]}
      />
      <section className="container mx-auto flex w-full flex-col gap-3 py-6 xl:flex-row">
        <NewsDetailSection className="flex-auto xl:flex-2/3" data={data} />
        <NewsDetailLastNewsList
          className="flex-auto self-start xl:flex-1/3"
          categoryId={data.categoryId!}
        />
      </section>
    </>
  );
}

export const dynamic = "force-dynamic";
