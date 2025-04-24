
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, TrendingUp } from "lucide-react";

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
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center gap-2">
        <Activity className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Activity Patterns</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Current Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold text-primary">85%</span>
                <CardDescription className="mt-2 text-sm">
                  Your activity level score
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Weekly Average</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">73%</span>
                <CardDescription className="mt-2 text-sm">
                  Past 7 days activity
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Status</CardTitle>
              <Activity className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-2xl font-bold text-green-600">Normal</span>
                <CardDescription className="mt-2 text-sm">
                  Current activity status
                </CardDescription>
              </div>
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
                    <TableCell>
                      <span className="font-medium">{activity.activityLevel}%</span>
                    </TableCell>
                    <TableCell>{activity.duration}</TableCell>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        activity.status === 'Normal' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
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
    </div>
  );
};

export default ActivityPatterns;
