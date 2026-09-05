import { z } from "zod";

// Vercel/`.env` files often define an optional var as an empty string
// rather than omitting it — treat "" the same as "unset" for optional
// fields so a blank NEXT_PUBLIC_ZOOM_URL etc. doesn't fail validation.
const optionalString = () =>
  z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(1).optional(),
  );

const serverEnvSchema = z.object({
  SESSION_SECRET: z.string().min(
    16,
    "SESSION_SECRET must be at least 16 characters",
  ),
  ACCESS_CODE_VIN_HONNEUR: z.string().min(1),
  ACCESS_CODE_COMPLET: z.string().min(1),
  RESEND_API_KEY: optionalString(),
  RESEND_FROM_EMAIL: z.preprocess(
    (val) => (val === "" || val === undefined ? "onboarding@resend.dev" : val),
    z.string().email(),
  ),
  ORGANIZER_EMAILS: optionalString(),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

/**
 * Validated accessor for server-only environment variables. Throws a clear
 * error at first use (rather than failing silently deep in some handler)
 * if required configuration is missing.
 */
export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid/missing environment variables — ${issues}`);
  }
  cached = parsed.data;
  return cached;
}

export function getOrganizerEmails(): string[] {
  const raw = getServerEnv().ORGANIZER_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}
