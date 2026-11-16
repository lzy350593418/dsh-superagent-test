const UNIT_MS = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

export function parseDuration(input) {
  const text = String(input).trim();
  if (!text) throw new Error('empty duration');
  const parts = text.match(/\d+(?:\.\d+)?[smhd]/g) ?? [];
  if (parts.join('') !== text) throw new Error(`unparsable duration: ${input}`);
  return parts.reduce((total, part) => {
    const unit = part.slice(-1);
    const value = Number(part.slice(0, -1));
    return total + value * UNIT_MS[unit];
  }, 0);
}
