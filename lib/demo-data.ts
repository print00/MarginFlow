import type { AppData, Transaction } from "@/types";

const tx = (id: string, date: string, description: string, amount: number, type: "income" | "expense", category: string, confidence = 95): Transaction =>
  ({ id, date, description, amount, type, category, confidence, needsReview: confidence < 70 });

export const demoData: AppData = {
  transactions: [
    tx("1", "2026-06-02", "TOAST PAYOUT", 12840, "income", "Restaurant Sales"),
    tx("2", "2026-06-04", "DOORDASH PAYOUT", 3260, "income", "Delivery App Income"),
    tx("3", "2026-06-05", "RESTAURANT DEPOT", 4120, "expense", "Grocery / Food Supplies"),
    tx("4", "2026-06-08", "TOAST PAYOUT", 14220, "income", "Restaurant Sales"),
    tx("5", "2026-06-10", "UBER EATS", 2180, "income", "Delivery App Income"),
    tx("6", "2026-06-11", "JUNE RENT", 6200, "expense", "Rent"),
    tx("7", "2026-06-13", "PEPCO ELECTRIC", 1260, "expense", "Utilities"),
    tx("8", "2026-06-16", "TOAST PAYOUT", 11640, "income", "Restaurant Sales"),
    tx("9", "2026-06-18", "SYSCO FOODS", 5320, "expense", "Grocery / Food Supplies"),
    tx("10", "2026-06-21", "TOAST PAYOUT", 15380, "income", "Restaurant Sales"),
    tx("11", "2026-06-22", "FACEBOOK ADS", 680, "expense", "Marketing"),
    tx("12", "2026-06-23", "CITY PLUMBING REPAIR", 940, "expense", "Maintenance", 50),
    tx("13", "2026-06-25", "DOORDASH PAYOUT", 3520, "income", "Delivery App Income"),
    tx("14", "2026-06-28", "COSTCO", 1960, "expense", "Grocery / Food Supplies"),
    tx("15", "2026-06-29", "BANK SERVICE FEE", 85, "expense", "Bank Fees"),
  ],
  manual: [{ id: "m1", date: "2026-06-14", title: "Weekend cash sales", amount: 1850, type: "income", category: "Restaurant Sales", notes: "Cash drawer total" }],
  payroll: [
    { id: "p1", start: "2026-06-01", end: "2026-06-07", kitchen: 2600, server: 1850, manager: 1100, other: 250 },
    { id: "p2", start: "2026-06-08", end: "2026-06-14", kitchen: 2720, server: 1920, manager: 1100, other: 180 },
    { id: "p3", start: "2026-06-15", end: "2026-06-21", kitchen: 2510, server: 1740, manager: 1100, other: 220 },
    { id: "p4", start: "2026-06-22", end: "2026-06-28", kitchen: 2840, server: 2010, manager: 1100, other: 300 },
  ],
  target: { sales: 70000, profit: 12000 },
};
