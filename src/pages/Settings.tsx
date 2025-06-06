
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { UserSettings } from "@/types";

const Settings = () => {
  const { toast } = useToast();
  const { preferences, loading, updatePreferences } = useUserPreferences();
  
  const [settings, setSettings] = useState<UserSettings>({
    monitoringEnabled: true,
    dataSharingEnabled: true,
    alertThreshold: 50,
    notificationsEnabled: true,
    autoReportGeneration: false
  });

  const [screenTimeLimit, setScreenTimeLimit] = useState(8.0);
  const [sleepHoursRequired, setSleepHoursRequired] = useState(8.0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!loading && preferences) {
      setScreenTimeLimit(preferences.screen_time_limit_hours);
      setSleepHoursRequired(preferences.sleep_hours_required);
      setNotificationsEnabled(preferences.notifications_enabled);
    }
  }, [preferences, loading]);

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

  const handleScreenTimeLimitChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 24) {
      setScreenTimeLimit(numValue);
      setIsDirty(true);
    }
  };

  const handleSleepHoursChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 12) {
      setSleepHoursRequired(numValue);
      setIsDirty(true);
    }
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    setIsDirty(true);
  };

  const handleSaveChanges = async () => {
    console.log("Saving settings:", settings);
    
    // Save user preferences
    const result = await updatePreferences({
      screen_time_limit_hours: screenTimeLimit,
      sleep_hours_required: sleepHoursRequired,
      notifications_enabled: notificationsEnabled
    });

    if (result) {
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully."
      });
      setIsDirty(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    }
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
        {/* Wellness Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Wellness Preferences</CardTitle>
            <CardDescription>
              Configure your personal wellness goals and limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="screenTimeLimit">Daily Screen Time Limit (hours)</Label>
              <Input
                id="screenTimeLimit"
                type="number"
                min="1"
                max="24"
                step="0.5"
                value={screenTimeLimit}
                onChange={(e) => handleScreenTimeLimitChange(e.target.value)}
                placeholder="8.0"
              />
              <p className="text-sm text-muted-foreground">
                Set your daily screen time goal. You'll receive notifications when approaching this limit.
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="sleepHours">Required Sleep Hours</Label>
              <Input
                id="sleepHours"
                type="number"
                min="4"
                max="12"
                step="0.5"
                value={sleepHoursRequired}
                onChange={(e) => handleSleepHoursChange(e.target.value)}
                placeholder="8.0"
              />
              <p className="text-sm text-muted-foreground">
                Set your ideal sleep duration. This will be used to generate personalized schedules.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="wellnessNotifications">Wellness Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about screen time limits and wellness reminders.
                </p>
              </div>
              <Switch
                id="wellnessNotifications"
                checked={notificationsEnabled}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
          </CardContent>
        </Card>

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
