
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Academic Engagement</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Academic Score</CardTitle>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold text-primary">45%</span>
              <CardDescription className="text-sm">
                Class attendance and participation
              </CardDescription>
              <p className="text-sm font-medium text-red-600">Critical</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Attendance Rate</CardTitle>
              <BookOpen className="h-5 w-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-4xl font-bold">68%</span>
              <CardDescription className="text-sm">
                Overall class attendance
              </CardDescription>
              <p className="text-sm font-medium text-yellow-600">Warning</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Study Time</CardTitle>
              <BookOpen className="h-5 w-5 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-4xl font-bold">12.5</span>
                <span className="text-xl ml-1">hrs</span>
              </div>
              <CardDescription className="text-sm">
                Weekly tracked study hours
              </CardDescription>
              <p className="text-sm font-medium text-red-600">Critical</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic Activity History</CardTitle>
            <CardDescription>
              Recent academic activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {academicData.map((record, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{record.date}</p>
                      <p className="text-xs text-muted-foreground">{record.activity}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      record.status === 'Present' 
                        ? 'bg-green-100 text-green-800' 
                        : record.status === 'Late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{record.course}</span>
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

export default AcademicEngagement;
