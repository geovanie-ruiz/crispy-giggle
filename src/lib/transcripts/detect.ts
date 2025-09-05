export type TranscriptSource = "wing-table" | "zumbo-sim" | "unknown";

// Heuristically detect the transcript source by scanning the beginning of the log.
// We avoid relying on the very first line to tolerate leading noise.
export function detectTranscriptSource(raw: string): TranscriptSource {
  if (!raw) return "unknown";
  const head = raw.slice(0, 4000);
  const lines = head
    .split(/\r?\n/)
    .slice(0, 120)
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l.length > 0);
  const joined = lines.join("\n");

  // Wing Table signatures
  const wingBullets = lines.some((l) => l.startsWith("• "));
  const wingRounds = /\*\*\*\s*round\s*\d+\s*begins!?\s*\*\*\*/.test(joined);
  const wingPlayedCodes = /\([a-z]{2}\d{2}-\d{3}\)/i.test(joined) ||
    /\([stgd]\d{2}-\d{3}\)/i.test(joined);
  const wingActions = joined.includes("action step begins") ||
    joined.includes("exhausted") || joined.includes("is attacking");
  const isWing = (wingBullets && wingRounds) ||
    (wingActions && wingPlayedCodes);

  // Zumbo Sim signatures
  const zumboPhases = lines.some((l) => l.startsWith("|| "));
  const zumboEnterCombat = joined.includes("enter combat") ||
    joined.includes("action timing begins");
  const zumboP1P2 = lines.some((l) => l.startsWith("p1") || l.startsWith("p2"));
  const zumboBracketIds = /\[p[12][a-z]?\]/.test(joined) ||
    /\[p[12][a-z]\]/.test(joined);
  const isZumbo = (zumboPhases && zumboEnterCombat) ||
    (zumboP1P2 && zumboBracketIds);

  if (isWing && !isZumbo) return "wing-table";
  if (isZumbo && !isWing) return "zumbo-sim";
  return "unknown";
}
