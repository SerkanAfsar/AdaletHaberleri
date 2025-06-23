import {
  GetAllCategoriesListService,
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
