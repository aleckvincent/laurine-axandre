"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitAccessCode, type GateState } from "@/app/actions/gate";
import { Button } from "@/components/ui/Button";

const initialState: GateState = {};

export function AccessCodeForm({ next }: { next: string }) {
  const t = useTranslations("gate");
  const [state, formAction, isPending] = useActionState(
    submitAccessCode,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="code"
          className="text-sm font-medium tracking-wide text-forest-sage"
        >
          {t("codeLabel")}
        </label>
        <input
          id="code"
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          required
          placeholder={t("codePlaceholder")}
          className="rounded-xl border border-border bg-ivory px-4 py-3 text-center text-lg tracking-[0.2em] text-foreground placeholder:tracking-normal placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-center text-sm text-burnt-terracotta">
          {state.error === "invalid" ? t("errorInvalidCode") : t("errorGeneric")}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? t("submitting") : t("submitButton")}
      </Button>
    </form>
  );
}
