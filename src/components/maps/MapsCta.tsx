import { Button } from "@/components/ui/Button";

export function MapsCta({
  mapsUrl,
  label,
}: {
  mapsUrl: string;
  label: string;
}) {
  return (
    <Button
      as="a"
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
    >
      {label}
    </Button>
  );
}
