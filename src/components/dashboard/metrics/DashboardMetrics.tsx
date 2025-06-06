
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Moon } from "lucide-react";
import MetricLineChart from "@/components/charts/MetricLineChart";
import MetricBarChart from "@/components/charts/MetricBarChart";

interface DashboardMetricsProps {
  weeklyTrends: Array<{ name: string; value: number }>;
  categoryDistribution: Array<{ name: string; value: number }>;
}

const DashboardMetrics = ({ weeklyTrends, categoryDistribution }: DashboardMetricsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Detailed Metrics</h2>
        <p className="text-muted-foreground">
          Comprehensive view of your wellness data and trends
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <MetricLineChart 
          data={weeklyTrends}
          title="Weekly Wellness Score Trend"
          description="Your overall wellness score over the past week"
        />
        <MetricBarChart 
          data={categoryDistribution}
          title="Wellness Categories Distribution"
          description="Breakdown of your wellness metrics by category"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Overall Wellness Score</CardTitle>
              <Activity size={18} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77%</div>
            <CardDescription className="mt-1">Average of wellness metrics</CardDescription>
            <p className="mt-2 text-sm font-medium text-green-600">+5% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Sleep vs Activity</CardTitle>
              <Moon size={18} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Activity Leads</div>
            <CardDescription className="mt-1">Activity patterns stronger than sleep</CardDescription>
            <p className="mt-2 text-sm font-medium text-blue-600">17% difference</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Wellness Insights</CardTitle>
          <CardDescription>
            Key findings from your wellness data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Key Findings:</p>
              <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                <li><span className="font-medium">Activity Patterns</span> - Consistently strong with 85% average score</li>
                <li><span className="font-medium">Sleep Quality</span> - Shows room for improvement at 68% average</li>
                <li><span className="font-medium">Weekly Trend</span> - Overall improvement of 5% from last week</li>
              </ul>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium">Recommendations:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Focus on establishing a consistent bedtime routine to improve sleep quality. 
                Your excellent activity levels are contributing positively to your overall wellness.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
