"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/language/LocaleSwitcher";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "programme", key: "programme" },
  { id: "infos-pratiques", key: "infosPratiques" },
  { id: "rsvp", key: "rsvp" },
] as const;

export function Header() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // IntersectionObserver for active-section highlighting.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-ivory/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-script text-2xl text-forest-sage sm:text-3xl"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("coupleNames")}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm tracking-wide transition-colors",
                activeId === item.id
                  ? "bg-muted text-forest-sage"
                  : "text-muted-foreground hover:text-forest-sage",
              )}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
          <LocaleSwitcher className="ml-2" />
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <span className="flex flex-col gap-1">
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-5 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm",
                activeId === item.id
                  ? "bg-muted text-forest-sage"
                  : "text-muted-foreground hover:text-forest-sage",
              )}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
          <LocaleSwitcher className="mt-2 px-3" />
        </nav>
      )}
    </header>
  );
}
