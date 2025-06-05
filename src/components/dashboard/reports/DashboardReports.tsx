
import { FileText, FileChartColumn, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          Generated reports and insights based on your mood tracking and wellness data
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Mood Reports</CardTitle>
            <FileText size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Weekly summaries of your mood patterns and trends
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
            <CardTitle>Monthly Mood Reports</CardTitle>
            <FileChartColumn size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Comprehensive monthly analysis of your emotional wellness journey
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
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        📊 Mood Trends
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        🎤 Voice Analysis
                      </Badge>
                    </div>
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
            <CardTitle>Mood Analytics</CardTitle>
            <TrendingUp size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Real-time insights from your mood tracking data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">This Month's Mood Average</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl">😊</span>
                <span className="text-lg font-semibold">3.7/5</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Based on 24 mood entries</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Voice Notes Recorded</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <span className="text-lg font-semibold">18</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total this month</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Mood Improvement</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                <span className="text-lg font-semibold text-green-600">+15%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs last month</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Support Alerts Sent</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📧</span>
                <span className="text-lg font-semibold">2</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">To trusted contacts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReports;
