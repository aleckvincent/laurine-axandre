import { z } from "zod";

export const rsvpSchema = z
  .object({
    nom: z.string().trim().min(1).max(100),
    prenom: z.string().trim().min(1).max(100),
    presence: z.enum(["oui", "non"]),
    nombrePersonnes: z.coerce.number().int().min(1).max(10).optional(),
    message: z.string().trim().max(2000).optional(),
    locale: z.enum(["fr", "de"]),
  })
  .superRefine((data, ctx) => {
    if (data.presence === "oui" && !data.nombrePersonnes) {
      ctx.addIssue({
        code: "custom",
        path: ["nombrePersonnes"],
        message: "required",
      });
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
