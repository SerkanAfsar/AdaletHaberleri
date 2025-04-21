import { checkIfCategoryNameExists } from "@/Utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { value } = await req.json();
  const result = await checkIfCategoryNameExists(value);
  return NextResponse.json(result, { status: 200 });
}
