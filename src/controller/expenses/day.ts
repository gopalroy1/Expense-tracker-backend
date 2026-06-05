import { Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import { fetchDayTransactions } from '../../services/expenses/fetchDayTransactions';
import { parseDate } from '../../utils/expenses/parseDate';

export async function day(req: AuthRequest, res: Response) {
  const userId = req.user as string;
  const q = req.query as Record<string, string | undefined>;

  const date = parseDate(q.date);
  if ('error' in date) return res.status(400).json({ error: date.error, code: 'INVALID_PARAM' });

  try {
    return res.json(
      await fetchDayTransactions(userId, date.date, q.account_id?.trim() ?? null)
    );
  } catch (err) {
    console.error('day error:', err);
    return res.status(500).json({ error: 'Internal server error', code: 'INTERNAL_ERROR' });
  }
}
