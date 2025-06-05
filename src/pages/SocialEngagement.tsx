
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp } from "lucide-react";

const SocialEngagement = () => {
  // Mock social engagement data
  const socialData = [
    { date: "2025-04-22", interactions: 24, platform: "Text Messages", duration: "45 mins" },
    { date: "2025-04-21", interactions: 18, platform: "Social Media", duration: "32 mins" },
    { date: "2025-04-20", interactions: 35, platform: "Video Calls", duration: "78 mins" },
    { date: "2025-04-19", interactions: 12, platform: "Text Messages", duration: "25 mins" },
    { date: "2025-04-18", interactions: 28, platform: "Social Media", duration: "55 mins" },
  ];

  return (
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Social Engagement</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Social Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold text-primary">72%</span>
              <CardDescription className="text-sm">
                Interactions and communications
              </CardDescription>
              <p className="text-sm font-medium text-green-600">Normal</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Daily Interactions</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">23.4</span>
              <CardDescription className="text-sm">
                Average interactions per day
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Communication Time</CardTitle>
              <MessageSquare className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-4xl font-bold">47</span>
                <span className="text-xl ml-1">min</span>
              </div>
              <CardDescription className="text-sm">
                Average daily communication time
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Social Interaction History</CardTitle>
            <CardDescription>
              Recent interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialData.map((record, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{record.date}</p>
                      <p className="text-xs text-muted-foreground">{record.platform}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{record.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{record.interactions}</span>
                    <span className="text-sm text-muted-foreground">interactions</span>
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

export default SocialEngagement;
