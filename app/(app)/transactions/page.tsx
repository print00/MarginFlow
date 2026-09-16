"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Filter, Search } from "lucide-react";
import { useData } from "@/components/data-provider";
import { Badge, Button, Card, Input, Select } from "@/components/ui";
import { categories } from "@/lib/constants";
import { usd } from "@/lib/format";
import type { TxType } from "@/types";

export default function Transactions() {
  const { data, setData } = useData(); const [query,setQuery]=useState(""); const [onlyReview,setOnlyReview]=useState(false);
  const shown=useMemo(()=>data.transactions.filter(t=>(!onlyReview||t.needsReview)&&t.description.toLowerCase().includes(query.toLowerCase())),[data.transactions,query,onlyReview]);
  const review=data.transactions.filter(t=>t.needsReview).length;
  const update=(id:string, patch:object)=>setData(d=>({...d,transactions:d.transactions.map(t=>t.id===id?{...t,...patch}:t)}));
  return <div className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Transactions</h1><p className="mt-1 text-sm text-slate-500">Review your imported money in and money out.</p></div><Button onClick={()=>setData(d=>({...d,transactions:d.transactions.map(t=>({...t,needsReview:false}))}))}><CheckCircle2 size={17}/> Mark all reviewed</Button></div>
    <div className="grid gap-3 sm:grid-cols-3"><Mini label="Imported" value={data.transactions.length}/><Mini label="Categorized automatically" value={data.transactions.length-review} green/><Mini label="Needs your review" value={review} amber/></div>
    <Card className="overflow-hidden"><div className="flex flex-wrap gap-3 border-b p-4"><div className="relative min-w-60 flex-1"><Search className="absolute left-3 top-3 text-slate-400" size={16}/><Input className="pl-9" placeholder="Search transactions" value={query} onChange={e=>setQuery(e.target.value)}/></div><Button variant={onlyReview?"primary":"secondary"} onClick={()=>setOnlyReview(!onlyReview)}><Filter size={16}/> Needs review</Button></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Date</th><th>Description</th><th>Amount</th><th>Type</th><th>Category</th><th>Confidence</th><th>Review</th></tr></thead><tbody className="divide-y divide-slate-100">{shown.map(t=><tr key={t.id} className={t.needsReview?"bg-amber-50/30":"hover:bg-slate-50/50"}><td className="whitespace-nowrap px-5 py-4 text-slate-500">{new Date(`${t.date}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</td><td className="max-w-60 truncate font-medium">{t.description}</td><td className={`font-bold ${t.type==="income"?"text-emerald-700":"text-slate-800"}`}>{t.type==="income"?"+":"-"}{usd(t.amount)}</td><td><Select value={t.type} onChange={e=>update(t.id,{type:e.target.value as TxType})}><option value="income">Money in</option><option value="expense">Money out</option></Select></td><td><Select className="w-52" value={t.category} onChange={e=>update(t.id,{category:e.target.value,confidence:100})}>{categories[t.type].map(c=><option key={c}>{c}</option>)}</Select></td><td><Badge tone={t.confidence>=70?"green":"amber"}>{t.confidence}%</Badge></td><td><label className="flex items-center gap-2 text-xs"><input className="size-4 accent-emerald-600" type="checkbox" checked={!t.needsReview} onChange={e=>update(t.id,{needsReview:!e.target.checked})}/>{t.needsReview?"Check":"Done"}</label></td></tr>)}</tbody></table></div>
      {!shown.length&&<div className="p-12 text-center text-sm text-slate-500">No transactions match this view.</div>}</Card>
  </div>;
}
function Mini({label,value,green,amber}:{label:string;value:number;green?:boolean;amber?:boolean}){return <Card className="p-4"><div className={`text-2xl font-bold ${green?"text-emerald-600":amber?"text-amber-600":""}`}>{value}</div><div className="mt-1 text-xs text-slate-500">{label}</div></Card>}
