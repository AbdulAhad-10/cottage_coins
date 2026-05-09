"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "../utils/format";

export function DashboardMonthlyTrendChart({ monthlyTrend }) {
  const data = monthlyTrend ?? [];
  const hasData = data.some((d) => (d.income ?? 0) > 0 || (d.expense ?? 0) > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly trend</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
            No income or expense data for the last 6 months.
          </div>
        ) : (
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 40 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-28}
                  textAnchor="end"
                  height={56}
                />
                <YAxis tickFormatter={(v) => formatCurrency(v)} width={72} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  labelStyle={{ color: "var(--foreground)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
