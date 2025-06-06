
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WellnessMetric, TimelineItem } from "@/types";
import MetricsCard from "@/components/dashboard/MetricsCard";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import HelplineNumbers from "@/components/dashboard/HelplineNumbers";
import SelfCareTips from "@/components/dashboard/SelfCareTips";
import MentalWellnessSection from "@/components/dashboard/MentalWellnessSection";
import ScreenTimeOverview from "@/components/dashboard/ScreenTimeOverview";
import AIScheduleCard from "@/components/dashboard/AIScheduleCard";
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ScreenTimeOverview />
        <AIScheduleCard />
        <SelfCareTips />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <ActivityTimeline items={activityItems} />
        </div>
        
        <div className="space-y-4">
          <HelplineNumbers />
          <MentalWellnessSection />
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Mental Health Insights</CardTitle>
                <Activity size={18} className="text-muted-foreground" />
              </div>
              <CardDescription>
                Key insights about your mental wellness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Insights:</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                    <li>Activity levels are consistently good at 85%</li>
                    <li>Sleep quality needs improvement at 68%</li>
                    <li>3 leave applications submitted this month</li>
                    <li>5 qualified counselors available for support</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium">Recommendations:</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider booking a session with one of our counselors to discuss sleep improvement strategies and stress management techniques.
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
