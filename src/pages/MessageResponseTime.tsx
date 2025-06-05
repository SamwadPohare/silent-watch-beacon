
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp } from "lucide-react";

const MessageResponseTime = () => {
  // Mock message response time data
  const responseData = [
    { date: "2025-04-22", messages: 37, avgResponseTime: "5 mins", contactGroup: "Friends" },
    { date: "2025-04-21", messages: 22, avgResponseTime: "8 mins", contactGroup: "Family" },
    { date: "2025-04-20", messages: 15, avgResponseTime: "12 mins", contactGroup: "Classmates" },
    { date: "2025-04-19", messages: 42, avgResponseTime: "3 mins", contactGroup: "Friends" },
    { date: "2025-04-18", messages: 18, avgResponseTime: "7 mins", contactGroup: "Family" },
  ];

  return (
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Message Response Time</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Response Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold text-primary">82%</span>
              <CardDescription className="text-sm">
                How quickly you respond to messages
              </CardDescription>
              <p className="text-sm font-medium text-green-600">Normal</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Average Response Time</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-4xl font-bold">7</span>
                <span className="text-xl ml-1">min</span>
              </div>
              <CardDescription className="text-sm">
                Overall average response time
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Daily Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">26.8</span>
              <CardDescription className="text-sm">
                Average messages per day
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message Response History</CardTitle>
            <CardDescription>
              Recent messaging patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responseData.map((record, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{record.date}</p>
                      <p className="text-xs text-muted-foreground">{record.contactGroup}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{record.avgResponseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{record.messages}</span>
                    <span className="text-sm text-muted-foreground">messages</span>
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

export default MessageResponseTime;
