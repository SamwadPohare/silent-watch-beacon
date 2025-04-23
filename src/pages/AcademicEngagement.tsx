
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
import { BookOpen } from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Engagement</h1>
        <p className="text-muted-foreground">
          Tracking your academic activities and class participation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Academic Score</CardTitle>
            <BookOpen size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <CardDescription className="mt-1">Class attendance and participation</CardDescription>
            <p className="mt-2 text-sm font-medium text-red-600">Critical</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <BookOpen size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <CardDescription className="mt-1">Overall class attendance</CardDescription>
            <p className="mt-2 text-sm font-medium text-yellow-600">Warning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <BookOpen size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 hrs</div>
            <CardDescription className="mt-1">Weekly tracked study hours</CardDescription>
            <p className="mt-2 text-sm font-medium text-red-600">Critical</p>
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
            <TableCaption>Your academic activities from the past week</TableCaption>
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
                  <TableCell>{record.course}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Present' ? 'bg-green-100 text-green-800' :
                      record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
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
  );
};

export default AcademicEngagement;
