import "server-only";
import { getServerEnv } from "@/lib/env";
import type { Tier } from "@/types/tier";

/**
 * Server-only code → tier lookup. Never imported by a client component.
 * Codes live in env vars, not in a committed/public file.
 */
function normalize(code: string): string {
  return code.trim().toLowerCase();
}

export function resolveTierFromCode(code: string): Tier | null {
  const env = getServerEnv();
  const entered = normalize(code);

  const map: Array<[Tier, string]> = [
    ["complet", env.ACCESS_CODE_COMPLET],
    ["vin_honneur", env.ACCESS_CODE_VIN_HONNEUR],
    ["mairie", env.ACCESS_CODE_MAIRIE],
  ];

  for (const [tier, configuredCode] of map) {
    if (normalize(configuredCode) === entered) {
      return tier;
    }
  }
  return null;
}
