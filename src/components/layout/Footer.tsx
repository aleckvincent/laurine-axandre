import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-border/60 bg-cream/60 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-5 text-center text-sm text-muted-foreground sm:px-8">
        <p className="font-script text-xl text-forest-sage">{t("coupleNames")}</p>
        <p>{t("footer.madeWith")}</p>
        <Link href="/gate" className="underline-offset-4 hover:underline">
          {t("footer.logout")}
        </Link>
      </div>
    </footer>
  );
}
