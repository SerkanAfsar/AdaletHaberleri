"use server";
import { ResponseResult } from "@/Types";
import { errorHandler } from "@/Utils";
import prisma from "@/Utils/db";

export const GetMainPageLastNewsService = async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        id: true,
        imageId: true,
        createdAt: true,
        Category: {
          select: {
            categoryName: true,
          },
        },
      },
      take: 16,
    });
    const responseResult: ResponseResult<any> = {
      success: true,
      statusCode: 200,
      data: news,
      error: null,
      totalCount: news.length,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
};
export const GetMenuListService = async () => {
  try {
    const data = await prisma.category.findMany({
      where: {
        Newses: {
          some: {},
        },
      },
      select: {
        categoryName: true,
        Newses: {
          take: 5,
          select: {
            title: true,
            imageId: true,
            id: true,
          },
        },
      },
      take: 7,
    });
    const responseResult: ResponseResult<any> = {
      success: true,
      statusCode: 200,
      data: data,
      error: null,
      totalCount: data.length,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler(error);
  }
};
