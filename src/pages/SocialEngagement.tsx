
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Social Engagement</h1>
        <p className="text-muted-foreground">
          Analysis of your social interactions and communication patterns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Social Score</CardTitle>
            <MessageSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <CardDescription className="mt-1">Interactions and communications</CardDescription>
            <p className="mt-2 text-sm font-medium text-green-600">Normal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Interactions</CardTitle>
            <MessageSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.4</div>
            <CardDescription className="mt-1">Average interactions per day</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Communication Time</CardTitle>
            <MessageSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47 min</div>
            <CardDescription className="mt-1">Average daily communication time</CardDescription>
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
            <TableCaption>Your social interaction data from the past 5 days</TableCaption>
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
                  <TableCell>{record.interactions}</TableCell>
                  <TableCell>{record.platform}</TableCell>
                  <TableCell>{record.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialEngagement;
