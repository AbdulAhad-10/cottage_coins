import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../utils/format";

export function ForecastBudgetGrid({ budgetRecommendations }) {
  const rows = budgetRecommendations ?? [];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">Budget recommendations</h2>
      {!rows.length ? (
        <p className="text-sm text-muted-foreground">No budget recommendations returned.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((row) => {
            const current = Number(row.currentAvg) || 0;
            const suggested = Number(row.suggestedBudget) || 0;
            const pct =
              suggested > 0 ? Math.min(100, Math.round((current / suggested) * 100)) : 0;
            return (
              <Card key={row.category}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: row.color || "#64748b" }}
                    />
                    {row.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">Current avg / mo</span>
                    <span className="font-medium tabular-nums">{formatCurrency(current)}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">Suggested budget</span>
                    <span className="font-medium tabular-nums">{formatCurrency(suggested)}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Usage vs suggested</span>
                      <span>{pct}%</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{row.reason}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
