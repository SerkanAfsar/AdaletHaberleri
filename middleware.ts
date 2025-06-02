import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./Utils";
import { TestData } from "./Data/Admin.data";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // const token = request.cookies.get("adaletHaberleri")?.value;
  // if (!token) {
  //   return NextResponse.redirect(new URL("/Login", request.url));
  // }
  // const result = await verifyToken(token as string);
  // if (!result) {
  //   return NextResponse.redirect(new URL("/Login", request.url));
  // }
  // const pathName = request.nextUrl.pathname;
  // const isAllowed = TestData[result].includes(pathName);
  // if (isAllowed) {
  //   return NextResponse.next();
  // }
  // return NextResponse.redirect(new URL("/Login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/Admin/:path*",
};
