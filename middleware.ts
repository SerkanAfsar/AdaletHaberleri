import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decodeAsync } from "./Utils/session";
import { ResponseResult } from "./Types";

const allowedApiPaths: string[] = ["/api/newslist"];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decodeAsync(cookie);

  if (!session?.userId) {
    const nextUrl = req.nextUrl.pathname;

    if (nextUrl.startsWith("/Admin")) {
      return NextResponse.redirect(new URL("/Login", req.nextUrl));
    }

    if (nextUrl.startsWith("/api") && !allowedApiPaths.includes(nextUrl)) {
      const responseResult: ResponseResult<any> = {
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      };
      return NextResponse.json(responseResult, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*", "/api/:path*"],
};
