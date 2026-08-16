"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WEDDING_DATE } from "@/lib/constants";

type Remaining = { days: number; hours: number; minutes: number };

function computeRemaining(fromMs: number): Remaining | "past" {
  const diff = WEDDING_DATE.getTime() - fromMs;
  if (diff <= 0) return "past";
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export function CountdownTimer() {
  const t = useTranslations("home.countdown");
  // Lazy initializer: runs once on the client during the initial render of
  // this Client Component, which is the sanctioned place to read a
  // browser-only value like the current time (unlike a Server Component
  // render, this never runs during SSR/static generation).
  const [remaining, setRemaining] = useState<Remaining | "past">(() =>
    computeRemaining(Date.now()),
  );

  useEffect(() => {
    // No seconds displayed, so a 1s tick would just be wasted re-renders —
    // 30s keeps the minutes digit fresh with an imperceptible worst-case lag.
    const interval = setInterval(() => {
      setRemaining(computeRemaining(Date.now()));
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (remaining === "past") {
    return (
      <p className="text-center font-serif text-xl text-forest-sage">
        {t("past")}
      </p>
    );
  }

  const units: Array<[number, "days" | "hours" | "minutes"]> = [
    [remaining.days, "days"],
    [remaining.hours, "hours"],
    [remaining.minutes, "minutes"],
  ];

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      role="timer"
      aria-live="off"
    >
      {units.map(([value, unit]) => (
        <div
          key={unit}
          className="flex min-w-[4.5rem] flex-col items-center rounded-full border border-border-gold px-3 py-2 sm:min-w-[5.5rem] sm:px-4 sm:py-3"
        >
          <span className="font-serif text-2xl tabular-nums text-forest-sage sm:text-3xl">
            {value}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
            {t(unit, { count: value })}
          </span>
        </div>
      ))}
    </div>
  );
}
