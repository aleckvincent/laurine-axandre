"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitRsvp, type RsvpState } from "@/app/actions/rsvp";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const rsvpInitialState: RsvpState = { status: "idle" };

export function RsvpForm() {
  const t = useTranslations("rsvp");
  const locale = useLocale();
  const [presence, setPresence] = useState<"oui" | "non" | null>(null);
  const [state, formAction, isPending] = useActionState(
    submitRsvp,
    rsvpInitialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-mist-sage/30 p-8 text-center">
        <h2 className="font-serif text-2xl text-forest-sage">
          {t("successTitle")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("successMessage")}</p>
      </div>
    );
  }

  const error = (field: string) => state.fieldErrors?.[field];

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="prenom"
          name="prenom"
          label={t("fields.prenom")}
          error={error("prenom")}
        />
        <Field id="nom" name="nom" label={t("fields.nom")} error={error("nom")} />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-forest-sage">
          {t("fields.presence")}
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["oui", "non"] as const).map((value) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm transition-colors",
                presence === value
                  ? "border-terracotta bg-terracotta/10 text-forest-sage"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              <input
                type="radio"
                name="presence"
                value={value}
                required
                className="sr-only"
                onChange={() => setPresence(value)}
              />
              {t(`fields.presence${value === "oui" ? "Oui" : "Non"}`)}
            </label>
          ))}
        </div>
      </fieldset>

      {presence === "oui" && (
        <Field
          id="nombrePersonnes"
          name="nombrePersonnes"
          type="number"
          min={1}
          max={10}
          defaultValue={1}
          label={t("fields.nombrePersonnes")}
          error={error("nombrePersonnes")}
        />
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-forest-sage">
          {t("fields.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-xl border border-border bg-ivory px-4 py-3 text-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        />
      </div>

      {state.status === "error" && state.formError && (
        <p role="alert" className="text-center text-sm text-burnt-terracotta">
          {t("errorMessage")}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? t("submitting") : t("submitButton")}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-forest-sage">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        className="rounded-xl border border-border bg-ivory px-4 py-3 text-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        {...rest}
      />
      {error && <p className="text-xs text-burnt-terracotta">{error}</p>}
    </div>
  );
}
