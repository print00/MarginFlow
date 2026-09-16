export type TxType = "income" | "expense";
export type Transaction = {
  id: string; date: string; description: string; amount: number; type: TxType;
  category: string; confidence: number; needsReview: boolean;
};
export type ManualEntry = {
  id: string; date: string; title: string; amount: number; type: TxType; category: string; notes?: string;
};
export type Payroll = {
  id: string; start: string; end: string; kitchen: number; server: number; manager: number; other: number; notes?: string;
};
export type Target = { sales: number; profit: number };
export type AppData = { transactions: Transaction[]; manual: ManualEntry[]; payroll: Payroll[]; target: Target };
