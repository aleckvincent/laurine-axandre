import { cn } from "@/lib/cn";

/**
 * Single, subtle paisley/mango outline used sparingly in one corner of a
 * hero or card (e.g. RSVP card, gate page). Low-opacity line art only —
 * never a filled or repeating pattern, to keep the "épuré" reading.
 */
export function PaisleyCorner({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className={cn(
        "pointer-events-none text-forest-sage/25",
        flip && "-scale-x-100",
        className,
      )}
      aria-hidden="true"
    >
      <path d="M20 100 C10 70 20 40 45 30 C65 22 85 30 88 48 C91 65 78 75 65 68 C55 62 55 50 65 47 C72 45 76 50 73 55" />
      <circle cx="20" cy="100" r="2.5" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  );
}
