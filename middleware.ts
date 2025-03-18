import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes: (string | RegExp)[] = ["/internal"];
const signInRoute = "/sign-in";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  if (
    protectedRoutes.some((route) =>
      typeof route === "string" ? pathname === route : route.test(pathname)
    ) &&
    !token
  ) {
    return NextResponse.redirect(new URL(signInRoute, request.url));
  }

  if (pathname.startsWith(signInRoute) && token) {
    return NextResponse.redirect(new URL("/internal", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
