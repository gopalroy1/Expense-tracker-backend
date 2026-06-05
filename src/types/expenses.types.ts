// ── pg row shapes (pg returns numeric as string, date as string, bool as bool) ─

export interface SummaryRow {
  total_spent: string;
  total_credited: string;
  net_flow: string;
  tx_count: string;
  avg_daily_spend: string;
}

export interface DailyRow {
  date: string;
  total: string;
  tx_count: string;
}

export interface CategoryRow {
  name: string;
  total: string;
  pct: string;
  tx_count: string;
}

export interface MerchantRow {
  merchant: string;
  total: string;
  tx_count: string;
  is_recurring: boolean;
}

export interface TransactionListRow {
  id: string;
  merchant: string | null;
  platform: string | null;
  amount: string;
  currency: string;
  type: string;
  category: string | null;
  account_name: string | null;
  transaction_date: string | null;
  transaction_time: string | null;
  description: string | null;
}

export interface TransactionDayRow {
  id: string;
  merchant: string | null;
  platform: string | null;
  amount: string;
  currency: string;
  type: string;
  category: string | null;
  account_name: string | null;
  transaction_time: string | null;
  description: string | null;
}

export interface CountRow {
  count: string;
}

export interface AvgDailyRow {
  avg_daily_spend: string;
}

// ── Response shapes ───────────────────────────────────────────────────────────

export interface MonthlySummaryResponse {
  period: string;
  summary: {
    total_spent: number;
    total_credited: number;
    net_flow: number;
    tx_count: number;
    avg_daily_spend: number;
  };
  daily: Array<{ date: string; total: number; tx_count: number }>;
  categories: Array<{ name: string; total: number; pct: number; tx_count: number }>;
  top_merchants: Array<{ merchant: string; total: number; tx_count: number; is_recurring: boolean }>;
}

export interface TransactionItem {
  id: string;
  merchant: string | null;
  platform: string | null;
  amount: number;
  currency: string;
  type: string;
  category: string | null;
  account_name: string | null;
  transaction_date: string | null;
  transaction_time: string | null;
  description: string | null;
}

export interface TransactionsResponse {
  data: TransactionItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface DayTransactionItem {
  id: string;
  merchant: string | null;
  platform: string | null;
  amount: number;
  currency: string;
  type: string;
  category: string | null;
  account_name: string | null;
  transaction_time: string | null;
  description: string | null;
}

export interface DayResponse {
  date: string;
  total_spent: number;
  avg_daily_spend: number;
  transactions: DayTransactionItem[];
}

// ── Shared param shape ────────────────────────────────────────────────────────

export interface TransactionFilters {
  category: string | null;
  type: string | null;
  search: string | null;
  accountId: string | null;
}
