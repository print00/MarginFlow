import { describe, expect, it } from "vitest";
import { categorize } from "./categorize";
describe("categorization",()=>{it("matches restaurant keywords",()=>expect(categorize("ACH DOORDASH PAYOUT","income")).toMatchObject({category:"Delivery App Income",confidence:80,needsReview:false}));it("flags unknown merchants",()=>expect(categorize("MYSTERY STORE 123","expense")).toMatchObject({category:"Other Expense",confidence:50,needsReview:true}))});
