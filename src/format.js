const UNITS = [
  ['d', 86_400_000],
  ['h', 3_600_000],
  ['m', 60_000],
  ['s', 1000],
];

export function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms < 0) throw new Error(`invalid duration: ${ms}`);
  let left = ms;
  const out = [];
  for (const [unit, size] of UNITS) {
    const count = Math.floor(left / size);
    if (count) out.push(`${count}${unit}`);
    left -= count * size;
  }
  return out.join('') || '0s';
}
