/**
 * Keep the last `count` words on the same line so subtitles never end
 * with a single orphaned word.
 */
export function preventOrphan(text: string, count = 2): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return text.trim();
  const keep = Math.min(count, words.length);
  const head = words.slice(0, -keep);
  const tail = words.slice(-keep);
  return [...head, tail.join("\u00A0")].filter(Boolean).join(" ");
}
