"use server";

import { redirect } from "next/navigation";
import { resolveTierFromCode } from "@/lib/auth/codes";
import { createSessionCookie } from "@/lib/auth/session";

export type GateState = { error?: "invalid" | "generic" };

function isSafeNextPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

export async function submitAccessCode(
  _prevState: GateState,
  formData: FormData,
): Promise<GateState> {
  const code = String(formData.get("code") ?? "").trim();
  const next = String(formData.get("next") ?? "");

  if (!code) {
    return { error: "invalid" };
  }

  let tier;
  try {
    tier = resolveTierFromCode(code);
  } catch (err) {
    console.error("submitAccessCode failed:", err);
    return { error: "generic" };
  }

  if (!tier) {
    return { error: "invalid" };
  }

  await createSessionCookie(tier);
  redirect(isSafeNextPath(next) ? next : "/");
}
