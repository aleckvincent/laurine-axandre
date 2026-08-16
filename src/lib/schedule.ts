import { TIER_RANK, type Tier } from "@/types/tier";

export type ScheduleStep = {
  id: string;
  time: string; // 24h "HH:mm", displayed as-is across all locales
  labelKey: string; // i18n key under `deroule.steps`
  minTier: Tier;
  location?: "mairie" | "masTolosa";
};

export const SCHEDULE: ScheduleStep[] = [
  { id: "mairie_debut", time: "14:00", labelKey: "mairieDebut", minTier: "mairie", location: "mairie" },
  { id: "discours", time: "15:30", labelKey: "discours", minTier: "mairie", location: "masTolosa" },
  { id: "vin_honneur_debut", time: "16:15", labelKey: "vinHonneurDebut", minTier: "vin_honneur", location: "masTolosa" },
  { id: "reception", time: "17:30", labelKey: "reception", minTier: "complet", location: "masTolosa" },
];

export function filterScheduleForTier(tier: Tier): ScheduleStep[] {
  return SCHEDULE.filter((step) => TIER_RANK[tier] >= TIER_RANK[step.minTier]);
}
