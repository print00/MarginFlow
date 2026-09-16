"use client";
import { FormEvent } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { useData } from "@/components/data-provider";
import { PageHeading } from "@/components/page-heading";
import { Button, Card, Field, Input } from "@/components/ui";
import { usd } from "@/lib/format";

export default function PayrollPage(){
 const {data,setData}=useData(); const total=data.payroll.reduce((s,p)=>s+p.kitchen+p.server+p.manager+p.other,0);
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,payroll:[...d.payroll,{id:crypto.randomUUID(),start:String(f.get("start")),end:String(f.get("end")),kitchen:Number(f.get("kitchen")||0),server:Number(f.get("server")||0),manager:Number(f.get("manager")||0),other:Number(f.get("other")||0),notes:String(f.get("notes")||"")}]}));e.currentTarget.reset()}
 return <div className="space-y-6"><PageHeading title="Labor costs" text="Track weekly kitchen, server, manager, and other labor." action={<Card className="flex items-center gap-3 px-5 py-3"><Users className="text-emerald-600"/><div><div className="text-xs text-slate-500">June labor</div><b>{usd(total)}</b></div></Card>}/>
 <Card className="p-6"><h2 className="font-bold">Add a week</h2><form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Field label="Week starts"><Input name="start" type="date" required/></Field><Field label="Week ends"><Input name="end" type="date" required/></Field><Field label="Kitchen labor"><Input name="kitchen" type="number" min="0" step=".01" defaultValue="0"/></Field><Field label="Server labor"><Input name="server" type="number" min="0" step=".01" defaultValue="0"/></Field><Field label="Manager labor"><Input name="manager" type="number" min="0" step=".01" defaultValue="0"/></Field><Field label="Other labor"><Input name="other" type="number" min="0" step=".01" defaultValue="0"/></Field><Field label="Notes"><Input name="notes" placeholder="Optional"/></Field><div className="flex items-end"><Button className="w-full"><Plus size={17}/> Add week</Button></div></form></Card>
 <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Week</th><th>Kitchen</th><th>Servers</th><th>Managers</th><th>Other</th><th>Total</th><th/></tr></thead><tbody className="divide-y">{data.payroll.map(p=>{const t=p.kitchen+p.server+p.manager+p.other;return <tr key={p.id}><td className="px-5 py-4 font-medium">{p.start} – {p.end}</td><td>{usd(p.kitchen)}</td><td>{usd(p.server)}</td><td>{usd(p.manager)}</td><td>{usd(p.other)}</td><td className="font-bold">{usd(t)}</td><td><Button variant="ghost" onClick={()=>setData(d=>({...d,payroll:d.payroll.filter(x=>x.id!==p.id)}))}><Trash2 size={16}/></Button></td></tr>})}</tbody></table></div></Card></div>
}
