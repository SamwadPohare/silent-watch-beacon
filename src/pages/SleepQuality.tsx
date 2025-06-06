
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Moon, Clock, TrendingUp } from "lucide-react";

const SleepQuality = () => {
  // Enhanced mock data for sleep history
  const sleepHistory = [
    {
      id: 1,
      date: "2025-01-06",
      sleepScore: 72,
      duration: "7h 45m",
      bedtime: "10:30 PM",
      wakeTime: "6:15 AM",
      quality: "Good",
      deepSleep: "1h 52m",
      remSleep: "1h 28m",
      interruptions: 2
    },
    {
      id: 2,
      date: "2025-01-05",
      sleepScore: 65,
      duration: "6h 20m",
      bedtime: "11:45 PM",
      wakeTime: "6:05 AM",
      quality: "Fair",
      deepSleep: "1h 15m",
      remSleep: "1h 05m",
      interruptions: 4
    },
    {
      id: 3,
      date: "2025-01-04",
      sleepScore: 84,
      duration: "8h 10m",
      bedtime: "10:00 PM",
      wakeTime: "6:10 AM",
      quality: "Excellent",
      deepSleep: "2h 18m",
      remSleep: "1h 45m",
      interruptions: 1
    },
    {
      id: 4,
      date: "2025-01-03",
      sleepScore: 58,
      duration: "5h 55m",
      bedtime: "12:20 AM",
      wakeTime: "6:15 AM",
      quality: "Poor",
      deepSleep: "0h 58m",
      remSleep: "0h 52m",
      interruptions: 6
    },
    {
      id: 5,
      date: "2025-01-02",
      sleepScore: 78,
      duration: "7h 30m",
      bedtime: "10:15 PM",
      wakeTime: "5:45 AM",
      quality: "Good",
      deepSleep: "1h 58m",
      remSleep: "1h 35m",
      interruptions: 2
    }
  ];

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
              <span className="text-4xl font-bold text-primary">68%</span>
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
              <span className="text-4xl font-bold">7h 6m</span>
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
              <span className="text-4xl font-bold">71%</span>
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
                        {sleep.bedtime} → {sleep.wakeTime}
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
                    <span className="text-lg font-bold">{sleep.sleepScore}%</span>
                    <span className="text-sm text-muted-foreground">{sleep.duration}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Deep:</span> {sleep.deepSleep}
                    </div>
                    <div>
                      <span className="text-muted-foreground">REM:</span> {sleep.remSleep}
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
