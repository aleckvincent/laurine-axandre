"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common.languageNames");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              router.replace(pathname, { locale: loc });
            });
          }}
          aria-current={loc === locale}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            loc === locale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <span className="sr-only">{t(loc)}</span>
          <span aria-hidden="true">{loc}</span>
        </button>
      ))}
    </div>
  );
}
