import { Deneme, GetCategoryDetailWithLastNews } from "@/Services";
import { notFound } from "next/navigation";
import NewsDetailLastNewsList from "../Components/NewsDetailLastNewsList";
import NewsDetailSection from "../Components/NewsDetailSection";
import { envVariables } from "@/Utils";
import { Metadata } from "next";

import { Suspense } from "react";
import { NewsDetailCacheService } from "@/CachingServices/News.CacheService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = Number(slug[2]);

  const result = await NewsDetailCacheService({ id });
  const data = result.data as Deneme;

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    robots: "index,follow",
    publisher: "Adalet Haberleri",
    authors: [
      {
        name: "Adalet Haberleri",
        url: envVariables.NEXT_PUBLIC_BASE_URL,
      },
    ],

    openGraph: {
      title: data.seoTitle ?? "Adalet Haberleri",
      description: data.seoDescription ?? "Adalet Haberleri",
      url: `${envVariables.NEXT_PUBLIC_BASE_URL}/${slug.join("/")}`,
      locale: "tr_TR",
      siteName: "Adalet Haberleri",
      authors: ["Adalet Haberleri"],
      emails: ["info@adalethaberleri.com"],
    },

    twitter: {
      card: "summary",
      description: data.seoDescription ?? "Adalet Haberleri",
      title: data.seoTitle ?? "Adalet Haberleri",
      creator: "@adalethaberleri",
    },

    alternates: {
      canonical: `${envVariables.NEXT_PUBLIC_BASE_URL}/${slug.join("/")}`,
    },
  };
}

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

  const result = await NewsDetailCacheService({ id });
  if (result.error) {
    return <div>{result.error}</div>;
  }
  const data = result.data as Deneme;
  if (!data) {
    return notFound();
  }
  const lastNewsDataFunc = GetCategoryDetailWithLastNews({
    id: data.categoryId!,
  });

  return (
    <>
      {/* <BreadCrumb
        items={[
          {
            title: data.Category!.categoryName,
            url: generateCategoryUrl(
              data.Category!.categoryName,
              data.Category!.id,
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
      /> */}
      <section className="container mx-auto flex w-full flex-col gap-3 py-6 xl:flex-row">
        <NewsDetailSection
          className="flex-auto grow-0 xl:flex-2/3"
          data={data}
        />
        <Suspense
          fallback={<div className="flex-auto xl:flex-1/3">Loading...</div>}
        >
          <NewsDetailLastNewsList
            className="flex-auto self-start xl:flex-1/3"
            dataFunc={lastNewsDataFunc}
          />
        </Suspense>
      </section>
    </>
  );
}

export const dynamic = "force-dynamic";
