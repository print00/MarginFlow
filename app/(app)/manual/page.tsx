"use client";
import { FormEvent, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useData } from "@/components/data-provider";
import { PageHeading } from "@/components/page-heading";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { categories } from "@/lib/constants";
import { usd } from "@/lib/format";
import type { TxType } from "@/types";

export default function ManualPage(){
 const {data,setData}=useData(); const [type,setType]=useState<TxType>("income");
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,manual:[{id:crypto.randomUUID(),date:String(f.get("date")),title:String(f.get("title")),amount:Number(f.get("amount")),type,category:String(f.get("category")),notes:String(f.get("notes")||"")},...d.manual]}));e.currentTarget.reset()}
 return <div className="space-y-6"><PageHeading title="Manual entries" text="Add cash sales, owner withdrawals, tips, or one-time items."/>
 <div className="grid gap-5 lg:grid-cols-[380px_1fr]"><Card className="h-fit p-6"><h2 className="font-bold">Add an entry</h2><form className="mt-5 space-y-4" onSubmit={submit}><Field label="Date"><Input name="date" type="date" defaultValue="2026-06-30" required/></Field><Field label="What was it?"><Input name="title" placeholder="e.g. Saturday cash sales" required/></Field><div className="grid grid-cols-2 gap-3"><Field label="Amount"><Input name="amount" type="number" min="0.01" step="0.01" placeholder="$0.00" required/></Field><Field label="Type"><Select value={type} onChange={e=>setType(e.target.value as TxType)}><option value="income">Money in</option><option value="expense">Money out</option></Select></Field></div><Field label="Category"><Select name="category">{categories[type].map(x=><option key={x}>{x}</option>)}</Select></Field><Field label="Notes (optional)"><Input name="notes" placeholder="Add context for later"/></Field><Button className="w-full"><Plus size={17}/> Add entry</Button></form></Card>
 <Card className="overflow-hidden"><div className="border-b p-5"><h2 className="font-bold">Recent manual entries</h2><p className="mt-1 text-xs text-slate-500">{data.manual.length} entries this month</p></div><div className="divide-y">{data.manual.map(e=><div key={e.id} className="flex items-center gap-4 p-5"><div className={`grid size-10 place-items-center rounded-xl font-bold ${e.type==="income"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{e.type==="income"?"+":"−"}</div><div className="min-w-0 flex-1"><div className="truncate font-semibold">{e.title}</div><div className="text-xs text-slate-500">{e.date} · {e.category}</div></div><b className={e.type==="income"?"text-emerald-700":""}>{e.type==="income"?"+":"-"}{usd(e.amount)}</b><Button variant="ghost" aria-label="Delete entry" onClick={()=>setData(d=>({...d,manual:d.manual.filter(x=>x.id!==e.id)}))}><Trash2 size={16}/></Button></div>)}{!data.manual.length&&<div className="p-12 text-center text-sm text-slate-500">No manual entries yet.</div>}</div></Card></div></div>
}
