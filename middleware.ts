import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decodeAsync } from "./Utils/session";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decodeAsync(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/Login", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/Admin/:path*",
};
