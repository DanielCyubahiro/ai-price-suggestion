import {auth} from '@/auth';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

interface AuthUser {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

const protectedRoutes = [
  '/listings/new',
];

export default auth((req: NextRequest & { auth?: AuthUser }) => {
  const isProtectedRoute = protectedRoutes.some(route =>
      req.nextUrl.pathname.startsWith(route),
  );

  if (!req.auth && isProtectedRoute) {
    const newUrl = new URL('/api/auth/signin', req.nextUrl.origin);
    newUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: protectedRoutes.map(route => `${route}/:path*`),
};
