import { getTranslations } from "next-intl/server";

/**
 * The two on-the-ground contacts guests may need during the day: the
 * animations lead (for guests wanting to suggest something for the
 * program) and the master of ceremonies (for any other question). Phone
 * numbers are hardcoded here rather than in i18n messages since they're
 * locale-independent data, not copy.
 */
const CONTACTS = [
  {
    key: "animations",
    phone: "+33659135332",
    phoneDisplay: "+33 6 59 13 53 32",
  },
  {
    key: "ceremonie",
    phone: "+33638044451",
    phoneDisplay: "+33 6 38 04 44 51",
  },
] as const;

export async function ContactsCard() {
  const t = await getTranslations("infosPratiques.contacts");

  return (
    <div className="mt-6 rounded-2xl border border-border bg-mist-sage/30 p-6 sm:p-8">
      <h3 className="text-center font-serif text-xl text-forest-sage">
        {t("title")}
      </h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {CONTACTS.map((contact) => (
          <div key={contact.key} className="text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {t(`${contact.key}.role`)}
            </p>
            <p className="mt-1 font-serif text-lg text-forest-sage">
              {t(`${contact.key}.name`)}
            </p>
            <a
              href={`tel:${contact.phone}`}
              className="mt-1 inline-block text-sm text-terracotta underline-offset-4 hover:underline"
            >
              {contact.phoneDisplay}
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(`${contact.key}.note`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
