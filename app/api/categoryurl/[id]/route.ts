import {
  DeleteCategoryUrlByIdService,
  GetCategoryUrlByIdService,
  UpdateCategorySourceUrl,
} from "@/Services/CategoryUrl.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await GetCategoryUrlByIdService({ id: Number(id) });
  return NextResponse.json(result, { status: result.statusCode });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const result = await UpdateCategorySourceUrl({
    id: Number(id),
    categorySource: body,
  });
  return NextResponse.json(result, { status: result.statusCode });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await DeleteCategoryUrlByIdService({
    id: Number(id),
  });

  return NextResponse.json(result, { status: result.statusCode });
}
