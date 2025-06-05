
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
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Activity Patterns</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Current Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold text-primary">85%</span>
              <CardDescription className="text-sm">
                Your activity level score
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Weekly Average</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">73%</span>
              <CardDescription className="text-sm">
                Past 7 days activity
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Status</CardTitle>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-2xl font-bold text-green-600">Normal</span>
              <CardDescription className="text-sm">
                Current activity status
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity History</CardTitle>
            <CardDescription>
              Recent activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityHistory.map((activity) => (
                <div key={activity.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{activity.date}</p>
                      <p className="text-xs text-muted-foreground">{activity.type}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      activity.status === 'Normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{activity.activityLevel}%</span>
                    <span className="text-sm text-muted-foreground">{activity.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityPatterns;
