import Papa from "papaparse";
import * as XLSX from "xlsx";
import { categorize } from "./categorize";
import type { Transaction, TxType } from "../types";

type Row = Record<string, unknown>;
const names = {
  date: ["date", "transaction date", "posted date"],
  description: ["description", "merchant", "details", "memo"],
  amount: ["amount"], debit: ["debit", "withdrawal"], credit: ["credit", "deposit"],
};
function find(row: Row, choices: string[]) {
  const key = Object.keys(row).find((k) => choices.includes(k.trim().toLowerCase()));
  return key ? row[key] : undefined;
}
export function money(value: unknown): number {
  if (value == null || value === "") return 0;
  const clean = String(value).replace(/[$,\s]/g, "").replace(/^\((.*)\)$/, "-$1");
  const n = Number(clean);
  return Number.isFinite(n) ? n : 0;
}
export function rowsToTransactions(rows: Row[]): Transaction[] {
  return rows.flatMap((row, index) => {
    const dateRaw = find(row, names.date);
    const description = String(find(row, names.description) ?? "").trim();
    if (!dateRaw || !description) return [];
    const debit = Math.abs(money(find(row, names.debit)));
    const credit = Math.abs(money(find(row, names.credit)));
    const raw = money(find(row, names.amount));
    const hasSplit = debit > 0 || credit > 0;
    const type: TxType = hasSplit ? (credit > 0 ? "income" : "expense") : raw >= 0 ? "income" : "expense";
    const amount = hasSplit ? (credit || debit) : Math.abs(raw);
    if (!amount) return [];
    const result = categorize(description, type);
    const parsedDate = new Date(String(dateRaw));
    if (Number.isNaN(parsedDate.getTime())) return [];
    return [{ id: `import-${Date.now()}-${index}`, date: parsedDate.toISOString().slice(0, 10), description, amount, ...result }];
  });
}
export function parseCsv(text: string) {
  const result = Papa.parse<Row>(text, { header: true, skipEmptyLines: true, transformHeader: (h) => h.trim() });
  if (result.errors.length && !result.data.length) throw new Error("We could not read this CSV.");
  return rowsToTransactions(result.data);
}
export function parseXlsx(buffer: ArrayBuffer) {
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return rowsToTransactions(XLSX.utils.sheet_to_json<Row>(sheet, { defval: "" }));
}
