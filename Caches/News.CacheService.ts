import {
  GetLastFiveNewsService,
  GetMostReadedNewsService,
  LastNewsMainPageService,
} from "@/Services";
import { GetMenuListService } from "@/Services/MainPageService";
import { CacheNames } from "@/Utils";
import { unstable_cache as cache } from "next/cache";

export const GetMenuListCacheService = cache(GetMenuListService, undefined, {
  revalidate: 3600,
  tags: [CacheNames.MenuList],
});

export const GetLastNewsMainPageCacheService = cache(
  LastNewsMainPageService,
  undefined,
  {
    revalidate: 3600,
    tags: [CacheNames.LastSectionNews],
  },
);

export const GetLastFiveNewsCacheService = cache(
  GetLastFiveNewsService,
  undefined,
  { revalidate: 3600, tags: [CacheNames.LastFiveNews] },
);

export const GetMostReadedCacheService = cache(
  GetMostReadedNewsService,
  undefined,
  { revalidate: 3600, tags: [CacheNames.MostReadedNews] },
);
