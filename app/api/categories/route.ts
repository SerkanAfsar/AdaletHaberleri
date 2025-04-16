import GetAllCategories from "@/Services/Category.service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetAllCategories();

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 1200);
  });
  return NextResponse.json(result, { status: result.statusCode });
}

export const dynamic = "force-dynamic";
