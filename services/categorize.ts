import type { TxType } from "@/types";

const rules: Array<{ terms: string[]; category: string; type: TxType }> = [
  { terms: ["DOORDASH", "DD DOORDASH", "UBER EATS", "GRUBHUB"], category: "Delivery App Income", type: "income" },
  { terms: ["SQUARE", "SQ ", "TOAST", "CLOVER"], category: "Restaurant Sales", type: "income" },
  { terms: ["RESTAURANT DEPOT", "SYSCO", "US FOODS", "COSTCO"], category: "Grocery / Food Supplies", type: "expense" },
  { terms: ["PEPCO", "DOMINION", "WATER", "GAS", "ELECTRIC"], category: "Utilities", type: "expense" },
  { terms: ["RENT", "LEASE"], category: "Rent", type: "expense" },
  { terms: ["INSURANCE"], category: "Insurance", type: "expense" },
  { terms: ["ADP", "GUSTO", "PAYCHEX", "PAYROLL"], category: "Payroll", type: "expense" },
  { terms: ["FACEBOOK", "INSTAGRAM", "GOOGLE ADS"], category: "Marketing", type: "expense" },
  { terms: ["BANK FEE", "SERVICE FEE", "OVERDRAFT"], category: "Bank Fees", type: "expense" },
  { terms: ["IRS", "TAX"], category: "Taxes", type: "expense" },
];

export function normalizeMerchant(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

export function categorize(description: string, fallbackType: TxType) {
  const value = normalizeMerchant(description);
  for (const rule of rules) {
    const exact = rule.terms.find((term) => value === term);
    if (exact) return { category: rule.category, type: rule.type, confidence: 95, needsReview: false };
    const partial = rule.terms.find((term) => value.includes(term));
    if (partial) return { category: rule.category, type: rule.type, confidence: 80, needsReview: false };
  }
  return {
    category: fallbackType === "income" ? "Other Income" : "Other Expense",
    type: fallbackType, confidence: 50, needsReview: true,
  };
}
