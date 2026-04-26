import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function EmailSettingsCard({
  email,
  frequency,
  enabled,
  onEmailChange,
  onFrequencyChange,
  onEnabledChange,
  onSave,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="report-email">Email address</Label>
          <Input
            id="report-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Frequency</Label>
          <Tabs value={frequency} onValueChange={onFrequencyChange}>
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

        <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <div>
            <p className="text-sm font-medium">Enable automatic reports</p>
            <p className="text-xs text-muted-foreground">Send scheduled emails to this address</p>
          </div>
          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </div>

        <Button type="button" onClick={onSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
