import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const data = await readFile(join(process.cwd(), "src/assets/icon.png"));
  return new Response(data, {
    headers: { "Content-Type": "image/png" },
  });
}
