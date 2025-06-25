import {
  GetAllCategoriesFooterService,
  GetAllCategoriesListService,
  GetCategoryDetailWithLastNews,
  GetHeaderBottomCategoryService,
} from "@/Services";

import { CacheNames } from "@/Utils";
import { unstable_cache as cache } from "next/cache";

export const GetAllCategoriesCacheService = cache(
  GetAllCategoriesListService,
  undefined,
  {
    revalidate: 7200,
    tags: [CacheNames.CategoryList],
  },
);

export const GetHeaderBottomCategoryCacheService = cache(
  GetHeaderBottomCategoryService,
  undefined,
  {
    revalidate: 7200,
    tags: [CacheNames.HeaderBottomCategoryList],
  },
);

export const CategoryLastNewsResult = ({ id }: { id: number }) =>
  cache(GetCategoryDetailWithLastNews, [id.toString()], {
    revalidate: 7200,
    tags: [CacheNames.CategoryLastNews],
  });

export const CategoryLastNewsCacheResult = async ({ id }: { id: number }) => {
  const cacheFunc = CategoryLastNewsResult({ id });
  const result = await cacheFunc({ id });
  return result;
};
export const GetAllCategoriesFooterCacheService = cache(
  GetAllCategoriesFooterService,
  undefined,
  {
    revalidate: 7200,
    tags: [CacheNames.CategoryList],
  },
);
