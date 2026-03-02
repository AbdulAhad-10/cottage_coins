"use client";

import { TrendingUp, TrendingDown, Wallet, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "../utils";

export function SummaryCards({
  totalIncome,
  totalExpenses,
  netBalance,
  totalCount,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income
          </CardTitle>
          <TrendingUp className="size-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600">
            {formatCurrency(totalIncome)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
          <TrendingDown className="size-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Net Balance
          </CardTitle>
          <Wallet className="size-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${
              netBalance >= 0 ? "text-blue-600" : "text-red-600"
            }`}
          >
            {formatCurrency(netBalance)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-violet-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Transactions
          </CardTitle>
          <Hash className="size-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-violet-600">{totalCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}
