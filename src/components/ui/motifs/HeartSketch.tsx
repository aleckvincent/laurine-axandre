import { cn } from "@/lib/cn";

/**
 * Small hand-drawn heart — a single sketchy line, deliberately imperfect
 * (slight asymmetry, a light double-stroke retrace on the left lobe) to
 * read as pen-drawn rather than a stock vector heart. Used once, directly
 * above the couple's names in the hero — not a repeating motif.
 */
export function HeartSketch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M32 49 C 12 35 2 22 8 12 C 13 4 25 3 32 15 C 39 3 51 4 56 12 C 62 22 52 35 32 49 Z" />
      {/* faint retrace on the left lobe — the "hand" touching the line twice */}
      <path
        d="M30 45 C 14 33 5 22 10 14"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}
