import { NextRequest, NextResponse } from 'next/server';

// Content negotiation: an agent that sends `Accept: text/markdown` on a normal
// page route gets the plain-text mirror (same data as /<route>.md) instead of
// the JS-heavy SPA. Browsers never send that Accept value, so this is inert for
// human traffic. (Next 16: the "middleware" convention is now "proxy".)
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // file requests (/work.md, assets, /sitemap.xml…) are handled elsewhere
  if (pathname.includes('.')) return NextResponse.next();

  if (!(req.headers.get('accept') || '').includes('text/markdown')) {
    const res = NextResponse.next();
    res.headers.set('Vary', 'Accept'); // this URL has a markdown representation
    return res;
  }

  // / , /en , /pt , /en/<section> , /pt/<section>
  const m = pathname.match(/^\/(?:(en|pt)(?:\/([^/]+))?)?\/?$/);
  if (!m) return NextResponse.next();

  // A rewrite reaches the route with the ORIGINAL url (query stripped), so pass
  // the target via request headers rather than search params.
  const headers = new Headers(req.headers);
  headers.set('x-md-slug', m[2] || 'index');
  headers.set('x-md-lang', m[1] || 'en');

  const url = req.nextUrl.clone();
  url.pathname = '/api/markdown';
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ['/', '/en', '/pt', '/en/:section', '/pt/:section'],
};
