import type { StaticImageData } from "next/image";

import heroImage from "@/assets/photos/hands-reaching-hero.jpg";
import chateauDance from "@/assets/photos/chateau-dance.jpg";
import fountainReclining from "@/assets/photos/fountain-reclining.jpg";
import skyNearKiss from "@/assets/photos/sky-near-kiss.jpg";
import cheekToCheekEmbrace from "@/assets/photos/cheek-to-cheek-embrace.jpeg";
import handNeckMacro from "@/assets/photos/hand-neck-macro.jpg";
import chateauProposal from "@/assets/photos/chateau-proposal.jpeg";
import chateauCarry from "@/assets/photos/chateau-carry.jpg";
import sunsetProfileEmbrace from "@/assets/photos/sunset-profile-embrace.jpg";

export type SliderPhoto = {
  id: string;
  src: StaticImageData;
  alt: { fr: string; de: string };
};

/** The hero background photo (landscape, hands reaching toward each other). */
export const HERO_PHOTO = heroImage;

/**
 * Curated slider photos, in narrative order (château exterior → intimate
 * portraits → bouquet close-up). All portrait-oriented.
 */
export const SLIDER_PHOTOS: SliderPhoto[] = [
  {
    id: "chateau-dance",
    src: chateauDance,
    alt: {
      fr: "Axandre fait tourner Laurine devant le château",
      de: "Axandre dreht Laurine vor dem Schloss",
    },
  },
  {
    id: "chateau-carry",
    src: chateauCarry,
    alt: {
      fr: "Axandre porte Laurine dans ses bras devant le château",
      de: "Axandre trägt Laurine vor dem Schloss",
    },
  },
  {
    id: "fountain-reclining",
    src: fountainReclining,
    alt: {
      fr: "Laurine allongée contre Axandre près de la fontaine du château",
      de: "Laurine lehnt sich an Axandre am Brunnen des Schlosses",
    },
  },
  {
    id: "cheek-to-cheek-embrace",
    src: cheekToCheekEmbrace,
    alt: {
      fr: "Laurine et Axandre joue contre joue, une fleur dans les cheveux",
      de: "Laurine und Axandre Wange an Wange, eine Blüte im Haar",
    },
  },
  {
    id: "chateau-proposal",
    src: chateauProposal,
    alt: {
      fr: "Axandre demande Laurine en mariage devant le château",
      de: "Axandre macht Laurine vor dem Schloss einen Antrag",
    },
  },
  {
    id: "sky-near-kiss",
    src: skyNearKiss,
    alt: {
      fr: "Laurine et Axandre en contre-plongée, presque un baiser",
      de: "Laurine und Axandre von unten, kurz vor einem Kuss",
    },
  },
  {
    id: "hand-neck-macro",
    src: handNeckMacro,
    alt: {
      fr: "Gros plan sur les mains et les bagues",
      de: "Nahaufnahme der Hände und Ringe",
    },
  },
  {
    id: "sunset-profile-embrace",
    src: sunsetProfileEmbrace,
    alt: {
      fr: "Laurine et Axandre de profil, lumière dorée du coucher de soleil",
      de: "Laurine und Axandre im Profil, goldenes Sonnenuntergangslicht",
    },
  },
];
