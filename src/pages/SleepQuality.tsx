
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown, Moon } from "lucide-react";
import MetricBarChart from "@/components/charts/MetricBarChart";
import MetricLineChart from "@/components/charts/MetricLineChart";

const SleepQuality = () => {
  // Mock sleep quality data
  const sleepData = [
    { date: "2025-04-22", duration: "6.5 hrs", quality: "Poor", notes: "Woke up multiple times" },
    { date: "2025-04-21", duration: "7.2 hrs", quality: "Fair", notes: "Took longer to fall asleep" },
    { date: "2025-04-20", duration: "8.0 hrs", quality: "Good", notes: "Consistent sleep cycle" },
    { date: "2025-04-19", duration: "7.8 hrs", quality: "Good", notes: "Deep sleep reported" },
    { date: "2025-04-18", duration: "5.5 hrs", quality: "Poor", notes: "Late night activity" },
  ];

  // Chart data
  const durationData = sleepData.map(item => ({
    name: item.date.split('-')[2],
    value: parseFloat(item.duration)
  }));

  const qualityData = [
    { name: "Deep Sleep", value: 35 },
    { name: "Light Sleep", value: 45 },
    { name: "REM", value: 20 }
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center gap-2">
        <Moon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Sleep Quality</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Current Sleep Score</CardTitle>
              <TrendingDown className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold text-primary">68%</span>
                <CardDescription className="mt-2 text-sm">
                  Sleep duration and patterns
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Average Duration</CardTitle>
              <Moon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">7.0</span>
                <span className="text-2xl ml-1">hrs</span>
                <CardDescription className="mt-2 text-sm">
                  Last 7 days average
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Sleep Regularity</CardTitle>
              <Moon className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">62%</span>
                <CardDescription className="mt-2 text-sm">
                  Consistency in sleep schedule
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <MetricLineChart 
            data={durationData}
            title="Sleep Duration Trend"
            description="Your sleep duration over the past days"
          />
          <MetricBarChart 
            data={qualityData}
            title="Sleep Stages Distribution"
            description="Breakdown of your sleep stages"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sleep History</CardTitle>
            <CardDescription>
              Your sleep records for the past 5 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sleepData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <span className="font-medium">{record.duration}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        record.quality === 'Good' 
                          ? 'bg-green-100 text-green-800' 
                          : record.quality === 'Fair'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.quality}
                      </span>
                    </TableCell>
                    <TableCell>{record.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SleepQuality;
