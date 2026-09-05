import { NextResponse } from 'next/server';

const COOKIE_NAME = 'zerbiq_preview_auth';
const COOKIE_VALUE = 'zerbiq2026preview';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow these paths through without auth
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/preview-login'
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);

  if (authCookie && authCookie.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/preview-login';
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico / favicon.svg
     */
    '/((?!_next/static|_next/image|favicon).*)',
  ],
};
