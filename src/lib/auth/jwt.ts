import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { getServerEnv } from "@/lib/env";
import type { Tier } from "@/types/tier";

// Pure JWT sign/verify helpers — no `next/headers` import, so this module
// is safe to use both in Server Actions/Components AND in Edge Middleware
// (which cannot use the cookies() API from next/headers).

export const SESSION_COOKIE_NAME = "wedding_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 180; // ~180 days

function getSecretKey() {
  return new TextEncoder().encode(getServerEnv().SESSION_SECRET);
}

export async function signSessionToken(tier: Tier): Promise<string> {
  return new SignJWT({ tier })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<Tier | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const tier = payload.tier;
    if (tier === "mairie" || tier === "vin_honneur" || tier === "complet") {
      return tier;
    }
    return null;
  } catch {
    return null;
  }
}
