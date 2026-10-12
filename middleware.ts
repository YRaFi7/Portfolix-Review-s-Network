import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DOMAIN_TO_BRAND, BRANDS } from './lib/brands';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Allow switching brand via query parameter for testing/development (?brand=portfolix-tech)
  const brandQuery = url.searchParams.get('brand');
  
  let resolvedBrandSlug = 'portfolio-builders';

  if (brandQuery && BRANDS[brandQuery]) {
    resolvedBrandSlug = brandQuery;
  } else {
    const cleanHost = host.toLowerCase().replace(/:\d+$/, '');
    resolvedBrandSlug = DOMAIN_TO_BRAND[cleanHost] || DOMAIN_TO_BRAND[host.toLowerCase()] || 'portfolio-builders';
  }

  // Clone headers and add tenant context
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-brand-slug', resolvedBrandSlug);
  requestHeaders.set('x-brand-host', host);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
