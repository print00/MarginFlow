"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, FileSpreadsheet, FileText, UploadCloud } from "lucide-react";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { useData } from "@/components/data-provider";
import { parseCsv, parseXlsx } from "@/services/parser";

export default function UploadPage() {
  const { setData } = useData(); const router = useRouter(); const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function upload() {
    if (!file) return setError("Choose a statement file first.");
    if (file.size > 5 * 1024 * 1024) return setError("File must be smaller than 5 MB.");
    if (file.name.toLowerCase().endsWith(".pdf")) return setError("PDF import is still experimental. Please export a CSV from your bank for the most accurate results.");
    setBusy(true); setError("");
    try {
      const transactions = file.name.toLowerCase().endsWith(".csv") ? parseCsv(await file.text()) : parseXlsx(await file.arrayBuffer());
      if (!transactions.length) throw new Error("No transactions were found. Check that your file has date, description, and amount columns.");
      setData((d) => ({ ...d, transactions: [...transactions, ...d.transactions] }));
      router.push("/transactions?imported=1");
    } catch (e) { setError(e instanceof Error ? e.message : "We could not import that file."); setBusy(false); }
  }
  return <div className="mx-auto max-w-4xl space-y-6"><Header title="Upload a bank statement" text="We’ll turn your monthly transactions into a clear profit picture." />
    <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
      <Card className="p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field label="Statement month"><Select defaultValue="6"><option value="6">June</option><option value="5">May</option></Select></Field><Field label="Year"><Select defaultValue="2026"><option>2026</option><option>2025</option></Select></Field></div>
        <div role="button" tabIndex={0} onClick={() => ref.current?.click()} onKeyDown={(e)=>e.key==="Enter"&&ref.current?.click()} className="mt-6 grid min-h-64 place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30">
          <Input ref={ref} className="hidden" type="file" accept=".csv,.xlsx,.xls,.pdf" onChange={(e)=>{setFile(e.target.files?.[0]||null);setError("")}} />
          {file ? <div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><CheckCircle2 size={27}/></span><div className="mt-4 font-bold">{file.name}</div><div className="mt-1 text-xs text-slate-500">{(file.size/1024).toFixed(0)} KB · Ready to import</div><button className="mt-3 text-xs font-semibold text-emerald-700">Choose a different file</button></div> :
          <div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><UploadCloud size={27}/></span><div className="mt-4 font-bold">Drop your statement here</div><div className="mt-1 text-sm text-slate-500">or click to browse your files</div><div className="mt-4 text-xs text-slate-400">CSV, XLSX, or PDF · Max 5 MB</div></div>}
        </div>
        {error && <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800"><AlertCircle className="shrink-0" size={18}/>{error}</div>}
        <div className="mt-6 flex justify-end"><Button onClick={upload} disabled={busy}>{busy ? "Reading statement…" : "Import transactions"}</Button></div>
      </Card>
      <div className="space-y-4"><Card className="p-5"><h3 className="text-sm font-bold">Best file format</h3><div className="mt-4 flex gap-3"><FileSpreadsheet className="text-emerald-600" size={20}/><div><b className="text-sm">CSV or Excel</b><p className="mt-1 text-xs leading-5 text-slate-500">Fastest and most accurate. Look for “Download transactions” in online banking.</p></div></div><div className="mt-4 flex gap-3 border-t pt-4"><FileText className="text-slate-400" size={20}/><div><b className="text-sm">PDF statement</b><p className="mt-1 text-xs leading-5 text-slate-500">Accepted, but layouts vary. We’ll ask for CSV if extraction isn’t reliable.</p></div></div></Card>
      <Card className="bg-emerald-50/60 p-5"><h3 className="text-sm font-bold text-emerald-900">What happens next?</h3><ol className="mt-3 space-y-3 text-xs leading-5 text-emerald-900/70">{["We read each transaction", "We suggest a category", "You review anything uncertain"].map((x,i)=><li className="flex gap-2" key={x}><span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">{i+1}</span>{x}</li>)}</ol></Card></div>
    </div>
  </div>;
}
function Header({title,text}:{title:string;text:string}) { return <div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500">{text}</p></div>; }
