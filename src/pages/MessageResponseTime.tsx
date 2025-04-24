
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Message Response Time</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Response Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold text-primary">82%</span>
                <CardDescription className="mt-2 text-sm">
                  How quickly you respond to messages
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-green-600">Normal</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Average Response Time</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">7</span>
                <span className="text-2xl ml-1">min</span>
                <CardDescription className="mt-2 text-sm">
                  Overall average response time
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Daily Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">26.8</span>
                <CardDescription className="mt-2 text-sm">
                  Average messages per day
                </CardDescription>
              </div>
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
                    <TableCell>
                      <span className="font-medium">{record.messages}</span>
                    </TableCell>
                    <TableCell>{record.avgResponseTime}</TableCell>
                    <TableCell>{record.contactGroup}</TableCell>
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

export default MessageResponseTime;
