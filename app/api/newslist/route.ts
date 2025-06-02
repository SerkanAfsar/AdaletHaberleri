import { GetCategoryNewsListWithCategorySources } from "@/Services/News.service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetCategoryNewsListWithCategorySources();
  return NextResponse.json(result);
}
