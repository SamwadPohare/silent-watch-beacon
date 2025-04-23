
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
import { BrainCircuit } from "lucide-react";

const ScreenTime = () => {
  // Mock screen time data
  const screenData = [
    { date: "2025-04-22", duration: "5.8 hrs", category: "Social Media", timeOfDay: "Evening" },
    { date: "2025-04-21", duration: "4.2 hrs", category: "Educational", timeOfDay: "Afternoon" },
    { date: "2025-04-20", duration: "6.5 hrs", category: "Entertainment", timeOfDay: "Night" },
    { date: "2025-04-19", duration: "3.7 hrs", category: "Productivity", timeOfDay: "Morning" },
    { date: "2025-04-18", duration: "7.2 hrs", category: "Mixed", timeOfDay: "All day" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Screen Time</h1>
        <p className="text-muted-foreground">
          Analysis of your device usage patterns and screen time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Screen Time Score</CardTitle>
            <BrainCircuit size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
            <CardDescription className="mt-1">Daily device usage patterns</CardDescription>
            <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <BrainCircuit size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.5 hrs</div>
            <CardDescription className="mt-1">Average screen time per day</CardDescription>
            <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Night Usage</CardTitle>
            <BrainCircuit size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 hrs</div>
            <CardDescription className="mt-1">Average screen time after 10 PM</CardDescription>
            <p className="mt-2 text-sm font-medium text-red-600">Critical</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screen Time History</CardTitle>
          <CardDescription>
            Your screen usage data for the past 5 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your screen time data from the past 5 days</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Main Category</TableHead>
                <TableHead>Time of Day</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {screenData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.duration}</TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.timeOfDay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScreenTime;
