import { type Tier, TIER_RANK } from "@/types/tier";

export type ScheduleStep = {
  id: string;
  time: string; // 24h "HH:mm", displayed as-is across all locales
  labelKey: string; // i18n key under `deroule.steps`
  minTier: Tier;
  location?: "mairie" | "masTolosa";
};

export const SCHEDULE: ScheduleStep[] = [
  {
    id: "mairie_debut",
    time: "14:00",
    labelKey: "mairieDebut",
    minTier: "vin_honneur",
    location: "mairie",
  },
  {
    id: "discours",
    time: "16:30",
    labelKey: "discours",
    minTier: "vin_honneur",
    location: "masTolosa",
  },
  {
    id: "vin_honneur_debut",
    time: "17:15",
    labelKey: "vinHonneurDebut",
    minTier: "vin_honneur",
    location: "masTolosa",
  },
  {
    id: "reception",
    time: "19:00",
    labelKey: "reception",
    minTier: "complet",
    location: "masTolosa",
  },
];

export function filterScheduleForTier(tier: Tier): ScheduleStep[] {
  return SCHEDULE.filter((step) => TIER_RANK[tier] >= TIER_RANK[step.minTier]);
}
