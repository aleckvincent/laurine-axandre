/**
 * The three invitation tiers, strictly nested:
 * complet ⊇ vin_honneur ⊇ mairie
 */
export type Tier = "mairie" | "vin_honneur" | "complet";

export const TIER_RANK: Record<Tier, number> = {
  mairie: 0,
  vin_honneur: 1,
  complet: 2,
};

export function tierIncludes(tier: Tier, minTier: Tier): boolean {
  return TIER_RANK[tier] >= TIER_RANK[minTier];
}

export const TIERS: Tier[] = ["mairie", "vin_honneur", "complet"];
