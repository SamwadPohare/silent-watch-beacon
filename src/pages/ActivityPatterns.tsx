
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Loader } from "lucide-react";
import { useActivityPatterns } from "@/hooks/useActivityPatterns";

const ActivityPatterns = () => {
  const { activityHistory, currentScore, weeklyAverage, averageSteps, loading, error } = useActivityPatterns();

  if (loading) {
    return (
      <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading activity patterns: {error}</p>
        </div>
      </div>
    );
  }

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
              <span className="text-4xl font-bold text-primary">{currentScore}%</span>
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
              <span className="text-4xl font-bold">{weeklyAverage}%</span>
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
              <span className="text-4xl font-bold">{averageSteps.toLocaleString()}</span>
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
                      <p className="text-xs text-muted-foreground">{activity.activity_type}</p>
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
                    <span className="text-lg font-bold">{activity.activity_level}%</span>
                    <span className="text-sm text-muted-foreground">{activity.duration_hours} hours</span>
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
