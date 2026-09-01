import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CountdownMedallion } from "@/components/countdown/CountdownMedallion";
import { HeroCollage } from "@/components/home/HeroCollage";
import { PhotoSlider } from "@/components/home/PhotoSlider";
import { MandalaDivider } from "@/components/ui/motifs/MandalaDivider";
import { PaisleyCorner } from "@/components/ui/motifs/PaisleyCorner";
import { HeartSketch } from "@/components/ui/motifs/HeartSketch";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapsCta } from "@/components/maps/MapsCta";
import { ZoomCta } from "@/components/zoom/ZoomCta";
import { ContactsCard } from "@/components/contacts/ContactsCard";
import { DerouleList } from "@/components/schedule/DerouleList";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { requireTier } from "@/lib/auth/session";
import { filterScheduleForTier } from "@/lib/schedule";
import { VENUES, WEDDING_DATE } from "@/lib/constants";
import type { AppLocale } from "@/i18n/routing";
import masTolosaVenueIllustration from "@/assets/illustrations/mas-tolosa-venue.png";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tier = await requireTier(locale);
  const steps = filterScheduleForTier(tier);

  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const tDeroule = await getTranslations("deroule");
  const tInfos = await getTranslations("infosPratiques");
  const tRsvp = await getTranslations("rsvp");

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative min-h-[70vh] overflow-hidden sm:min-h-[80vh] lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:overflow-visible lg:px-8 lg:py-24 xl:gap-10">
        <HeroCollage />

        {
          /* Overlay for text legibility — only needed on mobile, where the
            photo sits full-bleed behind the text; on desktop the photo
            moves into its own collage column instead. */
        }
        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/30 to-ink/60 lg:hidden" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center sm:min-h-[80vh] sm:py-28 lg:order-1 lg:col-span-5 lg:min-h-0 lg:items-start lg:px-0 lg:py-0 lg:text-left">
          <PaisleyCorner className="absolute -left-6 -top-6 h-32 w-32 text-soft-gold/30 sm:h-40 sm:w-40 lg:hidden" />
          <PaisleyCorner
            className="absolute -bottom-6 -right-6 h-32 w-32 text-soft-gold/30 sm:h-40 sm:w-40 lg:hidden"
            flip
          />
          <PaisleyCorner className="hidden h-24 w-24 lg:absolute lg:-left-8 lg:-top-8 lg:block" />

          <HeartSketch className="animate-fade-up h-8 w-8 text-ivory/90 drop-shadow-md sm:h-10 sm:w-10 lg:text-terracotta/80 lg:drop-shadow-none" />

          <h1 className="animate-fade-up mt-3 font-script text-6xl text-ivory drop-shadow-md [animation-delay:120ms] sm:text-8xl lg:text-foreground lg:drop-shadow-none">
            {common("coupleNames")}
          </h1>
          <p className="animate-fade-up mt-4 font-serif text-xl tracking-wide text-ivory/90 [animation-delay:240ms] sm:text-2xl lg:text-muted-foreground">
            {t("heroDateIntro")} {common("weddingDateLong")}
          </p>

          <MandalaDivider
            tone="gold"
            className="animate-fade-up my-10 [animation-delay:360ms] lg:mx-0 lg:text-terracotta/70"
          />
        </div>
      </section>

      {/* ───────── Countdown médaillon ───────── */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <CountdownMedallion />
        </div>
      </section>

      {/* ───────── Programme (Déroulé + Slider) ───────── */}
      <MandalaDivider className="my-0 py-10" />

      <section
        id="programme"
        className="scroll-mt-24 px-5 pb-16 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {tDeroule("kicker")}
            </p>
            <h2 className="mt-3 font-serif text-4xl text-forest-sage">
              {tDeroule("title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tDeroule("subtitle")}
            </p>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col">
              <DerouleList steps={steps} />
              {
                /* Fills the empty space left under the shortened timeline
                  once it's shorter than the slider beside it — desktop
                  only, since the columns stack on mobile and no gap exists
                  there. */
              }
              <div className="relative mx-auto mt-10 hidden aspect-3/2 w-full max-w-md lg:block">
                <Image
                  src={masTolosaVenueIllustration}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 448px, 0px"
                  className="object-contain"
                />
              </div>
            </div>
            <PhotoSlider locale={locale} />
          </div>
        </div>
      </section>

      {/* ───────── Infos pratiques ───────── */}
      <MandalaDivider className="my-0 py-10" />

      <section
        id="infos-pratiques"
        className="scroll-mt-24 px-5 pb-16 sm:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl text-forest-sage">
              {tInfos("title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tInfos("subtitle")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Card className="relative border-border-gold shadow-md">
              <PaisleyCorner className="absolute -right-3 -top-3 h-20 w-20" />
              <h3 className="font-serif text-xl text-forest-sage">
                {tInfos("venues.mairieTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tInfos("venues.mairieAddress")}
              </p>
              <div className="mt-5">
                <MapsCta
                  mapsUrl={VENUES.mairie.mapsUrl}
                  label={tInfos("venues.mapsButton")}
                />
              </div>
            </Card>

            <Card className="relative border-border-gold shadow-md">
              <PaisleyCorner className="absolute -right-3 -top-3 h-20 w-20" />
              <h3 className="font-serif text-xl text-forest-sage">
                {tInfos("venues.masTolosaTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tInfos("venues.masTolosaAddress")}
              </p>
              <div className="mt-5">
                <MapsCta
                  mapsUrl={VENUES.masTolosa.mapsUrl}
                  label={tInfos("venues.mapsButton")}
                />
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <ZoomCta />
          </div>

          <ContactsCard />
        </div>
      </section>

      {/* ───────── Célébration (bande pleine largeur) ───────── */}
      <section
        id="celebration"
        className="scroll-mt-24 bg-forest-sage px-5 py-16 text-ivory sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <MandalaDivider tone="gold" className="mb-8" />
          <p className="font-serif text-2xl text-ivory sm:text-3xl">
            {t("celebration.title")}
          </p>
          <p className="mt-3 text-ivory/80">
            {t("celebration.subtitle", { date: common("weddingDateLong") })}
          </p>
          <Button as="a" href="#rsvp" variant="onDark" className="mt-8">
            {t("celebration.cta")}
          </Button>
        </div>
      </section>

      {/* ───────── RSVP ───────── */}
      <section
        id="rsvp"
        className="scroll-mt-24 px-5 py-16 pb-20 sm:px-8 sm:pt-20"
      >
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl text-forest-sage">
              {tRsvp("title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tRsvp("subtitle")}
            </p>
          </div>

          <div className="relative mt-10 rounded-2xl border border-border-gold bg-ivory/80 p-6 shadow-md sm:p-8">
            <PaisleyCorner className="absolute -right-4 -top-4 h-24 w-24" />
            <RsvpForm />
          </div>
        </div>
      </section>
    </>
  );
}

export function generateMetadata() {
  return { other: { "wedding-date": WEDDING_DATE.toISOString() } };
}
