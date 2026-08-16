import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

/**
 * Shown to all three invitation tiers (all include Mairie + Cérémonie
 * religieuse, which is what the Zoom retransmission covers). Reads the
 * public env var at request time so the link can be updated via Vercel
 * without a code change.
 */
export async function ZoomCta() {
  const t = await getTranslations("infosPratiques.zoom");
  const zoomUrl = process.env.NEXT_PUBLIC_ZOOM_URL;

  return (
    <div className="rounded-2xl border border-border bg-mist-sage/30 p-6 text-center sm:p-8">
      <h3 className="font-serif text-xl text-forest-sage">{t("title")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
      <div className="mt-5">
        {zoomUrl ? (
          <Button as="a" href={zoomUrl} target="_blank" rel="noopener noreferrer">
            {t("button")}
          </Button>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            {t("unavailable")}
          </p>
        )}
      </div>
    </div>
  );
}
