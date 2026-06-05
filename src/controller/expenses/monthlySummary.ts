import { Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import { fetchMonthlySummary } from '../../services/expenses/fetchMonthlySummary';
import { parseMonth } from '../../utils/expenses/parseMonth';

export async function monthlySummary(req: AuthRequest, res: Response) {
  const userId = req.user as string;
  const q = req.query as Record<string, string | undefined>;

  const month = parseMonth(q.month);
  if ('error' in month) return res.status(400).json({ error: month.error, code: 'INVALID_PARAM' });

  try {
    return res.json(
      await fetchMonthlySummary(userId, month.date, q.account_id?.trim() ?? null)
    );
  } catch (err) {
    console.error('monthly-summary error:', err);
    return res.status(500).json({ error: 'Internal server error', code: 'INTERNAL_ERROR' });
  }
}
