import { pool } from '../../config/pgPool';
import {
  TransactionDayRow, AvgDailyRow,
  DayResponse,
} from '../../types/expenses.types';

export async function fetchDayTransactions(
  userId: string,
  date: string,
  accountId: string | null
): Promise<DayResponse> {
  const monthDate = `${date.slice(0, 7)}-01`;

  const [txRes, avgRes] = await Promise.all([
    pool.query<TransactionDayRow>(
      `SELECT id, merchant, platform, amount, currency, type,
              category, account_name, transaction_time, description
       FROM transactions
       WHERE user_id = $1
         AND transaction_date = $2::date
         AND ($3::text IS NULL OR account_name = $3)
       ORDER BY transaction_time ASC NULLS LAST`,
      [userId, date, accountId]
    ),
    pool.query<AvgDailyRow>(
      `SELECT COALESCE(
         SUM(CASE WHEN type='debit' THEN amount ELSE 0 END)
         / NULLIF(COUNT(DISTINCT CASE WHEN type='debit' THEN transaction_date END), 0),
       0) AS avg_daily_spend
       FROM transactions
       WHERE user_id = $1
         AND DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', $2::date)
         AND ($3::text IS NULL OR account_name = $3)`,
      [userId, monthDate, accountId]
    ),
  ]);

  const totalSpent = txRes.rows.reduce(
    (sum, r) => sum + (r.type === 'debit' ? parseFloat(r.amount) : 0),
    0
  );

  return {
    date,
    total_spent:     totalSpent,
    avg_daily_spend: parseFloat(avgRes.rows[0].avg_daily_spend),
    transactions: txRes.rows.map(r => ({
      id:               r.id,
      merchant:         r.merchant,
      platform:         r.platform,
      amount:           parseFloat(r.amount),
      currency:         r.currency,
      type:             r.type,
      category:         r.category,
      account_name:     r.account_name,
      transaction_time: r.transaction_time,
      description:      r.description,
    })),
  };
}
