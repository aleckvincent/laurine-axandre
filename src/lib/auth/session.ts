import "server-only";
import { cookies } from "next/headers";
import type { Tier } from "@/types/tier";
import type { AppLocale } from "@/i18n/routing";
import { redirect } from "@/i18n/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  signSessionToken,
  verifySessionToken,
} from "@/lib/auth/jwt";

// Cookie-backed session helpers for use in Server Actions / Server
// Components only (uses next/headers, unavailable in Edge Middleware).

/** Set the httpOnly session cookie for the given tier. Call from a Server Action. */
export async function createSessionCookie(tier: Tier): Promise<void> {
  const token = await signSessionToken(tier);
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

/**
 * Re-reads and re-verifies the session cookie server-side. Defense in
 * depth: middleware already gates the route, but pages/actions must never
 * trust that blindly.
 */
export async function getSessionTier(): Promise<Tier | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * For tier-gated pages: re-verifies the session server-side (defense in
 * depth on top of middleware) and redirects to /gate if missing/invalid.
 * Always returns a valid Tier, or never returns (redirect throws).
 */
export async function requireTier(locale: AppLocale): Promise<Tier> {
  const tier = await getSessionTier();
  if (tier) return tier;
  redirect({ href: "/gate", locale });
  throw new Error("unreachable");
}
