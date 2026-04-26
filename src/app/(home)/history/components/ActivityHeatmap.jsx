import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDayLabel } from "../utils/format";

function shadeForCount(count, max) {
  if (!count || max <= 0) return "bg-muted/40";
  const ratio = count / max;
  if (ratio < 0.25) return "bg-emerald-200 dark:bg-emerald-900/60";
  if (ratio < 0.5) return "bg-emerald-300 dark:bg-emerald-800/70";
  if (ratio < 0.75) return "bg-emerald-400 dark:bg-emerald-700/80";
  return "bg-emerald-500 dark:bg-emerald-600";
}

export function ActivityHeatmap({ activityHeatmap, selectedDate, onDateSelect }) {
  const data = activityHeatmap ?? [];
  const maxCount = data.reduce((m, day) => Math.max(m, day.count ?? 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Daily activity heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        {!data.length ? (
          <p className="text-sm text-muted-foreground">No activity data for this range.</p>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-[repeat(15,minmax(0,1fr))]">
              {data.map((day) => {
                const isSelected = selectedDate === day.date;
                return (
                  <button
                    key={day.date}
                    type="button"
                    title={`${formatDayLabel(day.date)}: ${day.count} transaction${day.count === 1 ? "" : "s"}`}
                    onClick={() => onDateSelect(isSelected ? "" : day.date)}
                    className={[
                      "h-4 w-4 rounded-sm border border-border/70 transition-all",
                      shadeForCount(day.count, maxCount),
                      isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "",
                    ].join(" ")}
                    aria-label={`${day.date} activity count ${day.count}`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Click a day to highlight matching transactions in the timeline.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
