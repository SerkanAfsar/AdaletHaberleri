import { DeleteNewsImageService, DeleteNewsService } from "@/Services";
import { ResponseResult } from "@/Types";
import { News } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result: ResponseResult<News> = await DeleteNewsService({
    id: Number(id),
  });

  if (result.success) {
    const data = result.data as News;
    await DeleteNewsImageService(data.imageId ?? undefined);
  }

  return NextResponse.json(result, { status: result.statusCode });
}

export const dynamic = "force-dynamic";
