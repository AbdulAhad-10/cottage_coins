import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function ManualSendCard({ period, onPeriodChange, onSendNow, isSending }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Manual Send</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Period</p>
          <Tabs value={period} onValueChange={onPeriodChange}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="monthly" className="flex-1 sm:flex-none">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="flex-1 sm:flex-none">
                Yearly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Button type="button" onClick={onSendNow} disabled={isSending}>
          {isSending ? "Sending..." : "Send Report Now"}
        </Button>
      </CardContent>
    </Card>
  );
}
