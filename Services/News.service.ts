import { revalidateCustomTags } from "@/Actions";
import { NewsListType } from "@/app/(Admin)/Admin/News/Containers/NewsContainer";
import {
  CloudFlareResponseType,
  DeleteImageUrlType,
  ResponseResult,
} from "@/Types";
import { FooterLinkItemType } from "@/Types/Client.types";
import {
  CacheNames,
  envVariables,
  errorHandler,
  generateNewsUrl,
} from "@/Utils";
import prisma from "@/Utils/db";
import { NewsClass } from "@/Utils/NewsClass";
import { Category, News, Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export const GetCategoryNewsListWithCategorySources = async () => {
  const categoryList = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      CategorySourceUrl: true,
    },
  });
  for (let i = 0; i < categoryList.length; i++) {
    const newsClass = new NewsClass(
      categoryList[i].CategorySourceUrl,
      categoryList[i].id,
    );
    await newsClass.GetNewsList();
  }

  return categoryList;
};

export async function GetAllNewsService({
  offset,
  count,
  globalFilter,
  sorting,
  filters,
}: {
  offset: number;
  count: number;
  globalFilter: string;
  sorting: string;
  filters: string;
}) {
  try {
    const responseResult: ResponseResult<NewsListType> = {
      success: true,
      statusCode: 200,
      data: [],
    };

    let query: Prisma.NewsWhereInput = {};
    let orderByCondition: any = {};

    if (globalFilter) {
      const isNumber = Number(globalFilter);
      query = {
        OR: [
          {
            title: {
              contains: globalFilter,
              // mode: "insensitive",
            },
          },
          {
            Category: {
              categoryName: {
                contains: globalFilter,
              },
            },
          },
          {
            source: {
              contains: globalFilter,
            },
          },
        ],
      };
      if (!isNaN(isNumber)) {
        query.OR?.push({
          id: {
            equals: isNumber,
          },
        });
      }
    }

    const parsedColumnFilters = JSON.parse(filters) as ColumnFiltersState;
    if (parsedColumnFilters?.length && !globalFilter) {
      let resultCumle: any = {};
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        let innerItem: any = {};
        if (columnId == "id" && !isNaN(filterValue as number)) {
          innerItem = {
            ["id"]: {
              equals: Number(filterValue),
            },
          };
        } else {
          innerItem = {
            [columnId]: {
              contains: filterValue,
              //   mode: "insensitive",
            },
          };
        }

        resultCumle = {
          ...resultCumle,
          ...innerItem,
        };
      });
      query = {
        AND: [resultCumle],
      };
    }

    if (sorting) {
      const parsedSorting = JSON.parse(sorting) as SortingState;
      if (parsedSorting?.length) {
        const sort = parsedSorting[0];
        const { id, desc } = sort;
        orderByCondition = [
          {
            [id]: desc ? "desc" : "asc",
          },
        ];
      }
    }

    const [newses, rowCount] = await prisma.$transaction([
      prisma.news.findMany({
        where: query,
        skip: offset,
        take: count,
        orderBy: orderByCondition,
        select: {
          id: true,
          title: true,
          source: true,
          imageId: true,
          readedCount: true,
          Category: {
            select: {
              categoryName: true,
            },
          },
        },
      }),
      prisma.news.count({ where: query }),
    ]);

    responseResult.data = newses as NewsListType[];
    responseResult.totalCount = rowCount;
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
}

export async function DeleteNewsService({ id }: { id: number }) {
  try {
    const entity = await prisma.news.findFirst({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new Error(`News with ${id} Not Found`);
    }

    const responseResult: ResponseResult<News> = {
      data: await prisma.news.delete({
        where: {
          id,
        },
      }),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: await prisma.news.count(),
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<News>(error);
  }
}

export async function DeleteNewsImageService(imageId?: string) {
  if (!imageId) {
    return false;
  }
  const url: DeleteImageUrlType = `https://api.cloudflare.com/client/v4/accounts/${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_ID}/images/v1/${imageId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN}`,
    },
  });
  if (response.ok) {
    const result: CloudFlareResponseType = await response.json();
    if (result.success) {
      return true;
    }
    return false;
  }
  return false;
}

export type NewsDetailPickType =
  | (News & {
      Category: Category | null;
    })
  | null;

const deneme = {
  createdAt: true,
  imageId: true,
  title: true,
  content: true,
  subDescription: true,
  seoTitle: true,
  seoDescription: true,
  readedCount: true,
  sourceUrlLink: true,
  id: true,
  Category: {
    select: {
      Newses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      },
      categoryName: true,
      id: true,
    },
  },
} satisfies Prisma.NewsSelect;

export type Deneme = Prisma.NewsGetPayload<{ select: typeof deneme }>;

export const GetNewsDetailByIdService = async ({ id }: { id: number }) => {
  try {
    const result = await prisma.news.findFirst({
      where: {
        id,
      },
      select: deneme,
    });
    if (!result) {
      throw new Error("News Not Found");
    }

    const responseResult: ResponseResult<Deneme> = {
      data: result as Deneme,
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<Deneme>(error);
  }
};

export async function GetLastNewsByCountService({ count }: { count: number }) {
  try {
    const result = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Category: true,
      },
      take: count,
    });

    const responseResult: ResponseResult<FooterLinkItemType> = {
      data: result.map((item) => ({
        linkTitle: item.title,
        url: generateNewsUrl(item.Category!.categoryName, item.title, item.id),
      })),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<number>(error);
  }
}

export async function GetNewsDetailLastNewsListService({
  categoryId,
}: {
  categoryId: number;
}) {
  try {
    const result = await prisma.news.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },

      take: 5,
      select: {
        id: true,
        title: true,
        imageId: true,
        createdAt: true,
        Category: {
          select: {
            categoryName: true,
          },
        },
      },
    });

    const responseResult: ResponseResult<typeof result> = {
      data: result,
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<number>(error);
  }
}

export async function LastNewsMainPageService() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        Newses: {
          some: {},
        },
      },
      select: {
        categoryName: true,
        id: true,
        Newses: {
          select: {
            title: true,
            imageId: true,
            createdAt: true,
            subDescription: true,
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 6,
        },
      },

      take: 5,
    });
    const responseResult: ResponseResult<typeof categories> = {
      data: categories,
      error: null,
      success: true,
      statusCode: 200,
    };
    return responseResult;
  } catch (error) {
    return errorHandler<Category>(error);
  }
}

export const GetLastFiveNewsService = async () => {
  try {
    const result = await prisma.news.findMany({
      include: {
        Category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    if (!result) {
      throw new Error("News Not Found");
    }

    const responseResult: ResponseResult<NewsDetailPickType> = {
      data: result as NewsDetailPickType[],
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<number>(error);
  }
};

export const IncreaseReadedCountService = async ({ id }: { id: number }) => {
  try {
    const result = await prisma.news.update({
      where: {
        id,
      },
      data: {
        readedCount: {
          increment: 1,
        },
      },
    });
    if (!result) {
      throw new Error("News Not Found");
    }
    await revalidateCustomTags([CacheNames.MostReadedNews]);

    const responseResult: ResponseResult<News> = {
      data: result,
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<News>(error);
  }
};

export const GetMostReadedNewsService = async () => {
  try {
    const result = await prisma.news.findMany({
      include: {
        Category: true,
      },
      orderBy: {
        readedCount: "desc",
      },
      take: 10,
    });

    const responseResult: ResponseResult<News> = {
      data: result,
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<number>(error);
  }
};
