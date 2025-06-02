import { GetAllNewsService } from "@/Services/News.service";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);

  const globalFilter = searchParams.get("globalFilter");
  const sorting = searchParams.get("sorting");
  const filters = searchParams.get("filters");

  const result = await GetAllNewsService({
    offset: Number(searchParams.get("offset")),
    count: Number(searchParams.get("count")),
    globalFilter: globalFilter ?? "",
    sorting: sorting ?? "",
    filters: filters ?? "",
  });

  return NextResponse.json(result, { status: result.statusCode });
}

export const dynamic = "force-dynamic";
