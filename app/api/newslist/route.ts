import { GetCategoryNewsListWithCategorySources } from "@/Services/NewsService";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetCategoryNewsListWithCategorySources();
  return NextResponse.json(result);
}
