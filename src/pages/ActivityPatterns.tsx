
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp } from "lucide-react";

const ActivityPatterns = () => {
  // Enhanced mock data for activity history with more detailed information
  const activityHistory = [
    {
      id: 1,
      date: "2025-01-06",
      activityLevel: 89,
      duration: "7.2 hours",
      type: "Mixed Activities",
      status: "Excellent",
      details: "Walking: 8,500 steps, Gym: 45 mins, Light activities: 6.5 hours"
    },
    {
      id: 2,
      date: "2025-01-05",
      activityLevel: 76,
      duration: "5.8 hours",
      type: "Physical Exercise",
      status: "Good",
      details: "Jogging: 30 mins, Yoga: 20 mins, Daily activities: 5.2 hours"
    },
    {
      id: 3,
      date: "2025-01-04",
      activityLevel: 82,
      duration: "6.4 hours",
      type: "Outdoor Activities",
      status: "Good",
      details: "Cycling: 40 mins, Walking: 6,200 steps, Gardening: 25 mins"
    },
    {
      id: 4,
      date: "2025-01-03",
      activityLevel: 71,
      duration: "4.9 hours",
      type: "Light Activities",
      status: "Normal",
      details: "House cleaning: 30 mins, Walking: 4,800 steps, Stretching: 15 mins"
    },
    {
      id: 5,
      date: "2025-01-02",
      activityLevel: 95,
      duration: "8.1 hours",
      type: "High Intensity",
      status: "Excellent",
      details: "Gym workout: 60 mins, Swimming: 30 mins, Active day: 7 hours"
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
                Daily activity and movement
              </CardDescription>
              <p className="text-sm font-medium text-green-600">Normal</p>
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
              <span className="text-4xl font-bold">82%</span>
              <CardDescription className="text-sm">
                Past 7 days activity level
              </CardDescription>
              <p className="text-sm font-medium text-green-600">+7% from last week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Daily Steps</CardTitle>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">7,250</span>
              <CardDescription className="text-sm">
                Average daily steps this week
              </CardDescription>
              <p className="text-sm font-medium text-blue-600">Target: 8,000 steps</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity History</CardTitle>
            <CardDescription>
              Recent activity patterns and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityHistory.map((activity) => (
                <div key={activity.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{activity.date}</p>
                      <p className="text-xs text-muted-foreground">{activity.type}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      activity.status === 'Excellent' 
                        ? 'bg-green-100 text-green-800' 
                        : activity.status === 'Good'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">{activity.activityLevel}%</span>
                    <span className="text-sm text-muted-foreground">{activity.duration}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activity.details}
                  </p>
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
