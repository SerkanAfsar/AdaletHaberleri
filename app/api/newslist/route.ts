import { revalidateCustomPath, revalidateCustomTags } from "@/Actions";
import { GetCategoryNewsListWithCategorySources } from "@/Services/News.service";
import { CacheNames } from "@/Utils";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetCategoryNewsListWithCategorySources();
  await revalidateCustomTags([
    CacheNames.MenuList,
    CacheNames.LastFiveNews,
    CacheNames.LastSectionNews,
    CacheNames.CategoryLastNews,
  ]);
  await revalidateCustomPath("/");
  return NextResponse.json(result);
}
