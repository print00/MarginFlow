"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui";
import { usd } from "@/lib/format";

const tooltipStyle = { borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(15,23,42,.08)", fontSize: 12 };
export function IncomeExpenseChart({ income, expenses }: { income: number; expenses: number }) {
  return <Card className="p-5"><ChartHead title="Money In vs Money Out" subtitle="This month at a glance" />
    <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={[{ name: "Money In", value: income }, { name: "Money Out", value: expenses }]} barSize={70}>
      <CartesianGrid vertical={false} stroke="#eef2f1" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} tick={{ fill: "#94a3b8", fontSize: 11 }} />
      <Tooltip contentStyle={tooltipStyle} formatter={(value) => usd(Number(value))} /><Bar dataKey="value" radius={[8,8,0,0]}>{[<Cell key="in" fill="#10b981" />, <Cell key="out" fill="#f59e0b" />]}</Bar>
    </BarChart></ResponsiveContainer></div></Card>;
}
export function ExpensePie({ data }: { data: { name: string; value: number }[] }) {
  const colors = ["#0f766e", "#10b981", "#f59e0b", "#64748b", "#94a3b8", "#d6d3d1"];
  return <Card className="p-5"><ChartHead title="Where Your Money Went" subtitle="Expenses by category" />
    <div className="flex h-64 items-center"><ResponsiveContainer width="58%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} paddingAngle={2}>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip contentStyle={tooltipStyle} formatter={(v) => usd(Number(v))} /></PieChart></ResponsiveContainer>
    <div className="flex-1 space-y-2.5">{data.slice(0, 5).map((item, i) => <div key={item.name} className="flex items-center gap-2 text-xs"><span className="size-2.5 rounded-full" style={{ background: colors[i] }} /><span className="min-w-0 flex-1 truncate text-slate-600">{item.name}</span><b>{usd(item.value)}</b></div>)}</div></div></Card>;
}
export function WeeklyChart({ data }: { data: { week: string; income: number; expense: number; profit: number }[] }) {
  return <Card className="p-5 lg:col-span-2"><ChartHead title="Weekly Sales & Profit" subtitle="Spot your strongest and slowest weeks" />
    <div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid vertical={false} stroke="#eef2f1" /><XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} tick={{ fill: "#94a3b8", fontSize: 11 }} /><Tooltip contentStyle={tooltipStyle} formatter={(v) => usd(Number(v))} /><Line type="monotone" dataKey="income" name="Sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} /><Line type="monotone" dataKey="profit" name="Profit" stroke="#0f766e" strokeWidth={3} dot={{ r: 4, fill: "#0f766e" }} /></LineChart></ResponsiveContainer></div></Card>;
}
function ChartHead({ title, subtitle }: { title: string; subtitle: string }) { return <div className="mb-4"><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-0.5 text-xs text-slate-500">{subtitle}</p></div>; }
