
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen } from "lucide-react";
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
          Comprehensive view of all your wellness data and trends
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Overall Wellness Score</CardTitle>
              <Activity size={18} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
            <CardDescription className="mt-1">Average of all wellness metrics</CardDescription>
            <p className="mt-2 text-sm font-medium text-green-600">+3% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Highest Category</CardTitle>
              <Activity size={18} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Activity Patterns</div>
            <CardDescription className="mt-1">Your strongest wellness area</CardDescription>
            <p className="mt-2 text-sm font-medium text-green-600">85%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle>
              <BookOpen size={18} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Academic Engagement</div>
            <CardDescription className="mt-1">Area requiring attention</CardDescription>
            <p className="mt-2 text-sm font-medium text-red-600">45%</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Metric Correlations</CardTitle>
          <CardDescription>
            Relationships between different wellness metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Key Findings:</p>
              <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                <li><span className="font-medium">Sleep Quality and Academic Engagement</span> - Strong positive correlation (0.82)</li>
                <li><span className="font-medium">Screen Time and Sleep Quality</span> - Moderate negative correlation (-0.65)</li>
                <li><span className="font-medium">Social Engagement and Message Response Time</span> - Strong positive correlation (0.78)</li>
              </ul>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium">Insights:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your data suggests that improving sleep quality could significantly boost academic performance.
                Reducing late-night screen time may help improve your sleep patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
