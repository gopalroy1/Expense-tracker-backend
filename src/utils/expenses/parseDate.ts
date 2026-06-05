export function parseDate(value: string | undefined): { date: string } | { error: string } {
  if (!value) return { error: 'date is required (YYYY-MM-DD)' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return { error: 'date must be YYYY-MM-DD format' };
  if (isNaN(new Date(value).getTime())) return { error: 'invalid date' };
  return { date: value };
}
