
import { FileText, FileChartColumn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Report {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  status: string;
}

interface DashboardReportsProps {
  weeklyReports: Report[];
  monthlyReports: Report[];
}

const DashboardReports = ({ weeklyReports, monthlyReports }: DashboardReportsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Wellness Reports</h2>
        <p className="text-muted-foreground">
          Generated reports and insights based on your wellness data
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Reports</CardTitle>
            <FileText size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Reports generated for the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyReports.map(report => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                    <p className="text-sm mt-1">{report.description}</p>
                  </div>
                  <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                    {report.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Reports</CardTitle>
            <FileChartColumn size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Monthly summary reports and analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyReports.map(report => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                    <p className="text-sm mt-1">{report.description}</p>
                  </div>
                  <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                    {report.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Custom Reports</CardTitle>
          <CardDescription>
            Generate personalized reports based on specific criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <FileText size={36} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg mb-1">Generate Custom Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a personalized report by selecting specific metrics, time periods, and formats
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Create New Report
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReports;
