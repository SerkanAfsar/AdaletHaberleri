import { AddCategoryUrlService, GetAllCategoryUrlService } from "@/Services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);

  const globalFilter = searchParams.get("globalFilter");
  const sorting = searchParams.get("sorting");
  const filters = searchParams.get("filters");

  const result = await GetAllCategoryUrlService({
    offset: Number(searchParams.get("offset")),
    count: Number(searchParams.get("count")),
    globalFilter: globalFilter ?? "",
    sorting: sorting ?? "",
    filters: filters ?? "",
  });

  return NextResponse.json(result, { status: result.statusCode });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await AddCategoryUrlService({ data });
  return NextResponse.json(result, { status: result.statusCode });
}

export const dynamic = "force-dynamic";
