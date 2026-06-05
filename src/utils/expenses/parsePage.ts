export function parsePage(value: string | undefined): { value: number } | { error: string } {
  if (!value) return { value: 1 };
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 1) return { error: 'page must be a positive integer' };
  return { value: n };
}
