import { deleteCookie, getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, res: NextResponse) {
  const token = getCookie("token", { req, res });

  const isAuthenticated = token ? true : false;

  const protectedRoutes = ["/boards", "/home"];

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (
    isAuthenticated &&
    (req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/signup" ||
      req.nextUrl.pathname === "/")
  ) {
    // If authenticated user tries to access login route, redirect them to home
    const absoluteURL = new URL("/home", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/boards/:path*", "/home", "/login", "/signup", "/"],
};
