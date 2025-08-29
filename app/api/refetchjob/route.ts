import { envVariables } from "@/Utils";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(envVariables.NEXT_PUBLIC_BASE_URL);

  return NextResponse.json({ message: "success" }, { status: 200 });
}

export const dynamic = "force-dynamic";
