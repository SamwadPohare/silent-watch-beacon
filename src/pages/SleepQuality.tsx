
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Moon } from "lucide-react";

const SleepQuality = () => {
  // Mock sleep quality data
  const sleepData = [
    { date: "2025-04-22", duration: "6.5 hrs", quality: "Poor", notes: "Woke up multiple times" },
    { date: "2025-04-21", duration: "7.2 hrs", quality: "Fair", notes: "Took longer to fall asleep" },
    { date: "2025-04-20", duration: "8.0 hrs", quality: "Good", notes: "Consistent sleep cycle" },
    { date: "2025-04-19", duration: "7.8 hrs", quality: "Good", notes: "Deep sleep reported" },
    { date: "2025-04-18", duration: "5.5 hrs", quality: "Poor", notes: "Late night activity" },
  ];

  return (
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Moon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Sleep Quality</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Current Sleep Score</CardTitle>
              <TrendingDown className="h-5 w-5 text-yellow-500" />
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
              <Moon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-4xl font-bold">7.0</span>
                <span className="text-xl ml-1">hrs</span>
              </div>
              <CardDescription className="text-sm">
                Last 7 days average
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Sleep Regularity</CardTitle>
              <Moon className="h-5 w-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">62%</span>
              <CardDescription className="text-sm">
                Consistency in sleep schedule
              </CardDescription>
              <p className="text-sm font-medium text-yellow-600">Warning</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sleep History</CardTitle>
            <CardDescription>
              Recent sleep records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sleepData.map((record, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{record.date}</p>
                      <p className="text-xs text-muted-foreground">{record.notes}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      record.quality === 'Good' 
                        ? 'bg-green-100 text-green-800' 
                        : record.quality === 'Fair'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.quality}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{record.duration}</span>
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
