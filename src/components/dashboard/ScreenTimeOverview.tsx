
import { Monitor, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useScreenTimeMonitoring } from "@/hooks/useScreenTimeMonitoring";
import { useUserPreferences } from "@/hooks/useUserPreferences";

const ScreenTimeOverview = () => {
  const { todayScreenTime, loading: screenTimeLoading } = useScreenTimeMonitoring();
  const { preferences, loading: prefsLoading } = useUserPreferences();

  if (screenTimeLoading || prefsLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Screen Time Today</CardTitle>
            <Monitor size={18} className="text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hoursUsed = todayScreenTime?.hours_used || 0;
  const limit = preferences.screen_time_limit_hours;
  const percentage = Math.min((hoursUsed / limit) * 100, 100);
  const isNearLimit = percentage >= 80;
  const isOverLimit = percentage >= 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Screen Time Today</CardTitle>
          <Monitor size={18} className="text-muted-foreground" />
        </div>
        <CardDescription>
          Track your digital wellness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span className="text-2xl font-bold">
              {hoursUsed.toFixed(1)}h
            </span>
            <span className="text-muted-foreground">/ {limit}h</span>
          </div>
          
          {isOverLimit && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle size={14} />
              Over Limit
            </Badge>
          )}
          
          {isNearLimit && !isOverLimit && (
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              Near Limit
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <Progress 
            value={percentage} 
            className={`h-2 ${isOverLimit ? 'bg-red-100' : isNearLimit ? 'bg-orange-100' : ''}`}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0h</span>
            <span>{limit}h limit</span>
          </div>
        </div>

        <div className="pt-2 space-y-1">
          <p className="text-sm text-muted-foreground">
            {isOverLimit 
              ? "You've exceeded your daily screen time limit. Consider taking a break."
              : isNearLimit 
                ? "You're approaching your screen time limit for today."
                : `You have ${(limit - hoursUsed).toFixed(1)} hours remaining today.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenTimeOverview;
