import {
  GetLastFiveNewsService,
  GetMostReadedNewsService,
  GetNewsDetailByIdService,
  IncreaseReadedCountService,
  LastNewsMainPageService,
} from "@/Services";
import { GetMenuListService } from "@/Services/MainPageService";
import { CacheNames } from "@/Utils";
import { unstable_cache as cache } from "next/cache";

export const GetMenuListCacheService = cache(GetMenuListService, undefined, {
  revalidate: 7200,
  tags: [CacheNames.MenuList],
});

export const GetLastNewsMainPageCacheService = cache(
  LastNewsMainPageService,
  undefined,
  {
    revalidate: 7200,
    tags: [CacheNames.LastSectionNews],
  },
);

export const GetLastFiveNewsCacheService = cache(
  GetLastFiveNewsService,
  undefined,
  { revalidate: 7200, tags: [CacheNames.LastFiveNews] },
);

export const GetMostReadedCacheService = cache(
  GetMostReadedNewsService,
  undefined,
  { revalidate: 7200, tags: [CacheNames.MostReadedNews] },
);

export const NewsDetailResult = ({ id }: { id: number }) =>
  cache(GetNewsDetailByIdService, [id.toString()], {
    revalidate: 7200,
    tags: [CacheNames.News],
  });

export const NewsDetailCacheService = async ({ id }: { id: number }) => {
  // await IncreaseReadedCountService({ id });
  const cacheFunc = NewsDetailResult({ id });
  const result = await cacheFunc({ id });
  return result;
};
