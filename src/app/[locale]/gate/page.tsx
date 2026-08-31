import { getTranslations, setRequestLocale } from "next-intl/server";
import { AccessCodeForm } from "@/components/gate/AccessCodeForm";
import { MandalaDivider } from "@/components/ui/motifs/MandalaDivider";
import { PaisleyCorner } from "@/components/ui/motifs/PaisleyCorner";

export default async function GatePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("gate");
  const common = await getTranslations("common");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-mist-sage/40 via-ivory to-ivory px-5 py-16">
      <PaisleyCorner className="absolute -left-6 -top-6 h-40 w-40 sm:h-56 sm:w-56" />
      <PaisleyCorner
        flip
        className="absolute -bottom-6 -right-6 h-40 w-40 sm:h-56 sm:w-56"
      />

      <div className="relative w-full max-w-md rounded-3xl border border-border/70 bg-ivory/90 p-8 shadow-lg backdrop-blur-sm sm:p-10">
        <div className="mb-6 text-center">
          <p className="font-script text-4xl text-terracotta">
            {common("coupleNames")}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("kicker")}
          </p>
        </div>

        <MandalaDivider className="mb-6" />

        <h1 className="mb-2 text-center font-serif text-2xl text-forest-sage">
          {t("title")}
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t("subtitle")}
        </p>

        <AccessCodeForm next={next ?? "/"} />
      </div>
    </main>
  );
}
