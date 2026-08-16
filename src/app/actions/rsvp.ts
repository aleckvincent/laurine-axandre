"use server";

import { getTranslations } from "next-intl/server";
import { rsvpSchema } from "@/lib/schema/rsvp";
import { getResendClient } from "@/lib/resend";
import { getOrganizerEmails, getServerEnv } from "@/lib/env";
import { getSessionTier } from "@/lib/auth/session";
import { routing } from "@/i18n/routing";
import RsvpNotification from "@/emails/RsvpNotification";

export type RsvpState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Record<string, string>;
  formError?: string;
};

function formatParisTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(date);
}

export async function submitRsvp(
  _prevState: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const raw = {
    nom: formData.get("nom"),
    prenom: formData.get("prenom"),
    presence: formData.get("presence"),
    nombrePersonnes: formData.get("nombrePersonnes") || undefined,
    message: formData.get("message") || undefined,
    locale: formData.get("locale"),
  };

  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) {
    // Translate validation messages using the locale the form was
    // submitted in — falls back to the default locale if it's missing or
    // invalid (e.g. tampered request), so an error is still readable.
    const submittedLocale = String(raw.locale ?? "");
    const locale = routing.locales.includes(
      submittedLocale as (typeof routing.locales)[number],
    )
      ? (submittedLocale as (typeof routing.locales)[number])
      : routing.defaultLocale;
    const t = await getTranslations({ locale, namespace: "rsvp.validation" });

    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (fieldErrors[key]) continue;
      fieldErrors[key] = t(
        key === "nombrePersonnes" ? "nombrePersonnesMin" : "required",
      );
    }
    return { status: "error", fieldErrors };
  }

  const data = parsed.data;

  // Re-read the tier server-side — never trust a client-supplied value.
  const tier = await getSessionTier();

  const organizerEmails = getOrganizerEmails();
  if (organizerEmails.length === 0) {
    return { status: "error", formError: "generic" };
  }

  try {
    const resend = getResendClient();
    const { RESEND_FROM_EMAIL } = getServerEnv();

    await resend.emails.send({
      from: `Faire-part Laurine & Axandre <${RESEND_FROM_EMAIL}>`,
      to: organizerEmails,
      subject: `RSVP — ${data.prenom} ${data.nom} (${data.presence === "oui" ? "présent·e" : "absent·e"})`,
      react: RsvpNotification({
        nom: data.nom,
        prenom: data.prenom,
        presence: data.presence,
        nombrePersonnes: data.nombrePersonnes,
        message: data.message,
        tier,
        locale: data.locale,
        submittedAt: formatParisTimestamp(new Date()),
      }),
    });

    return { status: "success" };
  } catch (err) {
    console.error("submitRsvp: failed to send notification email", err);
    return { status: "error", formError: "generic" };
  }
}
