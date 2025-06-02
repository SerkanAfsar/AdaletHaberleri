import { NewsListType } from "@/app/(Admin)/Admin/News/Containers/NewsContainer";

import {
  CloudFlareResponseType,
  DeleteImageUrlType,
  ResponseResult,
} from "@/Types";
import { FooterLinkItemType } from "@/Types/Client.types";
import { errorHandler, generateNewsUrl } from "@/Utils";
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
    return errorHandler(error);
  }
}

export async function DeleteNewsImageService(imageId?: string) {
  if (!imageId) {
    return false;
  }
  const url: DeleteImageUrlType = `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CDN_ACCOUNT_ID}/images/v1/${imageId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN}`,
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
export const GetNewsDetailByIdService = async ({ id }: { id: number }) => {
  try {
    const result = await prisma.news.findFirst({
      where: {
        id,
      },
      include: {
        Category: true,
      },
    });
    if (!result) {
      throw new Error("News Not Found");
    }

    const responseResult: ResponseResult<NewsDetailPickType> = {
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
