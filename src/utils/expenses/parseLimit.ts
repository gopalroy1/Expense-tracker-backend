export function parseLimit(value: string | undefined): { value: number } | { error: string } {
  if (!value) return { value: 20 };
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 1) return { error: 'limit must be a positive integer' };
  return { value: Math.min(n, 100) };
}
