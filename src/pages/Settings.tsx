
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { UserSettings } from "@/types";

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    monitoringEnabled: true,
    dataSharingEnabled: true,
    alertThreshold: 50,
    notificationsEnabled: true,
    autoReportGeneration: false
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleToggleChange = (key: keyof UserSettings) => (value: boolean) => {
    setSettings({
      ...settings,
      [key]: value
    });
    setIsDirty(true);
  };

  const handleSliderChange = (value: number[]) => {
    setSettings({
      ...settings,
      alertThreshold: value[0]
    });
    setIsDirty(true);
  };

  const handleSaveChanges = () => {
    // Here you would typically save the settings to a backend
    console.log("Saving settings:", settings);
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and privacy settings.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Monitoring Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoring Settings</CardTitle>
            <CardDescription>
              Control how the application monitors your wellness metrics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monitoring">Enable Monitoring</Label>
                <p className="text-sm text-muted-foreground">
                  Allow the application to collect and analyze wellness data.
                </p>
              </div>
              <Switch
                id="monitoring"
                checked={settings.monitoringEnabled}
                onCheckedChange={handleToggleChange("monitoringEnabled")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dataSharing">Trusted Contact Data Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous alerts to be sent to your trusted contacts.
                </p>
              </div>
              <Switch
                id="dataSharing"
                checked={settings.dataSharingEnabled}
                onCheckedChange={handleToggleChange("dataSharingEnabled")}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="space-y-0.5">
                <Label>Alert Sensitivity Threshold</Label>
                <p className="text-sm text-muted-foreground">
                  Set how sensitive the system should be to changes in your wellness metrics.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Less Sensitive</span>
                  <span>More Sensitive</span>
                </div>
                <Slider
                  value={[settings.alertThreshold]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={handleSliderChange}
                />
                <div className="text-center mt-2 text-sm font-medium">
                  Current: {settings.alertThreshold}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Control how and when you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about important changes to your wellness metrics.
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notificationsEnabled}
                onCheckedChange={handleToggleChange("notificationsEnabled")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoReport">Automatic Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Generate and receive weekly wellness reports.
                </p>
              </div>
              <Switch
                id="autoReport"
                checked={settings.autoReportGeneration}
                onCheckedChange={handleToggleChange("autoReportGeneration")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Data Privacy</CardTitle>
            <CardDescription>
              Information about how your data is handled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your privacy is important to us. Here's how we handle your data:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>All data is stored securely and encrypted.</li>
              <li>Alerts sent to trusted contacts are anonymous and don't include personal details.</li>
              <li>You can request a full export or deletion of your data at any time.</li>
              <li>We never share your data with third parties without your explicit consent.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={!isDirty}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
