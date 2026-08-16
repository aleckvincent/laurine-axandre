import "server-only";
import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";

let client: Resend | null = null;

export function getResendClient(): Resend {
  const { RESEND_API_KEY } = getServerEnv();
  if (!RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not configured — set it in the environment to enable RSVP emails.",
    );
  }
  if (!client) {
    client = new Resend(RESEND_API_KEY);
  }
  return client;
}
