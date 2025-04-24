import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MetricBarChart from "@/components/charts/MetricBarChart";
import MetricLineChart from "@/components/charts/MetricLineChart";
import { DeviceWellbeingService, ScreenTimeData } from "@/services/DeviceWellbeingService";

const ScreenTime = () => {
  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<ScreenTimeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(true);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const { toast } = useToast();

  const weeklyTrend = [
    { name: "Mon", value: 5.8 },
    { name: "Tue", value: 4.2 },
    { name: "Wed", value: 6.5 },
    { name: "Thu", value: 3.7 },
    { name: "Fri", value: 7.2 }
  ];

  const checkPermission = async () => {
    const permissionStatus = await DeviceWellbeingService.checkPermission();
    setHasPermission(permissionStatus);
    if (!permissionStatus) {
      setShowPermissionDialog(true);
    }
    return permissionStatus;
  };

  const handleRequestPermission = async () => {
    await DeviceWellbeingService.requestPermission();
    const newPermissionStatus = await checkPermission();
    if (newPermissionStatus) {
      setShowPermissionDialog(false);
      toast({
        title: "Permission granted",
        description: "Fetching your screen time data...",
        variant: "default",
      });
      fetchDeviceData();
    }
  };

  const fetchDeviceData = async () => {
    try {
      setLoading(true);
      const permissionGranted = await checkPermission();
      
      if (!permissionGranted) {
        setError("Permission required to access screen time data");
        return;
      }

      const data = await DeviceWellbeingService.getScreenTimeData();
      if (data.error === 'permission_required') {
        setError("Permission required to access screen time data");
        setShowPermissionDialog(true);
      } else {
        setDeviceData(data);
        setError(null);
        toast({
          title: "Device data retrieved",
          description: `Successfully fetched screen time data: ${data.totalUsage} minutes today`,
          variant: "default",
        });
      }
    } catch (err) {
      console.error("Failed to fetch device data:", err);
      setError("Could not access screen time data. Please ensure permissions are granted.");
      toast({
        title: "Error accessing screen time",
        description: "Check device permissions and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, []);

  const timeData = deviceData?.appUsage.map(app => ({
    name: app.appName,
    value: app.duration
  })) || [];

  const formatMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const PermissionRequest = () => (
    <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Permission Required</DialogTitle>
          <DialogDescription>
            To show your actual screen time data, we need permission to access usage statistics. 
            This data helps you track and manage your device usage patterns.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 my-4">
          <Shield className="h-6 w-6 text-blue-500" />
          <p className="text-sm text-muted-foreground">
            Your data is only used locally on your device to show usage statistics.
          </p>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleRequestPermission}
            className="w-full sm:w-auto"
          >
            Grant Permission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (!hasPermission) {
    return (
      <div className="space-y-6 p-6 pb-16">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Screen Time</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold">Permission Required</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              To show your actual screen time data, we need permission to access usage statistics.
              This helps you track and manage your device usage patterns effectively.
            </p>
            <Button 
              onClick={handleRequestPermission}
              className="w-full sm:w-auto"
            >
              Grant Permission
            </Button>
          </CardContent>
        </Card>
        <PermissionRequest />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Screen Time</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Fetching device data...</p>
        </div>
      ) : error ? (
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              To access screen time data, please grant the necessary permissions in your device settings.
              For iOS: Settings → Screen Time → Turn On Screen Time
              For Android: Settings → Digital Wellbeing & Parental Controls
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">Today's Screen Time</CardTitle>
                <BrainCircuit className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <span className="text-5xl font-bold text-primary">
                    {formatMinutesToHours(deviceData?.totalUsage || 0)}
                  </span>
                  <CardDescription className="mt-2 text-sm">
                    Total screen time today
                  </CardDescription>
                  <p className="mt-2 text-sm font-medium text-green-600">Live device data</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Most Used App</CardTitle>
                <BrainCircuit size={18} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deviceData?.appUsage[0]?.appName || "No data"}</div>
                <CardDescription className="mt-1">{formatMinutesToHours(deviceData?.appUsage[0]?.duration || 0)}</CardDescription>
                <p className="mt-2 text-sm font-medium text-yellow-600">
                  {deviceData?.appUsage[0]?.duration ? 'High usage' : 'No data available'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Usage Status</CardTitle>
                <BrainCircuit size={18} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {deviceData?.totalUsage > 360 ? 'Excessive' : 
                   deviceData?.totalUsage > 240 ? 'High' : 
                   deviceData?.totalUsage > 120 ? 'Moderate' : 'Normal'}
                </div>
                <CardDescription className="mt-1">Based on today's usage</CardDescription>
                <p className="mt-2 text-sm font-medium text-yellow-600">Updated in real-time</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MetricBarChart 
              data={timeData}
              title="App Usage Distribution"
              description="Breakdown of your screen time by app"
            />
            <MetricLineChart 
              data={weeklyTrend}
              title="Weekly Screen Time Trend"
              description="Your screen time patterns over the week"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed App Usage</CardTitle>
              <CardDescription>
                Today's detailed app usage data from your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Screen time data for {deviceData?.date}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>App</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deviceData?.appUsage.map((app, index) => (
                    <TableRow key={index}>
                      <TableCell>{app.appName}</TableCell>
                      <TableCell>{formatMinutesToHours(app.duration)}</TableCell>
                      <TableCell>
                        {Math.round((app.duration / (deviceData?.totalUsage || 1)) * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
      <PermissionRequest />
    </div>
  );
};

export default ScreenTime;
