
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Social Engagement</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Social Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold text-primary">72%</span>
                <CardDescription className="mt-2 text-sm">
                  Interactions and communications
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-green-600">Normal</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Daily Interactions</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">23.4</span>
                <CardDescription className="mt-2 text-sm">
                  Average interactions per day
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Communication Time</CardTitle>
              <MessageSquare className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">47</span>
                <span className="text-2xl ml-1">min</span>
                <CardDescription className="mt-2 text-sm">
                  Average daily communication time
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Social Interaction History</CardTitle>
            <CardDescription>
              Your social interaction data for the past 5 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Number of Interactions</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socialData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <span className="font-medium">{record.interactions}</span>
                    </TableCell>
                    <TableCell>{record.platform}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialEngagement;
