"use client";

import dynamic from "next/dynamic";

// The countdown reads Date.now() to seed its initial numbers. Rendering it
// on the server would embed server-clock digits in the HTML that near-
// certainly mismatch the client's clock at hydration time (off by however
// long the response took to reach the browser). Loading it client-only
// sidesteps that entirely — no SSR pass, so nothing to mismatch — and lets
// the component use a plain lazy useState initializer instead of an
// effect-based "seed then tick" dance.
const CountdownTimer = dynamic(
  () => import("./CountdownTimer").then((mod) => mod.CountdownTimer),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        aria-hidden="true"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex min-w-[4.5rem] flex-col items-center rounded-full border border-border-gold px-3 py-2 sm:min-w-[5.5rem] sm:px-4 sm:py-3"
          >
            <span className="font-serif text-2xl text-forest-sage/30 sm:text-3xl">
              –
            </span>
          </div>
        ))}
      </div>
    ),
  },
);

export { CountdownTimer as CountdownTimerClientOnly };
