import BreadCrumb from "@/Components/Client/Content/BreadCrumb";
import { GetCategoryDetailWithNews } from "@/Services";
import { CategoryWithNewsType } from "@/Types/Client.types";
import { generateCategoryUrl } from "@/Utils";
import { notFound } from "next/navigation";
import CategoryTitle from "../Components/CategoryTitle";

import CategoryNewsItem from "../Components/CategoryNewsItem";
import CategoryPagination from "../Components/CategoryPagination";
import CategoryNewsWrapper from "../Components/CategoryNewsWrapper";

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
