import { getTranslations } from "next-intl/server";
import type { ScheduleStep } from "@/lib/schedule";

export async function DerouleList({ steps }: { steps: ScheduleStep[] }) {
  const t = await getTranslations("deroule");

  return (
    <ol className="relative flex flex-col gap-8 border-l border-border pl-6 sm:pl-8">
      {steps.map((step) => (
        <li key={step.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-terracotta sm:-left-[calc(2rem+5px)]"
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="font-serif text-lg tabular-nums text-terracotta sm:w-16 sm:shrink-0">
              {step.time}
            </span>
            <div>
              <p className="text-base text-forest-sage">
                {t(`steps.${step.labelKey}`)}
              </p>
              {step.location && (
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t(`locations.${step.location}`)}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
