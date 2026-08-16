import Image from "next/image";
import { HERO_PHOTO, SLIDER_PHOTOS } from "@/lib/photos";
import { PaisleyCorner } from "@/components/ui/motifs/PaisleyCorner";

const SECONDARY_PHOTOS = [
  SLIDER_PHOTOS.find((photo) => photo.id === "sky-near-kiss")!,
  SLIDER_PHOTOS.find((photo) => photo.id === "hand-neck-macro")!,
];

/**
 * Renders the hero's photo collage as two grid siblings (primary tile +
 * secondary stack) via a Fragment, so the parent hero `<section>`'s own
 * grid lays them out directly — no extra wrapping element.
 *
 * The primary tile is a *single* `HERO_PHOTO` `<Image priority>` node,
 * repositioned across breakpoints with plain responsive classes (full-bleed
 * background on mobile, a grid tile on desktop) rather than rendered twice
 * — `priority` emits an unconditional `<link rel=preload>`, so a second
 * instance would double it. The two secondary photos only exist from `lg:`
 * up (`hidden lg:flex`), so mobile never fetches them.
 */
export function HeroCollage() {
  return (
    <>
      <div className="group absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:col-span-4 lg:aspect-[4/5] lg:overflow-hidden lg:rounded-3xl">
        <Image
          src={HERO_PHOTO}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:scale-105"
        />
        <PaisleyCorner
          className="hidden h-24 w-24 text-soft-gold/60 lg:absolute lg:-bottom-4 lg:-left-4 lg:block"
          flip
        />
      </div>

      <div className="hidden lg:order-3 lg:col-span-3 lg:flex lg:flex-col lg:gap-4">
        {SECONDARY_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="18vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </>
  );
}
