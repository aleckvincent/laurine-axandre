/**
 * The two invitation tiers, nested:
 * complet ⊇ vin_honneur
 *
 * vin_honneur — mairie, speech, drinks reception
 * complet — those plus the main evening reception
 */
export type Tier = "vin_honneur" | "complet";

export const TIER_RANK: Record<Tier, number> = {
  vin_honneur: 0,
  complet: 1,
};

export function isTier(value: unknown): value is Tier {
  return value === "vin_honneur" || value === "complet";
}

export function tierIncludes(tier: Tier, minTier: Tier): boolean {
  return TIER_RANK[tier] >= TIER_RANK[minTier];
}

export const TIERS: Tier[] = ["vin_honneur", "complet"];
