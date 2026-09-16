"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoData } from "@/lib/demo-data";
import type { AppData } from "@/types";

type Store = { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; reset: () => void };
const Context = createContext<Store | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(demoData);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("marginflow-demo");
      if (saved) setData(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("marginflow-demo", JSON.stringify(data)); }, [data]);
  const value = useMemo(() => ({ data, setData, reset: () => setData(demoData) }), [data]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useData() {
  const context = useContext(Context);
  if (!context) throw new Error("useData must be used inside DataProvider");
  return context;
}
