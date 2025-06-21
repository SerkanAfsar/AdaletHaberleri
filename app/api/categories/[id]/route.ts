import { revalidateCustomTags } from "@/Actions";
import {
  DeleteCategoryByIdService,
  GetCategoryByIdService,
  UpdateCategoryWithIdService,
} from "@/Services";
import { CacheNames } from "@/Utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await GetCategoryByIdService({ id: Number(id) });
  return NextResponse.json(result, { status: result.statusCode });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const result = await UpdateCategoryWithIdService({
    id: Number(id),
    category: body,
  });
  return NextResponse.json(result, { status: result.statusCode });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await DeleteCategoryByIdService({
    id: Number(id),
  });
  if (result.success) {
    await revalidateCustomTags([
      CacheNames.CategoryList,
      CacheNames.MenuList,
      CacheNames.HeaderBottomCategoryList,
    ]);
  }

  return NextResponse.json(result, { status: result.statusCode });
}
