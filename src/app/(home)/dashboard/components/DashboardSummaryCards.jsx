import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "../utils/format";

export function DashboardSummaryCards({
  totalIncome,
  totalExpenses,
  netBalance,
  transactionCount,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="border-emerald-200/80 dark:border-emerald-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income this month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalIncome)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-rose-200/80 dark:border-rose-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses this month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(totalExpenses)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-blue-200/80 dark:border-blue-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Net Balance this month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(netBalance)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-violet-200/80 dark:border-violet-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Transactions this month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {transactionCount ?? 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
