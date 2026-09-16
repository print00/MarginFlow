"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Check, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function Login() {
  return <main className="grid min-h-screen bg-white lg:grid-cols-2">
    <section className="relative hidden overflow-hidden bg-[#0f2922] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-32 -top-32 size-[500px] rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-emerald-500"><UtensilsCrossed size={23}/></span><span className="text-xl font-bold">MarginFlow</span></div>
      <div className="relative max-w-xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-xs text-emerald-100"><Sparkles size={14}/> Built for independent restaurants</div><h1 className="text-5xl font-bold leading-[1.08] tracking-tight">Know where your money went. Before it’s too late.</h1><p className="mt-6 text-lg leading-8 text-emerald-50/65">Turn a bank statement into a clear monthly profit picture—without spreadsheets or accounting jargon.</p><div className="mt-10 space-y-4">{["See your real monthly profit", "Catch rising food and labor costs", "Review every transaction with confidence"].map((x)=><div key={x} className="flex items-center gap-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><Check size={14}/></span>{x}</div>)}</div></div>
      <div className="relative flex items-center gap-2 text-xs text-white/35"><ShieldCheck size={15}/> Your financial data stays private and workspace-isolated.</div>
    </section>
    <section className="flex items-center justify-center p-6 sm:p-12"><div className="w-full max-w-md">
      <div className="mb-10 flex items-center gap-3 lg:hidden"><span className="grid size-10 place-items-center rounded-xl bg-emerald-600 text-white"><UtensilsCrossed size={20}/></span><b className="text-xl">MarginFlow</b></div>
      <div className="mb-8"><h2 className="text-3xl font-bold tracking-tight">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Sign in to The Garden Table demo workspace.</p></div>
      <div className="space-y-4"><label className="grid gap-1.5 text-sm font-medium">Email address<Input type="email" defaultValue="alex@gardentable.demo"/></label><label className="grid gap-1.5 text-sm font-medium">Password<Input type="password" defaultValue="demo1234"/></label><Link href="/dashboard"><Button className="mt-2 w-full">Open dashboard <ArrowRight size={17}/></Button></Link></div>
      <div className="my-7 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200"/>MVP demo<span className="h-px flex-1 bg-slate-200"/></div>
      <div className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500"><BarChart3 size={17} className="mb-2 text-emerald-600"/>Demo data is already loaded so you can explore every report. Upload your own CSV anytime.</div>
    </div></section>
  </main>;
}
