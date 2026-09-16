"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileBarChart, LogOut, Menu, PlusCircle, ReceiptText, Settings2, Target, Upload, Users, UtensilsCrossed, WalletCards, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/upload", label: "Upload statement", icon: Upload },
  { href: "/transactions", label: "Transactions", icon: ReceiptText, badge: 1 },
  { href: "/manual", label: "Manual entries", icon: PlusCircle },
  { href: "/payroll", label: "Labor", icon: Users },
  { href: "/targets", label: "Goals", icon: Target },
  { href: "/reports", label: "Reports", icon: FileBarChart },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sidebar = <div className="flex h-full flex-col bg-[#0f2922] text-white">
    <div className="flex h-20 items-center gap-3 px-6">
      <div className="grid size-10 place-items-center rounded-xl bg-emerald-500"><UtensilsCrossed size={21} /></div>
      <div><div className="text-lg font-bold tracking-tight">MarginFlow</div><div className="text-xs text-emerald-200/70">Restaurant P&L</div></div>
    </div>
    <nav className="flex-1 space-y-1 px-3 py-4">
      <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-emerald-200/45">Workspace</div>
      {nav.map(({ href, label, icon: Icon, badge }) => {
        const active = pathname === href;
        return <Link key={href} href={href} onClick={() => setOpen(false)} className={cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition", active ? "bg-white/12 text-white" : "text-emerald-50/65 hover:bg-white/7 hover:text-white")}>
          <Icon size={18} /><span className="flex-1">{label}</span>{badge && <span className="grid size-5 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-900">{badge}</span>}
        </Link>;
      })}
    </nav>
    <div className="border-t border-white/10 p-4">
      <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/6 p-3">
        <div className="grid size-9 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900">AM</div>
        <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">Alex Morgan</div><div className="truncate text-xs text-emerald-100/50">The Garden Table</div></div>
        <Settings2 size={16} className="text-white/40" />
      </div>
      <Link href="/" className="flex items-center gap-2 px-3 text-xs text-white/45 hover:text-white"><LogOut size={14} /> Sign out</Link>
    </div>
  </div>;
  return <div className="min-h-screen bg-[#f5f7f6] text-slate-900">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">{sidebar}</aside>
    {open && <div className="fixed inset-0 z-40 lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-slate-950/40" onClick={() => setOpen(false)} /><aside className="relative h-full w-72">{sidebar}<button className="absolute right-3 top-3" onClick={() => setOpen(false)}><X /></button></aside></div>}
    <main className="lg:pl-64">
      <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-4 lg:px-8">
        <button className="lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
        <div className="hidden items-center gap-2 text-sm text-slate-500 lg:flex"><WalletCards size={16} /> The Garden Table</div>
        <div className="flex items-center gap-3 text-sm"><span className="hidden text-slate-500 sm:inline">Books updated</span><span className="size-2 rounded-full bg-emerald-500" /><span className="font-medium">Jun 2026</span></div>
      </header>
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</div>
    </main>
  </div>;
}
