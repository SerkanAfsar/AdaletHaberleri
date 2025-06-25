import BreadCrumb from "@/Components/Client/Common/BreadCrumb";
import { GetCategoryByIdService, GetCategoryDetailWithNews } from "@/Services";
import { CategoryWithNewsType } from "@/Types/Client.types";
import { envVariables, generateCategoryUrl } from "@/Utils";
import { notFound } from "next/navigation";
import CategoryTitle from "../Components/CategoryTitle";

import CategoryNewsItem from "../Components/CategoryNewsItem";
import CategoryPagination from "../Components/CategoryPagination";
import CategoryNewsWrapper from "../Components/CategoryNewsWrapper";
import { Metadata } from "next";
import { Category } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = Number(slug[1]);

  const result = await GetCategoryByIdService({ id: categoryId });

  const data = result.data as Category;

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
  const categoryId = Number(slug[1]);
  const pageNumber = slug.length > 2 ? Number(slug[2]) : 1;
  if (isNaN(categoryId)) {
    return notFound();
  }

  const result = await GetCategoryDetailWithNews({
    id: categoryId,
    page: isNaN(pageNumber) ? 1 : pageNumber,
  });
  if (!result.success) {
    return <div>{result.error || "Hata"}</div>;
  }
  if (!result.data) {
    return notFound();
  }

  const data = result.data as CategoryWithNewsType;

  return (
    <>
      <BreadCrumb
        items={[
          {
            title: data.categoryName!,
            url: generateCategoryUrl(data.categoryName!, data.id!),
          },
        ]}
      />
      <h1 className="hidden">Güncel {data.categoryName} Haberleri</h1>
      <h2 className="hidden">{data.categoryName} Haberleri</h2>
      <CategoryTitle item={{ title: data.categoryName! }} />
      <CategoryNewsWrapper>
        {data.Newses.map((newsItem, index) => {
          return (
            <CategoryNewsItem
              item={newsItem}
              categoryName={data.categoryName!}
              key={index}
            />
          );
        })}
      </CategoryNewsWrapper>
      <CategoryPagination itemCount={result.totalCount || 0} />
    </>
  );
}

export const dynamic = "force-dynamic";
