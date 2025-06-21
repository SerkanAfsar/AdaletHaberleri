import {
  GetAllCategoriesListService,
  GetHeaderBottomCategoryService,
} from "@/Services";
import { GetMenuListService } from "@/Services/MainPageService";
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

export const GetMenuListCacheService = cache(GetMenuListService, undefined, {
  revalidate: 7200,
  tags: [CacheNames.MenuList],
});

export const GetHeaderBottomCategoryCacheService = cache(
  GetHeaderBottomCategoryService,
  undefined,
  {
    revalidate: 7200,
    tags: [CacheNames.HeaderBottomCategoryList],
  },
);
