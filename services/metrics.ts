import type { AppData } from "@/types";

export function calculateMetrics(data: AppData) {
  const incomeTx = data.transactions.filter((t) => t.type === "income");
  const expenseTx = data.transactions.filter((t) => t.type === "expense");
  const manualIncome = data.manual.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const manualExpense = data.manual.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const labor = data.payroll.reduce((s, p) => s + p.kitchen + p.server + p.manager + p.other, 0);
  const income = incomeTx.reduce((s, t) => s + t.amount, 0) + manualIncome;
  const expenses = expenseTx.reduce((s, t) => s + t.amount, 0) + manualExpense + labor;
  const profit = income - expenses;
  return {
    income, expenses, labor, profit, margin: income ? (profit / income) * 100 : 0,
    restaurantSales: incomeTx.filter((t) => t.category === "Restaurant Sales").reduce((s, t) => s + t.amount, 0),
    deliveryIncome: incomeTx.filter((t) => t.category === "Delivery App Income").reduce((s, t) => s + t.amount, 0),
    needsReview: data.transactions.filter((t) => t.needsReview).length,
  };
}

export function weeklyReport(data: AppData) {
  const weeks = [0, 1, 2, 3, 4].map((index) => ({ week: `Week ${index + 1}`, income: 0, expense: 0 }));
  for (const t of data.transactions) {
    const index = Math.min(4, Math.floor((new Date(`${t.date}T12:00:00`).getDate() - 1) / 7));
    weeks[index][t.type] += t.amount;
  }
  return weeks.map((w) => ({ ...w, profit: w.income - w.expense }));
}
