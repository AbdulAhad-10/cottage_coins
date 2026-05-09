import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateShort } from "../utils/format";

export function DashboardRecentTransactions({ transactions }) {
  const rows = transactions ?? [];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Recent transactions</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
          <Link href="/transactions">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {!rows.length ? (
          <p className="text-sm text-muted-foreground">No transactions yet.</p>
        ) : (
          rows.map((tx) => (
            <div
              key={tx._id}
              className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex min-w-0 items-start gap-2">
                <span
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: tx.category?.color ?? "#64748b" }}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{tx.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDateShort(tx.date)}</p>
                </div>
              </div>
              <p
                className={`shrink-0 text-sm font-semibold ${
                  tx.type === "income" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
