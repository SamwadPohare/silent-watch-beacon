
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity } from "lucide-react";

const ActivityPatterns = () => {
  // Mock data for activity history
  const activityHistory = [
    {
      id: 1,
      date: "2025-04-23",
      activityLevel: 85,
      duration: "6 hours",
      type: "Physical Activity",
      status: "Normal"
    },
    {
      id: 2,
      date: "2025-04-22",
      activityLevel: 75,
      duration: "4 hours",
      type: "Social Interaction",
      status: "Normal"
    },
    {
      id: 3,
      date: "2025-04-21",
      activityLevel: 60,
      duration: "3 hours",
      type: "Academic Activity",
      status: "Warning"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Activity Patterns</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Score</CardTitle>
            <CardDescription>Your activity level score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">85%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Weekly Average</CardTitle>
            <CardDescription>Past 7 days activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">73%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Current activity status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold text-green-600">Normal</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>
            Detailed view of your recent activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityHistory.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.activityLevel}%</TableCell>
                  <TableCell>{activity.duration}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                      ${activity.status === "Normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {activity.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPatterns;
