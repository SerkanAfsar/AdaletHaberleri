"use server";

import { ResponseResult } from "@/Types";
import {
  CategoryLinkType,
  HeaderMiddleLinkType,
  NewsLinkType,
} from "@/Types/Client.types";
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
    const categoryListData = await prisma.category.findMany({
      orderBy: {
        categoryName: "asc",
      },
    });
    const categoryDetailData = await prisma.category.findMany({
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
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      take: 5,
    });

    const categoryNewsLinksData: HeaderMiddleLinkType[] =
      categoryDetailData.map((category) => ({
        categoryName: category.categoryName,
        Data: category.Newses.map((newsItem) => ({
          categoryName: category.categoryName,
          id: newsItem.id,
          imageId: newsItem.imageId,
          title: newsItem.title,
        })) as NewsLinkType[],
        type: "News",
      }));

    const categoryLinksListData: HeaderMiddleLinkType = {
      categoryName: "Diğerleri",
      Data: categoryListData.map((category) => ({
        categoryName: category.categoryName,
        id: category.id,
      })) as CategoryLinkType[],
      type: "List",
    };

    const newData = [
      ...categoryNewsLinksData,
      categoryLinksListData,
    ] as HeaderMiddleLinkType[];

    const responseResult: ResponseResult<HeaderMiddleLinkType> = {
      success: true,
      statusCode: 200,
      data: newData,
      error: null,
      totalCount: 0,
    };
    return responseResult;
  } catch (error: unknown) {
    return errorHandler<HeaderMiddleLinkType>(error);
  }
};
