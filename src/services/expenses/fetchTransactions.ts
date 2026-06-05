import { pool } from '../../config/pgPool';
import {
  TransactionListRow, CountRow,
  TransactionFilters, TransactionsResponse,
} from '../../types/expenses.types';

export async function fetchTransactions(
  userId: string,
  monthDate: string,
  page: number,
  limit: number,
  filters: TransactionFilters
): Promise<TransactionsResponse> {
  const offset = (page - 1) * limit;
  const searchPattern = filters.search ? `%${filters.search}%` : null;

  const baseParams: (string | null)[] = [
    userId,
    monthDate,
    filters.category,
    filters.type,
    searchPattern,
    filters.accountId,
  ];

  // Static string — no user input interpolated, values stay in parameterised array
  const where = `
    WHERE user_id = $1
      AND DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', $2::date)
      AND ($3::text IS NULL OR category = $3)
      AND ($4::text IS NULL OR type = $4)
      AND ($5::text IS NULL OR (merchant ILIKE $5 OR description ILIKE $5))
      AND ($6::text IS NULL OR account_name = $6)`;

  const [dataRes, countRes] = await Promise.all([
    pool.query<TransactionListRow>(
      `SELECT id, merchant, platform, amount, currency, type,
              category, account_name, transaction_date::text, transaction_time, description
       FROM transactions
       ${where}
       ORDER BY transaction_date DESC, transaction_time DESC NULLS LAST
       LIMIT $7 OFFSET $8`,
      [...baseParams, limit, offset]
    ),
    pool.query<CountRow>(
      `SELECT COUNT(*) AS count FROM transactions ${where}`,
      baseParams
    ),
  ]);

  const total = parseInt(countRes.rows[0].count, 10);

  return {
    data: dataRes.rows.map(r => ({
      id:               r.id,
      merchant:         r.merchant,
      platform:         r.platform,
      amount:           parseFloat(r.amount),
      currency:         r.currency,
      type:             r.type,
      category:         r.category,
      account_name:     r.account_name,
      transaction_date: r.transaction_date,
      transaction_time: r.transaction_time,
      description:      r.description,
    })),
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
}
