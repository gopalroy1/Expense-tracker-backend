export function parseMonth(value: string | undefined): { date: string } | { error: string } {
  if (!value) return { error: 'month is required (YYYY-MM)' };
  if (!/^\d{4}-\d{2}$/.test(value)) return { error: 'month must be YYYY-MM format' };
  return { date: `${value}-01` };
}
