import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CountdownTimerClientOnly as CountdownTimer } from "@/components/countdown/CountdownTimerClientOnly";
import { MedallionRing } from "@/components/ui/motifs/MedallionRing";
import { SLIDER_PHOTOS } from "@/lib/photos";

const MEDALLION_PHOTO = SLIDER_PHOTOS.find(
  (photo) => photo.id === "sunset-profile-embrace",
)!;

/**
 * The countdown's new home: a round couple photo ringed by the shared
 * medallion motif, with the ticking numbers below — the "photo + stats
 * badge" idea from the Dribbble inspiration, built from existing
 * components/photos only.
 */
export async function CountdownMedallion() {
  const t = await getTranslations("home.countdown");

  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {t("title")}
      </p>

      <div className="relative mt-6 h-32 w-32 sm:h-44 sm:w-44">
        <MedallionRing
          className="pointer-events-none absolute inset-0 -m-6 h-44 w-44 text-muted-gold/70 sm:-m-8 sm:h-60 sm:w-60"
        />
        <Image
          src={MEDALLION_PHOTO.src}
          alt=""
          fill
          sizes="(min-width: 640px) 11rem, 8rem"
          className="rounded-full object-cover"
        />
      </div>

      <div className="mt-8 w-full max-w-sm">
        <CountdownTimer />
      </div>
    </div>
  );
}
