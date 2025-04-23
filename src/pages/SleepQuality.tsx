
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
import { Clock } from "lucide-react";

const SleepQuality = () => {
  // Mock sleep quality data
  const sleepData = [
    { date: "2025-04-22", duration: "6.5 hrs", quality: "Poor", notes: "Woke up multiple times" },
    { date: "2025-04-21", duration: "7.2 hrs", quality: "Fair", notes: "Took longer to fall asleep" },
    { date: "2025-04-20", duration: "8.0 hrs", quality: "Good", notes: "Consistent sleep cycle" },
    { date: "2025-04-19", duration: "7.8 hrs", quality: "Good", notes: "Deep sleep reported" },
    { date: "2025-04-18", duration: "5.5 hrs", quality: "Poor", notes: "Late night activity" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sleep Quality</h1>
        <p className="text-muted-foreground">
          Detailed analysis of your sleep patterns and quality.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Sleep Score</CardTitle>
            <Clock size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <CardDescription className="mt-1">Sleep duration and patterns</CardDescription>
            <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Clock size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.0 hrs</div>
            <CardDescription className="mt-1">Last 7 days average</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sleep Regularity</CardTitle>
            <Clock size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62%</div>
            <CardDescription className="mt-1">Consistency in sleep schedule</CardDescription>
            <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
          </CardContent>
        </Card>
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
            <TableCaption>Your sleep data from the past 5 days</TableCaption>
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
                  <TableCell>{record.duration}</TableCell>
                  <TableCell>{record.quality}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepQuality;
