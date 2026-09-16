"use client";
import { FormEvent } from "react";
import { Flag, Target } from "lucide-react";
import { useData } from "@/components/data-provider";
import { PageHeading } from "@/components/page-heading";
import { Button, Card, Field, Input } from "@/components/ui";
import { calculateMetrics } from "@/services/metrics";
import { usd } from "@/lib/format";

export default function TargetsPage(){const {data,setData}=useData();const m=calculateMetrics(data);
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,target:{sales:Number(f.get("sales")),profit:Number(f.get("profit"))}}))}
 return <div className="mx-auto max-w-4xl space-y-6"><PageHeading title="Monthly goals" text="Set a sales and profit goal that feels ambitious but useful."/><div className="grid gap-5 md:grid-cols-2"><Card className="p-6"><div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Target/></div><h2 className="mt-4 font-bold">June goals</h2><form className="mt-5 space-y-4" onSubmit={submit}><Field label="Target monthly sales"><Input name="sales" type="number" min="0" defaultValue={data.target.sales}/></Field><Field label="Target monthly profit"><Input name="profit" type="number" min="0" defaultValue={data.target.profit}/></Field><Button className="w-full">Save goals</Button></form></Card><Card className="bg-[#123b31] p-6 text-white"><Flag className="text-emerald-300"/><h2 className="mt-4 text-xl font-bold">Your progress</h2><Goal label="Sales" current={m.income} target={data.target.sales}/><Goal label="Profit" current={m.profit} target={data.target.profit}/><p className="mt-6 text-xs leading-5 text-emerald-50/60">Goals appear on your overview and monthly report. Change them anytime as the business evolves.</p></Card></div></div>}
function Goal({label,current,target}:{label:string;current:number;target:number}){const p=Math.max(0,Math.min(100,target?current/target*100:0));return <div className="mt-6"><div className="flex justify-between text-sm"><span>{label}</span><b>{p.toFixed(0)}%</b></div><div className="my-2 h-2 rounded-full bg-white/15"><div className="h-full rounded-full bg-emerald-400" style={{width:`${p}%`}}/></div><div className="text-xs text-white/50">{usd(current)} of {usd(target)}</div></div>}
