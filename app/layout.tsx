import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/components/data-provider";

export const metadata: Metadata = { title: "MarginFlow — Restaurant P&L", description: "Simple monthly profit and loss for independent restaurants." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><DataProvider>{children}</DataProvider></body></html>;
}
