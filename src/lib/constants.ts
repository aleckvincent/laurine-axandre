/**
 * Single source of truth for the wedding date/time and venues, reused by
 * the countdown, the schedule, structured metadata and the Maps CTAs.
 */

// Civil ceremony start — the moment the countdown targets.
export const WEDDING_DATE_ISO = "2026-10-24T14:00:00+02:00";

export const WEDDING_DATE = new Date(WEDDING_DATE_ISO);

export const VENUES = {
  mairie: {
    name: "Mairie de Colomiers",
    address: "1 Place Alex Raymond, 31770 Colomiers, France",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mairie+de+Colomiers+1+Place+Alex+Raymond+31770+Colomiers",
  },
  masTolosa: {
    name: "Mas Tolosa",
    address: "79 Rue des Chênes, 31830 Plaisance-du-Touch, France",
    mapsUrl:
      "https://www.google.com/maps/place//data=!4m2!3m1!1s0x12aeb176788c8331:0x12046ddfb39bfde9",
  },
} as const;
