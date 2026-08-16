import { cn } from "@/lib/cn";

/**
 * The concentric-circle + 12-tick medallion motif shared by `MandalaDivider`
 * (small, inline section divider) and `CountdownMedallion` (large,
 * ornamental ring around the couple's photo). The viewBox stays fixed at
 * 40x40 — only the rendered `size` changes, so line weights scale
 * proportionally with it rather than needing separate geometry per size.
 */
export function MedallionRing({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="3" />
      <circle cx="20" cy="20" r="8" />
      <circle cx="20" cy="20" r="13" strokeDasharray="1 2.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const x1 = 20 + Math.cos(angle) * 8;
        const y1 = 20 + Math.sin(angle) * 8;
        const x2 = 20 + Math.cos(angle) * 17;
        const y2 = 20 + Math.sin(angle) * 17;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth="0.5"
            opacity={i % 3 === 0 ? 0.9 : 0.35}
          />
        );
      })}
    </svg>
  );
}
