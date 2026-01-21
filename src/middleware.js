import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  //If user is already logged in & tries to access login/register page then send them to dashboard
  if (token && (pathname === "/login" || pathname == "/register"))
    return NextResponse.redirect(new URL("/dashboard", request.url));

  //If user is not logged in and tries to go to any page in the application, then redirect user to login
  const isDashboardPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/upload") ||
    pathname.startsWith("/settings");

  if (!token && isDashboardPage)
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

// The middleware should be executed for all paths except the mentioned few
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
