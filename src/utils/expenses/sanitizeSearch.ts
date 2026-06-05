export function sanitizeSearch(value: string | undefined): string | null {
  if (!value) return null;
  return value.trim().slice(0, 100) || null;
}
