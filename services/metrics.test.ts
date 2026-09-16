import { describe, expect, it } from "vitest";
import { calculateMetrics, weeklyReport } from "./metrics";
import type { AppData } from "@/types";
const data:AppData={transactions:[{id:"1",date:"2026-06-02",description:"Sale",amount:1000,type:"income",category:"Restaurant Sales",confidence:95,needsReview:false},{id:"2",date:"2026-06-09",description:"Food",amount:200,type:"expense",category:"Grocery / Food Supplies",confidence:95,needsReview:false}],manual:[{id:"m",date:"2026-06-02",title:"Cash",amount:100,type:"income",category:"Restaurant Sales"}],payroll:[{id:"p",start:"2026-06-01",end:"2026-06-07",kitchen:100,server:50,manager:0,other:0}],target:{sales:2000,profit:500}};
describe("business calculations",()=>{it("calculates P&L",()=>expect(calculateMetrics(data)).toMatchObject({income:1100,expenses:350,labor:150,profit:750}));it("groups weekly totals",()=>{const w=weeklyReport(data);expect(w[0].income).toBe(1000);expect(w[1].expense).toBe(200)})});
