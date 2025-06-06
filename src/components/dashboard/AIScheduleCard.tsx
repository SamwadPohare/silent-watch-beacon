
import { Calendar, Clock, BookOpen, Coffee } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAISchedules } from "@/hooks/useAISchedules";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useToast } from "@/hooks/use-toast";

const AIScheduleCard = () => {
  const { todaySchedule, loading, generateAISchedule } = useAISchedules();
  const { preferences } = useUserPreferences();
  const { toast } = useToast();

  const handleGenerateSchedule = async () => {
    const result = await generateAISchedule(preferences);
    if (result) {
      toast({
        title: "Schedule Generated",
        description: "Your personalized AI schedule has been created for today."
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Today's AI Schedule</CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!todaySchedule) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Today's AI Schedule</CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Generate a personalized schedule based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              No schedule generated for today. Create one based on your sleep and screen time preferences.
            </p>
            <Button onClick={handleGenerateSchedule}>
              Generate Today's Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const schedule = todaySchedule.schedule_data;
  const currentTime = new Date();
  const currentTimeString = currentTime.toTimeString().slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Today's AI Schedule</CardTitle>
          <Calendar size={18} className="text-muted-foreground" />
        </div>
        <CardDescription>
          Personalized schedule optimized for your wellness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Wake: {schedule.wake_time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Sleep: {schedule.sleep_time}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <BookOpen size={14} />
              Study Sessions
            </h4>
            <div className="space-y-2">
              {schedule.study_blocks.slice(0, 2).map((block, index) => (
                <div key={index} className="flex items-center justify-between text-sm border rounded-lg p-2">
                  <span>{block.subject}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {block.start_time} - {block.end_time}
                    </Badge>
                    {currentTimeString >= block.start_time && currentTimeString <= block.end_time && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Coffee size={14} />
              Wellness Breaks
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {schedule.wellness_activities.slice(0, 2).map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm border rounded-lg p-2">
                  <span>{activity.activity}</span>
                  <Badge variant="outline" className="text-xs">
                    {activity.time} ({activity.duration}m)
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Screen time budget: {schedule.screen_time_budget} hours
            </p>
          </div>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleGenerateSchedule}
          className="w-full"
        >
          Regenerate Schedule
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIScheduleCard;
