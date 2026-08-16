import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onDark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-deep-sage shadow-sm hover:shadow-md",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-sand-clay shadow-sm hover:shadow-md",
  outline:
    "border border-border text-foreground bg-transparent hover:bg-muted",
  ghost: "text-foreground bg-transparent hover:bg-muted",
  // For CTAs on a dark full-bleed section (e.g. the forest-sage band): the
  // default focus ring offset color is the page's ivory background, which
  // reads as a stray light halo on a dark section — override it to match.
  onDark:
    "border border-ivory/40 text-ivory bg-transparent hover:bg-ivory/10 focus-visible:ring-offset-forest-sage",
};

type ButtonOwnProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
};

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
