import prisma from "@/Utils/db";

export const GetCategoryListServiceSitemap = async () => {
  const result = await prisma.category.findMany({
    select: {
      categoryName: true,
      id: true,
      _count: {
        select: {
          Newses: true,
        },
      },
    },
  });
  return result;
};

export const GetNewsListForSitemapService = async () => {
  const result = await prisma.news.findMany({
    select: {
      title: true,
      id: true,
      Category: {
        select: {
          categoryName: true,
        },
      },
    },
  });
  return result;
};
