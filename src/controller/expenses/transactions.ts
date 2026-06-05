import { Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import { fetchTransactions } from '../../services/expenses/fetchTransactions';
import { parseLimit } from '../../utils/expenses/parseLimit';
import { parseMonth } from '../../utils/expenses/parseMonth';
import { parsePage } from '../../utils/expenses/parsePage';
import { sanitizeSearch } from '../../utils/expenses/sanitizeSearch';

export async function transactions(req: AuthRequest, res: Response) {
  const userId = req.user as string;
  const q = req.query as Record<string, string | undefined>;

  const month = parseMonth(q.month);
  if ('error' in month) return res.status(400).json({ error: month.error, code: 'INVALID_PARAM' });

  const page = parsePage(q.page);
  if ('error' in page) return res.status(400).json({ error: page.error, code: 'INVALID_PARAM' });

  const limit = parseLimit(q.limit);
  if ('error' in limit) return res.status(400).json({ error: limit.error, code: 'INVALID_PARAM' });

  if (q.type !== undefined && q.type !== 'debit' && q.type !== 'credit') {
    return res.status(400).json({ error: 'type must be debit or credit', code: 'INVALID_PARAM' });
  }

  try {
    return res.json(
      await fetchTransactions(userId, month.date, page.value, limit.value, {
        category:  q.category?.trim() ?? null,
        type:      q.type ?? null,
        search:    sanitizeSearch(q.search),
        accountId: q.account_id?.trim() ?? null,
      })
    );
  } catch (err) {
    console.error('transactions error:', err);
    return res.status(500).json({ error: 'Internal server error', code: 'INTERNAL_ERROR' });
  }
}
