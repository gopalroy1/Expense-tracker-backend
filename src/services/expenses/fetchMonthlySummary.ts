import { pool } from '../../config/pgPool';
import {
  SummaryRow, DailyRow, CategoryRow, MerchantRow,
  MonthlySummaryResponse,
} from '../../types/expenses.types';

export async function fetchMonthlySummary(
  userId: string,
  monthDate: string,
  accountId: string | null
): Promise<MonthlySummaryResponse> {
  const period = monthDate.slice(0, 7);

  const [summaryRes, dailyRes, categoriesRes, merchantsRes] = await Promise.all([
    pool.query<SummaryRow>(
      `SELECT
         COALESCE(SUM(CASE WHEN type='debit'  THEN amount ELSE 0 END), 0)   AS total_spent,
         COALESCE(SUM(CASE WHEN type='credit' THEN amount ELSE 0 END), 0)   AS total_credited,
         COALESCE(SUM(CASE WHEN type='credit' THEN amount ELSE -amount END), 0) AS net_flow,
         COUNT(*)                                                             AS tx_count,
         COALESCE(
           SUM(CASE WHEN type='debit' THEN amount ELSE 0 END)
           / NULLIF(COUNT(DISTINCT CASE WHEN type='debit' THEN transaction_date END), 0),
         0) AS avg_daily_spend
       FROM transactions
       WHERE user_id = $1
         AND DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', $2::date)
         AND ($3::text IS NULL OR account_name = $3)`,
      [userId, monthDate, accountId]
    ),

    pool.query<DailyRow>(
      `SELECT
         transaction_date::text                                               AS date,
         COALESCE(SUM(CASE WHEN type='debit' THEN amount ELSE 0 END), 0)    AS total,
         COUNT(*)                                                             AS tx_count
       FROM transactions
       WHERE user_id = $1
         AND DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', $2::date)
         AND ($3::text IS NULL OR account_name = $3)
       GROUP BY transaction_date
       ORDER BY transaction_date ASC`,
      [userId, monthDate, accountId]
    ),

    pool.query<CategoryRow>(
      `SELECT
         category                                                             AS name,
         COALESCE(SUM(amount), 0)                                            AS total,
         ROUND(100.0 * COALESCE(SUM(amount), 0) / NULLIF(SUM(SUM(COALESCE(amount, 0))) OVER (), 0), 1) AS pct,
         COUNT(*)                                                             AS tx_count
       FROM transactions
       WHERE user_id = $1
         AND type = 'debit'
         AND category IS NOT NULL
         AND DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', $2::date)
         AND ($3::text IS NULL OR account_name = $3)
       GROUP BY category
       ORDER BY total DESC`,
      [userId, monthDate, accountId]
    ),

    // No month filter — is_recurring checks full history
    pool.query<MerchantRow>(
      `SELECT
         merchant,
         COALESCE(SUM(amount), 0)                                            AS total,
         COUNT(*)                                                             AS tx_count,
         (COUNT(DISTINCT DATE_TRUNC('month', transaction_date)) > 1)         AS is_recurring
       FROM transactions
       WHERE user_id = $1
         AND type = 'debit'
         AND merchant IS NOT NULL
         AND ($2::text IS NULL OR account_name = $2)
       GROUP BY merchant
       ORDER BY total DESC
       LIMIT 10`,
      [userId, accountId]
    ),
  ]);

  const s = summaryRes.rows[0];

  return {
    period,
    summary: {
      total_spent:     parseFloat(s.total_spent),
      total_credited:  parseFloat(s.total_credited),
      net_flow:        parseFloat(s.net_flow),
      tx_count:        parseInt(s.tx_count, 10),
      avg_daily_spend: parseFloat(s.avg_daily_spend),
    },
    daily: dailyRes.rows.map(r => ({
      date:     r.date,
      total:    parseFloat(r.total),
      tx_count: parseInt(r.tx_count, 10),
    })),
    categories: categoriesRes.rows.map(r => ({
      name:     r.name,
      total:    parseFloat(r.total),
      pct:      parseFloat(r.pct),
      tx_count: parseInt(r.tx_count, 10),
    })),
    top_merchants: merchantsRes.rows.map(r => ({
      merchant:     r.merchant,
      total:        parseFloat(r.total),
      tx_count:     parseInt(r.tx_count, 10),
      is_recurring: r.is_recurring,
    })),
  };
}
