
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/dashboard/overview/DashboardOverview";
import DashboardMetrics from "@/components/dashboard/metrics/DashboardMetrics";
import DashboardReports from "@/components/dashboard/reports/DashboardReports";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const {
    metrics,
    activityItems,
    metricIcons,
    weeklyTrends,
    categoryDistribution,
    weeklyReports,
    monthlyReports
  } = useDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wellness Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your wellness patterns and stay informed about potential concerns.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DashboardOverview 
            metrics={metrics}
            activityItems={activityItems}
            metricIcons={metricIcons}
          />
        </TabsContent>
        
        <TabsContent value="metrics">
          <DashboardMetrics
            weeklyTrends={weeklyTrends}
            categoryDistribution={categoryDistribution}
          />
        </TabsContent>
        
        <TabsContent value="reports">
          <DashboardReports
            weeklyReports={weeklyReports}
            monthlyReports={monthlyReports}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
