import { cn } from "@/lib/cn";
import { MedallionRing } from "@/components/ui/motifs/MedallionRing";

const toneClasses = {
  terracotta: "text-terracotta/70",
  gold: "text-accent-gold/70",
} as const;

/**
 * Thin-line mandala medallion flanked by hairline rules — used as a
 * section divider. Single color via `currentColor`; keep usage to one per
 * screen-height so it stays a structural accent, not decoration overload.
 */
export function MandalaDivider({
  className,
  tone = "terracotta",
}: {
  className?: string;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xs items-center gap-4",
        toneClasses[tone],
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-40" />
      <MedallionRing />
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  );
}
