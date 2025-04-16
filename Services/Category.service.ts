import { ResponseResult } from "@/Types";
import prisma from "@/Utils/db";
import { Category } from "@prisma/client";

export default async function GetAllCategories() {
  try {
    const responseResult: ResponseResult<Category> = {
      data: await prisma.category.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      error: null,
      statusCode: 200,
      success: true,
      totalCount: await prisma.category.count(),
    };
    return responseResult;
  } catch (error: unknown) {
    const responseResult: ResponseResult<Category> = {
      data: null,
      error: "Err Category",
      statusCode: 400,
      success: false,
      totalCount: 0,
    };
    return responseResult;
  }
}
