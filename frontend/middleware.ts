import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl;

  const publicRoutes = [
    "/",
    "/academics",
    "/placements",
    "/admissions",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/sso-callback",
    "/messages",
    "/legal/privacy-policy",
    "/legal/terms-of-service",
  ];

  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  const protectedRoutes = [
    "/profile",
    "/peers",
    "/campus-life",
    "/apply",
    "/messages/",
    "/search",
  ];
  if (
    !userId &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    const signInUrl = new URL("/sign-in", url.origin);
    signInUrl.searchParams.set("returnBackUrl", url.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/api/(.*)",
  ],
};
