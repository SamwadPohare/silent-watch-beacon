
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, TrendingDown } from "lucide-react";

const AcademicEngagement = () => {
  // Mock academic engagement data
  const academicData = [
    { date: "2025-04-22", activity: "Missed Lecture", course: "CS301", status: "Absent" },
    { date: "2025-04-21", activity: "Lecture", course: "MATH202", status: "Present" },
    { date: "2025-04-21", activity: "Lab Session", course: "BIO101", status: "Present" },
    { date: "2025-04-20", activity: "Study Group", course: "CS301", status: "Present" },
    { date: "2025-04-19", activity: "Lecture", course: "HIST105", status: "Late" },
    { date: "2025-04-18", activity: "Lecture", course: "CS301", status: "Absent" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Academic Engagement</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Academic Score</CardTitle>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold text-primary">45%</span>
                <CardDescription className="mt-2 text-sm">
                  Class attendance and participation
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-red-600">Critical</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Attendance Rate</CardTitle>
              <BookOpen className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">68%</span>
                <CardDescription className="mt-2 text-sm">
                  Overall class attendance
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Study Time</CardTitle>
              <BookOpen className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-5xl font-bold">12.5</span>
                <span className="text-2xl ml-1">hrs</span>
                <CardDescription className="mt-2 text-sm">
                  Weekly tracked study hours
                </CardDescription>
                <p className="mt-2 text-sm font-medium text-red-600">Critical</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Academic Activity History</CardTitle>
            <CardDescription>
              Your recent academic activities and attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {academicData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.activity}</TableCell>
                    <TableCell>
                      <span className="font-medium">{record.course}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        record.status === 'Present' 
                          ? 'bg-green-100 text-green-800' 
                          : record.status === 'Late'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </TableCell>
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

export default AcademicEngagement;
