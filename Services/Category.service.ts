import { ResponseResult } from "@/Types";
import { CategoryWithNewsType, FooterLinkItemType } from "@/Types/Client.types";
import { envVariables, errorHandler, generateCategoryUrl } from "@/Utils";
import prisma from "@/Utils/db";
import { Category, Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function GetAllCategoriesService({
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
    const responseResult: ResponseResult<Category> = {
      success: true,
      statusCode: 200,
      data: [],
    };

    let query: Prisma.CategoryWhereInput = {};
    let orderByCondition: any = {};

    if (globalFilter) {
      const isNumber = Number(globalFilter);
      query = {
        OR: [
          {
            categoryName: {
              contains: globalFilter,
              // mode: "insensitive",
            },
          },
          {
            slugUrl: {
              contains: globalFilter,
              // mode: "insensitive",
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
              mode: "insensitive",
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
      prisma.category.findMany({
        where: query,
        skip: offset,
        take: count,
        orderBy: orderByCondition,
      }),
      prisma.category.count({ where: query }),
    ]);

    responseResult.data = categories as Category[];
    responseResult.totalCount = rowCount;
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
}

export async function GetCategoryByIdService({ id }: { id: number }) {
  try {
    const responseResult: ResponseResult<Category> = {
      data: await prisma.category.findFirst({
        where: {
          id,
        },
      }),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: await prisma.category.count(),
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
}

export async function UpdateCategoryWithIdService({
  id,
  category,
}: {
  id: number;
  category: Category;
}) {
  try {
    const entity = await prisma.category.findFirst({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new Error(`Category with Id ${id} Not Found`);
    }

    const { id: entityId, ...rest } = category;
    const responseResult: ResponseResult<Category> = {
      data: await prisma.category.update({
        where: {
          id,
        },
        data: rest,
      }),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: await prisma.category.count(),
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
}

export async function DeleteCategoryByIdService({ id }: { id: number }) {
  try {
    const entity = await prisma.category.findFirst({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new Error(`Category with ${id} Not Found`);
    }

    const responseResult: ResponseResult<Category> = {
      data: await prisma.category.delete({
        where: {
          id,
        },
      }),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: await prisma.category.count(),
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
}

export const AddCategoryService = async ({ data }: { data: Category }) => {
  try {
    const responseResult: ResponseResult<Category> = {
      data: await prisma.category.create({ data }),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: 1,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
};

export const GetAllCategoriesListService = async () => {
  try {
    const responseResult: ResponseResult<Category> = {
      success: true,
      statusCode: 200,
      data: await prisma.category.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      error: null,
      totalCount: await prisma.category.count(),
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
};

export async function GetAllCategoriesFooterService() {
  try {
    const result = await prisma.category.findMany();

    const responseResult: ResponseResult<FooterLinkItemType> = {
      data: result.map((item) => ({
        linkTitle: item.categoryName,
        url: generateCategoryUrl(item.categoryName, item.id),
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

// const deneme = {
//   categoryName: true,
//   id: true,
//   seoTitle: true,
//   seoDescription: true,
//   slugUrl: true,
// } satisfies Prisma.CategorySelect;

// type Deneme = Prisma.CategoryGetPayload<{ select: typeof deneme }>;

export async function GetCategoryDetailWithNews({
  id,
  page,
}: {
  id: number;
  page: number;
}) {
  try {
    const result = await prisma.category.findFirst({
      where: {
        id,
      },
      select: {
        categoryName: true,
        id: true,
        seoTitle: true,
        seoDescription: true,
        slugUrl: true,
        Newses: {
          select: {
            id: true,
            title: true,
            imageId: true,
            subDescription: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: envVariables.NEXT_PUBLIC_PAGINATION_ITEM_COUNT,
          skip: (page - 1) * envVariables.NEXT_PUBLIC_PAGINATION_ITEM_COUNT,
        },
      },
    });
    if (!result) {
      throw new Error("Category Not Found");
    }

    const responseResult: ResponseResult<CategoryWithNewsType> = {
      data: result,
      error: null,
      statusCode: 200,
      success: true,
      totalCount: await prisma.news.count({
        where: {
          categoryId: id,
        },
      }),
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<Category>(error);
  }
}

export async function GetHeaderBottomCategoryService() {
  try {
    const responseResult: ResponseResult<Category> = {
      data: await prisma.category.findMany(),
      success: true,
      statusCode: 200,
    };
    return responseResult;
  } catch (error) {
    return errorHandler<Category>(error);
  }
}
