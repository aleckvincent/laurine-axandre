import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { Tier } from "@/types/tier";

export type RsvpNotificationProps = {
  nom: string;
  prenom: string;
  presence: "oui" | "non";
  nombrePersonnes?: number;
  message?: string;
  tier: Tier | null;
  locale: string;
  submittedAt: string; // pre-formatted, Europe/Paris
};

const TIER_LABELS: Record<Tier, string> = {
  vin_honneur: "Mairie / Discours / Vin d'honneur",
  complet: "Journée complète (Mairie / Discours / Vin d'honneur / Réception)",
};

export default function RsvpNotification({
  nom,
  prenom,
  presence,
  nombrePersonnes,
  message,
  tier,
  locale,
  submittedAt,
}: RsvpNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Nouvelle réponse RSVP — {prenom} {nom}{" "}
        ({presence === "oui" ? "présent·e" : "absent·e"})
      </Preview>
      <Body
        style={{ backgroundColor: "#fffdf8", fontFamily: "Georgia, serif" }}
      >
        <Container
          style={{
            margin: "0 auto",
            padding: "32px 24px",
            maxWidth: "480px",
          }}
        >
          <Heading style={{ color: "#414f35", fontSize: "20px" }}>
            Nouvelle réponse RSVP
          </Heading>
          <Text style={{ color: "#2a2521", fontSize: "16px" }}>
            <strong>
              {prenom} {nom}
            </strong>{" "}
            {presence === "oui"
              ? "sera présent·e ✅"
              : "ne pourra pas venir ❌"}
          </Text>

          <Hr style={{ borderColor: "#eef1ea", margin: "20px 0" }} />

          <Section>
            {presence === "oui" && (
              <Text style={{ color: "#2a2521", fontSize: "14px" }}>
                Nombre de personnes : <strong>{nombrePersonnes ?? "—"}</strong>
              </Text>
            )}
            <Text style={{ color: "#2a2521", fontSize: "14px" }}>
              Type d&apos;invitation :{" "}
              <strong>{tier ? TIER_LABELS[tier] : "inconnu"}</strong>
            </Text>
            <Text style={{ color: "#2a2521", fontSize: "14px" }}>
              Langue utilisée : <strong>{locale}</strong>
            </Text>
            <Text style={{ color: "#2a2521", fontSize: "14px" }}>
              Envoyé le : <strong>{submittedAt}</strong>
            </Text>
          </Section>

          {message && (
            <>
              <Hr style={{ borderColor: "#eef1ea", margin: "20px 0" }} />
              <Text style={{ color: "#2a2521", fontSize: "14px" }}>
                Message :
              </Text>
              <Text
                style={{
                  color: "#2a2521",
                  fontSize: "14px",
                  fontStyle: "italic",
                  backgroundColor: "#fbf3e7",
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                {message}
              </Text>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
}
