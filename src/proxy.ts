import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/jwt";

const intlMiddleware = createMiddleware(routing);

// Paths that stay reachable without a valid session cookie.
const PUBLIC_PATHS = ["/gate"];

function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

function getLocalePrefix(pathname: string): string {
  const match = pathname.match(
    new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`),
  );
  return match ? `/${match[1]}` : "";
}

export default async function middleware(request: NextRequest) {
  const pathnameWithoutLocale = stripLocalePrefix(request.nextUrl.pathname);
  const isPublic = PUBLIC_PATHS.some(
    (path) =>
      pathnameWithoutLocale === path ||
      pathnameWithoutLocale.startsWith(`${path}/`),
  );

  if (!isPublic) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const tier = token ? await verifySessionToken(token) : null;

    if (!tier) {
      const url = request.nextUrl.clone();
      const localePrefix = getLocalePrefix(request.nextUrl.pathname);
      url.pathname = `${localePrefix}/gate`;
      url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip API routes, Next internals, Vercel internals, Next's generated
  // metadata routes (icon/apple-icon/opengraph-image/robots/sitemap — no
  // file extension in their URL, so they'd otherwise be swept up and
  // mis-handled by next-intl's locale routing) and files with an
  // extension (static assets).
  matcher:
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
};
