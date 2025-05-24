import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface AuthUser {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export default auth((req: NextRequest & { auth?: AuthUser }) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/listings/new")) {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/listings/new/:path*"],
};