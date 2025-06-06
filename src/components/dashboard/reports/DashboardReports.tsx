
import { FileText, FileChartColumn, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WellnessReports from "./WellnessReports";

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
      <WellnessReports />
      
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
