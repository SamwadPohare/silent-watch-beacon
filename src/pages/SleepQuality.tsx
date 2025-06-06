
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Moon, Clock, TrendingUp, Loader } from "lucide-react";
import { useSleepQuality } from "@/hooks/useSleepQuality";

const SleepQuality = () => {
  const { sleepHistory, currentScore, averageDuration, sleepEfficiency, loading, error } = useSleepQuality();

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
          <p className="text-red-600">Error loading sleep quality: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Moon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Sleep Quality</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white">
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
                Sleep duration and patterns
              </CardDescription>
              <p className="text-sm font-medium text-yellow-600">Warning</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Average Duration</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">{averageDuration}</span>
              <CardDescription className="text-sm">
                Average sleep per night (last 7 days)
              </CardDescription>
              <p className="text-sm font-medium text-blue-600">Recommended: 7-9 hours</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Sleep Efficiency</CardTitle>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">{sleepEfficiency}%</span>
              <CardDescription className="text-sm">
                Time asleep vs. time in bed
              </CardDescription>
              <p className="text-sm font-medium text-green-600">Above average</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sleep History</CardTitle>
            <CardDescription>
              Detailed sleep patterns and quality metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sleepHistory.map((sleep) => (
                <div key={sleep.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{sleep.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {sleep.bedtime} → {sleep.wake_time}
                      </p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      sleep.quality === 'Excellent' 
                        ? 'bg-green-100 text-green-800' 
                        : sleep.quality === 'Good'
                        ? 'bg-blue-100 text-blue-800'
                        : sleep.quality === 'Fair'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {sleep.quality}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">{sleep.sleep_score}%</span>
                    <span className="text-sm text-muted-foreground">{sleep.duration_hours}h</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Deep:</span> {sleep.deep_sleep_hours}h
                    </div>
                    <div>
                      <span className="text-muted-foreground">REM:</span> {sleep.rem_sleep_hours}h
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Interruptions:</span> {sleep.interruptions}
                    </div>
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

export default SleepQuality;
