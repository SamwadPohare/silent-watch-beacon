import { Activity, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WellnessMetric, TimelineItem } from "@/types";
import MetricsCard from "@/components/dashboard/MetricsCard";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import HelplineNumbers from "@/components/dashboard/HelplineNumbers";
import SelfCareTips from "@/components/dashboard/SelfCareTips";
import { LucideIcon } from "lucide-react";

interface DashboardOverviewProps {
  metrics: WellnessMetric[];
  activityItems: TimelineItem[];
  metricIcons: Record<string, LucideIcon>;
}

const DashboardOverview = ({ metrics, activityItems, metricIcons }: DashboardOverviewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const IconComponent = metricIcons[metric.title];
          return (
            <MetricsCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              status={metric.status}
              icon={IconComponent && <IconComponent size={18} />}
            />
          );
        })}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <SelfCareTips />
          <ActivityTimeline items={activityItems} />
        </div>
        
        <div className="space-y-4">
          <HelplineNumbers />
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Weekly Summary</CardTitle>
                <Calendar size={18} className="text-muted-foreground" />
              </div>
              <CardDescription>
                Your wellness overview for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Insights:</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                    <li>Academic engagement has decreased by 15%</li>
                    <li>Sleep patterns show irregular hours</li>
                    <li>Social interactions have remained stable</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium">Recommendations:</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider establishing a consistent sleep schedule and reach out to your academic advisor for support with course engagement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
