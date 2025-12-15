import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept .well-known routes early and return 404 immediately
  if (pathname.startsWith('/.well-known')) {
    return new NextResponse(null, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Continue with normal request handling
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

