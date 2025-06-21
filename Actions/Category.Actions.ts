"use server";

import { AddCategoryService, DeleteCategoryByIdService } from "@/Services";
import { CacheNames } from "@/Utils";
import { Category } from "@prisma/client";
import { revalidateCustomTags } from ".";

export async function AddCategoryAction(prevData: any, data: Category) {
  const response = await AddCategoryService({ data });
  if (response.success) {
    await revalidateCustomTags([
      CacheNames.CategoryList,
      CacheNames.MenuList,
      CacheNames.HeaderBottomCategoryList,
    ]);
  }
  return response;
}

export async function DeleteCategoryAction(prevData: any, id: number) {
  const response = await DeleteCategoryByIdService({ id });
  if (response.success) {
    await revalidateCustomTags([
      CacheNames.CategoryList,
      CacheNames.MenuList,
      CacheNames.HeaderBottomCategoryList,
    ]);
  }
  return response;
}
