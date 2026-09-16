"use client";

import { AlertTriangle, ArrowDownRight, ArrowUpRight, BadgeDollarSign, CircleDollarSign, HandCoins, ShoppingBasket, Target, Users } from "lucide-react";
import { useData } from "@/components/data-provider";
import { ExpensePie, IncomeExpenseChart, WeeklyChart } from "@/components/dashboard-charts";
import { Badge, Card, Select } from "@/components/ui";
import { calculateMetrics, weeklyReport } from "@/services/metrics";
import { pct, usd } from "@/lib/format";

export default function Dashboard() {
  const { data } = useData();
  const m = calculateMetrics(data);
  const weeks = weeklyReport(data);
  const expenses = new Map<string, number>();
  data.transactions.filter((t) => t.type === "expense").forEach((t) => expenses.set(t.category, (expenses.get(t.category) || 0) + t.amount));
  const pie = [...expenses].map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  const activeWeeks = weeks.filter((w) => w.income > 0);
  const best = [...activeWeeks].sort((a,b) => b.income-a.income)[0];
  const slowest = [...activeWeeks].sort((a,b) => a.income-b.income)[0];
  const laborPct = m.income ? (m.labor / m.income) * 100 : 0;
  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><div className="mb-1 flex items-center gap-2"><Badge tone="green">June is on track</Badge></div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Good morning, Alex</h1><p className="mt-1 text-sm text-slate-500">Here’s how The Garden Table is doing this month.</p></div>
      <div className="flex gap-2"><Select defaultValue="6"><option value="6">June</option></Select><Select defaultValue="2026"><option>2026</option></Select></div>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Kpi title="Money In" value={usd(m.income)} detail="+8.4% from May" icon={ArrowUpRight} good />
      <Kpi title="Money Out" value={usd(m.expenses)} detail="Includes labor" icon={ArrowDownRight} />
      <Kpi title="Labor Cost" value={usd(m.labor)} detail={`${pct(laborPct)} of sales`} icon={Users} warn={laborPct > 30} />
      <Kpi title="Monthly Profit" value={usd(m.profit)} detail={`${pct(m.margin)} profit margin`} icon={CircleDollarSign} good={m.profit >= 0} />
    </div>
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-[#123b31] to-[#0e5a48] p-6 text-white">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div><div className="text-sm text-emerald-100/70">Your June snapshot</div><div className="mt-2 text-3xl font-bold">{usd(m.profit)} profit</div><p className="mt-2 max-w-lg text-sm leading-6 text-emerald-50/70">You’ve kept {pct(m.margin)} of every sales dollar. Food costs are healthy; labor is the one area worth watching.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Progress label="Sales goal" value={m.income} target={data.target.sales} />
          <Progress label="Profit goal" value={m.profit} target={data.target.profit} />
        </div>
      </div>
    </Card>
    <div className="grid gap-4 lg:grid-cols-2"><IncomeExpenseChart income={m.income} expenses={m.expenses} /><ExpensePie data={pie} /><WeeklyChart data={weeks} /></div>
    <div>
      <div className="mb-3 flex items-center justify-between"><div><h2 className="text-lg font-bold">What deserves your attention</h2><p className="text-sm text-slate-500">Simple signals from this month’s numbers</p></div></div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Insight icon={ShoppingBasket} title="Biggest Expense" value={pie[0]?.name || "None"} text={`${usd(pie[0]?.value || 0)} this month`} />
        <Insight icon={BadgeDollarSign} title="Best Week" value={best?.week || "—"} text={`${usd(best?.income || 0)} in sales`} />
        <Insight icon={HandCoins} title="Slowest Week" value={slowest?.week || "—"} text={`${usd(slowest?.income || 0)} in sales`} />
        <Insight icon={AlertTriangle} title="Needs Review" value={`${m.needsReview} transaction`} text="Check before closing June" amber={m.needsReview > 0} />
      </div>
    </div>
  </div>;
}
function Kpi({ title, value, detail, icon: Icon, good, warn }: { title:string; value:string; detail:string; icon: typeof Target; good?:boolean; warn?:boolean }) {
  return <Card className="p-5"><div className="flex items-start justify-between"><div><div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</div><div className="mt-2 text-2xl font-bold tracking-tight">{value}</div><div className={`mt-2 text-xs ${good ? "text-emerald-600" : warn ? "text-amber-600" : "text-slate-500"}`}>{detail}</div></div><div className={`grid size-10 place-items-center rounded-xl ${good ? "bg-emerald-50 text-emerald-600" : warn ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}><Icon size={20}/></div></div></Card>;
}
function Progress({ label, value, target }: { label:string; value:number; target:number }) {
  const p = Math.max(0, Math.min(100, target ? value/target*100 : 0));
  return <div className="rounded-xl bg-white/8 p-4"><div className="flex justify-between text-xs"><span className="text-emerald-50/70">{label}</span><b>{p.toFixed(0)}%</b></div><div className="mt-3 h-2 rounded-full bg-white/15"><div className="h-full rounded-full bg-emerald-400" style={{width:`${p}%`}} /></div><div className="mt-2 text-xs text-white/55">{usd(value)} of {usd(target)}</div></div>;
}
function Insight({ icon:Icon,title,value,text,amber }: {icon:typeof Target;title:string;value:string;text:string;amber?:boolean}) {
  return <Card className="p-4"><div className={`mb-3 grid size-9 place-items-center rounded-lg ${amber?"bg-amber-50 text-amber-600":"bg-emerald-50 text-emerald-700"}`}><Icon size={18}/></div><div className="text-xs font-medium text-slate-500">{title}</div><div className="mt-1 truncate font-bold">{value}</div><div className="mt-1 text-xs text-slate-500">{text}</div></Card>;
}
