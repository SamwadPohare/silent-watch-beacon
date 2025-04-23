
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Message Response Time</h1>
        <p className="text-muted-foreground">
          Analysis of how quickly you respond to messages from different groups.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Score</CardTitle>
            <MessageSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <CardDescription className="mt-1">How quickly you respond to messages</CardDescription>
            <p className="mt-2 text-sm font-medium text-green-600">Normal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <MessageSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 mins</div>
            <CardDescription className="mt-1">Overall average response time</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Messages</CardTitle>
            <MessageSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26.8</div>
            <CardDescription className="mt-1">Average messages per day</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Response History</CardTitle>
          <CardDescription>
            Your messaging patterns and response times for the past 5 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your message response data from the past 5 days</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Avg. Response Time</TableHead>
                <TableHead>Contact Group</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responseData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.messages}</TableCell>
                  <TableCell>{record.avgResponseTime}</TableCell>
                  <TableCell>{record.contactGroup}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageResponseTime;
