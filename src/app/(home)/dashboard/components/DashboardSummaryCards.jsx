import { Wallet, CreditCard, Scale, ListOrdered } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "../utils/format";
import { DashboardCardDecoration } from "./DashboardCardDecoration";

const cards = [
  {
    title: "Total Income this month",
    dataKey: "totalIncome",
    borderClass: "border-emerald-200/80 dark:border-emerald-900/50",
    valueClass: "text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    Icon: Wallet,
    format: (v) => formatCurrency(v),
  },
  {
    title: "Total Expenses this month",
    dataKey: "totalExpenses",
    borderClass: "border-rose-200/80 dark:border-rose-900/50",
    valueClass: "text-rose-600 dark:text-rose-400",
    iconClass: "text-rose-600 dark:text-rose-400",
    Icon: CreditCard,
    format: (v) => formatCurrency(v),
  },
  {
    title: "Net Balance this month",
    dataKey: "netBalance",
    borderClass: "border-blue-200/80 dark:border-blue-900/50",
    valueClass: "text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-600 dark:text-blue-400",
    Icon: Scale,
    format: (v) => formatCurrency(v),
  },
  {
    title: "Total Transactions this month",
    dataKey: "transactionCount",
    borderClass: "border-violet-200/80 dark:border-violet-900/50",
    valueClass: "text-violet-600 dark:text-violet-400",
    iconClass: "text-violet-600 dark:text-violet-400",
    Icon: ListOrdered,
    format: (v) => String(v ?? 0),
  },
];

export function DashboardSummaryCards({
  totalIncome,
  totalExpenses,
  netBalance,
  transactionCount,
}) {
  const values = { totalIncome, totalExpenses, netBalance, transactionCount };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ title, dataKey, borderClass, valueClass, iconClass, Icon, format }) => (
        <Card key={dataKey} className={`relative overflow-hidden ${borderClass}`}>
          <DashboardCardDecoration className="pointer-events-none absolute -right-1 -top-1 size-28 text-muted-foreground" />
          <CardHeader className="relative z-1 pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm font-medium leading-snug text-muted-foreground">
                {title}
              </CardTitle>
              <Icon className={`size-8 shrink-0 opacity-90 ${iconClass}`} aria-hidden strokeWidth={1.75} />
            </div>
          </CardHeader>
          <CardContent className="relative z-1">
            <p className={`text-2xl font-bold tabular-nums ${valueClass}`}>{format(values[dataKey])}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
