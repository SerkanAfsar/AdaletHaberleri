import {
  GetCategoryListServiceSitemap,
  GetNewsListForSitemapService,
} from "@/Services/Sitemap.service";
import { envVariables, generateCategoryUrl, generateNewsUrl } from "@/Utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const arr: MetadataRoute.Sitemap = [];

  const result = await GetCategoryListServiceSitemap();
  for (const category of result) {
    const firstPath = generateCategoryUrl(category.categoryName, category.id);
    arr.push({
      url: `${envVariables.NEXT_PUBLIC_BASE_URL}${firstPath}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
    const pageCount = Math.ceil(
      category._count.Newses / envVariables.NEXT_PUBLIC_PAGINATION_ITEM_COUNT,
    );

    for (let index = 0; index < pageCount; index++) {
      const path = `${generateCategoryUrl(category.categoryName, category.id)}/${index + 1}`;
      arr.push({
        url: `${envVariables.NEXT_PUBLIC_BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  const newsResult = await GetNewsListForSitemapService();
  for (const news of newsResult) {
    arr.push({
      url: `${envVariables.NEXT_PUBLIC_BASE_URL}/${generateNewsUrl(news.Category!.categoryName, news.title, news.id)}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return [
    {
      url: envVariables.NEXT_PUBLIC_BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...arr,
  ];
}
