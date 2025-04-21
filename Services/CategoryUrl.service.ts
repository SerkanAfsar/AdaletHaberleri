import { CategoryUrlListType } from "@/app/(Admin)/Admin/CategoryUrlList/Containers/CategoryUrlListContainer";
import { ResponseResult } from "@/Types";
import { errorHandler } from "@/Utils";
import prisma from "@/Utils/db";
import { Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function GetAllCategoryUrlService({
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
    const responseResult: ResponseResult<CategoryUrlListType> = {
      success: true,
      statusCode: 200,
      data: [],
    };

    let query: Prisma.CategorySourceUrlWhereInput = {};
    let orderByCondition: any = {};

    if (globalFilter) {
      const isNumber = Number(globalFilter);
      query = {
        OR: [
          {
            sourceUrl: {
              contains: globalFilter,
              // mode: "insensitive",
            },
          },
          {
            category: {
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

    const [categories, rowCount] = await prisma.$transaction([
      prisma.categorySourceUrl.findMany({
        where: query,
        skip: offset,
        take: count,
        orderBy: orderByCondition,
        select: {
          id: true,
          sourceUrl: true,
          source: true,
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      }),
      prisma.categorySourceUrl.count({ where: query }),
    ]);

    responseResult.data = categories as CategoryUrlListType[];
    responseResult.totalCount = rowCount;
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
}
